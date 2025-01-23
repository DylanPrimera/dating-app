"use client";
import { Button } from "@/components";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BiSolidError } from "react-icons/bi";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center  w-full h-[90vh] mx-auto">
        <Card className="w-2/5 mx-auto">
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2 items-center text-gray-400">
              <BiSolidError size={30} />
              <h1 className="text-3xl font-semibold">Error</h1>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center text-red-500">
              {error.message}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => reset()} color="default" variant="outline">
              Try again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
