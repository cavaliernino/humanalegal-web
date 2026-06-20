#!/usr/bin/env bash
# =============================================================================
# serve.sh — servidor HTTP local para desarrollo
# Uso: ./serve.sh [puerto]
# =============================================================================
set -e

PORT="${1:-8080}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "  humana legal · servidor local"
echo "  ───────────────────────────────"
echo "  Directorio: $DIR"
echo "  URL:        http://localhost:$PORT"
echo "  Ctrl+C para detener"
echo ""

cd "$DIR"

# Intentar en orden: python3, python, npx serve, php
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m SimpleHTTPServer "$PORT"
elif command -v npx >/dev/null 2>&1; then
  exec npx --yes serve -p "$PORT" -L
elif command -v php >/dev/null 2>&1; then
  exec php -S "localhost:$PORT"
else
  echo "ERROR: no se encontró python3, python, npx ni php."
  echo "Instalá alguno de ellos o usá VS Code + Live Server."
  exit 1
fi
