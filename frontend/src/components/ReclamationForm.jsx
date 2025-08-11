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
    montoReclamado: '',
    tipo: 'Reclamo',
    detalle: '',
    pedido: '',
  });

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
      montoReclamado,
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
      {
        cond: montoReclamado && (isNaN(montoReclamado) || Number(montoReclamado) < 0),
        msg: 'El monto debe ser un número positivo.',
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
    if (!validarFormulario()) return;

    try {
      const res = await fetch('http://localhost:5000/api/reclamo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        montoReclamado: '',
        tipo: 'Reclamo',
        detalle: '',
        pedido: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error al enviar el reclamo');
    }
  };

  const fields = [
    { name: 'nombreConsumidor', icon: <FiUser />, placeholder: 'Nombre del consumidor', required: true },
    { name: 'domicilio', icon: <FiHome />, placeholder: 'Domicilio', required: true },
    { name: 'documentoIdentidad', icon: <FiFileText />, placeholder: 'DNI / CE', required: true },
    { name: 'telefono', icon: <FiPhone />, placeholder: 'Teléfono', required: false },
    { name: 'correo', icon: <FiMail />, placeholder: 'Correo electrónico', type: 'email', required: false },
    { name: 'productoServicio', icon: <FiEdit />, placeholder: 'Producto o servicio contratado', required: true },
    { name: 'montoReclamado', icon: <FiDollarSign />, placeholder: 'Monto reclamado (opcional)', type: 'number', required: false },
  ];

  return (
 <section className="absolute z-30 p-4 sm:p-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg max-h-screen sm:h-[80vh] space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
  <Toaster position="top-center" />


  <motion.form
    onSubmit={handleSubmit}
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10 space-y-6  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
  >
    <h2 className="text-3xl font-extrabold text-white mb-6 tracking-wide">
      Libro de Reclamaciones
    </h2>

    {fields.map((field, index) => (
      <motion.div
        key={index}
        className="relative text-left "
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <label className="block mb-2 text-sm font-semibold text-white">
          {field.label}
        </label>
        <div className="flex items-center gap-3">
          <span className="text-white text-xl sm:text-2xl drop-shadow-lg">
            {field.icon}
          </span>
          <input
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            type={field.type || "text"}
            required={field.required}
            className="text-sm sm:text-base w-full px-4 py-3  rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
        </div>
      </motion.div>
    ))}

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
        className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <option value="Reclamo_Asistido">Reclamo Asistido</option>
        <option value="Reclamo_Independiente">Reclamo Independiente</option>
      </select>
    </div>

    {/* Detalle */}
    <div className="text-left">
      <label className="block mb-2 text-sm font-semibold text-white">
        Detalle
      </label>
      <textarea
        name="detalle"
        value={form.detalle}
        onChange={handleChange}
        placeholder="Detalle de la reclamación o queja"
        required
        rows={4}
        className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>

    {/* Pedido */}
    <div className="text-left">
      <label className="block mb-2 text-sm font-semibold text-white">
        Pedido
      </label>
      <textarea
        name="pedido"
        value={form.pedido}
        onChange={handleChange}
        placeholder="Pedido concreto del consumidor"
        required
        rows={3}
        className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>

    {/* Botón */}
    <motion.button
      type="submit"
      className="relative w-full overflow-hidden bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Enviar Reclamo
    </motion.button>
  </motion.form>
</section>

  );
}

export default ReclamationForm;
