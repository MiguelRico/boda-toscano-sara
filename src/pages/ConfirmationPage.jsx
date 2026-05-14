import React from "react";

export default function ConfirmationPage() {
  const commonAllergies = [
    "Gluten",
    "Lactosa",
    "Frutos secos",
    "Marisco",
    "Huevo",
    "Soja",
    "Pescado",
    "Mostaza",
  ];

  const createGuest = () => ({
    id: crypto.randomUUID(),
    name: "",
    surname: "",
    allergies: [],
    otherAllergies: "",
    busNeeded: false,
    busDeparture: "18:00",
    busReturn: "",
  });

  const [guests, setGuests] = React.useState([createGuest()]);

  const updateGuest = (id, field, value) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest,
      ),
    );
  };

  const toggleAllergy = (id, allergy) => {
    setGuests((prev) =>
      prev.map((guest) => {
        if (guest.id !== id) return guest;

        const exists = guest.allergies.includes(allergy);

        return {
          ...guest,
          allergies: exists
            ? guest.allergies.filter((item) => item !== allergy)
            : [...guest.allergies, allergy],
        };
      }),
    );
  };

  const addGuest = () => {
    if (guests.length >= 10) return;
    setGuests((prev) => [...prev, createGuest()]);
  };

  const removeGuest = (id) => {
    if (guests.length === 1) return;
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("RSVP enviado", guests);

    alert("¡Gracias! Hemos recibido vuestra confirmación 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-rose-50 to-amber-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-stone-500">
            Confirmación de asistencia
          </p>

          <h1 className="font-serif text-4xl text-stone-800 md:text-5xl">
            RSVP
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600">
            Nos hace muchísima ilusión compartir este día con vosotros.
            Completad los datos de cada invitado y organizaremos todo para que
            disfrutéis de la celebración sin preocupaciones.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {guests.map((guest, index) => (
            <div
              key={guest.id}
              className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-xl shadow-stone-200/40 backdrop-blur"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-400">
                    Invitado {index + 1}
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-stone-800">
                    Información personal
                  </h2>
                </div>

                {guests.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGuest(guest.id)}
                    className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-50"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">
                    Nombre
                  </label>

                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) =>
                      updateGuest(guest.id, "name", e.target.value)
                    }
                    placeholder="Ej. Sara"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-rose-300 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">
                    Apellidos
                  </label>

                  <input
                    type="text"
                    value={guest.surname}
                    onChange={(e) =>
                      updateGuest(guest.id, "surname", e.target.value)
                    }
                    placeholder="Ej. García López"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-rose-300 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-3 block text-sm font-medium text-stone-700">
                  Intolerancias o alergias
                </label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {commonAllergies.map((allergy) => {
                    const checked = guest.allergies.includes(allergy);

                    return (
                      <label
                        key={allergy}
                        className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition ${
                          checked
                            ? "border-rose-300 bg-rose-50 text-rose-600"
                            : "border-stone-200 bg-stone-50 text-stone-600 hover:border-rose-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAllergy(guest.id, allergy)}
                          className="h-4 w-4 rounded border-stone-300 text-rose-400 focus:ring-rose-300"
                        />

                        {allergy}
                      </label>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <textarea
                    rows={3}
                    value={guest.otherAllergies}
                    onChange={(e) =>
                      updateGuest(guest.id, "otherAllergies", e.target.value)
                    }
                    placeholder="Otras alergias, intolerancias o comentarios alimentarios"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-rose-300 focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-amber-50/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">
                      Servicio de autobús
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      Tendremos autobús para facilitar el desplazamiento de ida
                      y vuelta.
                    </p>
                  </div>

                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={guest.busNeeded}
                      onChange={(e) =>
                        updateGuest(guest.id, "busNeeded", e.target.checked)
                      }
                      className="peer sr-only"
                    />

                    <div className="peer h-6 w-11 rounded-full bg-stone-300 transition after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-rose-400 peer-checked:after:translate-x-full" />
                  </label>
                </div>

                {guest.busNeeded && (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-stone-700">
                        Horario ida
                      </label>

                      <select
                        value={guest.busDeparture}
                        onChange={(e) =>
                          updateGuest(guest.id, "busDeparture", e.target.value)
                        }
                        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-rose-300"
                      >
                        <option value="18:00">18:00</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-stone-700">
                        Horario vuelta
                      </label>

                      <select
                        value={guest.busReturn}
                        onChange={(e) =>
                          updateGuest(guest.id, "busReturn", e.target.value)
                        }
                        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-rose-300"
                        required={guest.busNeeded}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="03:00">03:00</option>
                        <option value="06:00">06:00</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={addGuest}
              disabled={guests.length >= 10}
              className="rounded-2xl border border-dashed border-rose-300 bg-white/70 px-6 py-4 text-sm font-semibold text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Añadir invitado ({guests.length}/10)
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-stone-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
            >
              Confirmar asistencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
