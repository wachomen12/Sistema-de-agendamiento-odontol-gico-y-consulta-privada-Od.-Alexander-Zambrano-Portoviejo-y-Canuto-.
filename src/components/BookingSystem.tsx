"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  MapPin,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { clinic, type LocationName, type Treatment } from "@/config/clinic";

type Booking = {
  location: LocationName | "";
  treatment: Treatment | "";
  date: string;
  time: string;
  name: string;
  phone: string;
  note: string;
};

const fallbackTimes = [
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

const patientStorageKey = "alexander-zambrano-patient";

function getLocalDateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Guayaquil",
  }).format(date);
}

function getLocationConfig(location: LocationName | "") {
  return clinic.locations.find((item) => item.name === location);
}

function getNextBusinessDays(location: LocationName | "") {
  const days: Date[] = [];
  const [year, month, day] = getLocalDateKey(new Date()).split("-").map(Number);
  const cursor = new Date(year, month - 1, day, 12);
  const allowedDays: readonly number[] =
    getLocationConfig(location)?.allowedDays ?? [1, 2, 3, 4, 5, 6];
  while (days.length < 5) {
    if (allowedDays.includes(cursor.getDay())) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function getEcuadorTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Guayaquil",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  return {
    date: getLocalDateKey(new Date()),
    hour: Number(parts.find((part) => part.type === "hour")?.value ?? 0),
    minute: Number(parts.find((part) => part.type === "minute")?.value ?? 0),
  };
}

function isTimeUnavailable(date: string, time: string) {
  if (!date) return false;
  const now = getEcuadorTime();
  if (date !== now.date) return false;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute <= now.hour * 60 + now.minute;
}

function isDateAllowedForLocation(date: string, location: LocationName | "") {
  if (!date) return true;
  const dayOfWeek = new Date(`${date}T12:00:00-05:00`).getDay();
  if (dayOfWeek === 0) return false;
  if (!location) return true;
  const allowedDays: readonly number[] =
    getLocationConfig(location)?.allowedDays ?? [];
  return allowedDays.includes(dayOfWeek);
}

function getAllowedDaysMessage(location: LocationName | "") {
  if (location === "Portoviejo") {
    return "En la sede Portoviejo la atención es únicamente lunes, miércoles y viernes (08:30 a 17:00).";
  }
  if (location === "Canuto") {
    return "En la sede Canuto la atención es únicamente martes, jueves y sábado (09:00 a 16:00).";
  }
  return "Los domingos no hay atención disponible. Seleccione otro día.";
}

function formatLongDate(value: string) {
  if (!value) return "Sin seleccionar";
  return new Intl.DateTimeFormat("es-EC", {
    dateStyle: "long",
    timeZone: "America/Guayaquil",
  }).format(new Date(`${value}T12:00:00-05:00`));
}

function buildReferenceCode(booking: Booking) {
  if (!booking.location || !booking.date || !booking.time) {
    return "AZ-PENDIENTE";
  }
  const locCode =
    booking.location.toLowerCase() === "portoviejo" ? "PVO" : "CAN";
  const [, month, day] = booking.date.split("-");
  const timeCode = booking.time.replace(":", "");
  return `AZ-${locCode}-${day}${month}-${timeCode}`;
}

