import type { ReactNode } from "react";

export interface AppFooterProps {
	children?: ReactNode;
}

function DefaultFooterContent() {
	return (
		<>
			<p>&copy; {new Date().getFullYear()} Logoly.</p>
			<p>Built with TanStack Start.</p>
		</>
	);
}

export function AppFooter({
	children = <DefaultFooterContent />,
}: AppFooterProps) {
	return (
		<footer className="border-t border-border/70">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				{children}
			</div>
		</footer>
	);
}
