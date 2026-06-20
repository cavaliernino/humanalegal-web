/*
 * Datos estructurados Schema.org.
 * La versión ES usa un @graph completo (LegalService + Person + WebSite);
 * la EN, un LegalService simple. Datos biográficos verificados con Tamara.
 */
import { CONTACT, SITE_URL } from '../config';
import type { Locale } from './content';

const legalServiceEs = {
	'@type': 'LegalService',
	'@id': `${SITE_URL}/#legalservice`,
	name: 'Humana Legal',
	alternateName: ['Humana Legal Abogados', 'Tamara López González Abogada'],
	description:
		'Estudio jurídico enfocado en derecho migratorio y derechos humanos en Chile. El derecho, más humano.',
	slogan: 'El derecho, más humano.',
	url: `${SITE_URL}/`,
	image: `${SITE_URL}/assets/images/og-image.jpg`,
	logo: `${SITE_URL}/assets/images/favicon.svg`,
	priceRange: '$$',
	telephone: CONTACT.phoneSchema,
	email: CONTACT.email,
	founder: {
		'@type': 'Person',
		name: 'Tamara López González',
	},
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'CL',
		addressRegion: 'Región de Valparaíso',
	},
	areaServed: [
		{ '@type': 'AdministrativeArea', name: 'Región de Valparaíso' },
		{ '@type': 'Country', name: 'Chile' },
	],
	openingHoursSpecification: {
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		opens: '09:00',
		closes: '18:00',
	},
	availableLanguage: ['es', 'en'],
	knowsAbout: [
		'Derecho Migratorio',
		'Visas y Residencias',
		'Nacionalización',
		'Reunificación Familiar',
		'Recursos de Protección',
		'Recursos de Amparo',
		'Expulsión y Abandono',
		'Refugio',
		'Derechos Humanos',
	],
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Servicios jurídicos',
		itemListElement: [
			{
				'@type': 'OfferCatalog',
				name: 'Residencias y nacionalización',
				itemListElement: [
					'Residencia temporal: reunificación familiar, actividades remuneradas, razones humanitarias',
					'Residencia definitiva',
					'Nacionalización y reconocimiento de ciudadanía',
					'Asesoría migratoria a empresas, inversionistas e instituciones',
				].map((name) => ({
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name },
				})),
			},
			{
				'@type': 'OfferCatalog',
				name: 'Defensa administrativa y judicial',
				itemListElement: [
					'Recursos administrativos y descargos en procedimientos sancionatorios',
					'Reclamo de multas por irregularidad migratoria',
					'Recursos de protección por rechazo o archivo de solicitudes',
					'Recursos de amparo frente a expulsión y abandono',
					'Recursos de reclamación judicial',
				].map((name) => ({
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name },
				})),
			},
			{
				'@type': 'OfferCatalog',
				name: 'Protección y derechos humanos',
				itemListElement: [
					'Solicitudes de refugio',
					'Víctimas de trata y tráfico de personas',
					'Casos con enfoque de género',
					'Niñez y adolescencia migrante',
					'Litigio estratégico',
				].map((name) => ({
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name },
				})),
			},
		],
	},
};

const personEs = {
	'@type': 'Person',
	'@id': `${SITE_URL}/#person`,
	name: 'Tamara López González',
	jobTitle: 'Abogada · Fundadora de Humana Legal',
	url: `${SITE_URL}/`,
	image: `${SITE_URL}/assets/images/tamara.jpg`,
	alumniOf: [
		{ '@type': 'CollegeOrUniversity', name: 'Universidad de Las Américas' },
		{ '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Católica de Chile' },
		{ '@type': 'CollegeOrUniversity', name: 'Universidad de Chile' },
		{ '@type': 'CollegeOrUniversity', name: 'Georgetown University' },
	],
	knowsLanguage: ['es', 'en'],
	worksFor: { '@id': `${SITE_URL}/#legalservice` },
};

const websiteEs = {
	'@type': 'WebSite',
	'@id': `${SITE_URL}/#website`,
	url: `${SITE_URL}/`,
	name: 'Humana Legal',
	inLanguage: 'es-CL',
	publisher: { '@id': `${SITE_URL}/#legalservice` },
};

const legalServiceEn = {
	'@context': 'https://schema.org',
	'@type': 'LegalService',
	name: 'Humana Legal',
	alternateName: 'Tamara López González, Attorney at Law',
	slogan: 'The law, more human.',
	url: `${SITE_URL}/en/`,
	description:
		'Boutique law practice focused on immigration and human rights law in Chile. The law, more human.',
	priceRange: '$$',
	telephone: CONTACT.phoneSchema,
	email: CONTACT.email,
	founder: {
		'@type': 'Person',
		name: 'Tamara López González',
	},
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'CL',
		addressRegion: 'Valparaíso Region',
	},
	areaServed: [
		{ '@type': 'AdministrativeArea', name: 'Valparaíso Region' },
		{ '@type': 'Country', name: 'Chile' },
	],
	openingHoursSpecification: {
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		opens: '09:00',
		closes: '18:00',
	},
	availableLanguage: ['en', 'es'],
};

export function getJsonLd(locale: Locale): object {
	if (locale === 'en') return legalServiceEn;
	return {
		'@context': 'https://schema.org',
		'@graph': [legalServiceEs, personEs, websiteEs],
	};
}
