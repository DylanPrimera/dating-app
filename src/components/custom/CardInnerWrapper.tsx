'use client';
import React, { ReactNode } from "react";
import { CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
  header: ReactNode | string;
  body: ReactNode;
  footer?: ReactNode;
}

export const CardInnerWrapper: React.FC<Props> = ({ header, body, footer }) => {
  return (
    <>
      <CardHeader>
        {
            typeof header === 'string' ? (
                <div className="text-xl font-semibold text-red-400">
                  {header}
                </div>
            ):(<>{header}</>)
        }
      </CardHeader>
      <hr className="border-1 border-gray-300" />
      <CardContent className="mt-4 flex-1">
        {body}
      </CardContent>
      {footer && (
        <CardFooter>
            {footer}
        </CardFooter>
      )}
    </>
  );
};
