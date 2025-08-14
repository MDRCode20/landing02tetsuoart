import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiHome,
  FiPhone,
  FiFileText,
  FiEdit,
  FiDollarSign,
} from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ReclamationForm() {
  const [form, setForm] = useState({
    nombreConsumidor: '',
    domicilio: '',
    documentoIdentidad: '',
    telefono: '',
    correo: '',
    productoServicio: '',
    tipo: 'Reclamo',
    detalle: '',
    pedido: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validarFormulario = () => {
    const {
      nombreConsumidor,
      domicilio,
      documentoIdentidad,
      telefono,
      correo,
      productoServicio,
      detalle,
      pedido,
    } = form;

    const validaciones = [
      { cond: !nombreConsumidor.trim(), msg: 'Ingresa tu nombre completo.' },
      { cond: !domicilio.trim(), msg: 'El domicilio es obligatorio.' },
      { cond: !documentoIdentidad.trim(), msg: 'El DNI o CE es obligatorio.' },
      {
        cond:
          !/^\d{8}$/.test(documentoIdentidad) &&
          !/^[a-zA-Z0-9]{9,12}$/.test(documentoIdentidad),
        msg: 'DNI debe tener 8 dígitos o CE entre 9-12 caracteres.',
      },
      {
        cond: telefono && !/^\d{9}$/.test(telefono),
        msg: 'El teléfono debe tener 9 dígitos.',
      },
      {
        cond: correo && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo),
        msg: 'Correo electrónico inválido.',
      },
   
      { cond: !productoServicio.trim(), msg: 'Especifica el producto o servicio.' },
      { cond: !detalle.trim(), msg: 'El detalle del reclamo es obligatorio.' },
      { cond: detalle.trim().length < 9, msg: 'El detalle debe tener al menos 9 caracteres.' },
      { cond: !pedido.trim(), msg: 'Indica claramente tu pedido.' },
      { cond: pedido.trim().length < 9, msg: 'El pedido debe tener al menos 9 caracteres.' },
    ];

    for (const { cond, msg } of validaciones) {
      if (cond) {
        toast.error(msg);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isSubmitting) {
      toast.warning("El formulario ya se está enviando...");
      return;
    }

    setIsSubmitting(true);
    if (!validarFormulario()) return;

    try {
      const res = await fetch('http://localhost:8000/api/reclamaciones', { 
        method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json', // importante para Laravel
  },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      toast.success(data.mensaje || 'Reclamo enviado correctamente');
      setForm({
        nombreConsumidor: '',
        domicilio: '',
        documentoIdentidad: '',
        telefono: '',
        correo: '',
        productoServicio: '',
        tipo: 'Reclamo',
        detalle: '',
        pedido: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error al enviar el reclamo');
    }finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'nombreConsumidor', icon: <FiUser />, placeholder: 'Nombre del consumidor', required: true },
    { name: 'domicilio', icon: <FiHome />, placeholder: 'Domicilio', required: true },
    { name: 'documentoIdentidad', icon: <FiFileText />, placeholder: 'DNI / CE', required: true },
    { name: 'telefono', icon: <FiPhone />, placeholder: 'Teléfono', required: false },
    { name: 'correo', icon: <FiMail />, placeholder: 'Correo electrónico', type: 'email', required: false },
    { name: 'productoServicio', icon: <FiEdit />, placeholder: 'Producto o servicio contratado', required: true },
 
  ];

  return (
<section className="fixed inset-5 z-30 py-7">
  <Toaster position="top-center" />
  
  <motion.form
    onSubmit={handleSubmit}
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-15 sm:p-10 relative z-10"
  >
    {/* Título */}
    <div className="md:col-span-2">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-wide text-center">
        Libro de Reclamaciones
      </h2>
    </div>

    {/* Bloque 1 */}
    <div className="space-y-6">
      {fields
        .filter(field => field.name !== "tipo" && field.name !== "detalle" && field.name !== "pedido")
        .map((field, index) => (
          <motion.div
            key={index}
            className="relative text-left"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <label className="block mb-2 text-sm sm:text-base font-semibold text-white">
              {field.label}
            </label>
            <div className="flex items-center gap-4">
              <span className="text-white text-lg drop-shadow-lg">{field.icon}</span>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                type={field.type || "text"}
                required={field.required}
                className="text-sm sm:text-base w-full px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
              />
            </div>
          </motion.div>
        ))}
    </div>

    {/* Bloque 2 */}
    <div className="space-y-4">
      {/* Tipo */}
      <div className="text-left">
        <label className="block mb-2 text-sm font-semibold text-white">
          Tipo de reclamo
        </label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
    <option className="bg-black rounded-2xl text-gray-400">Seleccione...</option>
    <option className="bg-black rounded-2xl text-gray-400">Reclamo Asistido</option>
    <option className="bg-black rounded-2xl text-gray-400">Reclamo Independiente</option>
     </select>
      </div>

      {/* Detalle */}
      <div className="text-left">
        <label className="block mb-1 text-sm font-semibold text-white">
          Detalle
        </label>
        <textarea
          name="detalle"
          value={form.detalle}
          onChange={handleChange}
          placeholder="Detalle de la reclamación o queja"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Pedido */}
      <div className="text-left">
        <label className="block mb-1 text-sm font-semibold text-white">
          Pedido
        </label>
        <textarea
          name="pedido"
          value={form.pedido}
          onChange={handleChange}
          placeholder="Pedido concreto del consumidor"
          required
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

  {/* Botón */}
    <div className="md:col-span-2">
      <motion.button
        type="submit"
        className={`relative w-full overflow-hidden bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black text-white"
        }`}
        whileHover={!isSubmitting ? "hover" : ""}
        whileTap={{ scale: 0.98 }}
         disabled={isSubmitting}
     >
 {isSubmitting ? "Enviando..." : "Enviar"}
      </motion.button>
    </div>

    </div>
 <div className="md:col-span-2">
     <p className="text-xs text-gray-300 text-center italic mt-1">
    Conforme al D.S. N° 006-2014-PCM, este libro de reclamaciones está a su disposición para registrar quejas o reclamos.
    Su presentación no impide el uso de otros mecanismos de solución de controversias.
  </p>
    </div>
  
  </motion.form>
  <br></br>
</section>


  );
}

export default ReclamationForm;
