import { useEffect, useState } from "react";

/** True at the width the site lays itself out as one column — the same
 *  600px the stylesheets break at, so "a phone" means the same thing in
 *  the markup as it does in the CSS. Live, so a rotation is not a stale
 *  answer. */
const PHONE = "(max-width: 600px)";

export default function useIsPhone() {
  const [isPhone, setIsPhone] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(PHONE).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const onChange = () => setIsPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isPhone;
}
