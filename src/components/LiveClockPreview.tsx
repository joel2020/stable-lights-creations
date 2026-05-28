type Props = {
  stable?: string;
  horse?: string;
  trainer?: string;
  neonColor: string;
  photoUrl?: string | null;
  size?: number;
};

export function LiveClockPreview({ stable, horse, trainer, neonColor, photoUrl, size = 360 }: Props) {
  const color = neonColor || "orange";
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* ambient bloom */}
      <div
        className="pointer-events-none absolute inset-[-22%] rounded-full bloom-pulse blur-3xl"
        style={{ background: `radial-gradient(circle, var(--neon-${color}) 0%, transparent 62%)` }}
      />
      {/* outer chrome — tinted with neon */}
      <div className="absolute inset-0 rounded-full p-[6px] chrome-spin"
        style={{ background: `conic-gradient(from 0deg, #1a1a1f, var(--neon-${color}), #6a6f78, var(--neon-${color}), #2a2a31, var(--neon-${color}), #1a1a1f)` }}>

        <div className="relative h-full w-full rounded-full bg-black p-[3px]">
          <div className="relative h-full w-full rounded-full p-[8px]"
            style={{ background: "linear-gradient(145deg, #2a2a31 0%, #cfd3da 35%, #6a6f78 55%, #e8eaf0 80%, #1a1a1f 100%)" }}>
            {/* neon ring */}
            <div className={`relative h-full w-full overflow-hidden rounded-full bg-black ring-glow-${color} neon-pulse`}>
              {/* clock face */}
              <div className="absolute inset-[8%] rounded-full bg-gradient-to-b from-zinc-900 to-black flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {photoUrl && (
                  <>
                    <img src={photoUrl} alt="Your uploaded design" className="absolute inset-0 h-full w-full rounded-full object-cover" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
                  </>
                )}
                <div className="relative">
                  {stable && (
                    <div
                      className="font-display uppercase leading-tight tracking-wide"
                      style={{
                        color: `var(--neon-${color})`,
                        textShadow: `0 0 8px var(--neon-${color}), 0 0 18px var(--neon-${color})`,
                        fontSize: Math.max(14, size * 0.07),
                      }}
                    >
                      {stable}
                    </div>
                  )}
                  {horse && (
                    <div className="mt-1 text-white/85 font-semibold" style={{ fontSize: Math.max(10, size * 0.038) }}>
                      {horse}
                    </div>
                  )}
                  {trainer && (
                    <div className="mt-0.5 text-white/55 uppercase tracking-widest" style={{ fontSize: Math.max(8, size * 0.028) }}>
                      {trainer}
                    </div>
                  )}
                  {!stable && !horse && !trainer && (
                    <div className="text-white/75 uppercase tracking-widest text-xs">Your Stable Name</div>
                  )}
                </div>
                {/* hands */}
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="absolute h-[2px] w-[34%] origin-left bg-white/80 rounded"
                    style={{ transform: "translateX(0) rotate(-70deg)", left: "50%" }} />
                  <div className="absolute h-[2px] w-[24%] origin-left bg-white/90 rounded"
                    style={{ transform: "translateX(0) rotate(40deg)", left: "50%" }} />
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
              {/* glass highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(ellipse at 30% 18%, rgba(255,255,255,0.22) 0%, transparent 38%)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
