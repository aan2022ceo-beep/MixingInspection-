import type { Inspection } from "./types";

const STORAGE_KEY = "mixing-inspections";

export function getInspections(): Inspection[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveInspection(inspection: Inspection): void {
  const inspections = getInspections();
  inspections.unshift(inspection);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
}

export function updateInspection(updated: Inspection): void {
  const inspections = getInspections();
  const index = inspections.findIndex((i) => i.id === updated.id);
  if (index !== -1) {
    inspections[index] = { ...updated, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
  }
}

export function deleteInspection(id: string): void {
  const inspections = getInspections().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
}
