export default function RoiLine({ text, confirmed, light = false }: { text: string; confirmed: boolean; light?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="mt-[0.2rem] text-[0.6rem] font-bold tracking-widest uppercase px-1.5 py-0.5 flex-shrink-0"
        style={{
          color: confirmed ? (light ? '#ECFFC7' : '#14715B') : '#B93809',
          backgroundColor: confirmed ? (light ? 'rgba(236,255,199,0.15)' : '#E5F5EC') : '#FFEDD6',
        }}
      >
        Impact
      </span>
      <span className={`text-sm leading-[1.5] ${light ? 'text-white/85' : 'text-[#555]'}`}>{text}</span>
    </div>
  );
}
