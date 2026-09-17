import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "ghost";
  external?: boolean;
};

const base =
  "inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200";

const styles = {
  solid:
    "bg-accent text-bg hover:-translate-y-px hover:opacity-90",
  ghost:
    "border border-line text-ink hover:border-accent hover:text-accent",
};

export default function Button({
  children,
  href,
  variant = "solid",
  external,
}: Props) {
  const className = `${base} ${styles[variant]}`;

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
