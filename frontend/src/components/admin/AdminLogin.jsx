// Dans src/pages/AdminLogin.jsx
// Remplace "../services/auth.service" par "../../services/auth.service"
import { login } from "../../services/auth.service";
const AdminLogin = () => {
  // ...
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // Utilisation de la fonction importée
      navigate('/admin');
    } catch (error) {
      // ...
    }
  };
  // ...
}

export default AdminLogin;