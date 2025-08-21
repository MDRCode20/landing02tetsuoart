import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTools, FaLightbulb, FaRegHandshake, FaAward } from "react-icons/fa";

// Variantes para animaciones del contenedor
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 }, // cada hijo aparece con delay
  },
};

// Variantes para elementos de texto
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Variantes para las cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2,    
  });

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative py-30 flex flex-col items-center justify-center text-black px-4 text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img/MADERA-GRIS.jpg.webp')",
        backgroundAttachment: "fixed",
      }}
    >
     
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/60 z-0"></div>

      <motion.div
        className="max-w-6xl z-10 mx-auto flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-black mb-6"
          variants={itemVariants}
        >
          Sobre Nosotros
        </motion.h2>

        
        <motion.p
          className="mb-12 w-7/12 text-white text-base sm:text-md"
          variants={itemVariants}
        >
          Somos una empresa especializada en remodelación de interiores,
          instalación de puertas, diseño de closets y soluciones personalizadas
          para el hogar y la oficina. Contamos con un equipo multidisciplinario
          de arquitectos, técnicos y diseñadores comprometidos con la excelencia.
        </motion.p>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          <motion.div
            className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={cardVariants}
          >
            <FaTools className="text-rojo text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Más de 10 Años</h3>
            <p className="text-sm text-gray-600">
              Experiencia en remodelaciones y diseño de espacios.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={cardVariants}
          >
            <FaLightbulb className="text-rojo text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Soluciones Creativas</h3>
            <p className="text-sm text-gray-600">
              Combinamos funcionalidad con estilo en cada proyecto.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={cardVariants}
          >
            <FaRegHandshake className="text-rojo text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Enfoque Personalizado</h3>
            <p className="text-sm text-gray-600">
              Acompañamos al cliente en cada paso del proceso.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={cardVariants}
          >
            <FaAward className="text-rojo text-4xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Calidad Garantizada</h3>
            <p className="text-sm text-gray-600">
              Materiales de primera y acabados profesionales.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
