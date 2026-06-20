#!/usr/bin/env python3
"""
Backend mínimo del formulario de contacto de humanalegal.cl.

Recibe el POST JSON de main.js en /api/contact y lo reenvía por SMTP al buzón
del estudio. Sin dependencias externas: Python 3.9+ y la librería estándar.
nginx hace de frontera (TLS, rate-limit zona 'contact', tamaño de body), por lo
que este proceso solo escucha en loopback.

Configuración por variables de entorno (ver env.example):
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM,
  LISTEN_HOST, LISTEN_PORT
"""

import json
import logging
import os
import re
import smtplib
from email.message import EmailMessage
from email.utils import formataddr
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

SMTP_HOST = os.environ.get('SMTP_HOST', 'localhost')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASS = os.environ.get('SMTP_PASS', '')
MAIL_TO = os.environ.get('MAIL_TO', 'contacto@humanalegal.cl')
MAIL_FROM = os.environ.get('MAIL_FROM', 'web@humanalegal.cl')
LISTEN_HOST = os.environ.get('LISTEN_HOST', '127.0.0.1')
LISTEN_PORT = int(os.environ.get('LISTEN_PORT', '8085'))

MAX_BODY = 16_384
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

log = logging.getLogger('contact-api')


def clean(value, limit):
    return str(value or '').strip()[:limit]


def send_mail(fields, client_ip):
    msg = EmailMessage()
    subject = f"Consulta web — {fields['name']}"
    if fields['area']:
        subject += f" · {fields['area']}"
    msg['Subject'] = subject
    msg['From'] = MAIL_FROM
    msg['To'] = MAIL_TO
    msg['Reply-To'] = formataddr((fields['name'], fields['email']))
    msg.set_content(
        'Nueva consulta desde el formulario del sitio.\n\n'
        f"Nombre:   {fields['name']}\n"
        f"Email:    {fields['email']}\n"
        f"Teléfono: {fields['phone'] or '—'}\n"
        f"Área:     {fields['area'] or '—'}\n"
        f"Idioma:   {fields['lang'] or '—'}\n"
        f"IP:       {client_ip}\n\n"
        f"{fields['message']}\n"
    )

    if SMTP_PORT == 465:
        server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15)
    else:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15)
    with server:
        if SMTP_PORT != 465:
            server.starttls()
        if SMTP_USER:
            server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)


class Handler(BaseHTTPRequestHandler):
    server_version = 'contact-api'

    def _reply(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        log.info('%s %s', self.headers.get('X-Real-IP', self.client_address[0]), fmt % args)

    def do_POST(self):
        if self.path.rstrip('/') != '/api/contact':
            return self._reply(404, {'ok': False})

        try:
            length = int(self.headers.get('Content-Length') or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY:
            return self._reply(413 if length > MAX_BODY else 400, {'ok': False})

        try:
            data = json.loads(self.rfile.read(length).decode('utf-8'))
            if not isinstance(data, dict):
                raise ValueError
        except (ValueError, UnicodeDecodeError):
            return self._reply(400, {'ok': False, 'error': 'invalid-json'})

        client_ip = self.headers.get('X-Real-IP', self.client_address[0])

        # Honeypot: responder OK sin enviar nada, para no dar pistas a los bots.
        if clean(data.get('website'), 100):
            log.info('honeypot descartado desde %s', client_ip)
            return self._reply(200, {'ok': True})

        fields = {
            'name': clean(data.get('name'), 200),
            'email': clean(data.get('email'), 254),
            'phone': clean(data.get('phone'), 50),
            'area': clean(data.get('area'), 50),
            'lang': clean(data.get('lang'), 5),
            'message': clean(data.get('message'), 5000),
        }
        if not fields['name'] or not fields['message'] or not EMAIL_RE.match(fields['email']):
            return self._reply(422, {'ok': False, 'error': 'invalid-fields'})

        try:
            send_mail(fields, client_ip)
        except Exception:
            log.exception('fallo el envío SMTP')
            return self._reply(502, {'ok': False, 'error': 'mail-failed'})

        log.info('consulta enviada: %s <%s> área=%s', fields['name'], fields['email'], fields['area'])
        return self._reply(200, {'ok': True})


def main():
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
    server = ThreadingHTTPServer((LISTEN_HOST, LISTEN_PORT), Handler)
    log.info('escuchando en %s:%s → %s', LISTEN_HOST, LISTEN_PORT, MAIL_TO)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
