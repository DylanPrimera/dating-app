import { getMemberById } from "@/actions";
import { Card } from "@/components/ui/card";
import { MemberSideBar } from "../components/MemberSideBar";

export default async function MemberDetailLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;
	const memberData = await getMemberById(userId);
	const basePath = `/members/${memberData?.userId}`;
	const navLinks = [
		{
			name: "Profile",
			href: `${basePath}`,
		},
		{
			name: "Photos",
			href: `${basePath}/photos`,
		},
		{
			name: "Chat",
			href: `${basePath}/chat`,
		},
	];
	return (
		<div className="grid grid-cols-12 gap-5 h-[80vh]">
			<div className="col-span-12 md:col-span-3">
				{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
				<MemberSideBar member={memberData!} navLinks={navLinks} />
			</div>
			<div className="col-span-12 md:col-span-9">
				<Card className="w-full mt-10 flex flex-col h-full">{children}</Card>
			</div>
		</div>
	);
}
