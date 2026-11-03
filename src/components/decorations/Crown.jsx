export default function Crown({ size = 48, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 64 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 14 L18 28 L32 8 L46 28 L58 14 L53 38 H11 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M11 44 H53" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="6" cy="12" r="3.5" fill={color} />
      <circle cx="32" cy="6" r="3.5" fill={color} />
      <circle cx="58" cy="12" r="3.5" fill={color} />
    </svg>
  );
}