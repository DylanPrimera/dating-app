import { getMemberById } from "@/actions";
import { MemberSideBar } from "../components/MemberSideBar";
import { Card } from "@/components/ui/card";

export default async function MemberDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const memberData = await getMemberById(userId);
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSideBar member={memberData!}/>
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-full">{children}</Card>
      </div>
    </div>
  );
}
