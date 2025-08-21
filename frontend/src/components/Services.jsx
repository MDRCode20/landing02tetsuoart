import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const servicios = [
  {
    titulo: "Remodelación de interiores",
    descripcion:
      "Transformamos tus espacios con estilo, funcionalidad y materiales de alta calidad. Ideal para hogares, oficinas o negocios.",
    beneficios: ["Diseño personalizado", "Acabados premium", "Entrega puntual"],
  },
  {
    titulo: "Instalación de puertas",
    descripcion:
      "Colocamos puertas modernas y resistentes con diseños minimalistas o clásicos, según tu estilo.",
    beneficios: [
      "Puertas de madera, metal y vidrio",
      "Aislamiento acústico",
      "Seguridad reforzada",
    ],
  },
  {
    titulo: "Diseño de closets",
    descripcion:
      "Creamos closets a medida que aprovechan cada rincón, con estilo y organización garantizada.",
    beneficios: [
      "Diseño 3D previo",
      "Materiales resistentes",
      "Optimización de espacio",
    ],
  },
  {
    titulo: "Asesoría técnica personalizada",
    descripcion:
      "Recibe orientación profesional para cualquier proyecto de mejora o renovación en tu hogar o empresa.",
    beneficios: [
      "Atención 1 a 1",
      "Recomendaciones técnicas",
      "Presupuesto claro",
    ],
  },
  {
    titulo: "Instalación de pisos",
    descripcion:
      "Colocamos pisos laminados, cerámicos o de madera con precisión y acabados impecables.",
    beneficios: [
      "Variedad de estilos",
      "Durabilidad garantizada",
      "Instalación rápida",
    ],
  },
  {
    titulo: "Pintura profesional de interiores y exteriores",
    descripcion:
      "Dale vida a tus espacios con acabados profesionales y colores que reflejan tu estilo.",
    beneficios: [
      "Asesoría en colorimetría",
      "Técnicas modernas",
      "Resistencia al desgaste",
    ],
  },
  {
    titulo: "Mantenimiento de estructuras",
    descripcion:
      "Conservamos y reparamos estructuras existentes para prolongar su vida útil.",
    beneficios: [
      "Evaluación técnica previa",
      "Reparaciones eficientes",
      "Prevención de daños futuros",
    ],
  },
  {
    titulo: "Diseño y fabricación de muebles a medida",
    descripcion:
      "Creamos muebles personalizados que se adaptan a tus necesidades y estilo de vida.",
    beneficios: [
      "Diseño exclusivo",
      "Materiales de calidad",
      "Funcionalidad y estilo",
    ],
  },
  {
    titulo: "Construcción de tabiquería drywall",
    descripcion:
      "Creamos divisiones funcionales y estéticas usando sistemas livianos y versátiles.",
    beneficios: [
      "Instalación limpia y rápida",
      "Aislamiento acústico",
      "Versatilidad en diseño",
    ],
  },
];

// Variantes para animaciones
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Servicios = () => {
  // Hook para detectar visibilidad
  const { ref, inView } = useInView({
    threshold: 0.2, // activa cuando 20% es visible
    triggerOnce: true, // ✅ solo la primera vez
  });

  return (
    <section
      id="servicios"
      ref={ref}
      className="bg-black text-white py-20 px-4 sm:px-6 lg:px-16"
    >
      <motion.h2
        className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }}
      >
        Nuestros Servicios
      </motion.h2>

      <div className="relative max-w-5xl md:max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, type: "fraction" }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="!pb-20"
          >
            {servicios.map((servicio, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  variants={cardVariants}
                  className="bg-white text-black p-4 sm:p-6 rounded-2xl shadow-xl h-full flex flex-col justify-between min-h-[320px] max-w-[80%] mx-auto md:max-w-none"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {servicio.titulo}
                    </h3>
                    <p className="mb-4 text-sm">{servicio.descripcion}</p>
                    <ul className="list-disc list-inside text-sm mb-4 space-y-1">
                      {servicio.beneficios.map((item, j) => (
                        <li key={j}>✔ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#contacto"
                    className="mt-auto bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-black border border-black transition-all inline-block text-center"
                  >
                    Cotizar servicio
                  </a>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* FLECHAS PERSONALIZADAS */}
        <button className="custom-prev absolute top-1/4 left-2 md:-left-17 z-10 text-white text-3xl bg-black/50 hover:bg-black p-2 rounded-full">
          <FaChevronLeft />
        </button>

        <button className="custom-next absolute top-1/4 right-2 md:-right-17 z-10 text-white text-3xl bg-black/50 hover:bg-black p-2 rounded-full">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Servicios;
