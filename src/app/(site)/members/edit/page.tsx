import { getAuthUserId, getMemberById } from "@/actions";
import { CardInnerWrapper } from "@/components";
import { EditForm } from "./components/EditForm";

export default async function EditMemberPage() {
	const userId = await getAuthUserId();
	const member = await getMemberById(userId);
	return (
		<CardInnerWrapper
			header="Edit profile"
			body={<EditForm member={member!} />}
		/>
	);
}
