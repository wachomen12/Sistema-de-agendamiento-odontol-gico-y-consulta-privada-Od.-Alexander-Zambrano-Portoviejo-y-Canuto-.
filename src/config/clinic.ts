export const clinic = {
  name: "Od. Alexander Zambrano",
  specialty: "Rehabilitación Oral y Estética",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593963143977",
  description:
    "Atención odontológica integral bajo cita previa. Diagnóstico preciso, rehabilitación funcional y estética dental en nuestras sedes de Portoviejo y Canuto.",
  locations: [
    {
      name: "Portoviejo",
      label: "Consultorio Principal",
      address: "Portoviejo, Manabí, Ecuador",
      hours: "Lunes, miércoles y viernes · 08:30 — 17:00",
      allowedDaysLabel: "Lunes, miércoles y viernes",
      allowedDays: [1, 3, 5] as readonly number[], // Lunes, miércoles y viernes
      timeSlots: [
        "08:30",
        "09:30",
        "10:30",
        "11:30",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ] as readonly string[],
      mapsUrl: "https://maps.app.goo.gl/6RfPukJ7kSSwp9bTA?g_st=iw",
    },
    {
      name: "Canuto",
      label: "Consultorio Local",
      address: "Canuto, Manabí, Ecuador",
      hours: "Martes, jueves y sábado · 09:00 — 16:00",
      allowedDaysLabel: "Martes, jueves y sábado",
      allowedDays: [2, 4, 6] as readonly number[], // Martes, jueves y sábado
      timeSlots: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "14:00",
        "15:00",
        "16:00",
      ] as readonly string[],
      mapsUrl: "https://maps.app.goo.gl/fficyQbv3Lw56QGBA?g_st=iw",
    },
  ],
  treatments: [
    {
      name: "Valoración odontológica",
      duration: "45 MIN",
      detail: "Evaluación clínica, diagnóstico inicial y orientación personalizada.",
    },
    {
      name: "Ortodoncia fija y removible",
      duration: "60 MIN",
      detail:
        "Evaluación y planificación de tratamientos con aparatología fija o removible.",
    },
    {
      name: "Control de ortodoncia",
      duration: "30 MIN",
      detail: "Seguimiento clínico y ajuste del tratamiento de ortodoncia.",
    },
    {
      name: "Restauración dental",
      duration: "60 MIN",
      detail:
        "Reparación de piezas dentales para recuperar función, forma y estética.",
    },
    {
      name: "Cirugía de terceros molares",
      duration: "90 MIN",
      detail:
        "Evaluación y planificación quirúrgica para la extracción de muelas del juicio.",
    },
    {
      name: "Extracción dental simple",
      duration: "45 MIN",
      detail: "Extracción de una pieza dental bajo evaluación clínica previa.",
    },
    {
      name: "Prótesis removible acrílica",
      duration: "60 MIN",
      detail:
        "Planificación y rehabilitación con prótesis removible de base acrílica.",
    },
    {
      name: "Prótesis removible de cromo-cobalto",
      duration: "60 MIN",
      detail:
        "Rehabilitación removible con estructura metálica de cromo-cobalto.",
    },
    {
      name: "Prótesis sobre implantes",
      duration: "60 MIN",
      detail:
        "Evaluación y planificación de una rehabilitación soportada sobre implantes.",
    },
    {
      name: "Coronas dentales",
      duration: "60 MIN",
      detail: "Restauración fija para proteger y recuperar la estructura dental.",
    },
    {
      name: "Puente dental",
      duration: "60 MIN",
      detail: "Reemplazo de piezas ausentes mediante una rehabilitación fija.",
    },
    {
      name: "Carillas dentales",
      duration: "60 MIN",
      detail:
        "Planificación estética para mejorar forma, proporción y armonía dental.",
    },
    {
      name: "Implantes dentales",
      duration: "60 MIN",
      detail:
        "Valoración y planificación para la reposición de piezas dentales ausentes.",
    },
    {
      name: "Limpieza dental",
      duration: "45 MIN",
      detail: "Profilaxis y eliminación cuidadosa de placa y depósitos dentales.",
    },
    {
      name: "Odontología preventiva infantil",
      duration: "45 MIN",
      detail:
        "Orientación y cuidado preventivo para proteger la salud oral de los niños.",
    },
    {
      name: "Endodoncia (tratamiento de conducto)",
      duration: "90 MIN",
      detail:
        "Tratamiento del tejido interno dental para conservar la pieza afectada.",
    },
    {
      name: "Otros tratamientos dentales",
      duration: "45 MIN",
      detail:
        "Evaluación de necesidades específicas y orientación sobre el tratamiento indicado.",
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