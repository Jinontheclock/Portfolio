/* Long-tail arrow traced from the Figma asset: thick tail, head peaking at
   its left and tapering to the right tip. currentColor follows the theme.
   Shared by the landing nav (where it slides on hover) and the case-study
   before/after rows (where it marks the crossover). */
export default function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 418 66" aria-hidden="true">
      <rect x="0" y="47" width="212" height="19" fill="currentColor" />
      <path d="M209 0 L418 66 L209 66 Z" fill="currentColor" />
    </svg>
  );
}
