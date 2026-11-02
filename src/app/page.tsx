import Image from "next/image";
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
            <span className="relative block h-14 w-48">
              <Image src="/logo.jpg" alt="Od. Alexander Zambrano" width={240} height={70} sizes="192px" className="h-14 w-auto object-contain object-left mix-blend-lighten contrast-125 brightness-110" priority />
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.16em] text-clinic-ivory/55 sm:block">Od. Alexander<br />Zambrano</span>
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
        <section className="relative flex min-h-[calc(100vh-73px)] flex-col border-b border-clinic-line bg-clinic-dark px-5 py-16 lg:sticky lg:top-0 lg:col-span-5 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
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

        <section id="reserva" className="scroll-mt-6 bg-clinic-paper px-5 py-12 text-clinic-ink sm:px-8 lg:col-span-7 lg:px-16 lg:py-16">
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
