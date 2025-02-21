import { NavBar } from "@/components";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main className="flex flex-col min-h-screen">
				<NavBar />
				<div className="flex-grow px-3 sm:px-10 2xl:w-[1400px] 2xl:mx-auto 2xl:my-0">
					{children}
				</div>
			</main>
		</>
	);
}
