import { Outlet } from "react-router";
import { Header } from "./Header";
import ScrollBar from "react-perfect-scrollbar";
import { useRef } from "react";

export type LayoutOutletContext = {
  scrollToTop: () => void;
};

export const Layout = () => {
  let scrollbarRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    scrollbarRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Header />

      <ScrollBar
        containerRef={(ref) => {
          scrollbarRef.current = ref as any;
        }}
        className="w-full bg-gray-100 relative"
      >
        <Outlet context={{ scrollToTop }} />
      </ScrollBar>
    </div>
  );
};
