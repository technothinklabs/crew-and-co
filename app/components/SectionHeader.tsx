interface SectionHeaderProps {
  overline?: string;
  headline: string;
  body?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  overline,
  headline,
  body,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {overline && (
        <p
          className={`font-sans text-xs font-medium uppercase tracking-[0.12em] ${
            light ? "text-cream-300" : "text-coffee-500"
          }`}
        >
          {overline}
        </p>
      )}
      <h2
        className={`font-display text-4xl font-bold leading-tight lg:text-5xl ${
          light ? "text-white" : "text-coffee-900"
        }`}
      >
        {headline}
      </h2>
      {body && (
        <p
          className={`max-w-xl font-sans text-lg leading-relaxed ${
            light ? "text-cream-200" : "text-coffee-600"
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
