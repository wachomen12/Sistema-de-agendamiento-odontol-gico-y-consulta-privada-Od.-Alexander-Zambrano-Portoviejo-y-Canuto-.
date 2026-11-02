"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { clinic, type Treatment } from "@/config/clinic";

export function ProcedureList() {
  const [selected, setSelected] = useState<Treatment | "">("");

  useEffect(() => {
    const handleSelection = (event: Event) => {
      setSelected((event as CustomEvent<Treatment>).detail);
    };

    window.addEventListener("clinic-treatment-selected", handleSelection);
    const treatmentParam = new URLSearchParams(window.location.search).get(
      "tratamiento"
    );
    const treatmentIndex = treatmentParam ? Number(treatmentParam) - 1 : -1;
    if (treatmentIndex >= 0 && treatmentIndex < clinic.treatments.length) {
      setSelected(clinic.treatments[treatmentIndex].name);
    }
    return () =>
      window.removeEventListener("clinic-treatment-selected", handleSelection);
  }, []);

  const selectTreatment = (treatment: Treatment) => {
    setSelected(treatment);
    window.dispatchEvent(
      new CustomEvent<Treatment>("clinic-treatment-selected", {
        detail: treatment,
      })
    );
  };

  return (
    <ol className="w-full min-w-0">
      {clinic.treatments.map((treatment, index) => {
        const isSelected = selected === treatment.name;
        return (
          <li key={treatment.name} className="w-full min-w-0">
            <button
              type="button"
              aria-expanded={isSelected}
              onClick={() => selectTreatment(treatment.name)}
              className={`group flex w-full min-w-0 items-start justify-between gap-3 border-b border-clinic-line py-3.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:border-clinic-bronze sm:gap-4 ${
                isSelected
                  ? "text-clinic-bronze"
                  : "text-clinic-ivory/75 hover:text-clinic-ivory"
              }`}
            >
              <span className="mt-1 shrink-0 font-mono text-[10px] text-clinic-bronze">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block break-words leading-snug">
                  {treatment.name}
                </span>
                <span
                  className={`block overflow-hidden transition-all duration-300 ${
                    isSelected ? "mt-2 max-h-36 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <span className="block space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-clinic-bronze">
                      Duración est. · {treatment.duration}
                    </span>
                    <span className="block font-sans text-xs leading-relaxed text-clinic-ivory/55">
                      {treatment.detail}
                    </span>
                  </span>
                </span>
              </span>

              <ArrowUpRight
                className={`mt-1 h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
                  isSelected
                    ? "translate-x-0.5 -translate-y-0.5 text-clinic-bronze"
                    : "text-clinic-ivory/30 group-hover:text-clinic-bronze"
                }`}
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}