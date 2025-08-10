import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ajusta la URL a tu backend real
      const response = await axios.post(
        "http://localhost:8000/api/contacto",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("¡Mensaje enviado con éxito!");
        setFormData({ nombre: "", correo: "", mensaje: "" });
      } else {
        toast.error("Ocurrió un error al enviar el mensaje");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
      console.error("Error al enviar formulario:", error);
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 px-4 bg-black text-center relative overflow-hidden"
    >
      {/* Luces suaves de fondo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10"
      >
        <h2 className="text-3xl font-extrabold text-white mb-10 tracking-wide">
          CONTÁCTANOS
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="Tu nombre completo"
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 placeholder-white/60 text-white p-4 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white/40 transition duration-300"
            required
          />

          <motion.input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            whileFocus={{ scale: 1.01 }}
            type="email"
            placeholder="Correo electrónico"
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 placeholder-white/60 text-white p-4 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white/40 transition duration-300"
            required
          />

          <motion.textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            whileFocus={{ scale: 1.01 }}
            placeholder="Tu mensaje"
            rows={4}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/20 placeholder-white/60 text-white p-4 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white/40 transition duration-300"
            required
          />

          <motion.button
            className="relative w-full overflow-hidden bg-black text-white font-semibold py-3 rounded-2xl group"
            whileHover="hover"
            type="submit"
          >
            <motion.span
              className="absolute inset-0 bg-white rounded-1xl z-0"
              initial={{ scaleX: 0, scaleY: 2, originX: 0, originY: 0 }}
              variants={{
                hover: {
                  scaleX: 1,
                  scaleY: 2,
                  transition: { duration: 0.3, ease: "easeInOut" },
                },
              }}
            />
            <span className="relative z-10 transition duration-300 group-hover:text-black">
              Enviar
            </span>
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
