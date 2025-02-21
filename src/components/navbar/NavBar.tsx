import { getUserInfoForNav } from "@/actions";
import { auth } from "@/auth";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";
import { FiltersWrapper } from "../filters/FiltersWrapper";
import { Button } from "../ui/button";
import { NavItem } from "./NavItem";
import { UserMenu } from "./UserMenu";

export const NavBar = async () => {
	const session = await auth();
	const userInfo = session?.user && (await getUserInfoForNav());
	const userRoutes = [
		{
			label: "Members",
			href: "/members",
		},
		{
			label: "Matches",
			href: "/lists",
		},
		{
			label: "Messages",
			href: "/messages",
		},
	];
	const adminRoutes = [
		{
			label: "Moderation",
			href: "/admin/moderation",
		},
	];

	const navBarRoutes =
		session?.user?.role === "ADMIN" ? adminRoutes : userRoutes;

	return (
		<>
			<nav className="w-full py-2 px-6 bg-gradient-to-r from-pink-400 via-red-400 to-pink-600">
				<div className="flex justify-between items-center 2xl:w-[1350px] 2xl:mx-auto text-white ">
					<div>
						<Link href={"/"} className="flex items-center gap-1">
							<GiSelfLove size={40} className="text-gray-200" />
							<h1 className="font-bold text-3xl text-gray-200">Neinter</h1>
						</Link>
					</div>

					<div className="hidden md:flex md:items-center md:gap-4">
						{navBarRoutes.map((route, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<NavItem key={index} {...route} />
						))}
					</div>
					{userInfo && <UserMenu user={userInfo} />}
					{!userInfo && (
						<div className="flex items-center gap-4">
							<Link href={"/login"}>
								<Button variant="outline" className="text-black">
									Login
								</Button>
							</Link>
							<Link href={"/register"}>
								<Button variant="outline" className="text-black">
									Register
								</Button>
							</Link>
						</div>
					)}
				</div>
			</nav>
			{userInfo && <FiltersWrapper />}
		</>
	);
};
