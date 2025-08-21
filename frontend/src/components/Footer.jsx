import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import ReclamationForm from "./ReclamationForm";
import PoliticaPrivacidadModal from "./PoliticaPrivacidad";

const Footer = () => {
  const [modalActivo, setModalActivo] = useState(null); // null | "politica" | "reclamo"

  useEffect(() => {
    document.body.style.overflow = modalActivo ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalActivo]);

  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Columna 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            Tetsuo Art
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Expertos en remodelación de interiores, puertas, closets y acabados.
            Combinamos diseño, técnica y pasión para transformar tus espacios.
          </p>
        </motion.div>

        {/* Columna 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Navegación</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            {[
              { name: "Inicio", id: "#inicio" },
              { name: "Servicios", id: "#servicios" },
              { name: "Proyectos", id: "#proyectos" },
              { name: "Testimonios", id: "#testimonios" },
              { name: "Contacto", id: "#contacto" },
            ].map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.id}
                  className="hover:text-red-500 transition-colors"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Columna 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Síguenos</h3>
          <div className="flex gap-6">
            {[FaFacebookF, FaInstagram, FaWhatsapp].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-white/70 hover:text-red-500"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer inferior */}
      <motion.div
        className="border-t border-white/20 mt-14 pt-5 text-sm text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="mb-2">
          <button
            onClick={() => setModalActivo("politica")}
            className="hover:text-blue-300 underline"
          >
            Política de Privacidad
          </button>{" "}
          |
          <button
            onClick={() => setModalActivo("reclamo")}
            className="hover:text-blue-300 underline ml-1"
          >
            Libro de Reclamaciones
          </button>
        </p>

        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Tetsuo Art</span>. Todos los
          derechos reservados.
        </p>
        <p className="text-white/50 mt-2">
          Diseño y desarrollo con ❤️ desde Perú
        </p>

        {/* Renderizado condicional de modales */}
        {modalActivo && (
          <div className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 overflow-auto">
            {/* Efectos de fondo */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Botón cerrar */}
            <button
              onClick={() => setModalActivo(null)}
              className="absolute top-9 right-10 text-gray-200 text-2xl font-bold z-40"
            >
            </button>

            {/* Contenido dinámico */}
            {modalActivo === "politica" && (
              <PoliticaPrivacidadModal onClose={() => setModalActivo(null)} />
            )}
            {modalActivo === "reclamo" && (
              <ReclamationForm onClose={() => setModalActivo(null)} />
            )}
          </div>
        )}
      </motion.div>
    </footer>
  );
};

export default Footer;
