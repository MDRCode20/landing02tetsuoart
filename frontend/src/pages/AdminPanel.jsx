import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // 1️⃣ Eliminar token
    localStorage.removeItem("token");

    // 2️⃣ Redirigir a inicio
    navigate("/", { replace: true });

    // 3️⃣ Evitar retroceso
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/", { replace: true });
    };
  };

  const updateEstadoContact = async (id, nuevoEstado) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/contactos/${id}/estado`,
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContactos((prev) =>
        prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c))
      );

      toast.success("Estado del contacto actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar estado");
    }
  };

  const updateEstadoReclamo = async (id, nuevoEstado) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/reclamaciones/${id}/estado`,
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReclamos((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r))
      );

      toast.success("Estado del reclamo actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar estado");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("No autorizado");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [resContactos, resReclamos] = await Promise.all([
          axios.get("http://localhost:8000/api/contactos", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/reclamaciones", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setContactos(resContactos.data);
        setReclamos(resReclamos.data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar datos");
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 z-150">
      {/* Botón cerrar sesión y volver */}
      <div className="mb-6">
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          ⬅ Cerrar sesión y volver
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-5 tracking-wide">
        Panel de Administración
      </h1>

      {/* Tabla de Contactos */}
      <section className="mb-5 bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur">
        <h2 className="text-xl font-semibold mb-4">Mensajes de Contacto</h2>
        <div className="overflow-x-auto flex-1 max-h-[150px] ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Mensaje</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha_Creada</th>
                <th className="px-4 py-3">Fecha_Act</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((c) => (
                <tr key={c.id} className="hover:bg-white/10 transition-colors">
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3">{c.nombre}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.mensaje}</td>
                  <td className="px-4 py-3">
                    <select
                      className="bg-black border border-white/20 text-white rounded-lg px-2 py-1"
                      value={c.estado}
                      onChange={(e) =>
                        updateEstadoContact(c.id, e.target.value)
                      }
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Contactado">Contactado</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">{c.created_at}</td>
                  <td className="px-4 py-3">{c.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabla de Reclamos */}
      <section className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur">
        <h2 className="text-xl font-semibold mb-4">Reclamos</h2>
        <div className="flex-1 max-h-[200px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre Consumidor</th>
                <th className="px-4 py-3">Domicilio</th>
                <th className="px-4 py-3">DNI O CNE</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Producto-Servicio</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Detalle</th>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha_Creada</th>
                <th className="px-4 py-3">Fecha_Act</th>
              </tr>
            </thead>
            <tbody>
              {reclamos.map((r) => (
                <tr key={r.id} className="hover:bg-white/10 transition-colors">
                  <td className="px-4 py-3">{r.id}</td>
                  <td className="px-4 py-3">{r.nombreConsumidor}</td>
                     <td className="px-4 py-3">{r.domicilio}</td>
                        <td className="px-4 py-3">{r.documentoIdentidad}</td>
                           <td className="px-4 py-3">{r.telefono}</td>
                              <td className="px-4 py-3">{r.correo}</td>
                                <td className="px-4 py-3">{r.productoServicio}</td>
                                  <td className="px-4 py-3">{r.tipo}</td>
                                   <td className="px-4 py-3">{r.detalle}</td>
                                    <td className="px-4 py-3">{r.pedido}</td>
                  <td className="px-4 py-3">
                    <select
                      className="bg-black border border-white/20 text-white rounded-lg px-2 py-1"
                      value={r.estado}
                      onChange={(e) =>
                        updateEstadoReclamo(r.id, e.target.value)
                      }
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="revisado">Revisado</option>
                      <option value="resuelto">Resuelto</option>
                    </select>
                  </td>
                          <td className="px-4 py-3">{r.created_at}</td>
                                  <td className="px-4 py-3">{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      
    </div>
  );
};

export default AdminPanel;
