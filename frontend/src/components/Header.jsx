import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTools,
  FaUsers,
  FaProjectDiagram,
  FaCommentDots,
  FaEnvelope,
  FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Variantes para animaciones
const navVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("");

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const iconos = {
    Inicio: <FaHome className="inline mr-2" />,
    Servicios: <FaTools className="inline mr-2" />,
    Nosotros: <FaUsers className="inline mr-2" />,
    Proyectos: <FaProjectDiagram className="inline mr-2" />,
    Testimonios: <FaCommentDots className="inline mr-2" />,
    Contacto: <FaEnvelope className="inline mr-2" />,
    Login: <FaSignInAlt className="inline mr-2" />,
  };

  const enlaces = [
    { nombre: "Inicio", href: "#inicio" },
    { nombre: "Servicios", href: "#servicios" },
    { nombre: "Nosotros", href: "#nosotros" },
    { nombre: "Proyectos", href: "#proyectos" },
    { nombre: "Testimonios", href: "#testimonios" },
    { nombre: "Contacto", href: "#contacto" },
  ];

  useEffect(() => {
    const secciones = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            setSeccionActiva(entrada.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    secciones.forEach((sec) => observer.observe(sec));
    return () => secciones.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-negro bg-opacity-80 text-white shadow-md backdrop-blur-md"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo + nombre */}
        <motion.a
          href="#"
          className="flex items-center space-x-5"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="img/TEA.png"
            alt="Logo"
            className="h-10 sm:h-12 object-contain"
          />
          <motion.p
            className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            TETSUO ART
          </motion.p>
        </motion.a>

        {/* Menú en escritorio */}
        <motion.nav
          className={`hidden md:flex space-x-6 ${
            ["nosotros", "testimonios"].includes(seccionActiva)
              ? "text-black"
              : "text-white"
          }`}
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {enlaces.map((item) => (
            <motion.a
              key={item.nombre}
              href={item.href}
              className="font-medium hover:text-black transition-colors duration-200"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              variants={linkVariants}
            >
              {item.nombre}
            </motion.a>
          ))}
        </motion.nav>

        {/* Botón admin */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <Link
            to="/login"
            className="hidden md:inline-block font-medium hover:text-black transition-colors duration-200"
          >
            <FaSignInAlt className="inline mr-2" />
            Admin
          </Link>
        </motion.div>

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <span className="text-3xl">&#9776;</span>
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`md:hidden px-4 pb-4 ${
            ["nosotros", "testimonios"].includes(seccionActiva)
              ? "text-black"
              : "text-white"
          }`}
        >
          <ul className="space-y-3">
            {enlaces.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <a
                  href={item.href}
                  className="block font-medium hover:text-gray-700 transition flex items-center"
                  onClick={() => setMenuAbierto(false)}
                >
                  <span className="mr-2">{iconos[item.nombre]}</span>
                  {item.nombre}
                </a>
              </motion.li>
            ))}

            {/* Enlace Login solo en móvil */}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: enlaces.length * 0.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <Link
                to="/login"
                className="block font-medium hover:text-gray-700 transition flex items-center"
                onClick={() => setMenuAbierto(false)}
              >
                <span className="mr-2">{iconos["Login"]}</span>
                Login
              </Link>
            </motion.li>
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
