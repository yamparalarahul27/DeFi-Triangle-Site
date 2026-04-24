import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { LOG, type DayEntry } from "./log-data";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

type Tag = "Added" | "Fixed" | "Learned";

const TAG_STYLES: Record<Tag, string> = {
  Added: "bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]",
  Fixed: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  Learned: "bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]",
};

function LogPoint({ tag, text }: { tag: Tag; text: string }) {
  return (
    <div className="flex gap-2.5">
      <span
        className={`flex-shrink-0 inline-flex items-center h-5 px-1.5 rounded-sm text-[9px] uppercase tracking-wider font-ibm-plex-sans border ${TAG_STYLES[tag]}`}
      >
        {tag}
      </span>
      <p className="text-xs text-[#11274d] font-ibm-plex-sans leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function DayCard({
  day,
  index,
  total,
}: {
  day: DayEntry;
  index: number;
  total: number;
}) {
  const dotColor = index === 0 ? "bg-[#19549b]" : "bg-[#cbd5e1]";
  const dayNumber = total - index;
  return (
    <div className="relative pl-9 sm:pl-12">
      <div
        className={`absolute left-1.5 sm:left-2.5 top-4 w-3 h-3 rounded-full border-2 border-white ${dotColor}`}
      />
      <Card className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between mb-3">
          <time className="font-mono text-xs text-[#6a7282]">
            {formatDate(day.date)}
          </time>
          <span className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-ibm-plex-sans">
            Day {dayNumber}
          </span>
        </div>
        <div className="space-y-3">
          {day.break ? (
            <p className="text-xs text-[#11274d] font-ibm-plex-sans leading-relaxed">
              {day.break}
            </p>
          ) : (
            <>
              <LogPoint tag="Added" text={day.added} />
              <LogPoint tag="Fixed" text={day.fixed} />
              <LogPoint tag="Learned" text={day.learned} />
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function LogPage() {
  const total = LOG.length;

  return (
    <div className="flex-1 bg-[#f1f5f9] px-4 sm:px-6 lg:px-10 pt-6 pb-16 min-h-screen">
      <div
        className="gradient-frost-hero -mt-6 mb-6 pt-16 pb-6 border-b border-white/20"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          paddingLeft: "calc(50vw - 50%)",
          paddingRight: "calc(50vw - 50%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center">
          <Link
            href="/"
            transitionTypes={["fade"]}
            className="self-start mb-4 inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/10 px-3 py-1.5 font-ibm-plex-sans text-xs text-white/90 hover:bg-white/15 transition-colors duration-200"
          >
            Back to Home
          </Link>
          <h1 className="font-satoshi font-light text-2xl lg:text-4xl text-white tracking-tight mb-2">
            Project Log
          </h1>
          <p className="font-ibm-plex-sans text-xs lg:text-sm text-white/70">
            Day-by-day evolution of DeFi Triangle — what shipped, what broke,
            what we learned.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto">
        <div className="relative">
          <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-[#cbd5e1]" />
          <div className="space-y-6">
            {LOG.map((day, index) => (
              <DayCard
                key={day.date}
                day={day}
                index={index}
                total={total}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
