import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AnimatedSquare from "./components/AnimatedSquare";
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
        {/* <AnimatedSquare /> */}

        <Header />
        <main className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <About />
                  <Proyectos />
                  <Testimonials />
                  <ContactForm />
                </>
              }
            />

            <Route path="/login" element={<Login />} />

            {/* 🔹 Ruta protegida para el panel */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
