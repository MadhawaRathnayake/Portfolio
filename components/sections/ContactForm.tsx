"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-raised px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try email instead."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent-soft p-8">
        <p className="text-lg text-ink">Message sent.</p>
        <p className="mt-2 text-sm text-muted">
          I read everything and reply within a day or two. If it is urgent, email
          me directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Name
          </label>
          <input id="name" name="name" required maxLength={120} className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required maxLength={200} className={field} placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} maxLength={4000} className={field} placeholder="What are you working on?" />
      </div>

      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-px hover:opacity-90 disabled:translate-y-0 disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "error" && (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
