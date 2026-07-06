import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AppMainProps {
	children: ReactNode;
	className?: string;
}

export function AppMain({ children, className }: AppMainProps) {
	return (
		<main
			id="main-content"
			className={cn(
				"mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8",
				className,
			)}
		>
			{children}
		</main>
	);
}
