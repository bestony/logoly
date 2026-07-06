import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { FileRouteTypes } from "@/routeTree.gen";

type AppMenuLinkTo = FileRouteTypes["to"];

export type AppMenuItem =
	| {
			type: "link";
			label: string;
			to: AppMenuLinkTo;
	  }
	| {
			type: "disabled";
			label: string;
	  };

export const defaultMenuItems = [
	{
		type: "link",
		label: "Home",
		to: "/",
	},
	{
		type: "disabled",
		label: "Templates",
	},
	{
		type: "disabled",
		label: "Gallery",
	},
	{
		type: "disabled",
		label: "About",
	},
] as const satisfies ReadonlyArray<AppMenuItem>;

export interface AppMenuProps {
	items?: ReadonlyArray<AppMenuItem>;
}

const menuItemClassName =
	"inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors";

export function AppMenu({ items = defaultMenuItems }: AppMenuProps) {
	return (
		<nav aria-label="Primary navigation">
			<ul className="flex flex-wrap items-center gap-1">
				{items.map((item) => (
					<li key={`${item.type}:${item.label}`}>
						{item.type === "link" ? (
							<Link
								to={item.to}
								activeOptions={{ exact: true }}
								className={cn(
									menuItemClassName,
									"text-muted-foreground hover:bg-accent hover:text-accent-foreground",
								)}
								activeProps={{
									className: "bg-accent text-accent-foreground",
								}}
							>
								{item.label}
							</Link>
						) : (
							<span
								aria-disabled="true"
								className={cn(
									menuItemClassName,
									"cursor-not-allowed text-muted-foreground/55",
								)}
							>
								{item.label}
							</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
