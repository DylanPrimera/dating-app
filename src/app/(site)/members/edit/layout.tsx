import { getAuthUserId, getMemberById } from "@/actions";
import { MemberSideBar } from "../components/MemberSideBar";
import { Card } from "@/components/ui/card";

export default async function EditMemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getAuthUserId();
  const member = await getMemberById(userId);
  const basePath = `/members/edit`;
  const navLinks = [
    {
      name: "Edit Profile",
      href: `${basePath}`,
    },
    {
      name: "Photos",
      href: `${basePath}/photos`,
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSideBar member={member!} navLinks={navLinks}/>
      </div>
      <div className="col-span-9">
        <div className="w-full mt-10 h-full">{children}</div>
      </div>
    </div>
  );
}
