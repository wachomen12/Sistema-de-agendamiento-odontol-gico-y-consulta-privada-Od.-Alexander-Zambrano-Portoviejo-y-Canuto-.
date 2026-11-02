import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { BookingSystem } from "@/components/BookingSystem";
import { ProcedureList } from "@/components/ProcedureList";
import { clinic } from "@/config/clinic";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-clinic-dark">
      <header className="border-b border-clinic-line bg-clinic-dark">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
          <a href="/" className="flex items-center gap-3" aria-label="Od. Alexander Zambrano, inicio">
            <svg aria-hidden="true" viewBox="0 0 24 30" className="h-8 w-6 shrink-0 text-clinic-bronze" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M5.5 4.5c1.7-2 4.2-2 6.5 0 2.3-2 4.8-2 6.5 0 2.2 1.8 1.7 5.3 1 8.3-.8 3.2-1.6 6.3-3.8 6.3-1.8 0-2.3-3.2-3.7-3.2s-1.9 3.2-3.7 3.2c-2.2 0-3-3.1-3.8-6.3-.7-3-1.2-6.5 1-8.3Z" />
              <path d="M8.5 5.5c.3-1.5 1.1-2.7 2.2-3.5M15.5 5.5c-.3-1.5-1.1-2.7-2.2-3.5" />
            </svg>
            <span className="leading-none">
              <span className="block font-display text-xl tracking-wide text-clinic-ivory">Od. Alexander Zambrano</span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.25em] text-clinic-bronze">Rehabilitación Oral y Estética</span>
            </span>
          </a>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/60 sm:block">
              Portoviejo <span className="text-clinic-bronze">—</span> Canuto
            </span>
            <a href="#reserva" className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze transition-colors hover:text-clinic-ivory">
              Agendar consulta <ArrowDown className="ml-1 inline h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      <div className="grid min-h-screen w-full lg:grid-cols-12">
        <section className="relative flex min-h-[calc(100vh-73px)] flex-col border-b border-clinic-line bg-clinic-dark px-5 py-8 lg:sticky lg:top-0 lg:col-span-5 lg:h-screen lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden lg:[-ms-overflow-style:none] lg:[scrollbar-width:none] lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
          <div className="pointer-events-none absolute right-8 top-12 hidden font-mono text-[10px] text-clinic-bronze/60 lg:block">01 / 07</div>
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">Consulta privada · Manabí</p>
            <h1 className="mt-10 max-w-md font-display text-6xl leading-[0.86] text-clinic-ivory sm:text-7xl">
              Alexander
              <br />
              <em className="text-clinic-bronze">Zambrano.</em>
            </h1>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/55">
              Odontólogo · Rehabilitación Oral y Estética
            </p>
            <p className="mt-8 max-w-md text-sm leading-7 text-clinic-ivory/65">{clinic.description}</p>
          </div>

          <div className="mt-12">
            <div className="mb-5 flex items-center justify-between border-b border-clinic-line pb-3">
              <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/45">Procedimientos</p>
              <ArrowUpRight className="h-4 w-4 text-clinic-bronze" />
            </div>
            <ProcedureList />
          </div>

          <div className="mt-10 grid gap-5 border-t border-clinic-line pt-5 text-xs text-clinic-ivory/50 sm:grid-cols-2">
            {clinic.locations.map((location) => (
              <div key={location.name}>
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">{location.name}</p>
                <p className="mt-2">{location.label}</p>
                <p className="mt-1">{location.address}</p>
                <p className="mt-1">{location.hours}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="reserva" className="scroll-mt-6 bg-clinic-paper px-5 py-8 text-clinic-ink sm:px-8 lg:col-span-7 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 flex items-end justify-between border-b border-clinic-ink/15 pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">Solicitud de cita</p>
                <h2 className="mt-4 font-display text-5xl leading-none">Reserve su <em>consulta.</em></h2>
              </div>
              <MapPin className="mb-1 h-5 w-5 text-clinic-bronze" strokeWidth={1} />
            </div>
            <BookingSystem />
          </div>
        </section>
      </div>
    </main>
  );
}
