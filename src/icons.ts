/*
 * Iconos de trazo fino (paths SVG, viewBox 24) compartidos por el rail del
 * hero y las áreas complementarias. Se insertan con set:html dentro de un
 * <svg> con stroke="currentColor".
 */
export const strokeIcons: Record<string, string> = {
	building:
		'<path d="M3.75 9.25 12 4.25l8.25 5"/><path d="M4.75 9.25h14.5"/><path d="M6.6 12v5.5M10.2 12v5.5M13.8 12v5.5M17.4 12v5.5"/><path d="M4.75 17.5h14.5M3.75 20.25h16.5"/>',
	globe:
		'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.7 5.4 3.7 8.5s-1.3 6-3.7 8.5c-2.4-2.5-3.7-5.4-3.7-8.5S9.6 6 12 3.5z"/>',
	contract:
		'<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/><path d="M9.5 12h5M9.5 15h3.5"/>',
	family:
		'<circle cx="8" cy="7.4" r="2.4"/><circle cx="16" cy="7.4" r="2.4"/><path d="M3.6 19.5v-.9c0-2.5 1.9-4.4 4.4-4.4 1 0 1.9.3 2.6.9M20.4 19.5v-.9c0-2.5-1.9-4.4-4.4-4.4-1 0-1.9.3-2.6.9"/><circle cx="12" cy="13.6" r="1.9"/><path d="M9 19.5c0-1.8 1.3-3.2 3-3.2s3 1.4 3 3.2"/>',
	briefcase:
		'<rect x="3.5" y="7.5" width="17" height="12.5" rx="1.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17"/>',
	scale:
		'<path d="M12 4.5v15M8.75 19.5h6.5M4.75 7h14.5"/><path d="M4.75 7 2.4 12.05m4.7 0L4.75 7M2.4 12.05a2.35 2.35 0 0 0 4.7 0"/><path d="M19.25 7l-2.35 5.05m4.7 0L19.25 7m-2.35 5.05a2.35 2.35 0 0 0 4.7 0"/>',
};
