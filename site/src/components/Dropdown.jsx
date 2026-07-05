import { useEffect, useRef, useState } from "react";

/** Glass menu attached to any trigger, per the About design's Work/About
 *  dropdown. `direction="up"` opens above the trigger (for footer menus).
 *  Opens on hover; a click pins it open (stays open after the mouse leaves)
 *  until an item is chosen or a click lands outside. */
export default function Dropdown({ renderTrigger, items, direction = "down" }) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const closeTimer = useRef(null);
  const open = pinned || hovered;

  // clicking outside closes a pinned menu
  useEffect(() => {
    if (!pinned) return;
    const close = () => setPinned(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
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
    e.stopPropagation();
    // close other open (pinned) menus, then pin this one
    document.dispatchEvent(new Event("click"));
    setPinned(true);
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
