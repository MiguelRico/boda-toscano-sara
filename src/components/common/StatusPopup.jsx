import React from "react";
import { Link } from "react-router-dom";

export default function StatusPopup({
  open,
  type = "success",
  title,
  message,
  onClose,
  onDetails,
}) {
  if (!open) return null;

  const styles = {
    success: {
      container: "border-[#d8e7d3] bg-[#f4faf1]",
      iconBg: "bg-[#dcefd6]",
      icon: "text-[#5d7c57]",
      title: "text-[#4d4036]",
    },

    error: {
      container: "border-[#efd6d6] bg-[#fff5f5]",
      iconBg: "bg-[#f6dede]",
      icon: "text-[#a35d5d]",
      title: "text-[#4d4036]",
    },
  };

  const current = styles[type] || styles.success;

  return (
    <div
      className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/20
      px-4
      backdrop-blur-sm
    "
    >
      <div
        className={`
          w-full max-w-md
          rounded-3xl border
          p-6 shadow-2xl
          transition-all duration-300
          animate-[fadeIn_.25s_ease]
          ${current.container}
        `}
      >
        <div className="flex items-start gap-4">
          <div
            className={`
              flex h-12 w-12
              items-center justify-center
              rounded-full
              ${current.iconBg}
            `}
          >
            {type === "success" ? (
              <svg
                className={`h-6 w-6 ${current.icon}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className={`h-6 w-6 ${current.icon}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`
                text-lg font-medium
                ${current.title}
              `}
            >
              {title}
            </h3>

            <p
              className="
              mt-2 text-sm leading-relaxed
              text-[#6f6257]
            "
            >
              {message}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/"
                className="
                rounded-2xl
                bg-[#4d4036]
                px-5 py-2
                text-sm text-white
                transition hover:opacity-90
                "
              >
                Volver al inicio
              </Link>

              <button
                onClick={onClose}
                className="
                rounded-2xl
                border border-[#d8cec3]
                bg-white/70
                px-5 py-2
                text-sm text-[#4d4036]
                transition hover:bg-white
                "
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
