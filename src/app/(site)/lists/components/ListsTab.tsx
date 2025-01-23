"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Member } from "@prisma/client";
import { TabsContent } from "@radix-ui/react-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { MemberCard } from "../../members/components/MemberCard";

interface Props {
  members: Member[];
  likeIds: string[];
}

export const ListsTab: React.FC<Props> = ({ members, likeIds }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [tabValue, setTabValue] = useState("source");

  const tabs = [
    {
      id: "source",
      label: `Members I've Liked`,
    },
    {
      id: "target",
      label: `Members that liked me`,
    },
    {
      id: "mutual",
      label: `Mutual Likes`,
    },
  ];

  const handleTabChange = (type: string) => {
    setTabValue(type);
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    router.replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs defaultValue={tabValue}>
        <TabsList className="grid grid-cols-3">
          {tabs.map((tab) => {
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value={tabValue}>
          {members.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {members.map((member: Member) => (
                <MemberCard key={member.id} member={member} likeIds={likeIds} />
              ))}
            </div>
          )}
          {members.length === 0 && (
            <div className="flex items-center justify-center w-full h-full my-2">
              <p className="text-md text-gray-500">No members found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
