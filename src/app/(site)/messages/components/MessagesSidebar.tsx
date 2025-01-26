"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

interface Props {
    messagesCount: number;
}


export const MessagesSidebar:React.FC<Props> = ({messagesCount}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  );

  const items = [
    {
      key: "inbox",
      label: "Inbox",
      icon: GoInbox,
      chip: true,
    },
    {
      key: "outbox",
      label: "Outbox",
      icon: MdOutlineOutbox,
      chip: false,
    },
  ];

  const handleSelected = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);
    router.replace(`${pathName}?${params}`);
  };

  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
      {items.map(({ key, icon: Icon, label, chip }) => (
        <div
          className={cn("flex flex-row items-center rounded-t-lg gap-2 p-3 transition", {
            "text-black": selected === key,
            'text-gray-400 hover:text-black': selected !== key

          })}
          key={key}
          onClick={()=>handleSelected(key)}
        >
            <Icon size={24}/>
            <div className="flex justify-between flex-grow">
                <span>{label}</span>
                {chip && <Badge>{messagesCount}</Badge>}
            </div>
        </div>
      ))}
    </div>
  );
};
