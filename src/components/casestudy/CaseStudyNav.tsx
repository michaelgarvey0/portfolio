import Link from 'next/link';

/**
 * The prev/next footer used at the bottom of every case study.
 *
 * Markup and classes lifted verbatim from src/app/work/orgo/page.tsx, which is
 * the canonical version - this exists so the pattern stops getting re-typed
 * (and drifting) on every new page.
 */

interface NavTarget {
  href: string;
  title: string;
}

interface CaseStudyNavProps {
  prev?: NavTarget;
  next?: NavTarget;
}

const ARROW_LEFT = 'M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z';
const ARROW_RIGHT = 'm560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z';

function Arrow({ d }: { d: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  );
}

export default function CaseStudyNav({ prev, next }: CaseStudyNavProps) {
  const both = Boolean(prev && next);

  return (
    <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--max-width)' }}>
      <div
        className={`flex flex-col md:flex-row pt-16 border-t border-[rgba(0,0,0,0.08)] pb-20 ${
          both ? 'justify-between gap-8' : 'justify-end'
        }`}
      >
        {prev && (
          <Link
            href={prev.href}
            className="flex flex-col items-start gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2"
          >
            <div className="flex items-center gap-2 font-bold text-[#0066cc]">
              <Arrow d={ARROW_LEFT} />
              <span>Previous</span>
            </div>
            <span className="text-[1.5rem] text-[#666] transition-colors font-bold">
              {prev.title}
            </span>
          </Link>
        )}

        {next && (
          <Link
            href={next.href}
            className="flex flex-col items-end gap-3 p-6 border border-[#0066cc] shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-[rgba(0,102,204,0.05)] w-full md:w-1/2"
          >
            <div className="flex items-center gap-2 font-bold text-[#0066cc]">
              <span>Up next</span>
              <Arrow d={ARROW_RIGHT} />
            </div>
            <span className="text-[1.5rem] text-[#666] transition-colors font-bold">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
