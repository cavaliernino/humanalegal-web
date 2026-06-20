/*
 * Todo el copy del sitio. Una sola fuente para ambos idiomas.
 * Los campos *Html admiten marcado (em, br) y se renderizan con set:html.
 *
 * Voz: "nosotros" (Humana Legal) en áreas, enfoque, proceso y contacto;
 * primera persona ("yo", Tamara) en el perfil. Datos biográficos verificados
 * con Tamara (cuestionario jun-2026): no agregar credenciales sin respaldo.
 */
export type Locale = 'es' | 'en';

interface Link {
	href: string;
	label: string;
}

interface SiteContent {
	meta: {
		htmlLang: string;
		title: string;
		description: string;
		keywords: string;
		robots: string;
		ogLocale: string;
		ogLocaleAlt: string;
		ogTitle: string;
		ogDescription: string;
		twitterDescription: string;
	};
	nav: {
		brandAria: string;
		sub: string;
		menuAria: string;
		links: Link[];
		mobileLinks: Link[];
		langSwitch: { href: string; code: string; aria: string; hreflang: string };
		mobileLangSwitch: Link & { hreflang: string };
		cta: Link;
		toggleAria: string;
	};
	hero: {
		eyebrow: string;
		titleHtml: string;
		lede: string;
		ctaPrimary: Link;
		ctaGhost: Link;
		meta: { num: string; text: string }[];
		sig: { name: string; sub: string };
	};
	marquee: string[];
	areas: {
		id: string;
		label: string;
		titleHtml: string;
		items: { num: string; title: string; desc: string; list: string[] }[];
	};
	profile: {
		id: string;
		label: string;
		titleHtml: string;
		photoAlt: string;
		name: string;
		role: string;
		paragraphs: string[];
		facts: { dt: string; dd: string }[];
	};
	approach: {
		id: string;
		label: string;
		titleHtml: string;
		items: { num: string; title: string; text: string }[];
	};
	process: {
		id: string;
		label: string;
		titleHtml: string;
		lede: string;
		steps: { title: string; text: string }[];
	};
	contact: {
		id: string;
		label: string;
		titleHtml: string;
		intro: string;
		details: { dt: string; type: 'email' | 'phone' | 'whatsapp' | 'text'; text?: string }[];
		whatsappLabel: string;
		calendly: { label: string; note: string };
		form: {
			name: string;
			email: string;
			phone: string;
			area: string;
			areaPlaceholder: string;
			areaOptions: { value: string; label: string }[];
			message: string;
			hpLabel: string;
			privacyHtml: string;
			submit: string;
		};
	};
	footer: {
		taglineHtml: string;
		navAria: string;
		columns: { title: string; links: Link[] }[];
		rights: string;
		bottomLinks: Link[];
	};
	waFloatAria: string;
	privacyUrl: string;
}

