import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<section className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-16 text-center sm:py-24">
			<h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
			<p className="mt-4 text-lg">
				Edit <code>src/routes/index.tsx</code> to get started.
			</p>
			<Button variant="yellow">shadcn/ui is ready</Button>
		</section>
	);
}
