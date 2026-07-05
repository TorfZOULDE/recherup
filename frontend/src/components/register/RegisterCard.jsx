import RegisterForm from './RegisterForm';

export default function RegisterCard() {
  return (
    <div className="relative w-full max-w-6xl flex rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-[#05060f]">

      {/* Image de fond */}
      <img src="/register.jpeg" className="absolute inset-0 w-full h-full object-cover z-0" alt="Background" />
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 w-full flex flex-col lg:flex-row min-h-[500px]">

        {/* Partie Gauche : visible uniquement sur lg+ */}
        <div className="hidden lg:flex lg:w-1/2 p-10 xl:p-12 flex-col justify-end text-white">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">
            Rejoignez<br />FilièreConnect
          </h1>
          <p className="text-gray-200 text-sm xl:text-base max-w-sm">
            Créez votre compte et accédez à des opportunités adaptées à votre filière.
          </p>
        </div>

        {/* Partie Droite : formulaire (pleine largeur sur mobile) */}
        <div className="w-full lg:w-1/2 bg-[#05060f]/85 backdrop-blur-xl p-6 sm:p-8 xl:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">

          {/* Titre visible uniquement sur mobile (la gauche est cachée) */}
          <div className="lg:hidden mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rejoignez FilièreConnect</h1>
            <p className="text-gray-400 text-sm">Créez votre compte gratuitement</p>
          </div>

          <h2 className="hidden lg:block text-2xl xl:text-3xl font-bold text-white mb-1">Créer un compte</h2>
          <p className="hidden lg:block text-gray-400 text-sm mb-6">Commencez votre parcours maintenant</p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}