import { httpClient } from "../api/httpClient";

export async function sendRsvp(data) {
  const response = await httpClient.post("/rsvp", data);

  return response.data;
}
