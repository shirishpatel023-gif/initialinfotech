import { Info } from "lucide-react";

export function LocationBar() {
  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2.5 text-center text-xs sm:text-sm font-bold transition-all shadow-inner flex items-center justify-center gap-2">
      <Info className="h-4 w-4 shrink-0 text-slate-900" />
      <span>
        Important Notice: We will be relocating to a new office in 2029. Our new address will be published once construction is complete.
      </span>
    </div>
  );
}
