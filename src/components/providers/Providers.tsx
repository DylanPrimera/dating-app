import { Toaster } from "sonner";
interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
};
