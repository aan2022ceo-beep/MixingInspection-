import * as XLSX from "xlsx";
import type { Inspection } from "./types";

export function exportToExcel(inspections: Inspection[]): void {
  const data = inspections.map((ins) => ({
    "Ticket ID": ins.ticketId,
    Date: ins.date,
    Area: ins.area,
    Equipment: ins.equipment,
    Inspector: ins.inspector,
    Priority: ins.priority,
    Status: ins.status,
    Description: ins.description,
    "Man (5M)": ins.rootCause5M.man,
    "Machine (5M)": ins.rootCause5M.machine,
    "Material (5M)": ins.rootCause5M.material,
    "Method (5M)": ins.rootCause5M.method,
    "Milieu (5M)": ins.rootCause5M.milieu,
    "Corrective Action": ins.correctiveAction,
    "Photos Count": ins.photos.length,
    "Created At": ins.createdAt,
    "Updated At": ins.updatedAt,
  }));

  const ws = XLSX.utils.json_to_sheet(data);

  const colWidths = Object.keys(data[0] || {}).map((key) => ({
    wch: Math.max(key.length + 2, 15),
  }));
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inspections");
  XLSX.writeFile(wb, `mixing-inspections-${new Date().toISOString().slice(0, 10)}.xlsx`);
}
