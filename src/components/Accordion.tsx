interface AccordionProps {
  id: string;
  title: string;
  logoSrc: string;
  url: string;
  description: string;
  bulletPoints: string[];
  openAccordion: string | null;
  setOpenAccordion: (id: string | null) => void;
  brandColor: string;
}

export default function Accordion({
  id,
  title,
  logoSrc,
  url,
  description,
  bulletPoints,
  openAccordion,
  setOpenAccordion,
  brandColor
}: AccordionProps) {
  const isOpen = openAccordion === id;

  return (
    <div className="border border-[rgba(0,0,0,0.12)] bg-white" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
      <button
        onClick={() => setOpenAccordion(isOpen ? null : id)}
        className={`w-full px-4 bg-white flex items-center justify-between cursor-pointer ${isOpen ? 'pt-4 pb-3' : 'py-4'}`}
      >
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt={title} className="w-10 h-10 object-contain" />
          <span className="text-[1.1rem] font-bold text-[#333]">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
          style={{ color: brandColor }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="px-4 pb-4 bg-white">
          <div className="border-t border-[rgba(0,0,0,0.08)] pt-3 mx-2">
            <p className="text-[1rem] text-[#666] leading-[1.6] mb-4">
              {description}
            </p>
            <ul className="space-y-2 text-[1rem] text-[#666] leading-[1.6] list-disc ml-6 mb-4">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:underline font-semibold"
              style={{ color: brandColor }}
            >
              Visit their site
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
