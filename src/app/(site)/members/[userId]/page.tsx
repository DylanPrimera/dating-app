import { getMemberById } from "@/actions";
import { CardContent, CardHeader } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function MemberDeailPage({ params }: Props) {
  const { userId } = await params;
  if (Number(userId)) {
    notFound();
  }
  const memberData = await getMemberById(userId);
  if(!memberData) return notFound();
  return (
    <>
      <CardHeader className="text-xl font-semibold text-red-400">
        Profile
      </CardHeader>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <CardContent className="mt-2">
        {memberData.description}
      </CardContent>
    </>
  );
}
