interface NumberBadgeProps {
  number: number;
  color: string;
}

export default function NumberBadge({ number, color }: NumberBadgeProps) {
  return (
    <div
      className="w-8 h-8 min-w-8 min-h-8 rounded-full flex items-center justify-center text-white text-[1.25rem] font-bold flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {number}
    </div>
  );
}
