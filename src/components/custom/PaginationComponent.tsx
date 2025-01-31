"use client";

import React from "react";
import { Pagination } from "@heroui/react";
import { cn } from "@/lib";

export const PaginationComponent = () => {
  const resultText = `Showing 1-2 of 12 results`;

  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>{resultText}</div>
        <div>
          <Pagination
            color="success"
            variant="bordered"
            isCompact
            showControls
            total={12}
            initialPage={1}
            page={2}
          />
        </div>
        <div className="flex flex-row gap-1 items-center">
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              className={cn("page-size-box", {
                "bg-foreground text-white hover:bg-bg-foreground hover:text-white":
                  size === 3,
              })}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
