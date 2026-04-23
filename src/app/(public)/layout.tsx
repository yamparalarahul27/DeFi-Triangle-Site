import { Agentation } from "agentation";
import { ViewTransition } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9]">
      <ViewTransition
        enter={{ fade: "route-fade", default: "route-fade" }}
        exit={{ fade: "route-fade", default: "route-fade" }}
      >
        {children}
      </ViewTransition>
      {isDev && <Agentation />}
    </div>
  );
}
