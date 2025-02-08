import { verifyEmail } from "@/actions";
import { CardInnerWrapper } from "@/components";
import { cn } from "@/lib";
import { ActionResult } from "@/types";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";

interface Props {
  searchParams: Promise<{ token: string }>;
}

const ResultMessage: React.FC<{ result: ActionResult<string> | null }> = ({
  result,
}) => {
  if (!result) return null;

  return (
    <div
      className={cn(
        "p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm",
        {
          "text-danger-800 bg-danger-50": result.status === "error",
          "text-success-800 bg-success-50": result.status === "success",
        }
      )}
    >
      {result.status === "success" ? (
        <FaCheckCircle size={20} />
      ) : (
        <FaExclamationTriangle size={20} />
      )}
      <p>
        {result.status === "success" ? result.data : (result.error as string)}
      </p>
    </div>
  );
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const result = await verifyEmail(token);

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <GiSelfLove size={60} className="mx-auto text-red-400" />
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-transparent bg-clip-text  bg-gradient-to-r from-pink-400 via-red-400 to-pink-600">
          Neinter
        </h2>
      </div>
      <CardInnerWrapper
        header="Verify your email address"
        footer={<ResultMessage result={result} />}
      />
    </div>
  );
}
