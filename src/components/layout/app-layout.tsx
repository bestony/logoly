import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";
import { AppMain } from "./app-main";
import type { AppMenuItem } from "./app-menu";

export interface AppLayoutProps {
	children: ReactNode;
	menuItems?: ReadonlyArray<AppMenuItem>;
	headerActions?: ReactNode;
	footerContent?: ReactNode;
	className?: string;
	mainClassName?: string;
}

export function AppLayout({
	children,
	menuItems,
	headerActions,
	footerContent,
	className,
	mainClassName,
}: AppLayoutProps) {
	return (
		<div
			className={cn(
				"flex min-h-svh flex-col bg-background text-foreground",
				className,
			)}
		>
			<AppHeader actions={headerActions} menuItems={menuItems} />
			<AppMain className={mainClassName}>{children}</AppMain>
			<AppFooter>{footerContent}</AppFooter>
		</div>
	);
}
