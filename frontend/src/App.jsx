import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Filieres from './pages/Filieres';
import Entreprises from './pages/Entreprises';
import CompanyDetail from './pages/CompanyDetail';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import FAQ from './pages/FAQ';
import AdminDashboard from './pages/AdminDashboard';
import AdminEntreprises from './pages/AdminEntreprises';
import AdminSuggestions from './pages/AdminSuggestions';
import AdminUtilisateurs from './pages/AdminUtilisateurs';
import AdminMessages from './pages/AdminMessages';
import AdminSettings from './pages/AdminSettings';
import AdminLogin from "./pages/AdminLogin";
import AdminFilieres from "./pages/AdminFilieres";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques avec Layout (Navbar/Footer) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/"           element={<Home />} />
                <Route path="/entreprises" element={<Entreprises />} />
                <Route path="/entreprises/:id" element={<CompanyDetail />} />
                <Route path="/filieres"   element={<Filieres />} />
                <Route path="/a-propos"   element={<APropos />} />
                <Route path="/contact"    element={<Contact />} />
                <Route path="/login"      element={<Login />} />
                <Route path="/register"   element={<Register />} />
                <Route path="/faq"        element={<FAQ />} />

                {/* 404 */}
                <Route path="*" element={
                  <div className="text-center py-20">
                    <h1 className="text-6xl font-black text-purple-500">404</h1>
                    <p className="text-gray-400 mt-4">Oups ! Cette page n'existe pas.</p>
                  </div>
                } />
              </Routes>
            </Layout>
          }
        />

        {/* Routes admin SANS le Layout public */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/entreprises" element={<AdminEntreprises />} />
        <Route path="/admin/filieres" element={<AdminFilieres />} />
        <Route path="/admin/suggestions" element={<AdminSuggestions />} />
        <Route path="/admin/utilisateurs" element={<AdminUtilisateurs />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </BrowserRouter>
  );
}