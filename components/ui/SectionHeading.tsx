import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        {title && (
          <h2
            className="mt-3 text-3xl tracking-tight md:text-4xl"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h2>
        )}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="link-underline text-sm text-muted hover:text-accent"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
