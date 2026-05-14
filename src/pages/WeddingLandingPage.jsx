export default function WeddingLandingPage() {
  return (
    <div className="min-h-screen bg-[#f9f6f2] text-[#4f4a45] font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#efe7df] to-transparent opacity-80" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <p className="tracking-[0.35em] uppercase text-sm text-[#a58b75] mb-4">
            14 de Septiembre de 2026
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight text-[#6f5b4b]">
            Sara <span className="mx-2">&</span> Toscano
          </h1>

          <div className="w-24 h-[1px] bg-[#cdb8a3] my-8" />

          <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-[#6b635d]">
            Después de muchos viajes, cafés improvisados y momentos compartidos,
            queremos celebrar el día más importante de nuestra historia con las
            personas que más queremos.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="rounded-full bg-[#b89d87] hover:bg-[#a88d77] transition-colors px-8 py-4 text-white shadow-md text-base">
              Confirmar asistencia
            </button>

            <button className="rounded-full border border-[#cbb7a5] px-8 py-4 text-[#6f5b4b] bg-white/60 backdrop-blur-sm hover:bg-white transition-colors text-base">
              Ver detalles del evento
            </button>
          </div>
        </div>
      </section>

      {/* Main card */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-[32px] shadow-xl p-6 md:p-10 border border-[#f0e7df]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              title="Ceremonia"
              subtitle="18:00 · Hacienda Los Olivos"
              description="Una ceremonia al aire libre rodeados de naturaleza, música y una puesta de sol inolvidable."
              emoji="💍"
            />

            <InfoCard
              title="Celebración"
              subtitle="Cóctel, cena y fiesta"
              description="Habrá barra libre, música en directo y muchas ganas de bailar hasta el amanecer."
              emoji="✨"
            />

            <InfoCard
              title="Dress Code"
              subtitle="Elegante · tonos suaves"
              description="Nos encantará veros cómodos, elegantes y listos para disfrutar de un día muy especial."
              emoji="🤍"
            />
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-[#b19a87] mb-4">
            Cuenta atrás
          </p>

          <h2 className="text-3xl md:text-4xl font-light text-[#6f5b4b] mb-10">
            Cada día queda menos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CountdownCard value="124" label="Días" />
            <CountdownCard value="08" label="Horas" />
            <CountdownCard value="42" label="Minutos" />
            <CountdownCard value="17" label="Segundos" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-[#efe7df] rounded-[32px] h-[320px] flex items-center justify-center text-7xl shadow-inner">
            📸
          </div>

          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#b19a87] mb-4">
              Nuestra historia
            </p>

            <h2 className="text-3xl md:text-4xl font-light text-[#6f5b4b] mb-6 leading-tight">
              Una aventura que empezó
              <br />
              con una casualidad
            </h2>

            <p className="text-base leading-8 text-[#6c655f] mb-5">
              Nos conocimos en una pequeña cafetería durante un viaje
              inesperado. Lo que comenzó con una conversación improvisada
              terminó convirtiéndose en una vida llena de recuerdos, proyectos y
              sueños compartidos.
            </p>

            <p className="text-base leading-8 text-[#6c655f]">
              Ahora queremos celebrar ese camino junto a vosotros en un día
              lleno de emoción, alegría y muchísima fiesta.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#f2ebe4] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-sm text-[#b19a87] mb-4">
              Agenda del día
            </p>

            <h2 className="text-3xl md:text-4xl font-light text-[#6f5b4b]">
              Cómo será la celebración
            </h2>
          </div>

          <div className="space-y-5">
            <TimelineItem
              time="17:30"
              title="Llegada de invitados"
              description="Recepción y bienvenida en la finca."
            />

            <TimelineItem
              time="18:00"
              title="Ceremonia"
              description="Intercambio de votos y celebración oficial."
            />

            <TimelineItem
              time="19:00"
              title="Cóctel"
              description="Música en vivo, aperitivos y primeras fotos."
            />

            <TimelineItem
              time="21:00"
              title="Cena"
              description="Cena especial con sorpresas y discursos."
            />

            <TimelineItem
              time="23:00"
              title="Fiesta"
              description="DJ, barra libre y muchas ganas de bailar."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto rounded-[32px] bg-[#6f5b4b] text-white p-10 md:p-14 text-center shadow-xl">
          <p className="uppercase tracking-[0.3em] text-sm text-[#e8d8ca] mb-4">
            Queremos celebrarlo contigo
          </p>

          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6">
            Reserva la fecha y prepárate
            <br />
            para un fin de semana inolvidable
          </h2>

          <p className="text-[#f2ebe4] text-base md:text-lg leading-8 max-w-2xl mx-auto mb-8">
            Muy pronto podrás confirmar tu asistencia, indicar alergias,
            necesidades especiales y consultar toda la información del evento.
          </p>

          <button className="rounded-full bg-white text-[#6f5b4b] px-8 py-4 text-base font-medium hover:scale-[1.02] transition-transform shadow-md">
            Confirmar asistencia
          </button>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, subtitle, description, emoji }) {
  return (
    <div className="rounded-3xl border border-[#efe4d8] bg-[#fffdfa] p-6 text-left shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-4">{emoji}</div>

      <h3 className="text-xl font-medium text-[#6f5b4b] mb-2">{title}</h3>

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
