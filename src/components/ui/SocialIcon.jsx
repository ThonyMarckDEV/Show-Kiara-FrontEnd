const ICONS = {
  facebook: (
    <path
      fill="currentColor"
      d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14 2c-3.3 0-4 2.4-4 4v2.5H8v3.9h2V22h4v-9.6h2.7l.4-3.9H14z"
    />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </g>
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M16.6 2h-3.3v13.2a2.8 2.8 0 1 1-2-2.7V9.1a6.1 6.1 0 1 0 5.3 6.1V8.6a7.6 7.6 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.7z"
    />
  ),
};

export default function SocialIcon({ id, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[id]}
    </svg>
  );
}
