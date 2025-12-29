interface NumberBadgeProps {
  number: number;
  color: string;
}

export default function NumberBadge({ number, color }: NumberBadgeProps) {
  return (
    <span
      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
      style={{ backgroundColor: color, fontWeight: 900 }}
    >
      {number}
    </span>
  );
}
