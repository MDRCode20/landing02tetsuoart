import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ContactForm from './components/ContactForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Proyectos from "./components/proyectos";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

// 🔹 Nuevo: Panel de administrador
import AdminPanel from "./pages/AdminPanel";
// 🔹 Nuevo: Ruta protegida
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="relative">
        <Toaster position="top-right" />

        <Routes>
          {/* Página principal con Header y Footer */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="relative z-10">
                  <Hero />
                  <Services />
                  <About />
                  <Proyectos />
                  <Testimonials />
                  <ContactForm />
                </main>
                <Footer />
              </>
            }
          />

          {/* Login con Header y Footer */}
          <Route
            path="/login"
            element={
              <>
              
                <Login />
              
              </>
            }
          />

          {/* AdminPanel SIN Header y SIN Footer */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