export const content: Record<Locale, SiteContent> = {
	es: {
		meta: {
			htmlLang: 'es-CL',
			title: 'Humana Legal — Derecho migratorio y derechos humanos | Tamara López González, abogada',
			description:
				'Estudio jurídico enfocado en derecho migratorio y derechos humanos. Atención presencial en la Región de Valparaíso y online en todo Chile.',
			keywords:
				'abogada migratoria, derecho migratorio Chile, visas y residencias, nacionalización, reunificación familiar, recursos de protección, recursos de amparo, expulsión, refugio, derechos humanos, Valparaíso, Humana Legal, Tamara López',
			robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
			ogLocale: 'es_CL',
			ogLocaleAlt: 'en_US',
			ogTitle: 'Humana Legal — El derecho, más humano.',
			ogDescription:
				'Estudio jurídico enfocado en derecho migratorio y derechos humanos. Región de Valparaíso · Online en todo Chile.',
			twitterDescription: 'Derecho migratorio y derechos humanos. Valparaíso y online en todo Chile.',
		},
		nav: {
			brandAria: 'Humana Legal — Inicio',
			sub: 'Derecho migratorio · DDHH',
			menuAria: 'Navegación principal',
			links: [
				{ href: '#areas', label: 'Áreas' },
				{ href: '#perfil', label: 'Perfil' },
				{ href: '#enfoque', label: 'Enfoque' },
				{ href: '#proceso', label: 'Proceso' },
				{ href: '/blog/', label: 'Blog' },
				{ href: '#contacto', label: 'Contacto' },
			],
			mobileLinks: [
				{ href: '#areas', label: 'Áreas de práctica' },
				{ href: '#perfil', label: 'Perfil profesional' },
				{ href: '#enfoque', label: 'Enfoque' },
				{ href: '#proceso', label: 'Proceso' },
				{ href: '/blog/', label: 'Blog' },
				{ href: '#contacto', label: 'Contacto' },
			],
			langSwitch: { href: '/en/', code: 'EN', aria: 'English version', hreflang: 'en' },
			mobileLangSwitch: { href: '/en/', label: 'English', hreflang: 'en' },
			cta: { href: '#contacto', label: 'Agendar' },
			toggleAria: 'Abrir menú',
		},
		hero: {
			eyebrow: 'Estudio jurídico · Región de Valparaíso · Online en todo Chile',
			titleHtml: 'El derecho,<br />\n      <em>más humano.</em>',
			lede: 'Asesoría y litigación en derecho migratorio y derechos humanos. Acompañamos a personas, familias, empresas e instituciones en las distintas dimensiones del derecho que se entrelazan en cada caso migratorio, como la civil, la de familia o la laboral.',
			ctaPrimary: { href: '#contacto', label: 'Agendar primera consulta' },
			ctaGhost: { href: '#areas', label: 'Conocer áreas de práctica →' },
			meta: [
				{ num: 'i.', text: 'Experiencia en derecho migratorio' },
				{ num: 'ii.', text: 'Valparaíso y online en todo Chile' },
				{ num: 'iii.', text: 'Atención en español e inglés' },
			],
			sig: { name: 'humana legal', sub: 'Por Tamara López González · Abogada' },
		},
		marquee: ['Rigor técnico', 'Trato humano', 'Estrategia', 'Confidencialidad', 'Vocación'],
		areas: {
			id: 'areas',
			label: 'Áreas de práctica',
			titleHtml: 'Derecho migratorio, <em>de principio a fin.</em>',
			items: [
				{
					num: 'i.',
					title: 'Residencias y nacionalización',
					desc: 'Acompañamiento integral en la gestión de permisos migratorios, desde la postulación hasta su obtención.',
					list: [
						'Residencia temporal: reunificación familiar, actividades remuneradas, razones humanitarias',
						'Residencia definitiva',
						'Nacionalización y reconocimiento de ciudadanía',
						'Asesoría a empresas, inversionistas e instituciones que contratan o reciben extranjeros',
					],
				},
				{
					num: 'ii.',
					title: 'Defensa administrativa y judicial',
					desc: 'Representación frente a resoluciones adversas, sanciones y órdenes que afectan la permanencia en Chile.',
					list: [
						'Recursos administrativos y descargos en procedimientos sancionatorios',
						'Cálculo y reclamo de multas por irregularidad migratoria',
						'Recursos de protección por rechazo o archivo de solicitudes de residencia',
						'Recursos de amparo frente a órdenes de expulsión y abandono',
						'Recursos de reclamación judicial',
					],
				},
				{
					num: 'iii.',
					title: 'Protección y derechos humanos',
					desc: 'Defensa de personas migrantes en situación de vulnerabilidad, con enfoque de derechos humanos y sensible al contexto.',
					list: [
						'Solicitudes de refugio',
						'Víctimas de delitos: trata y tráfico de personas',
						'Casos con enfoque de género y violencia de género',
						'Niñez y adolescencia migrante',
						'Litigio estratégico y asesoría a organizaciones',
					],
				},
			],
		},
		profile: {
			id: 'perfil',
			label: 'Perfil profesional',
			titleHtml: 'Trayectoria interdisciplinaria,<br /><em>vocación de servicio.</em>',
			photoAlt: 'Tamara López González, abogada de Humana Legal',
			name: 'Tamara López González',
			role: 'Abogada',
			paragraphs: [
				'Soy abogada, licenciada en Ciencias Jurídicas y Sociales por la Universidad de Las Américas, con experiencia en derecho migratorio.',
				'Mi interés por los derechos humanos y la protección de personas vulnerables no comenzó en un aula: se formó trabajando directamente con comunidades, como voluntaria en Trabajos Voluntarios UC y en la dirigencia estudiantil de la Universidad Católica, donde obtuve mi primer título como periodista. Esa convicción guió después mi paso por el SENAME, donde fui asesora de la Dirección Nacional y jefa de la Unidad de Estudios, y se profundizó con mi formación en Global Competitiveness Leadership en Georgetown University.',
				'Hoy, ya titulada como abogada y con experiencia en derecho migratorio, cuento con las herramientas jurídicas para seguir trabajando en lo que siempre me ha importado: que el derecho funcione para las personas. Esa es la razón de ser de Humana Legal.',
			],
			facts: [
				{
					dt: 'Formación jurídica',
					dd: 'Licenciada en Ciencias Jurídicas y Sociales con Distinción Máxima, Universidad de Las Américas (2023). Premio a la Excelencia Académica «Rector Mario Albornoz Galdámez», mejor alumna de su promoción.',
				},
				{
					dt: 'Formación previa',
					dd: 'Periodista, Pontificia Universidad Católica de Chile · Magíster en Comunicación Política, Universidad de Chile · Diplomado en Globalización, Liderazgo y Competitividad (GCL), Georgetown University · Diplomado en Políticas Públicas y Gerencia Social, FLACSO Chile',
				},
				{
					dt: 'Formación continua',
					dd: 'Curso de aplicación del debido proceso en los procedimientos administrativos, Centro de Formación de la Corte Interamericana de Derechos Humanos (2026)',
				},
				{
					dt: 'Experiencia',
					dd: 'Asesora de la Dirección Nacional y jefa de la Unidad de Estudios, SENAME · Práctica profesional en la Corporación de Asistencia Judicial de Valparaíso, Segunda Instancia, Unidad de Migrantes',
				},
				{ dt: 'Idiomas', dd: 'Español (nativo) · Inglés (avanzado)' },
			],
		},
		approach: {
			id: 'enfoque',
			label: 'Enfoque',
			titleHtml: 'Cada caso es una historia.<br />\n      <em>Cada estrategia, una solución a medida.</em>',
			items: [
				{
					num: 'i.',
					title: 'Diagnóstico riguroso',
					text: 'Revisamos antecedentes en profundidad antes de proponer una estrategia. Nunca damos por obvio lo que merece ser estudiado.',
				},
				{
					num: 'ii.',
					title: 'Claridad al comunicar',
					text: 'Explicamos el derecho en lenguaje humano. Usted siempre sabrá qué está pasando con su caso y por qué.',
				},
				{
					num: 'iii.',
					title: 'Mirada interdisciplinaria',
					text: 'Un caso migratorio rara vez es solo jurídico. Lo abordamos también desde la comunicación y el contexto institucional de quien decide.',
				},
				{
					num: 'iv.',
					title: 'Confidencialidad absoluta',
					text: 'Todo lo que conversamos queda bajo secreto profesional. Manejamos la información con la discreción que usted espera.',
				},
			],
		},
		process: {
			id: 'proceso',
			label: 'Proceso',
			titleHtml: 'Cómo trabajamos, <em>paso a paso.</em>',
			lede: 'En cada caso, un método claro. Desde la primera reunión y a lo largo de todo el proceso, usted siempre sabrá en qué etapa estamos y por qué.',
			steps: [
				{
					title: 'i. Diagnóstico',
					text: 'Sesión inicial para entender hechos, antecedentes, objetivos y plazos del caso.',
				},
				{
					title: 'ii. Propuesta',
					text: 'Plan de trabajo con estrategia jurídica, etapas, plazos y modalidad de honorarios.',
				},
				{
					title: 'iii. Ejecución',
					text: 'Trabajo riguroso, reportes periódicos y comunicación directa en cada hito.',
				},
				{
					title: 'iv. Seguimiento',
					text: 'Resultado entregado, documentación organizada y acompañamiento posterior según las necesidades del caso.',
				},
			],
		},
		contact: {
			id: 'contacto',
			label: 'Contacto',
			titleHtml: 'Conversemos <em>sobre su caso.</em>',
			intro: 'Escriba, llame o agende directamente. Respondemos dentro de las próximas 24 horas hábiles. Contamos con modalidades pro bono y tarifas diferenciadas para casos que lo requieran.',
			details: [
				{ dt: 'Correo', type: 'email' },
				{ dt: 'Teléfono', type: 'phone' },
				{ dt: 'WhatsApp', type: 'whatsapp' },
				{ dt: 'Horario', type: 'text', text: 'Lunes a viernes · 09:00 — 18:00' },
				{
					dt: 'Zonas de atención',
					type: 'text',
					text: 'Región de Valparaíso (presencial) · Todo Chile (online)',
				},
			],
			whatsappLabel: 'Iniciar conversación',
			calendly: { label: 'Agendar en calendario →', note: 'Integración Calendly (pendiente de URL)' },
			form: {
				name: 'Nombre completo',
				email: 'Correo electrónico',
				phone: 'Teléfono (opcional)',
				area: 'Área de interés',
				areaPlaceholder: 'Seleccione un área',
				areaOptions: [
					{ value: 'residencias', label: 'Residencias y nacionalización' },
					{ value: 'defensa', label: 'Defensa administrativa o judicial' },
					{ value: 'ddhh', label: 'Protección y derechos humanos' },
					{ value: 'empresas', label: 'Empresas e instituciones' },
					{ value: 'otro', label: 'Otro / No estoy seguro' },
				],
				message: 'Cuéntenos brevemente su caso',
				hpLabel: 'No completar',
				privacyHtml:
					'He leído y acepto la <a href="/privacidad.html">política de privacidad</a>.',
				submit: 'Enviar mensaje',
			},
		},
		footer: {
			taglineHtml: 'El derecho, más humano.<br />Por Tamara López González, abogada.',
			navAria: 'Navegación secundaria',
			columns: [
				{
					title: 'Navegación',
					links: [
						{ href: '#areas', label: 'Áreas' },
						{ href: '#perfil', label: 'Perfil' },
						{ href: '#enfoque', label: 'Enfoque' },
						{ href: '/blog/', label: 'Blog' },
						{ href: '#contacto', label: 'Contacto' },
					],
				},
				{
					title: 'Áreas',
					links: [
						{ href: '#areas', label: 'Residencias y nacionalización' },
						{ href: '#areas', label: 'Defensa administrativa y judicial' },
						{ href: '#areas', label: 'Protección y derechos humanos' },
					],
				},
			],
			rights: 'Humana Legal · Tamara López González. Todos los derechos reservados.',
			bottomLinks: [
				{ href: '/privacidad.html', label: 'Política de privacidad' },
				{ href: '/en/', label: 'English' },
			],
		},
		waFloatAria: 'Escribir por WhatsApp',
		privacyUrl: '/privacidad.html',
	},
	en: {
		meta: {
			htmlLang: 'en',
			title: 'Humana Legal — Immigration & Human Rights Law | Tamara López González, Attorney',
			description:
				'Boutique law practice focused on immigration and human rights law. In-person in the Valparaíso Region and online across Chile.',
			keywords:
				'immigration lawyer Chile, visas and residency, naturalization, family reunification, protection writ, amparo, deportation, asylum, human rights, Valparaíso, Humana Legal, Tamara López',
			robots: 'index, follow, max-snippet:-1, max-image-preview:large',
			ogLocale: 'en_US',
			ogLocaleAlt: 'es_CL',
			ogTitle: 'Humana Legal — The law, more human.',
			ogDescription:
				'Boutique law practice focused on immigration and human rights law. Valparaíso Region · Online across Chile.',
			twitterDescription: 'Immigration and human rights law. Valparaíso and online across Chile.',
		},
		nav: {
			brandAria: 'Humana Legal — Home',
			sub: 'Immigration · Human Rights',
			menuAria: 'Main navigation',
			links: [
				{ href: '#practice', label: 'Practice' },
				{ href: '#profile', label: 'Profile' },
				{ href: '#approach', label: 'Approach' },
				{ href: '#process', label: 'Process' },
				{ href: '/en/blog/', label: 'Blog' },
				{ href: '#contact', label: 'Contact' },
			],
			mobileLinks: [
				{ href: '#practice', label: 'Practice areas' },
				{ href: '#profile', label: 'Profile' },
				{ href: '#approach', label: 'Approach' },
				{ href: '#process', label: 'Process' },
				{ href: '/en/blog/', label: 'Blog' },
				{ href: '#contact', label: 'Contact' },
			],
			langSwitch: { href: '/', code: 'ES', aria: 'Versión en español', hreflang: 'es' },
			mobileLangSwitch: { href: '/', label: 'Español', hreflang: 'es' },
			cta: { href: '#contact', label: 'Schedule' },
			toggleAria: 'Open menu',
		},
		hero: {
			eyebrow: 'Law practice · Valparaíso Region · Online across Chile',
			titleHtml: 'The law,<br />\n      <em>more human.</em>',
			lede: 'Counsel and litigation in immigration and human rights law. We support individuals, families, companies and institutions across the different areas of law that intertwine in every immigration case, such as civil, family and labor law.',
			ctaPrimary: { href: '#contact', label: 'Schedule first consultation' },
			ctaGhost: { href: '#practice', label: 'Explore practice areas →' },
			meta: [
				{ num: 'i.', text: 'Experience in immigration law' },
				{ num: 'ii.', text: 'Valparaíso & online across Chile' },
				{ num: 'iii.', text: 'Service in English & Spanish' },
			],
			sig: { name: 'humana legal', sub: 'By Tamara López González · Attorney' },
		},
		marquee: ['Technical rigor', 'Human approach', 'Strategy', 'Confidentiality', 'Vocation'],
		areas: {
			id: 'practice',
			label: 'Practice areas',
			titleHtml: 'Immigration law, <em>from start to finish.</em>',
			items: [
				{
					num: 'i.',
					title: 'Residency & naturalization',
					desc: 'Full support through immigration permits, from application to approval.',
					list: [
						'Temporary residency: family reunification, paid activities, humanitarian grounds',
						'Permanent residency',
						'Naturalization and recognition of citizenship',
						'Counsel to companies, investors and institutions that hire or host foreign nationals',
					],
				},
				{
					num: 'ii.',
					title: 'Administrative & judicial defense',
					desc: 'Representation against adverse rulings, sanctions and orders affecting the right to remain in Chile.',
					list: [
						'Administrative appeals and submissions in sanctioning proceedings',
						'Assessment and challenge of fines for immigration irregularities',
						'Protection writs against rejection or shelving of residency applications',
						'Amparo writs against deportation and departure orders',
						'Judicial review claims',
					],
				},
				{
					num: 'iii.',
					title: 'Protection & human rights',
					desc: 'Defense of migrants in vulnerable situations, with a human-rights focus attuned to context.',
					list: [
						'Asylum applications',
						'Victims of crime: human trafficking and smuggling',
						'Gender-focused matters and gender-based violence',
						'Migrant children and adolescents',
						'Strategic litigation and counsel to organizations',
					],
				},
			],
		},
		profile: {
			id: 'profile',
			label: 'Professional profile',
			titleHtml: 'Interdisciplinary path,<br /><em>a calling to serve.</em>',
			photoAlt: 'Tamara López González, attorney at Humana Legal',
			name: 'Tamara López González',
			role: 'Attorney',
			paragraphs: [
				'I am an attorney with a law degree (Licenciada en Ciencias Jurídicas y Sociales) from Universidad de Las Américas, with experience in immigration law.',
				'My commitment to human rights and the protection of vulnerable people did not begin in a classroom: it took shape working directly with communities, as a volunteer at Trabajos Voluntarios UC and in student leadership at the Catholic University, where I earned my first degree, in journalism. That conviction later guided my work at SENAME, where I served as adviser to the National Directorate and head of the Studies Unit, and it deepened through my Global Competitiveness Leadership training at Georgetown University.',
				'Today, as an attorney with experience in immigration law, I have the legal tools to keep working on what has always mattered to me: making the law work for people. That is the reason Humana Legal exists.',
			],
			facts: [
				{
					dt: 'Legal education',
					dd: 'Law degree with Highest Distinction, Universidad de Las Américas (2023). “Rector Mario Albornoz Galdámez” Academic Excellence Award, top of her graduating class.',
				},
				{
					dt: 'Prior education',
					dd: 'Journalism, Pontifical Catholic University of Chile · Master’s in Political Communication, University of Chile · Diploma in Globalization, Leadership & Competitiveness (GCL), Georgetown University · Diploma in Public Policy and Social Management, FLACSO Chile',
				},
				{
					dt: 'Continuing education',
					dd: 'Course on due process in administrative proceedings, Training Center of the Inter-American Court of Human Rights (2026)',
				},
				{
					dt: 'Experience',
					dd: 'Adviser to the National Directorate and head of the Studies Unit, SENAME · Internship at the Valparaíso Judicial Assistance Corporation (CAJ), Second Instance, Migrants Unit',
				},
				{ dt: 'Languages', dd: 'Spanish (native) · English (advanced)' },
			],
		},
		approach: {
			id: 'approach',
			label: 'Approach',
			titleHtml: 'Every case is a story.<br />\n      <em>Every strategy, a tailored solution.</em>',
			items: [
				{
					num: 'i.',
					title: 'Rigorous diagnosis',
					text: 'We review the record in depth before proposing a strategy. Nothing worth studying is taken for granted.',
				},
				{
					num: 'ii.',
					title: 'Clear communication',
					text: 'We explain the law in human terms. You will always know where your case stands and why.',
				},
				{
					num: 'iii.',
					title: 'Interdisciplinary lens',
					text: 'An immigration matter is rarely just legal. We also assess it through communications and the institutional context of the decision-maker.',
				},
				{
					num: 'iv.',
					title: 'Full confidentiality',
					text: 'Everything we discuss remains under professional privilege, handled with the discretion you expect.',
				},
			],
		},
		process: {
			id: 'process',
			label: 'Process',
			titleHtml: 'How we work, <em>step by step.</em>',
			lede: "Every case, a clear method. From the first meeting and throughout the entire process, you'll always know where we are and why.",
			steps: [
				{
					title: 'i. Assessment',
					text: 'Initial session to understand facts, background, goals and timelines of the matter.',
				},
				{
					title: 'ii. Proposal',
					text: 'Work plan with legal strategy, stages, timelines and fee structure.',
				},
				{
					title: 'iii. Execution',
					text: 'Rigorous work, regular reports and direct communication at every milestone.',
				},
				{
					title: 'iv. Follow-up',
					text: 'Final delivery, organized documentation and ongoing support tailored to the needs of the matter.',
				},
			],
		},
		contact: {
			id: 'contact',
			label: 'Contact',
			titleHtml: "Let's discuss <em>your case.</em>",
			intro: 'Write, call or schedule directly. We respond within 24 business hours. We offer pro bono and reduced-fee arrangements for cases that warrant them.',
			details: [
				{ dt: 'Email', type: 'email' },
				{ dt: 'Phone', type: 'phone' },
				{ dt: 'WhatsApp', type: 'whatsapp' },
				{ dt: 'Hours', type: 'text', text: 'Monday to Friday · 09:00 — 18:00 (CLT)' },
				{
					dt: 'Service area',
					type: 'text',
					text: 'Valparaíso Region (in person) · All Chile (online)',
				},
			],
			whatsappLabel: 'Start a conversation',
			calendly: { label: 'Schedule on calendar →', note: 'Calendly integration (pending URL)' },
			form: {
				name: 'Full name',
				email: 'Email',
				phone: 'Phone (optional)',
				area: 'Area of interest',
				areaPlaceholder: 'Select an area',
				areaOptions: [
					{ value: 'residency', label: 'Residency & naturalization' },
					{ value: 'defense', label: 'Administrative or judicial defense' },
					{ value: 'humanrights', label: 'Protection & human rights' },
					{ value: 'business', label: 'Companies & institutions' },
					{ value: 'other', label: 'Other / Not sure' },
				],
				message: 'Briefly describe your matter',
				hpLabel: 'Do not fill',
				privacyHtml: 'I have read and accept the <a href="/en/privacy.html">privacy policy</a>.',
				submit: 'Send message',
			},
		},
		footer: {
			taglineHtml: 'The law, more human.<br />By Tamara López González, attorney.',
			navAria: 'Secondary navigation',
			columns: [
				{
					title: 'Navigation',
					links: [
						{ href: '#practice', label: 'Practice' },
						{ href: '#profile', label: 'Profile' },
						{ href: '#approach', label: 'Approach' },
						{ href: '/en/blog/', label: 'Blog' },
						{ href: '#contact', label: 'Contact' },
					],
				},
				{
					title: 'Areas',
					links: [
						{ href: '#practice', label: 'Residency & naturalization' },
						{ href: '#practice', label: 'Administrative & judicial defense' },
						{ href: '#practice', label: 'Protection & human rights' },
					],
				},
			],
			rights: 'Humana Legal · Tamara López González. All rights reserved.',
			bottomLinks: [
				{ href: '/en/privacy.html', label: 'Privacy' },
				{ href: '/', label: 'Español' },
			],
		},
		waFloatAria: 'Message via WhatsApp',
		privacyUrl: '/en/privacy.html',
	},
};

export function getLocale(currentLocale: string | undefined): Locale {
	return currentLocale === 'en' ? 'en' : 'es';
}