export function BookingSystem() {
  const [booking, setBooking] = useState<Booking>({
    location: "",
    treatment: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof Booking, string>>
  >({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(true);
  const [, setClock] = useState(Date.now());
  const storageHydrated = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const activeLocation = useMemo(
    () => getLocationConfig(booking.location),
    [booking.location]
  );

  const activeTimeSlots: readonly string[] = useMemo(
    () => activeLocation?.timeSlots ?? fallbackTimes,
    [activeLocation]
  );

  const activeTreatmentRecord = useMemo(
    () => clinic.treatments.find((item) => item.name === booking.treatment),
    [booking.treatment]
  );

  const businessDays = useMemo(
    () => getNextBusinessDays(booking.location),
    [booking.location]
  );

  const businessDayKeys = useMemo(
    () => businessDays.map((d) => getLocalDateKey(d)),
    [businessDays]
  );

  const isCustomDateSelected =
    Boolean(booking.date) && !businessDayKeys.includes(booking.date);
  const referenceCode = buildReferenceCode(booking);

  useEffect(() => {
    try {
      const savedPatient = window.localStorage.getItem(patientStorageKey);
      if (savedPatient) {
        const patient = JSON.parse(savedPatient) as {
          name?: string;
          phone?: string;
        };
        setBooking((current) => ({
          ...current,
          name: patient.name ?? "",
          phone: patient.phone ?? "",
        }));
      }
    } catch {
      // Storage may be unavailable in private browsing contexts.
    } finally {
      storageHydrated.current = true;
    }
  }, []);

  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileCta(!entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(formElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!storageHydrated.current) return;
    try {
      window.localStorage.setItem(
        patientStorageKey,
        JSON.stringify({ name: booking.name, phone: booking.phone })
      );
    } catch {
      // Storage may be unavailable in private browsing contexts.
    }
  }, [booking.name, booking.phone]);

  useEffect(() => {
    const clock = window.setInterval(() => setClock(Date.now()), 60_000);
    const handleTreatmentSelection = (event: Event) => {
      const treatment = (event as CustomEvent<Treatment>).detail;
      setBooking((current) => ({ ...current, treatment }));
      const treatmentIndex = clinic.treatments.findIndex(
        (item) => item.name === treatment
      );
      const params = new URLSearchParams(window.location.search);
      params.set("tratamiento", String(treatmentIndex + 1).padStart(2, "0"));
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}${window.location.hash}`
      );
      if (window.matchMedia("(max-width: 1023px)").matches) {
        window.setTimeout(
          () =>
            document
              .querySelector("[data-booking-step='01']")
              ?.scrollIntoView({ behavior: "smooth", block: "start" }),
          350
        );
      }
    };

    window.addEventListener(
      "clinic-treatment-selected",
      handleTreatmentSelection
    );
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("sede")?.toLowerCase();
    const treatmentParam = params.get("tratamiento");
    const location = clinic.locations.find(
      (item) => item.name.toLowerCase() === locationParam
    )?.name;
    const treatmentIndex = treatmentParam ? Number(treatmentParam) - 1 : -1;
    const treatment =
      treatmentIndex >= 0 && treatmentIndex < clinic.treatments.length
        ? clinic.treatments[treatmentIndex].name
        : undefined;
    if (location || treatment) {
      setBooking((current) => ({
        ...current,
        location: location ?? current.location,
        treatment: treatment ?? current.treatment,
      }));
      if (treatment) {
        window.dispatchEvent(
          new CustomEvent<Treatment>("clinic-treatment-selected", {
            detail: treatment,
          })
        );
      }
    }
    return () => {
      window.clearInterval(clock);
      window.removeEventListener(
        "clinic-treatment-selected",
        handleTreatmentSelection
      );
    };
  }, []);

  const update = <Key extends keyof Booking>(key: Key, value: Booking[Key]) => {
    setBooking((current) => {
      const next = { ...current, [key]: value };

      if (key === "location" && value) {
        const nextLocConfig = getLocationConfig(value as LocationName);
        const nextAllowedTimeSlots: readonly string[] =
          nextLocConfig?.timeSlots ?? fallbackTimes;

        if (
          current.date &&
          !isDateAllowedForLocation(current.date, value as LocationName)
        ) {
          next.date = "";
        }
        if (current.time && !nextAllowedTimeSlots.includes(current.time)) {
          next.time = "";
        }
      }
      return next;
    });

    if (key === "location" && value) {
      const params = new URLSearchParams(window.location.search);
      params.set("sede", String(value).toLowerCase());
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}${window.location.hash}`
      );
      setFieldErrors((current) => ({
        ...current,
        location: "",
        date: "",
        time: "",
      }));
    } else if (key === "date" && value) {
      if (!isDateAllowedForLocation(String(value), booking.location)) {
        setFieldErrors((current) => ({
          ...current,
          date: getAllowedDaysMessage(booking.location),
        }));
      } else {
        setFieldErrors((current) => ({ ...current, date: "" }));
      }
    } else {
      setFieldErrors((current) => ({ ...current, [key]: "" }));
    }

    if (key === "treatment" && value) {
      window.dispatchEvent(
        new CustomEvent<Treatment>("clinic-treatment-selected", {
          detail: value as Treatment,
        })
      );
    }
    setError("");
    setSent(false);
    setCopied(false);
  };

  const createMessage = (phone: string) =>
    [
      "Hola Dr. Alexander Zambrano, le escribo desde su página web para solicitar una cita:",
      `- Sede: ${booking.location}`,
      `- Motivo: ${booking.treatment}`,
      `- Fecha solicitada: ${formatLongDate(booking.date)} a las ${booking.time}`,
      `- Paciente: ${booking.name.trim()} (${phone})`,
      booking.note.trim() ? `- Comentario: ${booking.note.trim()}` : "",
      `- Ref: ${referenceCode}`,
      "Quedo atento/a a su confirmación de disponibilidad.",
    ]
      .filter(Boolean)
      .join("\n");

  const downloadCalendar = () => {
    const start = new Date(`${booking.date}T${booking.time}:00-05:00`);
    const durationMinutes =
      Number(activeTreatmentRecord?.duration.replace(/\D/g, "")) || 60;
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    const formatIcsDate = (date: Date) =>
      date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
    const escapeIcs = (value: string) =>
      value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Alexander Zambrano//Booking//ES",
      "BEGIN:VEVENT",
      `UID:${referenceCode}@alexanderzambrano`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${escapeIcs("Consulta odontológica — Od. Alexander Zambrano")}`,
      `LOCATION:${escapeIcs(`Sede ${booking.location}, Manabí, Ecuador`)}`,
      `DESCRIPTION:${escapeIcs(`${booking.treatment} (${activeTreatmentRecord?.duration ?? "60 MIN"}) · Paciente: ${booking.name.trim()} · REF: ${referenceCode}`)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([ics], { type: "text/calendar;charset=utf-8" })
    );
    link.download = `cita-${referenceCode.toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const copySummary = async () => {
    const phone = booking.phone.replace(/\D/g, "");
    try {
      await navigator.clipboard.writeText(createMessage(phone));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(
        "No fue posible copiar el resumen. Puede seleccionarlo desde WhatsApp."
      );
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phone = booking.phone.replace(/\D/g, "");
    const nextErrors: Partial<Record<keyof Booking, string>> = {};
    if (!booking.location) nextErrors.location = "Seleccione una sede.";
    if (!booking.treatment)
      nextErrors.treatment = "Seleccione un procedimiento.";
    if (!booking.date) nextErrors.date = "Seleccione una fecha.";
    if (
      booking.date &&
      !isDateAllowedForLocation(booking.date, booking.location)
    ) {
      nextErrors.date = getAllowedDaysMessage(booking.location);
    }
    if (!booking.time) nextErrors.time = "Seleccione un horario.";
    if (!booking.name.trim())
      nextErrors.name = "Ingrese su nombre y apellido.";
    if (!phone) nextErrors.phone = "Ingrese su número celular.";
    if (phone && !/^09\d{8}$/.test(phone)) {
      nextErrors.phone = "Use un celular ecuatoriano de 10 dígitos.";
    }
    if (
      booking.date &&
      booking.time &&
      isTimeUnavailable(booking.date, booking.time)
    ) {
      nextErrors.time = "Este horario ya no está disponible hoy.";
    }
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setError("Revise los campos marcados antes de solicitar el turno.");
      return;
    }
    const message = createMessage(phone);
    setSent(true);
    const whatsappUrl = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <form
      ref={formRef}
      id="booking-form"
      onSubmit={submit}
      className="w-full max-w-full min-w-0 space-y-12 pb-12 lg:pb-0"
    >
      {/* PASO 01: SEDE */}
      <fieldset data-booking-step="01" className="min-w-0 w-full max-w-full">
        <legend className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-editorial text-clinic-ink/50">
          <span className="text-clinic-bronze">01</span> Sede de atención
        </legend>
        <div
          className="mt-5 grid w-full gap-3 sm:grid-cols-2"
          aria-describedby={fieldErrors.location ? "location-error" : undefined}
        >
          {clinic.locations.map((location) => {
            const isSelected = booking.location === location.name;
            return (
              <button
                type="button"
                key={location.name}
                aria-pressed={isSelected}
                onClick={() => update("location", location.name)}
                className={`group w-full min-w-0 border p-5 text-left transition-colors focus-visible:outline-none focus-visible:border-clinic-bronze ${
                  isSelected
                    ? "border-clinic-dark bg-clinic-dark text-clinic-ivory"
                    : "border-clinic-ink/20 bg-clinic-card hover:border-clinic-bronze"
                }`}
              >
                <span className="flex items-center justify-between font-display text-2xl">
                  {location.name}
                  {isSelected && (
                    <Check
                      className="h-4 w-4 shrink-0 text-clinic-bronze"
                      strokeWidth={1.5}
                    />
                  )}
                </span>
                <span
                  className={`mt-2 block text-xs ${
                    isSelected ? "text-clinic-ivory/65" : "text-clinic-ink/60"
                  }`}
                >
                  {location.label}
                </span>
                <span
                  className={`mt-2 block font-mono text-[10px] uppercase tracking-wider ${
                    isSelected ? "text-clinic-bronze" : "text-[#8A6B2F]"
                  }`}
                >
                  {location.hours}
                </span>
              </button>
            );
          })}
        </div>
        {activeLocation && (
          <div className="mt-4 border-l border-clinic-bronze pl-4 text-xs text-clinic-ink/60">
            <p className="text-[#8A6B2F]">
              {activeLocation.address} · {activeLocation.hours}
            </p>
            <a
              href={activeLocation.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-clinic-ink transition-colors hover:text-clinic-bronze focus-visible:outline-none focus-visible:border-clinic-bronze"
            >
              <MapPin
                className="h-3 w-3 shrink-0 text-clinic-bronze"
                strokeWidth={1.5}
              />{" "}
              Ver ubicación en Google Maps ↗
            </a>
          </div>
        )}
        {fieldErrors.location && (
          <p id="location-error" className="mt-3 text-xs text-[#8A6B2F]">
            {fieldErrors.location}
          </p>
        )}
      </fieldset>

      {/* PASO 02: PROCEDIMIENTO */}
      <fieldset data-booking-step="02" className="min-w-0 w-full max-w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <legend className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-editorial text-clinic-ink/50">
            <span className="text-clinic-bronze">02</span> Procedimiento
          </legend>
          {activeTreatmentRecord && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8A6B2F]">
              Duración est. · {activeTreatmentRecord.duration}
            </span>
          )}
        </div>
        <div className="relative mt-5 w-full">
          <label htmlFor="treatment" className="sr-only">
            Procedimiento
          </label>
          <select
            id="treatment"
            aria-invalid={Boolean(fieldErrors.treatment)}
            aria-describedby={
              fieldErrors.treatment ? "treatment-error" : undefined
            }
            value={booking.treatment}
            onChange={(event) =>
              update("treatment", event.target.value as Treatment)
            }
            className="w-full appearance-none truncate border-b border-clinic-ink/30 bg-transparent py-4 pr-7 text-base text-clinic-ink focus:outline-none focus-visible:border-clinic-bronze lg:text-sm"
          >
            <option value="">Seleccione un tratamiento</option>
            {clinic.treatments.map((treatment) => (
              <option key={treatment.name} value={treatment.name}>
                {treatment.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-1 top-4 h-4 w-4 text-clinic-bronze"
            strokeWidth={1.5}
          />
        </div>
        {activeTreatmentRecord && (
          <p className="mt-2.5 text-xs text-clinic-ink/60">
            {activeTreatmentRecord.detail}
          </p>
        )}
        {fieldErrors.treatment && (
          <p id="treatment-error" className="mt-3 text-xs text-[#8A6B2F]">
            {fieldErrors.treatment}
          </p>
        )}
      </fieldset>

      {/* PASO 03: FECHA Y BLOQUE HORARIO */}
      <fieldset data-booking-step="03" className="min-w-0 w-full max-w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <legend className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-editorial text-clinic-ink/50">
            <span className="text-clinic-bronze">03</span> Fecha y bloque horario
          </legend>
          {activeLocation && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8A6B2F]">
              {activeLocation.hours}
            </span>
          )}
        </div>

        <div className="mt-5 grid w-full grid-cols-3 gap-2 sm:grid-cols-6">
          {businessDays.map((day) => {
            const value = getLocalDateKey(day);
            return (
              <button
                type="button"
                key={value}
                aria-pressed={booking.date === value}
                onClick={() => update("date", value)}
                className={`min-h-[64px] w-full min-w-0 border px-2 py-3 text-center transition-colors focus-visible:outline-none focus-visible:border-clinic-bronze ${
                  booking.date === value
                    ? "border-clinic-dark bg-clinic-dark text-clinic-ivory"
                    : "border-clinic-ink/20 bg-clinic-card hover:border-clinic-bronze"
                }`}
              >
                <span className="block font-mono text-[9px] uppercase tracking-widest text-clinic-bronze">
                  {new Intl.DateTimeFormat("es-EC", {
                    weekday: "short",
                    timeZone: "America/Guayaquil",
                  })
                    .format(day)
                    .replace(".", "")}
                </span>
                <span className="mt-1 block font-display text-2xl">
                  {new Intl.DateTimeFormat("es-EC", {
                    day: "2-digit",
                    timeZone: "America/Guayaquil",
                  }).format(day)}
                </span>
              </button>
            );
          })}

          <label
            htmlFor="custom-date"
            className={`flex min-h-[64px] w-full min-w-0 cursor-pointer flex-col items-center justify-center border px-2 py-3 text-center transition-colors ${
              isCustomDateSelected
                ? "border-clinic-dark bg-clinic-dark text-clinic-ivory"
                : "border-dashed border-clinic-ink/30 bg-transparent hover:border-clinic-bronze"
            }`}
          >
            <CalendarDays
              className="h-4 w-4 text-clinic-bronze"
              strokeWidth={1.5}
            />
            <span className="mt-1.5 block truncate font-mono text-[9px] uppercase tracking-widest">
              {isCustomDateSelected
                ? booking.date.slice(5).split("-").reverse().join("/")
                : "Otra fecha"}
            </span>
            <input
              id="custom-date"
              type="date"
              aria-invalid={Boolean(fieldErrors.date)}
              aria-describedby={fieldErrors.date ? "date-error" : undefined}
              min={getLocalDateKey(new Date())}
              value={booking.date}
              onChange={(event) => update("date", event.target.value)}
              className="sr-only"
            />
          </label>
        </div>

        <div className="mt-5 grid w-full grid-cols-3 gap-2 sm:grid-cols-4">
          {activeTimeSlots.map((time) => {
            const unavailable = isTimeUnavailable(booking.date, time);
            return (
              <button
                type="button"
                key={time}
                disabled={unavailable}
                aria-pressed={booking.time === time}
                onClick={() => update("time", time)}
                className={`min-h-[48px] w-full min-w-0 border py-3 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:border-clinic-bronze ${
                  unavailable
                    ? "cursor-not-allowed opacity-30 line-through"
                    : booking.time === time
                      ? "border-clinic-dark bg-clinic-dark text-clinic-ivory"
                      : "border-clinic-ink/20 bg-clinic-card hover:border-clinic-bronze"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        {fieldErrors.date && (
          <p id="date-error" className="mt-3 text-xs text-[#8A6B2F]">
            {fieldErrors.date}
          </p>
        )}
        {fieldErrors.time && (
          <p id="time-error" className="mt-1 text-xs text-[#8A6B2F]">
            {fieldErrors.time}
          </p>
        )}
      </fieldset>

      {/* PASO 04: DATOS DEL PACIENTE */}
      <fieldset data-booking-step="04" className="min-w-0 w-full max-w-full">
        <legend className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-editorial text-clinic-ink/50">
          <span className="text-clinic-bronze">04</span> Datos del paciente
        </legend>
        <div className="mt-5 grid w-full gap-x-6 gap-y-7 sm:grid-cols-2">
          <label
            htmlFor="patient-name"
            className="min-w-0 border-b border-clinic-ink/30"
          >
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-clinic-ink/50">
              <UserRound className="h-3 w-3 shrink-0 text-clinic-bronze" />{" "}
              Nombre y apellido *
            </span>
            <input
              id="patient-name"
              autoComplete="name"
              maxLength={80}
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              value={booking.name}
              onChange={(event) => update("name", event.target.value)}
              className="w-full bg-transparent py-3 text-base focus:outline-none focus-visible:border-clinic-bronze lg:text-sm"
              placeholder="Su nombre completo"
            />
            {fieldErrors.name && (
              <span
                id="name-error"
                className="block pb-2 text-xs text-[#8A6B2F]"
              >
                {fieldErrors.name}
              </span>
            )}
          </label>

          <label
            htmlFor="patient-phone"
            className="min-w-0 border-b border-clinic-ink/30"
          >
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-clinic-ink/50">
              <MessageCircle className="h-3 w-3 shrink-0 text-clinic-bronze" />{" "}
              Celular *
            </span>
            <input
              id="patient-phone"
              type="tel"
              maxLength={10}
              required
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              inputMode="numeric"
              pattern="[0-9]*"
              value={booking.phone}
              onChange={(event) =>
                update(
                  "phone",
                  event.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              className="w-full bg-transparent py-3 text-base focus:outline-none focus-visible:border-clinic-bronze lg:text-sm"
              placeholder="0999999999"
            />
            {fieldErrors.phone && (
              <span
                id="phone-error"
                className="block pb-2 text-xs text-[#8A6B2F]"
              >
                {fieldErrors.phone}
              </span>
            )}
          </label>

          <label
            htmlFor="patient-note"
            className="min-w-0 border-b border-clinic-ink/30 sm:col-span-2"
          >
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-clinic-ink/50">
              <FileText className="h-3 w-3 shrink-0 text-clinic-bronze" /> Motivo
              o comentario{" "}
              <span className="normal-case tracking-normal">(opcional)</span>
            </span>
            <textarea
              id="patient-note"
              rows={2}
              maxLength={250}
              value={booking.note}
              onChange={(event) => update("note", event.target.value)}
              className="w-full resize-none bg-transparent py-3 text-base focus:outline-none focus-visible:border-clinic-bronze lg:text-sm"
              placeholder="Cuéntenos brevemente el motivo de su consulta"
            />
          </label>
        </div>
      </fieldset>

      {/* FICHA DE SOLICITUD */}
      <div className="w-full border border-dashed border-clinic-ink/35 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-editorial text-clinic-bronze">
            Ficha de solicitud
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-clinic-ink/45">
            REF // {referenceCode}
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-xs sm:grid-cols-4">
          <div className="min-w-0">
            <p className="text-clinic-ink/45">Sede</p>
            <p className="mt-1 truncate">{booking.location || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-clinic-ink/45">Procedimiento</p>
            <p className="mt-1 truncate">{booking.treatment || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-clinic-ink/45">Fecha</p>
            <p className="mt-1">
              {booking.date ? formatLongDate(booking.date) : "—"}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-clinic-ink/45">Hora</p>
            <p className="mt-1 font-mono">{booking.time || "—"}</p>
          </div>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {error}
        </p>
      )}

      {sent && (
        <div
          role="status"
          className="border-l-2 border-clinic-bronze bg-clinic-card px-4 py-4 text-sm"
        >
          <p>
            Solicitud preparada. Continúe la conversación en WhatsApp para
            confirmar disponibilidad.
          </p>
          <div className="mt-4 flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest sm:flex-row">
            <button
              type="button"
              onClick={downloadCalendar}
              className="text-left text-clinic-ink underline decoration-clinic-bronze underline-offset-4 transition-colors hover:text-clinic-bronze"
            >
              Descargar recordatorio para mi calendario (.ics)
            </button>
            <button
              type="button"
              onClick={copySummary}
              className="text-left text-clinic-ink underline decoration-clinic-bronze underline-offset-4 transition-colors hover:text-clinic-bronze"
            >
              {copied ? "Resumen copiado" : "Copiar resumen del turno"}
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2.5 bg-clinic-dark px-4 py-4 text-[11px] font-semibold uppercase tracking-editorial text-clinic-paper transition-colors duration-300 hover:bg-clinic-bronze hover:text-clinic-dark focus-visible:outline-none focus-visible:border-clinic-bronze sm:px-6 sm:text-xs"
      >
        <span>Solicitar turno vía WhatsApp</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </button>

      {/* INDICACIONES DE CONSULTA DESDE CLINIC.TS */}
      {"guidelines" in clinic && (
        <div className="border-t border-clinic-ink/15 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-editorial text-[#8A6B2F]">
            Indicaciones para su consulta
          </p>
          <div className="mt-4 grid gap-4 text-xs leading-relaxed text-clinic-ink/70 sm:grid-cols-3">
            {clinic.guidelines.map((item) => (
              <div
                key={item.title}
                className="border-l border-clinic-ink/20 pl-3"
              >
                <p className="font-mono text-[9px] uppercase tracking-widest text-clinic-ink">
                  {item.title}
                </p>
                <p className="mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showMobileCta && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-[#262624] bg-[#141413]/95 px-4 py-3 lg:hidden">
          <span className="min-w-0 pr-3 font-mono text-[10px] uppercase text-[#C5A059]">
            <span className="block truncate">
              {booking.location || "Sede pendiente"}
            </span>
            <span className="block truncate text-clinic-ivory/60">
              {booking.treatment || "Tratamiento pendiente"}
            </span>
          </span>
          <a
            href="#reserva"
            className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-clinic-ivory focus-visible:outline-none focus-visible:border-clinic-bronze"
          >
            Reservar ahora ↓
          </a>
        </div>
      )}
    </form>
  );
}