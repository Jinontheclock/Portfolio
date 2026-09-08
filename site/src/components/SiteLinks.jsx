/* The site's links out — LinkedIn, the resume, GitHub, Instagram, e-mail —
   as the drawn icons, wherever they stand: About's header, list and phone
   row, and the landing's footer band. One list, so the five are the same
   five everywhere and a change to one address is made once.

   The icons are inlined the way the hero's drawing is, so their paths take
   the colour of the text around them and change with it. */
import iconLinkedIn from "../assets/site/icon-linkedin.svg?raw";
import iconResume from "../assets/site/icon-resume.svg?raw";
import iconGitHub from "../assets/site/icon-github.svg?raw";
import iconInstagram from "../assets/site/icon-instagram.svg?raw";
import iconMail from "../assets/site/icon-mail.svg?raw";

/* The one address on the site. About's closing paragraph links to it as
   well as the row, so it is written once. */
export const MAILTO = "mailto:hajinlee.ca@gmail.com";

/* The links. E-mail closes them because About's copy ends by asking for
   one; a mailto: opens the reader's own mail client, so it is the one entry
   that must not carry target="_blank" — the tab it opened would be left
   blank.

   The resume is served from public/, so its URL carries whatever base this
   build is using rather than a hardcoded one. */
const RESUME = `${import.meta.env.BASE_URL}hajin-lee-resume.pdf`;

export const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hajin-lee-ca", icon: iconLinkedIn },
  { label: "Resume", href: RESUME, icon: iconResume },
  { label: "GitHub", href: "https://github.com/Jinontheclock", icon: iconGitHub },
  { label: "Instagram", href: "https://www.instagram.com/hj.archiv/", icon: iconInstagram },
  { label: "E-mail", href: MAILTO, icon: iconMail },
];

/** The links as a row of icons. Each is its icon and nothing else on the
 *  page; the name is on the link for whoever reads it aloud or hovers long
 *  enough for a tooltip. Everything but the mailto opens in its own tab —
 *  the resume included, because a PDF that replaces the page leaves the
 *  reader in a viewer with the site gone and only the back button to find
 *  it again. The class is the caller's: each place sets its own size and
 *  colour (see .link-icon in components.css for the box itself). */
export default function Links({ className }) {
  return LINKS.map((l) => {
    const icon = (
      <span
        className="link-icon"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: l.icon }}
      />
    );
    return l.href ? (
      <a
        key={l.label}
        href={l.href}
        className={className}
        aria-label={l.label}
        title={l.label}
        target={l.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={l.href.startsWith("mailto:") ? undefined : "noreferrer"}
      >
        {icon}
      </a>
    ) : (
      <span
        key={l.label}
        className={className + " is-pending"}
        aria-label={l.label}
        title={l.label}
        aria-disabled="true"
      >
        {icon}
      </span>
    );
  });
}
