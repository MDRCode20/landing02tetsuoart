import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHammer, FaTools, FaPaintRoller } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const proyectos = [
  {
    titulo: "Remodelación de Sala Moderna",
    descripcion:
      "Transformamos una sala antigua en un espacio moderno y funcional con iluminación LED y acabados elegantes.",
    icono: <FaHammer className="text-white text-3xl" />,
    imagen: "https://www.dearquitectura.com.mx/wp-content/uploads/2021/05/remodelacion-de-sala.jpg",
  },
  {
    titulo: "Instalación de Puertas Minimalistas",
    descripcion:
      "Puertas blancas con acabado brillante y cierre magnético para oficinas modernas.",
    icono: <FaTools className="text-white text-3xl" />,
    imagen: "https://closetsorbis.com/puertas-para-interiores/slides/puertas-interiores-de-madera-y-melamina.webp",
  },
  {
    titulo: "Closet Empotrado de Madera Natural",
    descripcion:
      "Closet hecho a medida, con diseño 3D previo y compartimentos ocultos.",
    icono: <FaPaintRoller className="text-white text-3xl" />,
    imagen: "https://www.oppoliahome.com/wp-content/uploads/2023/06/big-walk-in-closet-with-beige-and-light-wood-cabinets-obw23-l05-9-1024x640.webp",
  },
  {
  titulo: "Cocina Integral en Blanco Mate",
  descripcion:
    "Diseño de cocina en L con muebles empotrados, encimeras de cuarzo blanco y grifería negra minimalista.",
  icono: <FaHammer className="text-white text-3xl" />,
  imagen: "https://www.cocinascjr.com/wp-content/uploads/2021/03/Cocinas-Blanco-Mate-03-scaled.jpg",
},
{
  titulo: "Baño con Acabados en Mármol",
  descripcion:
    "Renovación total de baño con porcelanato tipo mármol, espejo retroiluminado y lavamanos flotante.",
  icono: <FaTools className="text-white text-3xl" />,
  imagen: "https://www.azulev.com/wp-content/uploads/2023/05/APG_CALACATTA_BLACK_120X120_CALACATTA_BLACK_60X120_RG-1024x768.jpg",
},
{
  titulo: "Pared Decorativa con Paneles 3D",
  descripcion:
    "Instalación de paneles 3D en pared principal para dar volumen y textura al ambiente de sala.",
  icono: <FaPaintRoller className="text-white text-3xl" />,
  imagen: "https://sanjuecompany.com/wp-content/uploads/2024/07/Landing-Page-banner-04.png",
},
{
  titulo: "Iluminación Ambiental LED",
  descripcion:
    "Instalación de luces LED cálidas y frías empotradas en cielo raso para realzar la decoración moderna.",
  icono: <FaHammer className="text-white text-3xl" />,
  imagen: "https://www.ledvance.lat/10_LEDVANCE_only/5067015/image-thumb__5067015__news_detail/asset-5067015_SMART-2B_Multicolor_Living_Room_with_Apple_HomePod_Side_Angle.jpg",
},
{
  titulo: "Mueble TV Flotante Minimalista",
  descripcion:
    "Diseño y fabricación de mueble flotante para TV con compartimentos ocultos y acabado blanco brillante.",
  icono: <FaTools className="text-white text-3xl" />,
  imagen: "https://image.architonic.com/pfm3-3/20194122/36e8-tv-unit--fam-g-arcit18.jpg",
},
{
  titulo: "Home Office Funcional",
  descripcion:
    "Espacio de oficina en casa con escritorio empotrado, estanterías aéreas y sillas ergonómicas.",
  icono: <FaPaintRoller className="text-white text-3xl" />,
  imagen: "https://jelaperu.com/blog/wp-content/uploads/2021/08/Escritorio-con-espacio-de-circulacion-1024x687.jpg",
},

];

const Proyectos = () => {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const animationRef = useRef();
  const x = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      if (!paused && containerRef.current) {
        x.current -= 0.5;
        if (x.current <= -containerRef.current.scrollWidth / 2) {
          x.current = 0;
        }
        containerRef.current.style.transform = `translateX(${x.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [paused, isMobile]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % proyectos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + proyectos.length) % proyectos.length);
  };

  return (
    <section id="proyectos" className="py-20 bg-gradient-to-b from-neutral-950 to-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-14 tracking-tight">
          Nuestros Proyectos
        </h2>

        {!isMobile ? (
          <div className="relative py-3 overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 h-full w-15 z-20 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-15 z-20 bg-gradient-to-l from-black via-black/70 to-transparent" />
            <div ref={containerRef} className="flex gap-9 w-max">
              {[...proyectos, ...proyectos].map((proyecto, i) => (
                <motion.div
                  key={i}
                  className="min-w-[200px] sm:min-w-[200px] bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/10 cursor-default shrink-0"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="rounded-xl mb-4 w-full h-48 object-cover"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-800 p-2 rounded-full">{proyecto.icono}</div>
                    <h3 className="text-xl font-bold text-white">{proyecto.titulo}</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{proyecto.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-xs sm:max-w-sm min-h-[370px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  className="absolute w-full"
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/10">
                    <img
                      src={proyectos[index].imagen}
                      alt={proyectos[index].titulo}
                      className="rounded-xl mb-4 w-full h-48 object-cover"
                    />
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="bg-blue-800 p-2 rounded-full">{proyectos[index].icono}</div>
                      <h3 className="text-xl font-bold text-white">{proyectos[index].titulo}</h3>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{proyectos[index].descripcion}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
      <div className="flex justify-center gap-3 mt-6">
  <button
    onClick={handlePrev}
    className="absolute top-1/2 left-6 md:-left-17 z-10 bg-black text-white text-2xl p-3 rounded-full transition-colors duration-300 hover:bg-white/40 hover:text-black"
  >
    ◀
  </button>
  <button
    onClick={handleNext}
    className="absolute top-1/2 right-6 md:-right-17 z-10 bg-black text-white text-2xl p-3 rounded-full transition-colors duration-300 hover:bg-white/40 hover:text-black"
  >
    ▶
  </button>
</div>


          </div>
        )}

        <div className="mt-5 text-center">
         <a href="#contacto">
  <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white hover:text-black transition">
    Cotizar Proyecto
  </button>
</a>

        </div>
      </div>
    </section>
  );
};

export default Proyectos;
