import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { BookingSystem } from "@/components/BookingSystem";
import { ProcedureList } from "@/components/ProcedureList";
import { clinic } from "@/config/clinic";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Od. Alexander Zambrano — Rehabilitación Oral y Estética",
    description: clinic.description,
    areaServed: ["Portoviejo", "Canuto", "Manabí", "Ecuador"],
    medicalSpecialty: "Dentistry",
  };

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-clinic-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="w-full border-b border-clinic-line bg-clinic-dark">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:min-h-[72px] lg:px-10">
          <a
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label="Od. Alexander Zambrano, inicio"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 30"
              className="h-7 w-5 shrink-0 text-clinic-bronze sm:h-8 sm:w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            >
              <path d="M5.5 4.5c1.7-2 4.2-2 6.5 0 2.3-2 4.8-2 6.5 0 2.2 1.8 1.7 5.3 1 8.3-.8 3.2-1.6 6.3-3.8 6.3-1.8 0-2.3-3.2-3.7-3.2s-1.9 3.2-3.7 3.2c-2.2 0-3-3.1-3.8-6.3-.7-3-1.2-6.5 1-8.3Z" />
              <path d="M8.5 5.5c.3-1.5 1.1-2.7 2.2-3.5M15.5 5.5c-.3-1.5-1.1-2.7-2.2-3.5" />
            </svg>
            <span className="min-w-0 leading-none">
              <span className="block truncate font-display text-lg tracking-wide text-clinic-ivory sm:text-xl">
                Od. Alexander Zambrano
              </span>
              <span className="mt-1 block truncate font-mono text-[8px] uppercase tracking-[0.2em] text-clinic-bronze sm:text-[9px] sm:tracking-[0.25em]">
                Rehabilitación Oral y Estética
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/60 md:block">
              Portoviejo <span className="text-clinic-bronze">—</span> Canuto
            </span>
            <a
              href="#reserva"
              className="shrink-0 font-mono text-[9px] uppercase tracking-editorial text-clinic-bronze transition-colors hover:text-clinic-ivory sm:text-[10px]"
            >
              Agendar <span className="hidden xs:inline">consulta</span>{" "}
              <ArrowDown className="ml-0.5 inline h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      <div className="grid min-h-screen w-full max-w-full grid-cols-1 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA (OSCURA) */}
        <section className="relative flex min-w-0 max-w-full flex-col border-b border-clinic-line bg-clinic-dark px-5 py-9 sm:px-8 lg:sticky lg:top-0 lg:col-span-5 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-10 lg:py-12 lg:[&::-webkit-scrollbar]:hidden lg:[-ms-overflow-style:none] lg:[scrollbar-width:none]">
          <div className="pointer-events-none absolute right-5 top-9 font-mono text-[10px] text-clinic-bronze/60 sm:right-8 lg:top-12">
            01 / 07
          </div>

          <div className="w-full max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
              Consulta privada · Manabí
            </p>
            <h1 className="mt-7 font-display text-5xl leading-[0.88] text-clinic-ivory sm:mt-10 sm:text-6xl lg:text-7xl">
              Alexander
              <br />
              <em className="text-clinic-bronze">Zambrano.</em>
            </h1>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/55 sm:mt-7">
              Odontólogo · Rehabilitación Oral y Estética
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-clinic-ivory/65 sm:mt-8">
              {clinic.description}
            </p>
          </div>

          <div className="mt-10 w-full sm:mt-12">
            <div className="mb-4 flex items-center justify-between border-b border-clinic-line pb-3 sm:mb-5">
              <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/45">
                Procedimientos
              </p>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-clinic-bronze" />
            </div>
            <ProcedureList />
          </div>

          <div className="mt-10 grid w-full gap-6 border-t border-clinic-line pt-6 text-xs text-clinic-ivory/50 sm:grid-cols-2">
            {clinic.locations.map((location) => (
              <div key={location.name} className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  {location.name}
                </p>
                <p className="mt-2 text-clinic-ivory/75">{location.label}</p>
                <p className="mt-1">{location.address}</p>
                <p className="mt-1">{location.hours}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMNA DERECHA (CLARA - FORMULARIO) */}
        <section
          id="reserva"
          className="min-w-0 max-w-full scroll-mt-4 bg-clinic-paper px-5 pb-24 pt-10 text-clinic-ink sm:px-8 lg:col-span-7 lg:px-16 lg:py-16"
        >
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-10 flex items-end justify-between border-b border-clinic-ink/15 pb-5 sm:mb-12">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  Solicitud de cita
                </p>
                <h2 className="mt-3 font-display text-4xl leading-none sm:mt-4 sm:text-5xl">
                  Reserve su <em>consulta.</em>
                </h2>
              </div>
              <MapPin
                className="mb-1 h-5 w-5 shrink-0 text-clinic-bronze"
                strokeWidth={1}
              />
            </div>
            <BookingSystem />
          </div>
        </section>
      </div>
    </main>
  );
}