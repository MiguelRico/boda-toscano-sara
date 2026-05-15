import React, { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

const MAX_GUESTS = 10;

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

const findGroup = async ({ email }) => {
  console.log("findGroup()", { email });

  const response = await fetch(
    `${import.meta.env.VITE_RSVP_API_URL}?email=${email}`,
  );

  const responseBody = await response.json();

  console.log("Response()", { responseBody });

  return JSON.stringify(responseBody);
};

const findGroupById = async (groupId) => {
  const response = await fetch(
    `${import.meta.env.VITE_RSVP_API_URL}?groupId=${groupId}`,
  );

  return await response.json();
};

const saveGroup = async (payload) => {
  console.log("saveGroup()", payload);

  await fetch(import.meta.env.VITE_RSVP_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    success: true,
  };
};

const createEmptyGuest = () => ({
  name: "",
  lastname: "",
  allergies: [],
  otherAllergies: "",
  comments: "",
  busNeeded: false,
  outboundBus: "",
  returnBus: "",
});

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isValidPhone = (value) => {
  return /^[+]?[\d\s()-]{8,20}$/.test(value);
};

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const groupIdFromUrl = searchParams.get("groupId");

  const [mode, setMode] = useState(null);

  const [groupId, setGroupId] = useState(null);

  const [contact, setContact] = useState({
    email: "",
    phone: "",
  });

  const [guests, setGuests] = useState([createEmptyGuest()]);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [globalError, setGlobalError] = useState("");

  const [errors, setErrors] = useState({});

  const totalGuests = useMemo(() => guests.length, [guests]);
  useEffect(() => {
    const loadGroup = async () => {
      if (!groupIdFromUrl) {
        return;
      }

      try {
        setLoadingSearch(true);

        const response = await findGroupById(groupIdFromUrl);

        if (!response.found) {
          setGlobalError("No se encontró la invitación.");

          return;
        }

        setGroupId(response.email);
        handleContactChange("email", response.email);
        handleContactChange("phone", response.phone);
        setGuests(response.guests);

        setMode("form");
      } catch (error) {
        console.error(error);

        setGlobalError("Error cargando invitación.");
      } finally {
        setLoadingSearch(false);
      }
    };

    loadGroup();
  }, [groupIdFromUrl]);

  const handleContactChange = (field, value) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guests];

    if (field === "allergies") {
      const allergies = updatedGuests[index].allergies || [];
      const exists = allergies.includes(value);
      updatedGuests[index].allergies = exists
        ? allergies.filter((item) => item !== value)
        : [...allergies, value];
      setGuests(updatedGuests);
      return;
    }

    updatedGuests[index] = {
      ...updatedGuests[index],
      [field]: value,
    };

    setGuests(updatedGuests);
  };

  const handleAddGuest = () => {
    if (guests.length >= MAX_GUESTS) return;
    setGuests((prev) => [...prev, createEmptyGuest()]);
  };

  const handleRemoveGuest = (index) => {
    if (guests.length === 1) return;

    const updatedGuests = guests.filter((_, i) => i !== index);

    setGuests(updatedGuests);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!contact.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!isValidEmail(contact.email)) {
      newErrors.email = "Introduce un email válido";
    }

    if (!contact.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!isValidPhone(contact.phone)) {
      newErrors.phone = "Introduce un teléfono válido";
    }

    if (!guests.length) {
      newErrors.guests = "Debes añadir al menos un invitado";
    }

    guests.forEach((guest, index) => {
      if (!guest.name.trim()) {
        newErrors[`guest_name_${index}`] = "El nombre es obligatorio";
      }

      if (!guest.lastname.trim()) {
        newErrors[`guest_lastname_${index}`] = "Los apellidos son obligatorios";
      }

      if (guest.comments.length > 300) {
        newErrors[`guest_comments_${index}`] = "Máximo 300 caracteres";
      }

      if (guest.allergies.length > 200) {
        newErrors[`guest_allergies_${index}`] = "Máximo 200 caracteres";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSearchInvitation = async () => {
    setSuccessMessage("");
    setGlobalError("");

    const validationErrors = {};

    if (!contact.email.trim()) {
      validationErrors.email = "El email es obligatorio";
    } else if (!isValidEmail(contact.email)) {
      validationErrors.email = "Introduce un email válido";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoadingSearch(true);

      const jsonString = await findGroup({
        email: contact.email,
      });

      const response = JSON.parse(jsonString);

      if (!response.found) {
        setGlobalError(
          "No hemos encontrado una invitación asociada a este email.",
        );

        return;
      }

      setGroupId(response.email);
      handleContactChange("email", response.email);
      handleContactChange("phone", response.phone);
      setGuests(response.guests);

      setMode("form");

      setSuccessMessage("Invitación encontrada correctamente.");
    } catch (error) {
      console.error(error);

      setGlobalError("Ha ocurrido un error buscando tu invitación.");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleCreateNew = () => {
    setMode("form");
    setGroupId(null);
    setSuccessMessage("");
    setGlobalError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setGlobalError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoadingSubmit(true);

      const payload = {
        groupId: contact.email,
        email: contact.email,
        phone: contact.phone,
        guests,
      };

      const response = await saveGroup(payload);

      if (response.email) {
        setGroupId(response.email);
      }

      setSuccessMessage(
        "¡Gracias! Hemos guardado vuestra confirmación correctamente.",
      );
    } catch (error) {
      console.error(error);

      setGlobalError("Ha ocurrido un error guardando la información.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f2] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#b8a999]">
            Sara & Toscano
          </p>

          <h1 className="mb-4 text-4xl font-light text-[#4d4036]">
            Confirmación de asistencia
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#7a6d63]">
            Estamos deseando celebrar este día con vosotros. Podéis confirmar
            vuestra asistencia y gestionar todos los invitados desde este
            formulario.
          </p>
        </div>

        {!mode && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-light text-[#4d4036]">
                Buscar invitación
              </h2>

              <p className="text-sm text-[#7a6d63]">
                Introduce el email asociado a tu invitación para modificarla o
                revisarla.
              </p>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm text-[#4d4036]">
                Email de contacto
              </label>

              <input
                type="email"
                value={contact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="w-full rounded-2xl border border-[#e7ddd4] bg-[#fcfaf8] px-4 py-3 outline-none transition focus:border-[#b89f87]"
                placeholder="ejemplo@email.com"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleSearchInvitation}
                disabled={loadingSearch}
                className="rounded-2xl bg-[#4d4036] px-6 py-4 text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loadingSearch
                  ? "Buscando invitación..."
                  : "Buscar mi invitación"}
              </button>

              <button
                onClick={handleCreateNew}
                className="rounded-2xl border border-[#d7c9bc] bg-white px-6 py-4 text-[#4d4036] transition hover:bg-[#faf5f0]"
              >
                Crear nueva confirmación
              </button>
            </div>
          </div>
        )}

        {mode === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-light text-[#4d4036]">
                Datos de contacto
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-[#4d4036]">
                    Email de contacto *
                  </label>

                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      handleContactChange("email", e.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e7ddd4] bg-[#fcfaf8] px-4 py-3 outline-none transition focus:border-[#b89f87]"
                    placeholder="Ej: ejemplo@email.com"
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#4d4036]">
                    Teléfono de contacto *
                  </label>

                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) =>
                      handleContactChange("phone", e.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e7ddd4] bg-[#fcfaf8] px-4 py-3 outline-none transition focus:border-[#b89f87]"
                    placeholder="Ej: +34 600 000 000"
                  />

                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {guests.map((guest, index) => (
              <div key={index} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#b8a999]">
                      Invitado {index + 1}
                    </p>

                    <h3 className="text-2xl font-light text-[#4d4036]">
                      Información del invitado
                    </h3>
                  </div>

                  {guests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(index)}
                      className="text-sm text-red-500 transition hover:opacity-70"
                    >
                      Eliminar
                    </button>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-[#4d4036]">
                      Nombre *
                    </label>

                    <input
                      type="text"
                      value={guest.name}
                      onChange={(e) =>
                        handleGuestChange(index, "name", e.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e7ddd4] bg-[#fcfaf8] px-4 py-3 outline-none transition focus:border-[#b89f87]"
                      placeholder="Ej: Sara"
                    />

                    {errors[`guest_name_${index}`] && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors[`guest_name_${index}`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#4d4036]">
                      Apellidos *
                    </label>

                    <input
                      type="text"
                      value={guest.lastname}
                      onChange={(e) =>
                        handleGuestChange(index, "lastname", e.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e7ddd4] bg-[#fcfaf8] px-4 py-3 outline-none transition focus:border-[#b89f87]"
                      placeholder="Ej: García"
                    />

                    {errors[`guest_lastname_${index}`] && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors[`guest_lastname_${index}`]}
                      </p>
                    )}
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
                              ? "border-blue-300 bg-blue-50 text-blue-600"
                              : "border-stone-200 bg-stone-50 text-stone-600 hover:border-blue-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              handleGuestChange(index, "allergies", allergy)
                            }
                            className="h-4 w-4 rounded border-stone-300 text-blue-400 focus:ring-blue-300"
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
                        handleGuestChange(
                          index,
                          "otherAllergies",
                          e.target.value,
                        )
                      }
                      placeholder="Otras alergias, intolerancias o comentarios alimentarios"
                      className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm text-[#4d4036]">
                    Comentarios adicionales
                  </label>

                  <textarea
                    rows={4}
                    value={guest.comments}
                    onChange={(e) =>
                      handleGuestChange(index, "comments", e.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e7ddd4] bg-[#fcfaf8] px-4 py-3 outline-none transition focus:border-[#b89f87]"
                    placeholder="Cualquier indicación que debamos tener en cuenta"
                  />

                  {errors[`guest_comments_${index}`] && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors[`guest_comments_${index}`]}
                    </p>
                  )}
                </div>

                <div className="mt-6 rounded-3xl bg-amber-50/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-800">
                        Servicio de autobús
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        Tendremos autobús para facilitar el desplazamiento de
                        ida y vuelta.
                      </p>
                    </div>

                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={guest.busNeeded}
                        onChange={(e) =>
                          handleGuestChange(
                            index,
                            "busNeeded",
                            e.target.checked,
                          )
                        }
                        className="peer sr-only"
                      />

                      <div className="peer h-6 w-11 rounded-full bg-stone-300 transition after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-400 peer-checked:after:translate-x-full" />
                    </label>
                  </div>

                  {guest.busNeeded && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                          Horario ida
                        </label>

                        <select
                          value={guest.outboundBus}
                          onChange={(e) =>
                            handleGuestChange(
                              index,
                              "outboundBus",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-blue-300"
                        >
                          <option value="No">No necesito autobus de ida</option>
                          <option value="18:00">18:00</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                          Horario vuelta
                        </label>

                        <select
                          value={guest.returnBus}
                          onChange={(e) =>
                            handleGuestChange(
                              index,
                              "returnBus",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-700 outline-none focus:border-blue-300"
                        >
                          <option value="No">
                            No necesito autobus de vuelta
                          </option>
                          <option value="3:00">3:00</option>
                          <option value="6:00">6:00</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              {totalGuests < MAX_GUESTS && (
                <button
                  type="button"
                  onClick={handleAddGuest}
                  className="rounded-2xl border border-dashed border-[#c9b7a7] bg-[#faf5f0] px-6 py-4 text-[#4d4036] transition hover:bg-[#f5ede5]"
                >
                  Añadir invitado
                </button>
              )}

              <button
                type="submit"
                disabled={loadingSubmit}
                className="rounded-2xl bg-[#4d4036] px-6 py-4 text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loadingSubmit
                  ? "Guardando confirmación..."
                  : "Confirmar asistencia"}
              </button>
            </div>
          </form>
        )}

        {successMessage && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
            {successMessage}
          </div>
        )}

        {globalError && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            {globalError}
          </div>
        )}
      </div>
    </div>
  );
}
