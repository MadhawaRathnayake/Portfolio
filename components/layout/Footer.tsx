import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-sunken">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-3 md:px-12">
        <div>
          <p className="font-mono text-sm text-ink">Madhawa Rathnayake</p>
          <p className="mt-2 max-w-[28ch] text-sm text-muted">
            I build systems end to end, then ship and run them.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-muted">
          <Link href="/projects" className="link-underline w-fit hover:text-ink">Projects</Link>
          <Link href="/about" className="link-underline w-fit hover:text-ink">About</Link>
          <Link href="/contact" className="link-underline w-fit hover:text-ink">Contact</Link>
        </nav>

        <nav className="flex flex-col gap-2 text-sm text-muted">
          <a href="https://github.com/MadhawaRathnayake" className="link-underline w-fit hover:text-ink">GitHub</a>
          <a href="https://linkedin.com/in/madhawa-dhanusha" className="link-underline w-fit hover:text-ink">LinkedIn</a>
          <a href="mailto:madhawasoftnet@gmail.com" className="link-underline w-fit hover:text-ink">Email</a>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 py-6 font-mono text-xs text-faint md:flex-row md:items-center md:justify-between md:px-12">
          <span>&copy; {new Date().getFullYear()} Madhawa Rathnayake</span>
          <span>Running on an Azure VM behind nginx</span>
        </div>
      </div>
    </footer>
  );
}
