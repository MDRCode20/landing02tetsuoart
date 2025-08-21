import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // 👈 agregado
import "swiper/css";
import "swiper/css/pagination";

const testimonios = [
  {
    mensaje: "Excelente servicio, cumplieron con todo lo acordado y más.",
    autor: "Juan P.",
  },
  {
    mensaje: "Transformaron mi casa completamente. ¡Los recomiendo!",
    autor: "María L.",
  },
  {
    mensaje: "Muy profesionales y detallistas. El acabado fue perfecto.",
    autor: "Luis M.",
  },
  {
    mensaje: "Mi cocina parece otra. Los acabados son de lujo.",
    autor: "Ana G.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonios"
      className="py-26 bg-white text-black px-4 sm:px-8"
    >
      {/* 🎬 Animación al título */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-center mb-12"
      >
        Lo que dicen nuestros clientes
      </motion.h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        className="max-w-4xl mx-auto"
      >
        {testimonios.map((testimonio, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2, // 👈 animación escalonada
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="bg-gray-100 border border-gray-300 rounded-2xl shadow-lg p-6 h-full mx-4"
            >
              <p className="text-base text-gray-800 italic mb-4">
                "{testimonio.mensaje}"
              </p>
              <span className="text-sm font-semibold text-gray-600">
                - {testimonio.autor}
              </span>
            </motion.div>
          </SwiperSlide>
        ))}
        <br />
        <br />
        <br />
      </Swiper>
    </section>
  );
};

export default Testimonials;
