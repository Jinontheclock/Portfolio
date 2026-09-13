/* The devices on a Work card: one row of pictures — the project's own
   render of its mockups, the screens already in them — on the card's
   colour. The row stands at the lower right of the card beside the copy,
   or above the copy where the picture is wide; work.css sizes the row by
   height from the room it has, and each picture's box takes the picture's
   own proportions, set inline from the data, so the pictures follow. */

export default function WorkMockups({ mockups, alt }) {
  return (
    /* one picture for a reader: the devices are one subject, and the
       renders carry no text of their own */
    <div className="wk-mockups" role="img" aria-label={alt}>
      <div className="wk-mockup-row">
        {mockups.map((m) => (
          <div
            key={m.image}
            className="wk-mockup"
            style={{ aspectRatio: `${m.ratio[0]} / ${m.ratio[1]}` }}
          >
            <img src={m.image} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
