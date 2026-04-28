export function TrustedBy() {
  const logos = ["Pixela", "Lumen", "Northwind", "Halcyon", "Vertex", "Nimbus"]

  return (
    <section className="relative border-t border-border/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:gap-10 sm:px-6">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by
        </span>
        <div className="grid w-full grid-cols-3 items-center gap-x-6 gap-y-4 sm:flex sm:flex-1 sm:justify-between">
          {logos.map((name) => (
            <span
              key={name}
              className="font-display text-center text-base font-semibold text-foreground/40 transition-colors hover:text-foreground/70 sm:text-lg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
