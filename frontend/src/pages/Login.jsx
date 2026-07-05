
import LoginVisual from '../components/login/LoginVisual';
import LoginForm from '../components/login/LoginForm';
import SocialAuth from '../components/login/SocialAuth';
import LoginFooter from '../components/login/LoginFooter';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#05060f] flex flex-col">
      

      {/* Conteneur principal centré */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          
          {/* Côté Gauche : IMAGE + LoginVisual */}
          <div className="hidden lg:block relative h-[600px]">
            <img src="/login.jpeg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40">
              <LoginVisual />
            </div>
          </div>
          
          {/* Côté Droit : Formulaire */}
          <div className="bg-[#0b0e1a] p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-8">Login</h2>
            <LoginForm />
            <SocialAuth />
            {/* LoginFooter est souvent le lien "S'inscrire" sous le formulaire */}
            <LoginFooter />
          </div>
        </div>
      </main>

      
    </div>
  );
}