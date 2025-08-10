import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

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
      style={{ backgroundImage: "url('/img/rd.jpg')" , backgroundAttachment: "fixed" }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {!showMainContent && <AnimatedText />}

        {showMainContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
     className="space-y-10 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-5xl xl:max-w-6xl px-0"

          >
            <h2 className="text-4xl sm:text-5xl font-extrabold animate__animated animate__fadeInDown">
              Transformamos tu hogar en un espacio de ensueño
            </h2>
            <p className="text-lg sm:text-xl animate__animated animate__fadeInUp">
              Remodelaciones personalizadas con estilo, calidad y detalle.
            </p>
            <a
              href="#servicios"
              className="inline-block bg-white text-negro font-semibold px-6 py-3 rounded-full hover:bg-rojo hover:text-black transition-colors duration-300 blink-text"
            >
              Ver Servicios
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
