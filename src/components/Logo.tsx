export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 56 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.15em] w-auto shrink-0"
        aria-hidden
      >
        <path fill="#CBFF4D" d="M2 36 L16 28 L16 50 L2 50 Z" />
        <path fill="#CBFF4D" d="M20 22 L34 12 L34 50 L20 50 Z" />
        <path fill="#CBFF4D" d="M38 8 L52 0 L52 50 L38 50 Z" />
      </svg>
      <span className="logo-wordmark text-[0.95em] md:text-[1.05em]">
        Viral&nbsp;Vibe
      </span>
    </span>
  );
}
