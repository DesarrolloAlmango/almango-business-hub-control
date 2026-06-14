// src/components/subastas/subastaUtils.ts

export function getBadgeVariant(estado: string) {
  switch (estado) {
    case "borrador":
      return "secondary";
    case "publicada":
      return "default";
    case "en_revision":
      return "sand";
    case "en_postulacion":
      return "blue";
    case "adjudicada":
      return "purple";
    case "en_progreso":
      return "amber";
    case "finalizada":
      return "green";
    case "cancelada":
      return "sand";
    default:
      return "default";
  }
}

export function getBadgeClass(estado: string) {
  switch (estado) {
    case "borrador":
      return "";
    case "publicada":
      return "";
    case "en_revision":
      return "";
    case "en_postulacion":
      return "border-blue-400 text-blue-600";
    case "adjudicada":
      return "border-purple-400 text-purple-600";
    case "en_progreso":
      return "border-amber-400 text-amber-600";
    case "finalizada":
      return "border-green-400 text-green-600";
    case "cancelada":
      return "!border-green-400 text-green-600";
    default:
      return "";
  }
}

export function getEstadoText(estado: string) {
  switch (estado) {
    case "borrador":
      return "Borrador";
    case "publicada":
      return "Publicada";
    case "en_revision":
      return "En Revisión";
    case "en_postulacion":
      return "En Postulación";
    case "adjudicada":
      return "Adjudicada";
    case "en_progreso":
      return "En Progreso";
    case "finalizada":
      return "Finalizada";
    case "cancelada":
      return "Cancelada";
    case "activa":
      return "Activa";
    default:
      return estado;
  }
}

export function getSubastaText(modalidad: string) {
  switch (modalidad) {
    case "subasta":
      return "Subasta";
    case "oferta":
      return "Oferta";
    default:
      return modalidad;
  }
}

// Archivo de mocks para subastas
// src/components/subastas/mockSubastas.ts

export const MOCK_SUBASTAS = [
  {
    id: "1",
    titulo: "Remodelación de oficina central",
    consultas: 3,
    estado: "adjudicada",
    rubro: "construccion",
    tipo_precio: "fijo",
    precio_base: 15000,
    fecha_fin_postulacion: "2025-07-15",
    fecha_entrega: "2025-09-30",
    fecha_desde: "2025-07-15",
    fecha_hasta: "2025-09-30",
    fecha_cierre: "2025-09-30",
    ubicacion: "canelones",
    trabajos: 5,
    progreso: 70,
    modalidad: "subasta",
    moneda: "uyu",
    postulantes: [
      {
        id: "p1",
        proveedor: "Constructora ABC",
        avatar: "CA",
        monto: 15800,
        fechaEntrega: "2025-10-01",
        rating: 4.7,
        estado: "pendiente",
        propuesta: "Ofrecemos un servicio rápido con materiales de calidad superior y acabados premium.",
        incluye_capacitacion: true,
        incluye_garantia: true,
        incluye_postventa: true,
      },
      {
        id: "p2",
        proveedor: "Soluciones Integrales",
        avatar: "SI",
        monto: 14200,
        fechaEntrega: "2025-10-10",
        rating: 4.9,
        estado: "pendiente",
        propuesta: "Nuestra propuesta incluye diseño personalizado con materiales ecológicos.",
        incluye_capacitacion: true,
        incluye_garantia: false,
        incluye_postventa: true,
      },
    ],
  },
  {
    id: "2",
    titulo: "Desarrollo de aplicación móvil",
    consultas: 0,
    estado: "adjudicada",
    rubro: "construccion",
    tipo_precio: "mejor_oferta",
    precio_base: null,
    fecha_fin_postulacion: "2025-06-20",
    fecha_entrega: "2025-08-15",
    fecha_cierre: "2025-09-30",
    trabajos: 8,
    progreso: 45,
    modalidad: "subasta",
    fecha_desde: "2025-07-15",
    fecha_hasta: "2025-09-30",
    ubicacion: "montevideo",
    moneda: "usd",
    postulantes: [],
  },
  {
    id: "3",
    titulo: "Desarrollo de aplicación móvil",
    consultas: 0,
    estado: "adjudicada",
    rubro: "construccion",
    tipo_precio: "mejor_oferta",
    precio_base: null,
    fecha_fin_postulacion: "2025-06-20",
    fecha_entrega: "2025-08-15",
    fecha_cierre: "2025-09-30",
    trabajos: 8,
    progreso: 45,
    modalidad: "subasta",
    fecha_desde: "2025-07-15",
    fecha_hasta: "2025-09-30",
    ubicacion: "montevideo",
    moneda: "usd",
    postulantes: [],
  },
  {
    id: "4",
    titulo: "Desarrollo de aplicación móvil",
    consultas: 1,
    estado: "adjudicada",
    rubro: "construccion",
    tipo_precio: "mejor_oferta",
    precio_base: null,
    fecha_fin_postulacion: "2025-06-20",
    fecha_entrega: "2025-08-15",
    fecha_cierre: "2025-09-30",
    trabajos: 8,
    progreso: 45,
    modalidad: "subasta",
    fecha_desde: "2025-07-15",
    fecha_hasta: "2025-09-30",
    ubicacion: "montevideo",
    moneda: "usd",
    postulantes: [],
  },
  {
    id: "5",
    titulo: "Mantenimiento sistema HVAC",
    consultas: 3,
    estado: "adjudicada",
    rubro: "construccion",
    tipo_precio: "fijo",
    precio_base: 3500,
    fecha_fin_postulacion: "2025-05-28",
    fecha_entrega: "2025-06-30",
    trabajos: 3,
    progreso: 20,
    modalidad: "oferta",
    fecha_desde: "2025-07-15",
    fecha_hasta: "2025-09-30",
    fecha_cierre: "2025-09-30",
    ubicacion: "montevideo",
    postulantes: [
      {
        id: "p5",
        proveedor: "Tech Solutions",
        avatar: "TS",
        monto: 22500,
        fechaEntrega: "2025-08-15",
        rating: 4.5,
        estado: "seleccionada",
        propuesta: "Ofrecemos desarrollo ágil con actualizaciones semanales y soporte técnico.",
        incluye_capacitacion: true,
        incluye_garantia: true,
        incluye_postventa: true,
      },
    ],
  },
  {
    id: "6",
    titulo: "Servicio de limpieza anual",
    consultas: 2,
    estado: "finalizada",
    rubro: "otros",
    tipo_precio: "fijo",
    precio_base: 12000,
    fecha_fin_postulacion: "2025-04-15",
    fecha_entrega: "2025-05-01",
    trabajos: 4,
    progreso: 100,
    modalidad: "oferta",
    fecha_desde: "2025-07-15",
    fecha_hasta: "2025-09-30",
    fecha_cierre: "2025-09-30",
    ubicacion: "canelones",
    moneda: "uyu",
    postulantes: [
      {
        id: "p6",
        proveedor: "Servicios Técnicos",
        avatar: "ST",
        monto: 8900,
        fechaEntrega: "2025-07-30",
        rating: 4.2,
        estado: "rechazada",
        propuesta: "Servicio completo de revisión y mantenimiento con piezas originales.",
        incluye_capacitacion: false,
        incluye_garantia: true,
        incluye_postventa: false,
      },
    ],
  },
];
