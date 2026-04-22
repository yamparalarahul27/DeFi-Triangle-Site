import { Agentation } from "agentation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9]">
      {children}
      {isDev && <Agentation />}
    </div>
  );
}
