import { getCurrentUserLikeIds, getMembers } from "@/actions";
import { MemberCard } from "./components/MemberCard";

export default async function MembersPage() {
  const members = await getMembers();
  const likeIds = await getCurrentUserLikeIds();
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {members &&
        members.map((member) => (
          <MemberCard key={member.userId} member={member} likeIds={likeIds} />
        ))}
    </div>
  );
}
