import { useEffect, useRef, useState } from "react";
import useCanHover from "../hooks/useCanHover.js";

// dispatched when any dropdown opens so the others close themselves
const CLOSE_ALL = "dropdown:closeall";

/** Glass menu attached to any trigger, per the About design's Work/About
 *  dropdown. `direction="up"` opens above the trigger (for footer menus).
 *  On a mouse device it opens on hover and a click pins it open; on touch
 *  (no real hover) a tap toggles it open/closed. */
export default function Dropdown({ renderTrigger, items, direction = "down" }) {
  const canHover = useCanHover();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const closeTimer = useRef(null);
  // hover only counts on devices that can actually hover; on touch a tapped
  // mouseenter sticks forever, so it must not keep the menu open
  const open = pinned || (canHover && hovered);

  // while pinned: an outside click, or another dropdown opening, closes it
  useEffect(() => {
    if (!pinned) return;
    const close = () => setPinned(false);
    document.addEventListener("click", close);
    document.addEventListener(CLOSE_ALL, close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener(CLOSE_ALL, close);
    };
  }, [pinned]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onEnter = () => {
    clearTimeout(closeTimer.current);
    setHovered(true);
  };
  // small grace delay so moving across the trigger→menu gap doesn't close it
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setHovered(false), 140);
  };

  const toggle = (e) => {
    e.stopPropagation(); // keep the outside-click handler from double-firing
    if (pinned) {
      setPinned(false);
    } else {
      document.dispatchEvent(new Event(CLOSE_ALL)); // close any sibling menu
      setPinned(true);
    }
  };

  const close = () => {
    setPinned(false);
    setHovered(false);
    clearTimeout(closeTimer.current);
  };

  return (
    <div className="dropdown-anchor" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {renderTrigger(toggle, open)}
      {open && (
        <div className={"glass-menu " + (direction === "up" ? "glass-menu-up" : "glass-menu-down")}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={"glass-menu-item" + (item.current ? " is-current" : "")}
              onClick={(e) => {
                e.stopPropagation();
                close();
                if (!item.current && item.onSelect) item.onSelect();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
