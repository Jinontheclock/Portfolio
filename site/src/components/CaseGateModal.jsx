import { useEffect, useRef, useState } from "react";
import { freezePage } from "../lib/freeze-page.js";

/* Password gate for confidential case studies (projects with `locked` +
   `passwordHash`): a modal over the dimmed, blurred page. Checked
   client-side against a SHA-256 digest — a courtesy gate in the
   working-portfolio sense, not server security — and an unlock lasts for
   the browsing session. */
const GATE_COPY = {
  en: {
    title: "Protected project",
    body: "This project is covered by a company confidentiality policy.",
    placeholder: "Password",
    error: "Incorrect password.",
    insecure: "This page has to be on https to check a password. Try again once the certificate is live.",
    submit: "Unlock",
  },
  ko: {
    title: "보호된 프로젝트",
    body: "사내 보안 규정에 따라 보호된 프로젝트입니다.",
    placeholder: "비밀번호",
    error: "비밀번호가 올바르지 않습니다.",
    insecure: "비밀번호를 확인하려면 https 연결이 필요합니다. 인증서가 발급된 뒤 다시 시도해 주세요.",
    submit: "잠금 해제",
  },
  ja: {
    title: "保護されたプロジェクト",
    body: "社内規定により保護されたプロジェクトです。",
    placeholder: "パスワード",
    error: "パスワードが正しくありません。",
    insecure: "パスワードの確認にはhttps接続が必要です。証明書が有効になってから、もう一度お試しください。",
    submit: "ロック解除",
  },
};

async function sha256Hex(text) {
  // crypto.subtle only exists on secure origins (https / localhost); on a
  // plain-http preview it is undefined and digesting would throw — return
  // null so the gate shows its normal error instead of dying silently
  if (!globalThis.crypto?.subtle) return null;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isUnlocked(projectId) {
  try {
    return sessionStorage.getItem(`cs-unlocked-${projectId}`) === "1";
  } catch {
    return false;
  }
}

export default function CaseGateModal({ project, lang, onUnlocked, onDismiss }) {
  const [pw, setPw] = useState("");
  /* false | "wrong" | "insecure" — a plain-http origin has no crypto.subtle,
     so the password can never match there. Saying "incorrect password" then
     sends someone hunting for a typo that is not there; a new custom domain
     serves plain http until its certificate is issued. */
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const copy = GATE_COPY[lang] || GATE_COPY.en;

  /* onDismiss arrives as a fresh closure on every render of the page behind
     this, and an effect keyed on it freezes and thaws again each time — on a
     browser that draws a scrollbar, that is the page behind stepping
     sideways and back. Freezing belongs to the modal being up, not to the
     page under it re-rendering, so the callback goes in a ref and the effect
     holds still. */
  const dismissCb = useRef(onDismiss);
  dismissCb.current = onDismiss;

  // freeze the page and listen for Escape while the gate is up
  useEffect(() => {
    const thaw = freezePage();
    const onKey = (e) => {
      if (e.key === "Escape") dismissCb.current?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      thaw();
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const tryUnlock = async (e) => {
    e.preventDefault();
    const hex = await sha256Hex(pw.trim());
    if (hex && hex === project.passwordHash) {
      try {
        sessionStorage.setItem(`cs-unlocked-${project.id}`, "1");
      } catch {}
      onUnlocked();
    } else {
      setError(hex === null ? "insecure" : "wrong");
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div className="cs-gate-overlay" onClick={() => onDismiss?.()}>
      <form
        className={"cs-gate-card" + (shake ? " is-shake" : "")}
        onSubmit={tryUnlock}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="cs-gate-title">{copy.title}</h1>
        <p className="cs-gate-body">{copy.body}</p>
        <div className="cs-gate-field">
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            autoFocus
          />
          <button type="submit" aria-label={copy.submit}>
            →
          </button>
        </div>
        <p className="cs-gate-error" aria-live="polite">
          {error === "insecure" ? copy.insecure : error ? copy.error : " "}
        </p>
      </form>
    </div>
  );
}
