import { CardContent, CardHeader } from "@/components/ui/card";
import { EditForm } from "./components/EditForm";
import { getAuthUserId, getMemberById } from "@/actions";

export default async function EditMemberPage() {
  const userId = await getAuthUserId();
  const member = await getMemberById(userId);
  return (
   <>
    <CardHeader className="text-xl font-semibold text-red-400">
      Edit profile
    </CardHeader>
    <hr className="border-1 border-gray-300" />
    <CardContent>
      <EditForm member={member!}/>
    </CardContent>
   </>
  );
}