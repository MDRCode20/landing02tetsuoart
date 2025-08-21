import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => {

  const navigate = useNavigate(); 


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data } = await axios.post("http://localhost:8000/api/login", formData);
    localStorage.setItem("token", data.token);
    toast.success("¡Inicio de sesión exitoso!");
    navigate("/admin");
  } catch (error) {
    toast.error(error.response?.data?.error || "Error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black text-center relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-60 h-60 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 sm:w-72 sm:h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
     
          <div className="relative w-full">
            <div className="flex items-center w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-white/40 transition duration-300">
              <div className="pl-4 text-white/60 text-lg">
                <FiMail />
              </div>
              <motion.input
                name="email"
                value={formData.email}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
                type="email"
                placeholder="Correo electrónico"
                className="w-full bg-transparent placeholder-white/60 text-white p-4 pl-2 rounded-2xl focus:outline-none"
                required
              />
            </div>
          </div>

          
          <div className="relative w-full">
            <div className="flex items-center w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-white/40 transition duration-300">
              <div className="pl-4 text-white/60 text-lg">
                <FiLock />
              </div>
              <motion.input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full bg-transparent placeholder-white/60 text-white p-4 pl-2 rounded-2xl focus:outline-none"
              />
            </div>
          </div>

          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover="hover"
            className={`relative w-full overflow-hidden bg-black text-white font-semibold py-3 rounded-2xl group transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
              {loading ? "Cargando..." : "Ingresar"}
            </span>
          </motion.button>

          <h1 className="text-1x1  mb-6 text-gray-200/50">
            Panel autorizado para administradores
          </h1>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
