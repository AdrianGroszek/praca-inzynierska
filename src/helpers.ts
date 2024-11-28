import { format } from 'date-fns';

// Check which route is active to setupt buttons color render components etc.
export function whichRouteIsActive(
	pathname: string,
	whatIncludes: string
): boolean {
	return pathname.includes(whatIncludes);
}

export function formatEventTime(eventTime: string): string {
	const date = new Date(eventTime);
	return format(date, 'dd.MM.yy HH:mm');
}
