import { useRouter } from "@tanstack/react-router";
import type { JSX } from "react";
import { useEffect, useRef } from "react";

export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-YX7X8HWGB1";

type GoogleAnalyticsHeadScript = JSX.IntrinsicElements["script"];
type GoogleAnalyticsParams = Record<string, unknown>;
type GoogleAnalyticsConsentValue = "granted" | "denied";

export type GoogleAnalyticsConsent = Partial<
	Record<
		"analytics_storage" | "ad_storage" | "ad_user_data" | "ad_personalization",
		GoogleAnalyticsConsentValue
	>
>;

export type GoogleAnalyticsPageviewLocation = {
	origin: string;
	pathname: string;
	search: string;
	title: string;
};

type GtagFunction = (
	command: "config" | "consent" | "event" | "js",
	target: Date | string,
	params?: GoogleAnalyticsParams | GoogleAnalyticsConsent,
) => void;

declare global {
	interface Window {
		dataLayer?: Array<IArguments | unknown[]>;
		gtag?: GtagFunction;
	}
}

function isGoogleAnalyticsEnabled() {
	return import.meta.env.PROD;
}

function isGoogleAnalyticsReady() {
	return typeof window !== "undefined" && typeof window.gtag === "function";
}

function getGoogleAnalyticsBootstrapScript() {
	return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
window.gtag("consent", "default", {
	analytics_storage: "granted",
	ad_storage: "denied",
	ad_user_data: "denied",
	ad_personalization: "denied"
});
window.gtag("js", new Date());
window.gtag("config", "${GOOGLE_ANALYTICS_MEASUREMENT_ID}", { send_page_view: false });
`.trim();
}

export function getGoogleAnalyticsHeadScripts(): Array<GoogleAnalyticsHeadScript> {
	if (!isGoogleAnalyticsEnabled()) {
		return [];
	}

	return [
		{
			async: true,
			src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`,
		},
		{
			children: getGoogleAnalyticsBootstrapScript(),
		},
	];
}

export function trackGoogleAnalyticsEvent(
	eventName: string,
	params: GoogleAnalyticsParams = {},
) {
	if (!eventName || !isGoogleAnalyticsEnabled() || !isGoogleAnalyticsReady()) {
		return;
	}

	window.gtag?.("event", eventName, params);
}

export function setGoogleAnalyticsConsent(consent: GoogleAnalyticsConsent) {
	if (!isGoogleAnalyticsEnabled() || !isGoogleAnalyticsReady()) {
		return;
	}

	window.gtag?.("consent", "update", consent);
}

function getPageKey(pathname: string, search: string) {
	return `${pathname}${search}`;
}

function getCurrentPageviewLocation(): GoogleAnalyticsPageviewLocation | null {
	if (typeof window === "undefined") {
		return null;
	}

	return {
		origin: window.location.origin,
		pathname: window.location.pathname,
		search: window.location.search,
		title: document.title,
	};
}

function createPageviewParams(location: GoogleAnalyticsPageviewLocation) {
	const pagePath = getPageKey(location.pathname, location.search);

	return {
		page_title: location.title,
		page_location: `${location.origin}${pagePath}`,
		page_path: pagePath,
	};
}

export function trackGoogleAnalyticsPageview(
	location: GoogleAnalyticsPageviewLocation | null = getCurrentPageviewLocation(),
) {
	if (!location) {
		return;
	}

	trackGoogleAnalyticsEvent("page_view", createPageviewParams(location));
}

export function GoogleAnalyticsPageviewTracker() {
	const router = useRouter();
	const lastTrackedPageKeyRef = useRef<string | null>(null);

	useEffect(() => {
		if (!isGoogleAnalyticsEnabled() || typeof window === "undefined") {
			return;
		}

		const trackPageview = (location: GoogleAnalyticsPageviewLocation) => {
			const pageKey = getPageKey(location.pathname, location.search);

			if (lastTrackedPageKeyRef.current === pageKey) {
				return;
			}

			lastTrackedPageKeyRef.current = pageKey;
			trackGoogleAnalyticsPageview(location);
		};

		const currentLocation = getCurrentPageviewLocation();

		if (currentLocation) {
			trackPageview(currentLocation);
		}

		return router.subscribe("onResolved", (event) => {
			const searchChanged =
				event.fromLocation?.searchStr !== event.toLocation.searchStr;

			if (!event.pathChanged && !searchChanged) {
				return;
			}

			trackPageview({
				origin: window.location.origin,
				pathname: event.toLocation.pathname,
				search: event.toLocation.searchStr,
				title: document.title,
			});
		});
	}, [router]);

	return null;
}
