import { getCurrentUserLikeIds, getMembers } from "@/actions";
import { PaginationComponent } from "@/components";
import type { FiltersParams } from "@/types";
import { MemberCard } from "./components/MemberCard";

interface Props {
	searchParams: Promise<FiltersParams>;
}

export default async function MembersPage({ searchParams }: Props) {
	const { items: members, totalCount } = await getMembers(await searchParams);
	const likeIds = await getCurrentUserLikeIds();
	return (
		<>
			{members.length > 0 && (
				<div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
					{members.map((member) => (
						<MemberCard key={member.userId} member={member} likeIds={likeIds} />
					))}
				</div>
			)}
			{members.length > 0 && <PaginationComponent totalCount={totalCount} />}
			{members.length <= 0 && (
				<div className="flex items-center justify-center h-screen w-full m-auto">
					<h1 className="text-gray-600 text-2xl font-semibold">
						No data to show.
					</h1>
				</div>
			)}
		</>
	);
}
