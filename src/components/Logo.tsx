import logo from "../assets/unscrewly-logo.jpg.asset.json";

type Props = {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function Logo({
  size = 32,
  className = "",
  showWordmark = true,
  wordmarkClassName = "font-display text-lg font-bold tracking-tight",
}: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative inline-grid place-items-center overflow-hidden rounded-lg ring-1 ring-white/10"
        style={{ width: size, height: size }}
      >
        <span
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(6,182,212,0.45))",
            filter: "blur(10px)",
            opacity: 0.7,
          }}
          aria-hidden
        />
        <img
          src={logo.url}
          alt="Unscrewly logo"
          width={size}
          height={size}
          className="relative h-full w-full object-cover"
          draggable={false}
        />
      </span>
      {showWordmark && <span className={wordmarkClassName}>Unscrewly</span>}
    </span>
  );
}
