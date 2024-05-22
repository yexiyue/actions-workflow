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
    <div className="w-screen h-screen overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-56px)] bg-gray-100 relative">
        <ScrollBar
          containerRef={(ref) => {
            scrollbarRef.current = ref as any;
          }}
        >
          <Outlet context={{ scrollToTop }} />
        </ScrollBar>
      </div>
    </div>
  );
};
