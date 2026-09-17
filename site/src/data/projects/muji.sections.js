/* MUJI's chapters — the case study's own body, and the bulk of its
   weight. Kept out of the project's card data so that a visitor who only
   opens the landing or the Work page never downloads it: the card
   metadata is eager (index.js), and this arrives with the case-study
   chunk (see pages/case-study-chunk.js and ./full.js).

   The block model is documented in ./index.js. */

export default [
  {
    id: "s1",
    label: "01 Placeholder section",
    blocks: [
      {
        type: "p",
        text: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
      },
    ],
  },
  {
    id: "s2",
    label: "02 Placeholder section",
    blocks: [
      {
        type: "p",
        text: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
      },
    ],
  },
  {
    id: "s3",
    label: "03 Placeholder section",
    blocks: [
      {
        type: "p",
        text: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
      },
    ],
  },
];
