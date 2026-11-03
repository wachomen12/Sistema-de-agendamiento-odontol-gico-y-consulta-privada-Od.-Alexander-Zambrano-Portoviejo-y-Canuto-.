import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, Plus } from "lucide-react";
import { BookingSystem } from "@/components/BookingSystem";
import { ProcedureList } from "@/components/ProcedureList";
import { clinic } from "@/config/clinic";

const credentials = [
  { id: "01", title: "Rehabilitación oral y estética", country: "Brasil" },
  { id: "02", title: "Ortodoncia FACOP", country: "Brasil" },
  { id: "03", title: "OMI: restauración estética y estampados", country: "Colombia" },
  { id: "04", title: "Diplomado en cirugía dental", country: "Brasil" },
  { id: "05", title: "Levantamiento de margen profundo y table top", country: "Ecuador" },
  { id: "06", title: "Provisorios en rehabilitación", country: "Ecuador" },
  { id: "07", title: "Masterclass de cerámicas", country: "Ecuador" },
  { id: "08", title: "Incrustaciones directas e indirectas", country: "Colombia" },
  { id: "09", title: "Cursos avanzados de Ortodoncia", country: "Brasil" },
] as const;

export default function HomePage() {
  const totalTreatments = String(clinic.treatments.length).padStart(2, "0");

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-clinic-dark">
      {/* HEADER EDITORIAL */}
      <header className="w-full border-b border-clinic-line bg-clinic-dark">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:min-h-[76px] lg:px-10">
          <a
            href="/"
            className="flex min-w-0 items-center focus-visible:outline-none"
            aria-label="Od. Alexander Zambrano, inicio"
          >
            <span className="relative block h-11 w-44 overflow-hidden sm:h-12 sm:w-56">
              <Image
                src="/logo.jpg"
                alt="Od. Alexander Zambrano — Rehabilitación Oral y Estética"
                fill
                priority
                sizes="(max-width: 640px) 176px, 224px"
                className="scale-[1.55] object-cover object-center mix-blend-lighten contrast-125 brightness-110"
              />
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/60 md:block">
              Portoviejo <span className="text-clinic-bronze">—</span> Canuto
            </span>
            <a
              href="#reserva"
              className="shrink-0 border border-clinic-bronze/40 px-3 py-2 font-mono text-[9px] uppercase tracking-editorial text-clinic-bronze transition-colors hover:border-clinic-bronze hover:bg-clinic-bronze hover:text-clinic-dark sm:px-4 sm:text-[10px]"
            >
              Agendar cita <ArrowDown className="ml-1 inline h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* SPLIT-SCREEN PRINCIPAL */}
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA (OSCURA — PRESENTACIÓN Y CATÁLOGO) */}
        <section className="relative flex min-w-0 max-w-full flex-col border-b border-clinic-line bg-clinic-dark px-5 py-8 sm:px-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
          <div className="pointer-events-none absolute right-5 top-8 font-mono text-[10px] text-clinic-bronze/60 sm:right-8 lg:top-12">
            01 / {totalTreatments}
          </div>

          {/* HERO PRINCIPAL */}
          <div className="w-full max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
              Consulta privada · Manabí
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.88] text-clinic-ivory sm:mt-9 sm:text-6xl lg:text-7xl">
              Alexander
              <br />
              <em className="text-clinic-bronze">Zambrano.</em>
            </h1>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/60 sm:mt-6">
              Odontólogo · Rehabilitación Oral y Estética
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-clinic-ivory/70 sm:mt-6 sm:leading-7">
              {clinic.description}
            </p>
          </div>

          {/* =========================================================
              VERSIÓN MÓVIL (lg:hidden): TARJETA DESPLEGABLE COMPACTA
              ========================================================= */}
          <div className="mt-8 block border border-clinic-line bg-[#181816] p-4 lg:hidden">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3.5 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden border border-clinic-bronze/30 bg-[#1C1C1A]">
                    <Image
                      src="/doctor.png"
                      alt="Od. Alexander Zambrano"
                      fill
                      sizes="56px"
                      className="object-cover object-top grayscale-[10%] contrast-[1.05]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-editorial text-clinic-bronze">
                      Sobre el doctor
                    </p>
                    <p className="mt-0.5 font-display text-xl leading-tight text-clinic-ivory">
                      Trayectoria y formación
                    </p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-clinic-ivory/50">
                      Ecuador · Colombia · Brasil
                    </p>
                  </div>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-clinic-bronze/40 text-clinic-bronze transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </summary>

              <div className="mt-5 space-y-4 border-t border-clinic-line pt-4 text-xs leading-6 text-clinic-ivory/70">
                <p>
                  Soy un profesional comprometido con la excelencia, la
                  actualización constante y el cuidado integral de la salud
                  oral. He fortalecido mis conocimientos mediante cursos y
                  formaciones especializadas en Ecuador, Colombia y Brasil.
                </p>
                <p>
                  Cuento con formación especializada en Rehabilitación Oral en
                  Brasil y una dedicación especial a la Ortodoncia, trabajando
                  con materiales de alta calidad para mejorar la función, la
                  armonía y la estética de cada sonrisa.
                </p>

                <blockquote className="border-l border-clinic-bronze pl-3.5 font-display text-base italic leading-relaxed text-clinic-ivory/85">
                  “Cada sonrisa es única y merece una atención personalizada,
                  basada en el conocimiento, la dedicación y la confianza.”
                </blockquote>

                <div className="pt-2">
                  <p className="font-mono text-[9px] uppercase tracking-editorial text-clinic-bronze">
                    Preparación profesional (01 — 09)
                  </p>
                  <ul className="mt-3 grid gap-y-2 text-xs text-clinic-ivory/65">
                    {credentials.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-baseline gap-2 border-b border-clinic-line/40 pb-1.5"
                      >
                        <span className="shrink-0 font-mono text-[9px] text-clinic-bronze">
                          {item.id}
                        </span>
                        <span className="min-w-0 flex-1">
                          {item.title}{" "}
                          <span className="font-mono text-[9px] uppercase text-clinic-ivory/40">
                            · {item.country}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </div>

          {/* =========================================================
              VERSIÓN PC / DESKTOP (hidden lg:block): GRANDE Y COMPLETA
              ========================================================= */}
          <div className="mt-12 hidden border-y border-clinic-line py-8 lg:block">
            <div className="grid gap-7 sm:grid-cols-[minmax(145px,0.75fr)_1fr] sm:items-start">
              <div className="relative aspect-[4/5] overflow-hidden border border-clinic-line bg-[#1C1C1A]">
                <Image
                  src="/doctor.png"
                  alt="Od. Alexander Zambrano durante una atención odontológica"
                  fill
                  sizes="200px"
                  className="object-cover object-center grayscale-[12%] contrast-[1.03]"
                />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  Sobre el doctor
                </p>
                <p className="mt-4 text-sm leading-7 text-clinic-ivory/65">
                  Soy un profesional comprometido con la excelencia, la
                  actualización constante y el cuidado integral de la salud
                  oral. He fortalecido mis conocimientos mediante cursos y
                  formaciones especializadas en Ecuador, Colombia y Brasil.
                </p>
                <p className="mt-4 text-sm leading-7 text-clinic-ivory/65">
                  Cuento con formación especializada en Rehabilitación Oral en
                  Brasil y una dedicación especial a la Ortodoncia, trabajando
                  con materiales de alta calidad para mejorar la función, la
                  armonía y la estética de cada sonrisa.
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-clinic-ivory/65">
              Creo que cada sonrisa es única y merece una atención
              personalizada, basada en el conocimiento, la dedicación y la
              confianza. Mi propósito es cuidar tu sonrisa, devolverle su
              armonía y contribuir a tu bienestar.
            </p>

            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                Preparación profesional
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-3 text-xs leading-5 text-clinic-ivory/60 sm:grid-cols-2">
                {credentials.map((item) => (
                  <li key={item.id}>
                    <span className="mr-2 font-mono text-[10px] text-clinic-bronze">
                      {item.id}
                    </span>
                    {item.title} · {item.country}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LISTA DE PROCEDIMIENTOS */}
          <div className="mt-8 w-full lg:mt-10">
            <div className="mb-3 flex items-center justify-between border-b border-clinic-line pb-3 sm:mb-4">
              <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/50">
                Procedimientos ({totalTreatments})
              </p>
              <span className="font-mono text-[9px] uppercase tracking-widest text-clinic-bronze">
                Toque para elegir ↗
              </span>
            </div>
            <ProcedureList />
          </div>

          {/* SEDES AL PIE */}
          <div className="mt-8 grid w-full grid-cols-2 gap-4 border-t border-clinic-line pt-6 text-xs text-clinic-ivory/55 sm:gap-6">
            {clinic.locations.map((location) => (
              <div key={location.name} className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  {location.name}
                </p>
                <p className="mt-1.5 font-medium text-clinic-ivory/85">
                  {location.label}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed">
                  {location.hours}
                </p>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-clinic-bronze transition-colors hover:text-clinic-ivory"
                >
                  Google Maps <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMNA DERECHA (CLARA — FORMULARIO STICKY EN DESKTOP) */}
        <section
          id="reserva"
          className="min-w-0 max-w-full scroll-mt-2 bg-clinic-paper px-5 pb-28 pt-9 text-clinic-ink sm:px-8 lg:sticky lg:top-0 lg:col-span-7 lg:self-start lg:px-14 lg:py-14 xl:px-16"
        >
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-9 flex items-end justify-between border-b border-clinic-ink/15 pb-5 sm:mb-12">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-[#8A6B2F]">
                  Solicitud de cita
                </p>
                <h2 className="mt-3 font-display text-4xl leading-none sm:mt-4 sm:text-5xl">
                  Reserve su <em>consulta.</em>
                </h2>
              </div>
              <MapPin
                className="mb-1 h-5 w-5 shrink-0 text-[#8A6B2F]"
                strokeWidth={1.1}
              />
            </div>

            <BookingSystem />
          </div>
        </section>
      </div>
    </main>
  );
}