/*
 * Todo el copy del sitio. Una sola fuente para ambos idiomas.
 * Los campos *Html admiten marcado (em, br) y se renderizan con set:html.
 *
 * Voz: "nosotros" (Humana Legal) en áreas, proceso y contacto;
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
		ledeHtml: string;
		ctaPrimary: Link;
		ctaGhost: Link;
		/* Rail de dimensiones del derecho (espejo del banner de RRSS). */
		rail: {
			aria: string;
			items: {
				icon: 'building' | 'globe' | 'contract' | 'family' | 'briefcase' | 'scale';
				label: string;
				href: string;
			}[];
		};
	};
	marquee: string[];
	areas: {
		id: string;
		label: string;
		titleHtml: string;
		/* El id opcional de cada tarjeta sirve de ancla para el rail del hero. */
		items: { id?: string; num: string; title: string; desc: string; list: string[] }[];
	};
	/* Áreas complementarias (civil, familia, laboral), destino de los ítems del rail. */
	dimensions: {
		id: string;
		label: string;
		titleHtml: string;
		lede: string;
		items: {
			id: string;
			icon: 'contract' | 'family' | 'briefcase';
			title: string;
			desc: string;
			list: string[];
		}[];
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
		/* El bloque solo se muestra cuando CALENDLY_URL está configurada. */
		calendly: { label: string };
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
				{ href: '#dimensiones', label: 'Otras áreas' },
				{ href: '#perfil', label: 'Perfil' },
				{ href: '#proceso', label: 'Proceso' },
				{ href: '/blog/', label: 'Blog' },
				{ href: '#contacto', label: 'Contacto' },
			],
			mobileLinks: [
				{ href: '#areas', label: 'Áreas de práctica' },
				{ href: '#dimensiones', label: 'Otras áreas' },
				{ href: '#perfil', label: 'Perfil profesional' },
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
			ledeHtml:
				'<span class="hero__lede-lead">Asesoría y litigación en <em>derecho migratorio</em>.</span> Acompañamos a personas migrantes y empresas en las distintas dimensiones del derecho: <em>administrativo, civil, familia, laboral y penal</em>. Abordamos cada caso con todas las herramientas legales que sean necesarias.',
			ctaPrimary: { href: '#contacto', label: 'Agendar primera consulta' },
			ctaGhost: { href: '#areas', label: 'Conocer áreas de práctica →' },
			rail: {
				aria: 'Dimensiones del derecho',
				items: [
					{ icon: 'building', label: 'Derecho administrativo', href: '#administrativo' },
					{ icon: 'contract', label: 'Derecho civil', href: '#civil' },
					{ icon: 'family', label: 'Derecho de familia', href: '#familia' },
					{ icon: 'briefcase', label: 'Derecho laboral', href: '#laboral' },
					{ icon: 'scale', label: 'Derecho penal', href: '#penal' },
				],
			},
		},
		marquee: ['Rigor técnico', 'Trato humano', 'Estrategia', 'Confidencialidad', 'Vocación'],
		areas: {
			id: 'areas',
			label: 'Áreas de práctica',
			titleHtml: 'Derecho migratorio, <em>de principio a fin.</em>',
			items: [
				{
					id: 'administrativo',
					num: 'i.',
					title: 'Procedimientos administrativos',
					desc: 'Acompañamiento integral en permisos migratorios, desde la postulación hasta su obtención.',
					list: [
						'Residencia temporal y definitiva: reunificación familiar, trabajo, razones humanitarias',
						'Nacionalización y reconocimiento de ciudadanía',
						'Solicitudes de refugio',
						'Asesoría a empresas e instituciones que contratan personas extranjeras',
					],
				},
				{
					num: 'ii.',
					title: 'Defensa judicial migratoria',
					desc: 'Representación frente a resoluciones adversas, sanciones y órdenes que afectan la permanencia en Chile.',
					list: [
						'Recursos administrativos, descargos y reclamo de multas migratorias',
						'Recursos de protección y reclamación judicial por rechazo o archivo de solicitudes',
						'Recursos de amparo frente a órdenes de expulsión y abandono',
					],
				},
				{
					id: 'penal',
					num: 'iii.',
					/* Punteo y bajada pendientes: Tamara enviará el texto para Derecho penal. */
					title: 'Derecho penal',
					desc: 'Defensa de personas migrantes en situación de vulnerabilidad, con enfoque de derechos humanos.',
					list: [
						'Trata de personas, violencia de género, niñez y adolescencia migrante',
						'Litigio estratégico y asesoría a organizaciones',
					],
				},
			],
		},
		dimensions: {
			id: 'dimensiones',
			label: 'Otras áreas',
			titleHtml: 'Un mismo caso, <em>varias dimensiones.</em>',
			lede: 'La vida de una persona rara vez cabe en una sola rama del derecho. Estas áreas complementan nuestro trabajo migratorio y también se atienden de manera independiente.',
			items: [
				{
					id: 'civil',
					icon: 'contract',
					title: 'Derecho civil',
					desc: 'Asesoría y representación en las relaciones jurídicas entre particulares.',
					list: [
						'Contratos: redacción, revisión y cumplimiento',
						'Arrendamientos y conflictos entre particulares',
						'Indemnización de perjuicios y cobranza',
					],
				},
				{
					id: 'familia',
					icon: 'family',
					title: 'Derecho de familia',
					desc: 'Acompañamiento cercano en los asuntos que tocan la vida familiar, también cuando cruzan fronteras.',
					list: [
						'Pensiones de alimentos y compensación económica',
						'Cuidado personal y relación directa y regular',
						'Divorcios y acuerdos de unión civil',
					],
				},
				{
					id: 'laboral',
					icon: 'briefcase',
					title: 'Derecho laboral',
					desc: 'Defensa de los derechos del trabajador y asesoría a quienes contratan personas extranjeras.',
					list: [
						'Despido injustificado y autodespido',
						'Tutela de derechos fundamentales del trabajador',
						'Contratación de personas extranjeras y cumplimiento laboral',
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
				'Soy abogada, Licenciada en Ciencias Jurídicas, con especialización práctica en derecho migratorio y extranjería. Complemento esta base técnica con más de 15 años de experiencia tanto en el sector público como privado, gestionando proyectos en las áreas de Asuntos Públicos y Regulatorios.',
				'Mi interés por los derechos humanos, en general, no comenzó en el aula: se formó trabajando con comunidades, en distintas instancias de voluntariado, como dirigente estudiantil y en mis estudios en el extranjero donde viví la experiencia de ser migrante junto a amigos y compañeros de toda Hispanoamérica. En Chile, pude vivir el servicio público en instancias de gobierno, tanto del Ministerio del Interior como del Ministerio de Justicia, lo que profundizó aún más mi compromiso social.',
				'Hoy cuento con las herramientas jurídicas para seguir trabajando en lo que siempre me ha importado: que el derecho funcione para las personas. Esa es la razón de ser de Humana Legal.',
			],
			facts: [
				{
					dt: 'Formación jurídica',
					dd: 'Licenciada en Ciencias Jurídicas, con distinción máxima · Premio a la excelencia académica «Rector Mario Albornoz Galdámez» y mejor alumna de la promoción',
				},
				{
					dt: 'Formación previa',
					dd: 'Periodista, Pontificia Universidad Católica de Chile · Magíster en Comunicación Política, Universidad de Chile · Diplomados en Georgetown University (GCL) y FLACSO Chile',
				},
				{
					dt: 'Formación continua',
					dd: 'Debido proceso en procedimientos administrativos, Centro de Formación de la Corte Interamericana de Derechos Humanos (2026)',
				},
				{
					dt: 'Experiencia',
					dd: 'Asesora de la Dirección Nacional y jefa de la Unidad de Estudios, SENAME · Práctica profesional en la Unidad de Migrantes, CAJ Valparaíso',
				},
				{ dt: 'Idiomas', dd: 'Español (nativo) · Inglés (avanzado)' },
			],
		},
		process: {
			id: 'proceso',
			label: 'Proceso',
			titleHtml: 'Cómo trabajamos, <em>paso a paso.</em>',
			lede: 'Un método claro en cada caso: usted siempre sabrá en qué etapa estamos y por qué.',
			steps: [
				{
					title: 'i. Diagnóstico',
					text: 'Sesión inicial para entender los hechos, revisar los antecedentes y planificar una estrategia con objetivos y plazos.',
				},
				{
					title: 'ii. Ejecución',
					text: 'Implementación de las acciones legales y/o administrativas que permitan una defensa eficaz de sus derechos, con una mirada interdisciplinaria y táctica.',
				},
				{
					title: 'iii. Seguimiento',
					text: 'Acompañamos de inicio a fin, no solo hasta la dictación de una sentencia judicial o resolución administrativa, sino hasta su cumplimiento efectivo, entregando tranquilidad y seguridad frente a las dudas de todo el proceso.',
				},
			],
		},
		contact: {
			id: 'contacto',
			label: 'Contacto',
			titleHtml: 'Conversemos <em>sobre su caso.</em>',
			intro: 'Escriba, llame o agende directamente: respondemos dentro de 24 horas hábiles. Contamos con modalidades pro bono y tarifas diferenciadas.',
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
			calendly: { label: 'Agendar en calendario →' },
			form: {
				name: 'Nombre completo',
				email: 'Correo electrónico',
				phone: 'Teléfono (opcional)',
				area: 'Área de interés',
				areaPlaceholder: 'Seleccione un área',
				areaOptions: [
					{ value: 'administrativo', label: 'Procedimientos administrativos' },
					{ value: 'judicial', label: 'Defensa judicial migratoria' },
					{ value: 'penal', label: 'Derecho penal' },
					{ value: 'civil', label: 'Derecho civil' },
					{ value: 'familia', label: 'Derecho de familia' },
					{ value: 'laboral', label: 'Derecho laboral' },
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
						{ href: '#proceso', label: 'Proceso' },
						{ href: '/blog/', label: 'Blog' },
						{ href: '#contacto', label: 'Contacto' },
					],
				},
				{
					title: 'Áreas',
					links: [
						{ href: '#administrativo', label: 'Procedimientos administrativos' },
						{ href: '#areas', label: 'Defensa judicial migratoria' },
						{ href: '#penal', label: 'Derecho penal' },
						{ href: '#dimensiones', label: 'Civil, familia y laboral' },
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
				{ href: '#dimensions', label: 'Other areas' },
				{ href: '#profile', label: 'Profile' },
				{ href: '#process', label: 'Process' },
				{ href: '/en/blog/', label: 'Blog' },
				{ href: '#contact', label: 'Contact' },
			],
			mobileLinks: [
				{ href: '#practice', label: 'Practice areas' },
				{ href: '#dimensions', label: 'Other areas' },
				{ href: '#profile', label: 'Profile' },
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
			ledeHtml:
				'<span class="hero__lede-lead">Counsel and litigation in <em>immigration law</em>.</span> We support migrants and companies across the different dimensions of the law: <em>administrative, civil, family, labor and criminal</em>. We approach each case with every legal tool it may require.',
			ctaPrimary: { href: '#contact', label: 'Schedule first consultation' },
			ctaGhost: { href: '#practice', label: 'Explore practice areas →' },
			rail: {
				aria: 'Dimensions of the law',
				items: [
					{ icon: 'building', label: 'Administrative law', href: '#administrative' },
					{ icon: 'contract', label: 'Civil law', href: '#civil' },
					{ icon: 'family', label: 'Family law', href: '#family' },
					{ icon: 'briefcase', label: 'Labor law', href: '#labor' },
					{ icon: 'scale', label: 'Criminal law', href: '#criminal' },
				],
			},
		},
		marquee: ['Technical rigor', 'Human approach', 'Strategy', 'Confidentiality', 'Vocation'],
		areas: {
			id: 'practice',
			label: 'Practice areas',
			titleHtml: 'Immigration law, <em>from start to finish.</em>',
			items: [
				{
					id: 'administrative',
					num: 'i.',
					title: 'Administrative proceedings',
					desc: 'Full support through immigration permits, from application to approval.',
					list: [
						'Temporary and permanent residency: family reunification, work, humanitarian grounds',
						'Naturalization and recognition of citizenship',
						'Asylum applications',
						'Counsel to companies and institutions that hire foreign nationals',
					],
				},
				{
					num: 'ii.',
					title: 'Judicial immigration defense',
					desc: 'Representation against adverse rulings, sanctions and orders affecting the right to remain in Chile.',
					list: [
						'Administrative appeals, defenses and challenges to immigration fines',
						'Protection writs and judicial review against rejected or shelved applications',
						'Amparo writs against deportation and departure orders',
					],
				},
				{
					id: 'criminal',
					num: 'iii.',
					/* Bajada y punteo pendientes: Tamara enviará el texto para Derecho penal. */
					title: 'Criminal law',
					desc: 'Defense of migrants in vulnerable situations, with a human-rights focus.',
					list: [
						'Human trafficking, gender-based violence, migrant children and adolescents',
						'Strategic litigation and counsel to organizations',
					],
				},
			],
		},
		dimensions: {
			id: 'dimensions',
			label: 'Other areas',
			titleHtml: 'One case, <em>many dimensions.</em>',
			lede: 'A person’s life rarely fits within a single branch of the law. These areas complement our immigration work and are also handled on their own.',
			items: [
				{
					id: 'civil',
					icon: 'contract',
					title: 'Civil law',
					desc: 'Counsel and representation in legal matters between private parties.',
					list: [
						'Contracts: drafting, review and enforcement',
						'Leases and disputes between private parties',
						'Damages claims and debt recovery',
					],
				},
				{
					id: 'family',
					icon: 'family',
					title: 'Family law',
					desc: 'Close guidance through the matters that touch family life, including across borders.',
					list: [
						'Child support and economic compensation',
						'Custody and visitation arrangements',
						'Divorce and civil union agreements',
					],
				},
				{
					id: 'labor',
					icon: 'briefcase',
					title: 'Labor law',
					desc: 'Defense of workers’ rights and counsel for those who hire foreign nationals.',
					list: [
						'Unjustified dismissal and constructive dismissal',
						'Protection of fundamental rights at work',
						'Hiring foreign workers and labor compliance',
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
				'I am an attorney with a law degree (Licenciada en Ciencias Jurídicas) and hands-on specialization in immigration law. I complement this technical foundation with over 15 years of experience in both the public and private sectors, managing projects in Public and Regulatory Affairs.',
				'My interest in human rights did not begin in a classroom: it took shape working with communities, through volunteer work, as a student leader, and during my studies abroad, where I lived the experience of being a migrant alongside friends and classmates from across Hispanic America. In Chile, I served in government at both the Ministry of the Interior and the Ministry of Justice, which deepened my social commitment even further.',
				'Today I have the legal tools to keep working on what has always mattered to me: making the law work for people. That is the reason Humana Legal exists.',
			],
			facts: [
				{
					dt: 'Legal education',
					dd: 'Law degree with highest distinction · “Rector Mario Albornoz Galdámez” Academic Excellence Award, top of her graduating class',
				},
				{
					dt: 'Prior education',
					dd: 'Journalism, Pontifical Catholic University of Chile · Master’s in Political Communication, University of Chile · Diplomas from Georgetown University (GCL) and FLACSO Chile',
				},
				{
					dt: 'Continuing education',
					dd: 'Due process in administrative proceedings, Training Center of the Inter-American Court of Human Rights (2026)',
				},
				{
					dt: 'Experience',
					dd: 'Adviser to the National Directorate and head of the Studies Unit, SENAME · Internship at the Migrants Unit, Valparaíso Judicial Assistance Corporation (CAJ)',
				},
				{ dt: 'Languages', dd: 'Spanish (native) · English (advanced)' },
			],
		},
		process: {
			id: 'process',
			label: 'Process',
			titleHtml: 'How we work, <em>step by step.</em>',
			lede: "A clear method for every case: you'll always know where we stand and why.",
			steps: [
				{
					title: 'i. Assessment',
					text: 'Initial session to understand the facts, review the record and plan a strategy with clear goals and timelines.',
				},
				{
					title: 'ii. Execution',
					text: 'Implementation of the legal and/or administrative actions needed to defend your rights effectively, with an interdisciplinary and tactical approach.',
				},
				{
					title: 'iii. Follow-up',
					text: 'We stay with you from start to finish: not only until a court ruling or administrative decision is issued, but until it is effectively enforced — bringing peace of mind through every doubt along the way.',
				},
			],
		},
		contact: {
			id: 'contact',
			label: 'Contact',
			titleHtml: "Let's discuss <em>your case.</em>",
			intro: 'Write, call or schedule directly: we respond within 24 business hours. Pro bono and reduced-fee arrangements are available.',
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
			calendly: { label: 'Schedule on calendar →' },
			form: {
				name: 'Full name',
				email: 'Email',
				phone: 'Phone (optional)',
				area: 'Area of interest',
				areaPlaceholder: 'Select an area',
				areaOptions: [
					{ value: 'administrative', label: 'Administrative proceedings' },
					{ value: 'judicial', label: 'Judicial immigration defense' },
					{ value: 'criminal', label: 'Criminal law' },
					{ value: 'civil', label: 'Civil law' },
					{ value: 'family', label: 'Family law' },
					{ value: 'labor', label: 'Labor law' },
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
						{ href: '#process', label: 'Process' },
						{ href: '/en/blog/', label: 'Blog' },
						{ href: '#contact', label: 'Contact' },
					],
				},
				{
					title: 'Areas',
					links: [
						{ href: '#administrative', label: 'Administrative proceedings' },
						{ href: '#practice', label: 'Judicial immigration defense' },
						{ href: '#criminal', label: 'Criminal law' },
						{ href: '#dimensions', label: 'Civil, family & labor law' },
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
