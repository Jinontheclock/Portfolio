import { useEffect, useState } from "react";

/** True when the primary input can actually hover (desktop mouse), false on
 *  touch devices. Touch fires a sticky `mouseenter` on tap that never clears,
 *  so hover-to-open state must be ignored there — taps toggle instead. */
export default function useCanHover() {
  const [canHover, setCanHover] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(hover: hover)").matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const onChange = () => setCanHover(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return canHover;
}
