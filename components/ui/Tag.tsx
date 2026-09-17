export default function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent">
      {label}
    </span>
  );
}
