export const clinic = {
  name: "Od. Alexander Zambrano",
  specialty: "Rehabilitación Oral y Estética",
  // TODO: Reemplazar por el número real del Od. Alexander Zambrano
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593963143977",
  description:
    "Atención odontológica integral bajo cita previa. Diagnóstico preciso, rehabilitación funcional y estética dental en nuestras sedes de Portoviejo y Canuto.",
  locations: [
    {
      name: "Portoviejo",
      label: "Consultorio Principal",
      address: "Portoviejo, Manabí, Ecuador",
      hours: "Lun — Vie · 09:00 — 18:00",
      allowedDays: [1, 3, 5], // Lunes, miércoles y viernes
      timeSlots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Portoviejo%2C%20Manab%C3%AD%2C%20Ecuador",
    },
    {
      name: "Canuto",
      label: "Consultorio Local",
      address: "Canuto, Manabí, Ecuador",
      hours: "Martes, jueves y sábado · Bajo cita previa",
      allowedDays: [2, 4, 6], // Martes, jueves y sábado
      timeSlots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Canuto%2C%20Manab%C3%AD%2C%20Ecuador",
    },
  ],
  treatments: [
    {
      name: "Instalación de ortodoncia",
      duration: "60 MIN",
      detail: "Valoración, planificación inicial y colocación del sistema indicado.",
    },
    {
      name: "Consulta odontológica (Valoración inicial)",
      duration: "45 MIN",
      detail: "Revisión clínica, diagnóstico inicial y orientación de tratamiento.",
    },
    {
      name: "Control de ortodoncia",
      duration: "30 MIN",
      detail: "Seguimiento clínico y ajuste del tratamiento de ortodoncia.",
    },
    {
      name: "Limpieza dental",
      duration: "45 MIN",
      detail: "Evaluación, profilaxis y eliminación cuidadosa de depósitos.",
    },
    {
      name: "Restauración dental (Caries)",
      duration: "60 MIN",
      detail: "Tratamiento de la lesión y restauración funcional del diente.",
    },
    {
      name: "Cirugía dental",
      duration: "90 MIN",
      detail: "Evaluación preoperatoria y procedimiento quirúrgico indicado.",
    },
    {
      name: "Prótesis removible",
      duration: "60 MIN",
      detail: "Evaluación funcional y planificación de la rehabilitación removible.",
    },
  ],
  guidelines: [
    {
      title: "01 ASISTENCIA",
      text: "Presentarse 10 minutos antes del bloque seleccionado. Si dispone de radiografías panorámicas recientes, traerlas a la consulta.",
    },
    {
      title: "02 MODALIDADES DE PAGO",
      text: "Atención mediante efectivo y transferencia bancaria directa / Deuna.",
    },
    {
      title: "03 REPROGRAMACIÓN",
      text: "Cualquier cambio de horario debe notificarse con al menos 12 horas de anticipación.",
    },
  ],
} as const;

export type LocationName = (typeof clinic.locations)[number]["name"];
export type Treatment = (typeof clinic.treatments)[number]["name"];
export type TreatmentRecord = (typeof clinic.treatments)[number];