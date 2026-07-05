import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#040817] flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-[#040817]/80 backdrop-blur-md border-b border-white/10">
        <div className="w-full px-4 sm:px-8 md:px-16">
          <Navbar />
        </div>
      </div>
      <main className="flex-grow pt-20 md:pt-24 w-full px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}