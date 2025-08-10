// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Verificar token
    const token = localStorage.getItem("token");
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
          axios.get("http://localhost:8000/api/reclamos", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setContactos(resContactos.data);
        setReclamos(resReclamos.data);
      } catch (error) {
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
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      {/* Tabla de Contactos */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Mensajes de Contacto</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 px-4 py-2">Nombre</th>
                <th className="border border-gray-600 px-4 py-2">Correo</th>
                <th className="border border-gray-600 px-4 py-2">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((c) => (
                <tr key={c.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2">{c.nombre}</td>
                  <td className="border border-gray-600 px-4 py-2">
                    {/* ✅ Solo mostrar parcialmente el email */}
                    {c.email.replace(/(.{3}).+(@.+)/, "$1***$2")}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {c.mensaje.length > 50
                      ? c.mensaje.substring(0, 50) + "..."
                      : c.mensaje}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabla de Reclamos */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Reclamos</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 px-4 py-2">ID</th>
                <th className="border border-gray-600 px-4 py-2">Usuario</th>
                <th className="border border-gray-600 px-4 py-2">Descripción</th>
                <th className="border border-gray-600 px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {reclamos.map((r) => (
                <tr key={r.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2">{r.id}</td>
                  <td className="border border-gray-600 px-4 py-2">
                    {r.usuario.replace(/(.{3}).+/, "$1***")}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {r.descripcion.length > 50
                      ? r.descripcion.substring(0, 50) + "..."
                      : r.descripcion}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {new Date(r.fecha).toLocaleDateString()}
                  </td>
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
