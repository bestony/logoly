import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AppMenu, type AppMenuItem, defaultMenuItems } from "./app-menu";

export interface AppHeaderProps {
	menuItems?: ReadonlyArray<AppMenuItem>;
	actions?: ReactNode;
}

export function AppHeader({
	menuItems = defaultMenuItems,
	actions,
}: AppHeaderProps) {
	return (
		<header className="border-b border-border/70 bg-background/95">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
				<Link
					to="/"
					className="flex w-fit min-w-0 items-center gap-3 rounded-md outline-none transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring/50"
					activeOptions={{ exact: true }}
					aria-label="Logoly home"
				>
					<span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-yellow text-sm font-bold text-black">
						L
					</span>
					<span className="min-w-0">
						<span className="block truncate text-base font-semibold leading-none">
							Logoly
						</span>
						<span className="mt-1 block truncate text-xs text-muted-foreground">
							Logo builder
						</span>
					</span>
				</Link>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:justify-end">
					<AppMenu items={menuItems} />
					{actions ? (
						<div className="flex shrink-0 items-center gap-2">{actions}</div>
					) : null}
				</div>
			</div>
		</header>
	);
}
