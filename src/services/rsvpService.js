import { httpClient } from "../api/httpClient";

const API_URL =
  "https://script.google.com/macros/s/AKfycbx2nIF4jKW11XLsRb0wcQGBYE55a1iyfDu4BupqQsxRijGFh8LohHJwOlQBKvta3fy4DQ/exec";

export async function sendRsvp(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error enviando RSVP");
  }

  return response.json();
}
