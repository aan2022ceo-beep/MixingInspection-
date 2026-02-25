import { getInspections } from "./storage";

export function generateTicketId(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const dateStr = `${dd}/${mm}/${yy}`;

  const todayInspections = getInspections().filter((i) =>
    i.ticketId.includes(dateStr)
  );
  const seq = String(todayInspections.length + 1).padStart(3, "0");

  return `Mix-${dateStr}-${seq}`;
}
