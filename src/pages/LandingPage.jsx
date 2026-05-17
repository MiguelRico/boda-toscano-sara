import { useNavigate } from "react-router-dom";

export default function WeddingLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f6f2] text-[#4f4a45] font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#efe7df] to-transparent opacity-80" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <p className="tracking-[0.35em] uppercase text-sm text-[#a58b75] mb-4">
            22 de Agosto de 2026
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight text-[#6f5b4b]">
            Sara <span className="mx-2">&</span> Fran
          </h1>

          <div className="w-24 h-[1px] bg-[#cdb8a3] my-8" />

          <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-[#6b635d]">
            Después de muchos viajes, cafés improvisados y momentos compartidos,
            queremos celebrar el día más importante de nuestra historia con las
            personas que más queremos.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              className="rounded-full bg-[#b89d87] hover:bg-[#a88d77] transition-colors px-8 py-4 text-white shadow-md text-base"
              onClick={() => navigate("/rsvp")}
            >
              Confirmar asistencia
            </button>

            <button
              className="rounded-full border border-[#cbb7a5] px-8 py-4 text-[#6f5b4b] bg-white/60 backdrop-blur-sm hover:bg-white transition-colors text-base"
              onClick={() => navigate("/details")}
            >
              Ver detalles del evento
            </button>
          </div>
        </div>
      </section>

      {/* Main card */}
      <section className="px-6 -mt-8 relative z-20 pb-20">
        <div className="max-w-5xl mx-auto bg-white rounded-[32px] shadow-xl p-6 md:p-10 border border-[#f0e7df]">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <InfoCard
              title="Transporte"
              subtitle="Paradas en Huelva y Corrales"
              description="Tendremos autobús para facilitar el desplazamiento de ida y vuelta."
              emoji="🚌"
            />

            <InfoCard
              title="Ceremonia"
              subtitle="18:00 · Aguas Del Pino"
              description="Una ceremonia al aire libre rodeados de naturaleza, música y una puesta de sol inolvidable."
              emoji="💍"
            />

            <InfoCard
              title="Celebración"
              subtitle="Cóctel, cena y fiesta"
              description="Habrá barra libre, música en directo y muchas ganas de bailar hasta el amanecer."
              emoji="✨"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, subtitle, description, emoji }) {
  return (
    <div className="rounded-3xl border border-[#efe4d8] bg-[#fffdfa] p-6 text-left shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-medium text-[#6f5b4b] mb-2">
        {emoji}
        {title}
      </h3>

      <p className="text-sm text-[#b09784] mb-4">{subtitle}</p>

      <p className="text-sm leading-7 text-[#6c655f]">{description}</p>
    </div>
  );
}

function CountdownCard({ value, label }) {
  return (
    <div className="rounded-3xl bg-white border border-[#efe4d8] py-8 shadow-sm">
      <div className="text-4xl md:text-5xl font-light text-[#6f5b4b] mb-2">
        {value}
      </div>

      <div className="uppercase tracking-[0.2em] text-xs text-[#b19a87]">
        {label}
      </div>
    </div>
  );
}

function TimelineItem({ time, title, description }) {
  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#eadfd3] flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
      <div className="text-[#b08f74] text-xl font-medium min-w-[90px]">
        {time}
      </div>

      <div>
        <h3 className="text-lg text-[#6f5b4b] mb-1">{title}</h3>
        <p className="text-sm text-[#6c655f] leading-7">{description}</p>
      </div>
    </div>
  );
}
