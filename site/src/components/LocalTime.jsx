import { useEffect, useState } from "react";

/* Where the site's author is, on the clock: the footer says "Based in
   Vancouver" and beside it the time there, so a reader anywhere can tell
   whether a reply is likely tonight or tomorrow. Read off the browser's
   own clock in the Vancouver zone, so it is right for a reader in Seoul
   without a server to ask. */
const ZONE = "America/Vancouver";
const format = new Intl.DateTimeFormat("en-CA", {
  timeZone: ZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short",
});
/* "7:33 p.m. PDT" in en-CA; the design writes "7:33 PM PDT" */
const now = () => format.format(new Date()).replace(/\b([ap])\.m\./i, (m, h) => h.toUpperCase() + "M");

/** The time in Vancouver, to the minute: re-read on the minute, so it is
 *  never more than a few seconds behind the clock it reads. */
export default function LocalTime() {
  const [time, setTime] = useState(now);
  useEffect(() => {
    let timer = 0;
    const tick = () => {
      setTime(now());
      /* the next minute's first second, not sixty seconds from now, so the
         display turns over when the clock does */
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 250);
    };
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 250);
    return () => clearTimeout(timer);
  }, []);
  return (
    <time className="lp-footer-time" dateTime={new Date().toISOString()}>
      {time}
    </time>
  );
}
