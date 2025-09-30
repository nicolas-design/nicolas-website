// client/src/lib/useStableViewport.ts
import { useEffect } from "react";

function setVHVar() {
  const vh = (window.visualViewport?.height ?? window.innerHeight) * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export function useStableViewport() {
  useEffect(() => {
    // guard for SSR
    if (typeof window === "undefined") return;

    let raf = 0;
    const onResize = () => setVHVar();
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setVHVar);
    };

    // initial
    setVHVar();

    // listeners (cover all mobile cases)
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);
}
