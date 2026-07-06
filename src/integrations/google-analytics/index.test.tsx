// @vitest-environment jsdom

import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	GOOGLE_ANALYTICS_MEASUREMENT_ID,
	GoogleAnalyticsPageviewTracker,
	getGoogleAnalyticsHeadScripts,
	setGoogleAnalyticsConsent,
	trackGoogleAnalyticsEvent,
	trackGoogleAnalyticsPageview,
} from "./index";

const routerMocks = vi.hoisted(() => {
	let resolvedHandler:
		| ((event: {
				fromLocation?: { searchStr: string };
				toLocation: {
					pathname: string;
					searchStr: string;
				};
				pathChanged: boolean;
		  }) => void)
		| null = null;

	return {
		getResolvedHandler: () => resolvedHandler,
		subscribe: vi.fn((eventName: string, handler: typeof resolvedHandler) => {
			if (eventName === "onResolved") {
				resolvedHandler = handler;
			}

			return vi.fn();
		}),
		reset: () => {
			resolvedHandler = null;
		},
	};
});

vi.mock("@tanstack/react-router", async () => {
	const actual = await vi.importActual("@tanstack/react-router");

	return {
		...actual,
		useRouter: () => ({
			subscribe: routerMocks.subscribe,
		}),
	};
});

function stubProduction() {
	vi.stubEnv("PROD", true);
	vi.stubEnv("DEV", false);
}

function stubDevelopment() {
	vi.stubEnv("PROD", false);
	vi.stubEnv("DEV", true);
}

describe("google analytics integration", () => {
	beforeEach(() => {
		stubDevelopment();
		routerMocks.reset();
		routerMocks.subscribe.mockClear();
		window.gtag = vi.fn();
		document.title = "Initial title";
		window.history.replaceState({}, "", "/initial?utm=test#ignored");
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.restoreAllMocks();
		delete window.gtag;
		delete window.dataLayer;
	});

	it("does not return head scripts outside production", () => {
		expect(getGoogleAnalyticsHeadScripts()).toEqual([]);
	});

	it("returns gtag scripts with consent default and disabled default pageview in production", () => {
		stubProduction();

		const scripts = getGoogleAnalyticsHeadScripts();

		expect(scripts).toHaveLength(2);
		expect(scripts[0]).toMatchObject({
			async: true,
			src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`,
		});
		expect(scripts[1]?.children).toContain("send_page_view: false");
		expect(scripts[1]?.children).toContain('analytics_storage: "granted"');
		expect(scripts[1]?.children).toContain('ad_storage: "denied"');
	});

	it("does not track custom events outside production", () => {
		trackGoogleAnalyticsEvent("select_content", { item_id: "logo" });

		expect(window.gtag).not.toHaveBeenCalled();
	});

	it("does not track custom events without an initialized gtag", () => {
		stubProduction();
		delete window.gtag;

		expect(() =>
			trackGoogleAnalyticsEvent("select_content", { item_id: "logo" }),
		).not.toThrow();
	});

	it("tracks custom events with params in production", () => {
		stubProduction();

		trackGoogleAnalyticsEvent("select_content", { item_id: "logo" });

		expect(window.gtag).toHaveBeenCalledWith("event", "select_content", {
			item_id: "logo",
		});
	});

	it("tracks pageviews with title, location, and path in production", () => {
		stubProduction();
		document.title = "Logo page";

		trackGoogleAnalyticsPageview();

		expect(window.gtag).toHaveBeenCalledWith("event", "page_view", {
			page_title: "Logo page",
			page_location: "http://localhost:3000/initial?utm=test",
			page_path: "/initial?utm=test",
		});
	});

	it("updates consent in production", () => {
		stubProduction();

		setGoogleAnalyticsConsent({ analytics_storage: "denied" });

		expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
			analytics_storage: "denied",
		});
	});

	it("tracks the initial pageview and resolved pathname or search changes", () => {
		stubProduction();

		render(<GoogleAnalyticsPageviewTracker />);

		expect(window.gtag).toHaveBeenCalledWith("event", "page_view", {
			page_title: "Initial title",
			page_location: "http://localhost:3000/initial?utm=test",
			page_path: "/initial?utm=test",
		});

		act(() => {
			routerMocks.getResolvedHandler()?.({
				fromLocation: { searchStr: "?utm=test" },
				toLocation: {
					pathname: "/initial",
					searchStr: "?utm=test",
				},
				pathChanged: false,
			});
		});

		expect(window.gtag).toHaveBeenCalledTimes(1);

		act(() => {
			routerMocks.getResolvedHandler()?.({
				fromLocation: { searchStr: "?utm=test" },
				toLocation: {
					pathname: "/initial",
					searchStr: "?utm=changed",
				},
				pathChanged: false,
			});
		});

		expect(window.gtag).toHaveBeenLastCalledWith("event", "page_view", {
			page_title: "Initial title",
			page_location: "http://localhost:3000/initial?utm=changed",
			page_path: "/initial?utm=changed",
		});

		act(() => {
			routerMocks.getResolvedHandler()?.({
				fromLocation: { searchStr: "?utm=changed" },
				toLocation: {
					pathname: "/about",
					searchStr: "",
				},
				pathChanged: true,
			});
		});

		expect(window.gtag).toHaveBeenLastCalledWith("event", "page_view", {
			page_title: "Initial title",
			page_location: "http://localhost:3000/about",
			page_path: "/about",
		});
	});
});
