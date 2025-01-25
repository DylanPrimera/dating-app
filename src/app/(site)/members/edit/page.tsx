
import { EditForm } from "./components/EditForm";
import { getAuthUserId, getMemberById } from "@/actions";
import { CardInnerWrapper } from "@/components";

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
