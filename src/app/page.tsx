import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
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
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-clinic-dark">
      {/* HEADER EDITORIAL */}
      <header className="w-full border-b border-clinic-line bg-clinic-dark">
        <div className="mx-auto flex min-h-[70px] max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:min-h-[76px] lg:px-10">
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
              Agendar consulta{" "}
              <ArrowDown className="ml-1 inline h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* SPLIT-SCREEN PRINCIPAL */}
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA (OSCURA — DOSSIER CLÍNICO Y PROCEDIMIENTOS) */}
        <section className="relative flex min-w-0 max-w-full flex-col border-b border-clinic-line bg-clinic-dark px-5 py-9 sm:px-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
          <div className="pointer-events-none absolute right-5 top-9 font-mono text-[10px] text-clinic-bronze/60 sm:right-8 lg:top-12">
            01 / 07
          </div>

          {/* PRESENTACIÓN PRINCIPAL */}
          <div className="w-full max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
              Consulta privada · Manabí
            </p>
            <h1 className="mt-7 font-display text-5xl leading-[0.88] text-clinic-ivory sm:mt-10 sm:text-6xl lg:text-7xl">
              Alexander
              <br />
              <em className="text-clinic-bronze">Zambrano.</em>
            </h1>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/60 sm:mt-7">
              Odontólogo · Rehabilitación Oral y Estética
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-clinic-ivory/70 sm:mt-8">
              {clinic.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-l border-clinic-bronze pl-3.5 font-mono text-[10px] uppercase tracking-widest text-clinic-ivory/50">
              <span>Formación: ECU · COL · BRA</span>
              <span className="text-clinic-bronze">·</span>
              <span>Cita previa</span>
            </div>
          </div>

          {/* CATÁLOGO DE PROCEDIMIENTOS (Arriba para acceso rápido en móvil y desktop) */}
          <div className="mt-12 w-full">
            <div className="mb-4 flex items-center justify-between border-b border-clinic-line pb-3 sm:mb-5">
              <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-ivory/50">
                Procedimientos clínicos
              </p>
              <span className="font-mono text-[9px] uppercase tracking-widest text-clinic-bronze">
                Seleccione para agendar ↗
              </span>
            </div>
            <ProcedureList />
          </div>

          {/* PERFIL BIOGRÁFICO Y PREPARACIÓN PROFESIONAL */}
          <div className="mt-12 border-t border-clinic-line pt-10">
            <div className="grid gap-6 sm:grid-cols-[150px_1fr] sm:items-start">
              <div className="w-full max-w-[210px] sm:max-w-none">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-clinic-line bg-[#1C1C1A]">
                  <Image
                    src="/doctor.png"
                    alt="Od. Alexander Zambrano durante una atención odontológica"
                    fill
                    sizes="(max-width: 640px) 210px, 150px"
                    className="object-cover object-top grayscale-[12%] contrast-[1.03]"
                  />
                </div>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-clinic-ivory/40">
                  Od. Alexander Zambrano
                </p>
              </div>

              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  Sobre el especialista
                </p>
                <p className="mt-3 text-sm leading-7 text-clinic-ivory/70">
                  Profesional comprometido con la excelencia clínica, la
                  actualización constante y el cuidado integral de la salud
                  oral, fortaleciendo su práctica mediante formaciones
                  especializadas en Ecuador, Colombia y Brasil.
                </p>
                <p className="mt-3 text-sm leading-7 text-clinic-ivory/70">
                  Cuenta con especialización en Rehabilitación Oral en Brasil y
                  dedicación enfocada en Ortodoncia, empleando materiales de
                  alta precisión para devolver función, armonía y estética a
                  cada sonrisa.
                </p>
              </div>
            </div>

            <blockquote className="mt-6 border-l border-clinic-bronze/60 pl-4 font-display text-lg italic leading-relaxed text-clinic-ivory/80">
              “Cada sonrisa es única y merece una atención personalizada, basada
              en el conocimiento, la dedicación y la confianza.”
            </blockquote>

            <div className="mt-8 border-t border-clinic-line pt-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  Preparación internacional y continua
                </p>
                <span className="font-mono text-[9px] uppercase tracking-widest text-clinic-ivory/40">
                  01 — 09
                </span>
              </div>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-xs leading-5 text-clinic-ivory/65 sm:grid-cols-2">
                {credentials.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-baseline gap-2.5 border-b border-clinic-line/60 pb-2"
                  >
                    <span className="shrink-0 font-mono text-[10px] text-clinic-bronze">
                      {item.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      {item.title}{" "}
                      <span className="font-mono text-[9px] uppercase tracking-wider text-clinic-ivory/40">
                        · {item.country}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SEDES FÍSICAS AL PIE DE LA COLUMNA IZQUIERDA */}
          <div className="mt-10 grid w-full gap-6 border-t border-clinic-line pt-8 text-xs text-clinic-ivory/55 sm:grid-cols-2">
            {clinic.locations.map((location) => (
              <div key={location.name} className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
                  Sede {location.name}
                </p>
                <p className="mt-2 font-medium text-clinic-ivory/85">
                  {location.label}
                </p>
                <p className="mt-1">{location.address}</p>
                <p className="mt-1">{location.hours}</p>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-clinic-bronze transition-colors hover:text-clinic-ivory"
                >
                  Abrir ubicación <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMNA DERECHA (CLARA — FORMULARIO STICKY EN DESKTOP) */}
        <section
          id="reserva"
          className="min-w-0 max-w-full scroll-mt-4 bg-clinic-paper px-5 pb-28 pt-10 text-clinic-ink sm:px-8 lg:sticky lg:top-0 lg:col-span-7 lg:self-start lg:px-14 lg:py-14 xl:px-16"
        >
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-10 flex items-end justify-between border-b border-clinic-ink/15 pb-5 sm:mb-12">
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

            {/* PROTOCOLO DE ATENCIÓN E INDICACIONES PREVIAS */}
            <div className="mt-12 border-t border-clinic-ink/15 pt-8">
              <p className="font-mono text-[10px] uppercase tracking-editorial text-[#8A6B2F]">
                Indicaciones para su consulta
              </p>
              <div className="mt-4 grid gap-4 text-xs leading-relaxed text-clinic-ink/70 sm:grid-cols-3">
                <div className="border-l border-clinic-ink/20 pl-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-clinic-ink">
                    01 Asistencia
                  </p>
                  <p className="mt-1">
                    Presentarse 10 minutos antes. Si dispone de radiografías
                    recientes, traerlas a su cita.
                  </p>
                </div>
                <div className="border-l border-clinic-ink/20 pl-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-clinic-ink">
                    02 Modalidades de pago
                  </p>
                  <p className="mt-1">
                    Efectivo y transferencia bancaria directa (Pichincha,
                    Guayaquil o Deuna).
                  </p>
                </div>
                <div className="border-l border-clinic-ink/20 pl-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-clinic-ink">
                    03 Reprogramación
                  </p>
                  <p className="mt-1">
                    Notificar cualquier cambio de horario con al menos 12 horas
                    de anticipación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}