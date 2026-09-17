import Reveal from "@/components/ui/Reveal";

const groups = [
  {
    label: "Build",
    items: ["C#", "Java", "TypeScript", "Node.js", "Spring Boot", "React", "Next.js", "Flutter"],
  },
  {
    label: "Ship",
    items: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform", "Ansible", "AWS", "Azure"],
    accent: true,
  },
  {
    label: "Design",
    items: ["Clean Architecture", "Microservices", "RabbitMQ", "PostgreSQL", "MongoDB"],
  },
];

export default function Capabilities() {
  return (
    <section className="border-y border-line bg-sunken px-6 py-20 md:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.06}>
            <div className="grid gap-3 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-8">
              <p
                className={`font-mono text-xs uppercase tracking-[0.12em] ${
                  g.accent ? "text-accent" : "text-faint"
                }`}
              >
                {g.label}
              </p>
              <p className="font-mono text-sm leading-relaxed text-muted">
                {g.items.join("  ·  ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
