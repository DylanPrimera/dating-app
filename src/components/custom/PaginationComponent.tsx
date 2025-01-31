"use client";

import React, { useEffect } from "react";
import { Pagination } from "@heroui/react";
import { cn } from "@/lib";
import { usePaginationStore } from "@/hooks";

interface Props {
  totalCount: number;
}

export const PaginationComponent: React.FC<Props> = ({ totalCount }) => {
  const { setPage, setPageSize, setPagination, pagination } =
    usePaginationStore();
  const { page, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [setPagination, totalCount]);

  const start = (page! - 1) * pageSize! + 1;
  const end = Math.min(page! * pageSize!, totalCount);
  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  return (
    <div className="border-t-2 w-full mt-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div>{resultText}</div>

        <Pagination
          color="default"
          variant="bordered"
          total={totalPages}
          initialPage={1}
          page={page}
          onChange={setPage}
        />

        <div className="flex flex-row gap-1 items-center">
          Results per page:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={cn("page-size-box", {
                "bg-foreground text-white hover:bg-bg-foreground hover:text-white":
                  pageSize === size,
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
