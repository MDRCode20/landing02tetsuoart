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
    <section className="py-20 px-4 bg-black text-center relative overflow-hidden">
      <Toaster position="top-center" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      </div>
      <motion.form
        onSubmit={handleSubmit}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-white mb-6 tracking-wide">
          Libro de Reclamaciones
        </h2>
        {fields.map((field, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-white text-xl sm:text-2xl drop-shadow-lg">{field.icon}</span>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                type={field.type || 'text'}
                required={field.required}
                className="text-sm sm:text-lg w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
              />
            </div>
          </motion.div>
        ))}

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          <option value="Reclamo_Asistido">Reclamo Asistido</option>
          <option value="Reclamo_Independiente">Reclamo Independiente</option>
        </select>

        <textarea
          name="detalle"
          value={form.detalle}
          onChange={handleChange}
          placeholder="Detalle de la reclamación o queja"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
        />

        <textarea
          name="pedido"
          value={form.pedido}
          onChange={handleChange}
          placeholder="Pedido concreto del consumidor"
          required
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
        />

        <motion.button
          type="submit"
          className="relative w-full overflow-hidden bg-black text-white font-semibold py-3 rounded-2xl group"
          whileHover="hover"
        >
          <motion.span
            className="absolute inset-0 bg-white rounded-2xl z-0"
            initial={{ scaleX: 0, scaleY: 2, originX: 0, originY: 0 }}
            variants={{
              hover: {
                scaleX: 1,
                scaleY: 2,
                transition: { duration: 0.6, ease: 'easeInOut' },
              },
            }}
          />
          <span className="relative z-10 transition duration-300 group-hover:text-black">
            Enviar Reclamo
          </span>
        </motion.button>
      </motion.form>
    </section>
  );
}

export default ReclamationForm;
