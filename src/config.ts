/*
 * Datos de contacto y servicios externos, centralizados.
 * Reemplazar aquí actualiza todo el sitio (HTML visible y JSON-LD).
 */
export const SITE_URL = 'https://www.humanalegal.cl';

export const CONTACT = {
	email: 'tamara@humanalegal.cl',
	// Tamara centraliza todo en su número personal (mismo para llamada y WhatsApp).
	phoneDisplay: '+56 9 7549 5927',
	phoneHref: '+56975495927',
	phoneSchema: '+56-9-7549-5927',
	whatsapp: 'https://wa.me/56975495927',
	linkedin: 'https://cl.linkedin.com/in/tamaralopezg',
};

/*
 * Umami self-hosted: dejar src y websiteId vacíos desactiva el script
 * (la v1 cargaba un placeholder roto en cada visita).
 */
export const UMAMI = {
	src: '', // ej: https://umami.humanalegal.cl/script.js
	websiteId: '',
};
