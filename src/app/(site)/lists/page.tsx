import { getCurrentUserLikeIds, getLikedMembers } from "@/actions";
import { ListsTab } from "./components/ListsTab";

interface Props {
	searchParams: Promise<{ type?: string }>;
}

export default async function ListPage({ searchParams }: Props) {
	const { type } = await searchParams;
	const likeIds = await getCurrentUserLikeIds();
	const members = await getLikedMembers(type);
	return (
		<div>
			<ListsTab members={members} likeIds={likeIds} />
		</div>
	);
}
