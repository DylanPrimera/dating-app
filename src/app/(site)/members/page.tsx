import { getMembers } from "@/actions";

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div>
      {members?.map((member) => (
        <div key={member.id}>
          <p>{member.name}</p>
        </div>
      ))}
    </div>
  );
}
