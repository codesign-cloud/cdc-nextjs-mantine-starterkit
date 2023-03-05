const AUTH_TOKEN = ''; /* todo: read from encrypted localStorage? */

export type AllowedHttpMethods = 'GET' | 'POST' | 'DELETE';

export const fetchJson = (url: string, method: AllowedHttpMethods= "GET", body?: any) =>
	fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	}).
	then((res) => res.json());

export const fetchWithToken = (url: string, method: AllowedHttpMethods, body?: any) =>
	fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${AUTH_TOKEN}`,
		},
		body: body ? JSON.stringify(body) : undefined,
	}).then((res) => res.json());
