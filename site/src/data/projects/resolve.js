/* Folds { en, ja, ko } nodes down to one language.
   Copies the tree, and wherever it meets an object whose only keys are
   en/ja/ko, replaces it with that language's value and keeps walking into
   it. What comes out has exactly the shape the single-language project
   objects had, so nothing downstream has to know translations exist. */

const LANG_KEYS = new Set(["en", "ja", "ko"]);

/* Deliberately strict. A link { label, href }, an inline segment
   { text, href } and a block { type, text } all lack an `en` key, so they
   pass through untouched; and requiring EVERY key to be a language keeps
   something like { en, foo } from being mistaken for a language node. */
const isLangNode = (v) =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  "en" in v &&
  Object.keys(v).every((k) => LANG_KEYS.has(k));

export function resolve(node, lang) {
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang));
  if (node !== null && typeof node === "object") {
    /* an untranslated language falls back to English, so a half-translated
       project renders rather than blanking */
    if (isLangNode(node)) return resolve(node[lang] ?? node.en, lang);
    const out = {};
    for (const k of Object.keys(node)) out[k] = resolve(node[k], lang);
    return out;
  }
  return node;
}
