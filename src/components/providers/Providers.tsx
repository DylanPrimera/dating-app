import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
