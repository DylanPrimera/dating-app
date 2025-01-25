import { getMemberById } from "@/actions";
import { CardInnerWrapper } from "@/components";
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
  if (!memberData) return notFound();
  return <CardInnerWrapper header="Profile" body={memberData.description} />;
}
