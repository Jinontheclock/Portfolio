import { useEffect, useState } from "react";

/** Glass menu attached to any trigger, per the About design's Work/About
 *  dropdown. `direction="up"` opens above the trigger (for footer menus).
 *  The current item renders muted and doesn't re-trigger onSelect. */
export default function Dropdown({ renderTrigger, items, direction = "down" }) {
  const [open, setOpen] = useState(false);

  // Design behavior: clicking anywhere outside closes the menu
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const toggle = (e) => {
    e.stopPropagation();
    const wasOpen = open;
    // Close every other open menu first (they listen for document clicks,
    // which the stopPropagation above suppressed for the real click)
    document.dispatchEvent(new Event("click"));
    if (!wasOpen) setOpen(true);
  };

  return (
    <div className="dropdown-anchor">
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
                setOpen(false);
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
