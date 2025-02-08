'use client';
import React, { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
  header: ReactNode | string;
  body?: ReactNode;
  footer?: ReactNode;
}

export const CardInnerWrapper: React.FC<Props> = ({ header, body, footer }) => {
  return (
    <Card className="w-1/2 mx-auto my-4">
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
      <CardContent className="flex-1 max-h-[60vh] overflow-y-scroll">
        {body}
      </CardContent>
      {footer && (
        <CardFooter className="mt-3">
            {footer}
        </CardFooter>
      )}
    </Card>
  );
};
