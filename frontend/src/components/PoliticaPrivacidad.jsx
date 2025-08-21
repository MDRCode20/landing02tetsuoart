import { motion } from "framer-motion";
import { X } from "lucide-react";

const PoliticaPrivacidadModal = ({ onClose }) => {
  return (
    
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-gray-900/95 to-black/95 
                 border border-white/10 rounded-2xl shadow-2xl 
                 max-w-5xl w-full mx-6 p-15 relative z-50 text-white 
                 overflow-y-auto max-h-[85vh] backdrop-blur-md
                 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
    >
      {/* Botón de cierre */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-gray-400 hover:text-gray-400 transition-colors"
      >
        <X size={26} strokeWidth={2.5} />
      </button>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold mb-8 text-white">
          Política de Privacidad
        </h1>

        <p className="text-gray-300 mb-7">
          En <span className="font-semibold text-white">Tetsuo Art</span>, tu
          confianza es lo más importante para nosotros. Esta política explica de
          manera clara cómo recopilamos, utilizamos, protegemos y gestionamos la
          información que nos proporcionas al utilizar nuestros servicios.
        </p>

        {/* Dividido en dos bloques */}
        <div className="grid gap-15 md:grid-cols-2 mb-7">
          {/* Bloque 1 */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white text-left mb-2">
                1. Información que recopilamos
              </h2>
              <p className="text-gray-400 leading-relaxed text-left">
                Podemos recopilar datos como tu nombre completo, correo
                electrónico, teléfono, dirección y detalles de tu vivienda
                únicamente cuando nos los proporcionas para realizar consultas,
                solicitar presupuestos o contratar servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white text-left mb-2">
                2. Uso de la información
              </h2>
              <p className="text-gray-400 text-left leading-relaxed">
                Los datos que recopilamos se utilizan con los siguientes fines:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-left text-sm space-y-1 mt-2">
                <li>Elaborar presupuestos personalizados.</li>
                <li>Coordinar visitas técnicas y servicios contratados.</li>
                <li>Enviar actualizaciones sobre el estado de tu proyecto.</li>
                <li>Ofrecer promociones o novedades relevantes (previo consentimiento).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white text-left mb-2">
                3. Conservación de datos
              </h2>
              <p className="text-gray-400 leading-relaxed text-left">
                Conservaremos tus datos únicamente el tiempo necesario para
                cumplir con los fines descritos, salvo que la ley exija un
                período de retención más largo.
              </p>
            </section>
          </div>

          {/* Bloque 2 */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white text-left mb-2">
                4. Protección de tu información
              </h2>
              <p className="text-gray-400 leading-relaxed text-left">
                Implementamos medidas de seguridad administrativas, técnicas y
                físicas diseñadas para proteger tus datos contra accesos no
                autorizados, pérdidas o alteraciones.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white text-left mb-2">
                5. Derechos del usuario
              </h2>
              <p className="text-gray-400 leading-relaxed text-left">
                Tienes derecho a acceder, rectificar o solicitar la eliminación
                de tus datos en cualquier momento. Puedes ejercer estos derechos
                contactándonos en:{" "}
                <a
                  href="mailto:contacto@tetsuoart.com"
                  className="text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                  contacto@tetsuoart.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white text-left mb-2">
                6. Cambios en esta política
              </h2>
              <p className="text-gray-400 leading-relaxed text-left">
                Podemos actualizar esta política en cualquier momento para
                reflejar cambios legales o mejoras en nuestros procesos. La
                versión más reciente estará siempre disponible en este sitio web.
              </p>
            </section>
          </div>
        </div>

        <p className="text-gray-500 text-sm border-t border-white/10 pt-4">
          📅 Última actualización: Febrero 2025
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PoliticaPrivacidadModal;
