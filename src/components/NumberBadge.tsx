interface NumberBadgeProps {
  number: number;
  color: string;
}

export default function NumberBadge({ number, color }: NumberBadgeProps) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[1.25rem] font-bold mb-3"
      style={{ backgroundColor: color }}
    >
      {number}
    </div>
  );
}
