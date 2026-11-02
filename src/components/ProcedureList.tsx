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
    const treatmentParam = new URLSearchParams(window.location.search).get("tratamiento");
    const treatmentIndex = treatmentParam ? Number(treatmentParam) - 1 : -1;
    if (treatmentIndex >= 0 && treatmentIndex < clinic.treatments.length) {
      setSelected(clinic.treatments[treatmentIndex].name);
    }
    return () => window.removeEventListener("clinic-treatment-selected", handleSelection);
  }, []);

  const selectTreatment = (treatment: Treatment) => {
    setSelected(treatment);
    window.dispatchEvent(new CustomEvent<Treatment>("clinic-treatment-selected", { detail: treatment }));
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ol>
      {clinic.treatments.map((treatment, index) => (
        <li key={treatment.name}>
          <button
            type="button"
            onClick={() => selectTreatment(treatment.name)}
            className={`group flex w-full items-center gap-4 border-b border-clinic-line py-3.5 text-left text-sm transition-colors ${
              selected === treatment.name ? "text-clinic-bronze" : "text-clinic-ivory/70 hover:text-clinic-ivory"
            }`}
          >
            <span className="font-mono text-[10px] text-clinic-bronze">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex-1">
              <span className="block">{treatment.name}</span>
              <span className={`block overflow-hidden transition-all duration-300 ${selected === treatment.name ? "mt-2 max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                <span className="block space-y-1 font-mono text-xs text-clinic-bronze">
                  <span className="block">{treatment.duration}</span>
                  <span className="block font-sans text-xs leading-5 text-clinic-ivory/50">{treatment.detail}</span>
                </span>
              </span>
            </span>
            <ArrowUpRight className={`h-3.5 w-3.5 transition-colors ${selected === treatment.name ? "text-clinic-bronze" : "text-clinic-ivory/20 group-hover:text-clinic-bronze"}`} />
          </button>
        </li>
      ))}
    </ol>
  );
}
