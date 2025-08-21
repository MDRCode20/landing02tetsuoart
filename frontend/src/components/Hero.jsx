import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const Hero = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMainContent(true);
    }, 6500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img/rd.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay con fade-in */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

    

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {!showMainContent && <AnimatedText />}

        {showMainContent && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0,  },
              visible: {
                opacity: 1,
              
                transition: { staggerChildren: 0.5 },
              },
            }}
            className="space-y-10 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-5xl xl:max-w-6xl px-0"
          >
            {/* Título */}
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-extrabold"
            >
              Transformamos tu hogar en un espacio de ensueño
            </motion.h2>

            {/* Párrafo */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-xl"
            >
              Remodelaciones personalizadas con estilo, calidad y detalle.
            </motion.p>

            {/* Botón con rebote */}
            <motion.a
              href="#servicios"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-black hover:text-white  transition-colors duration-300"
            >
              Ver Servicios
            </motion.a>
          </motion.div>
        )}
      </div>

      
    </section>
  );
};

export default Hero;
