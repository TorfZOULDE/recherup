import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, adminName }) {
  return (
    <div className="min-h-screen" style={{
      backgroundImage: "url('/logo.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
    }}>
      {/* Overlay */}
      <div className="min-h-screen" style={{ background: "rgba(15,23,42,0.60)" }}>
        <AdminSidebar />

        {/* Contenu principal */}
        <div className="ml-64 flex flex-col min-h-screen">
          {/* Header fixe */}
          <div className="fixed top-0 left-64 right-0 z-20">
            <AdminHeader adminName={adminName} />
          </div>

          {/* Zone scrollable */}
          <main className="flex-1 p-8 mt-20 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}