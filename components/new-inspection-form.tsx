"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  User,
  MapPin,
  Wrench,
  FileText,
} from "lucide-react";
import type { Inspection, Priority, RootCause5M } from "@/lib/types";
import { generateTicketId } from "@/lib/ticket";
import { PhotoUpload } from "./photo-upload";

interface NewInspectionFormProps {
  onSubmit: (inspection: Inspection) => void;
}

const AREAS = [
  "Mixing Area A",
  "Mixing Area B",
  "Mixing Area C",
  "Storage Tank",
  "Quality Lab",
  "Packaging Line",
];

const EQUIPMENT = [
  "Mixer M-001",
  "Mixer M-002",
  "Mixer M-003",
  "Pump P-001",
  "Valve V-001",
  "Tank T-001",
];

const ROOT_CAUSE_LABELS: Record<keyof RootCause5M, { label: string; placeholder: string }> = {
  man: { label: "Man", placeholder: "Operator error, training, fatigue..." },
  machine: { label: "Machine", placeholder: "Equipment malfunction, calibration..." },
  material: { label: "Material", placeholder: "Raw material defect, contamination..." },
  method: { label: "Method", placeholder: "Procedure not followed, SOP issues..." },
  milieu: { label: "Milieu", placeholder: "Environment, temperature, humidity..." },
};

export function NewInspectionForm({ onSubmit }: NewInspectionFormProps) {
  const [area, setArea] = useState("");
  const [equipment, setEquipment] = useState("");
  const [inspector, setInspector] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [description, setDescription] = useState("");
  const [rootCause5M, setRootCause5M] = useState<RootCause5M>({
    man: "",
    machine: "",
    material: "",
    method: "",
    milieu: "",
  });
  const [correctiveAction, setCorrectiveAction] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!area) newErrors.area = "Area is required";
    if (!equipment) newErrors.equipment = "Equipment is required";
    if (!inspector.trim()) newErrors.inspector = "Inspector name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const now = new Date();
    const status = priority === "High" ? "Open" : "Pending";
    const inspection: Inspection = {
      id: crypto.randomUUID(),
      ticketId: generateTicketId(),
      date: now.toISOString().slice(0, 10),
      area,
      equipment,
      inspector: inspector.trim(),
      priority,
      status,
      description: description.trim(),
      rootCause5M,
      correctiveAction: correctiveAction.trim(),
      photos,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    onSubmit(inspection);
    setSubmitted(true);

    setTimeout(() => {
      setArea("");
      setEquipment("");
      setInspector("");
      setPriority("Medium");
      setDescription("");
      setRootCause5M({ man: "", machine: "", material: "", method: "", milieu: "" });
      setCorrectiveAction("");
      setPhotos([]);
      setErrors({});
      setSubmitted(false);
    }, 2000);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-[var(--radius)] border border-status-closed/30 bg-status-closed-bg p-12">
        <CheckCircle2 className="h-12 w-12 text-status-closed" />
        <h3 className="text-lg font-semibold text-status-closed">
          Inspection Submitted Successfully
        </h3>
        <p className="text-sm text-muted-foreground">
          Redirecting to form...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Basic Information */}
      <div className="rounded-[var(--radius)] border border-border bg-card p-5">
        <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-card-foreground">
          <FileText className="h-4 w-4 text-primary" />
          Basic Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              Area *
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="h-10 rounded-[var(--radius)] border border-input bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select area...</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            {errors.area && (
              <span className="text-xs text-destructive">{errors.area}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
              Equipment *
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="h-10 rounded-[var(--radius)] border border-input bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select equipment...</option>
              {EQUIPMENT.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
            {errors.equipment && (
              <span className="text-xs text-destructive">{errors.equipment}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Inspector Name *
            </label>
            <input
              type="text"
              value={inspector}
              onChange={(e) => setInspector(e.target.value)}
              placeholder="Enter inspector name"
              className="h-10 rounded-[var(--radius)] border border-input bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            {errors.inspector && (
              <span className="text-xs text-destructive">{errors.inspector}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
              Priority *
            </label>
            <div className="flex gap-2">
              {(["High", "Medium", "Low"] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 rounded-[var(--radius)] border px-3 py-2 text-sm font-medium transition-colors ${
                    priority === p
                      ? p === "High"
                        ? "border-priority-high bg-priority-high-bg text-priority-high"
                        : p === "Medium"
                        ? "border-priority-medium bg-priority-medium-bg text-priority-medium"
                        : "border-priority-low bg-priority-low-bg text-priority-low"
                      : "border-border bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the abnormality or issue found..."
            rows={3}
            className="rounded-[var(--radius)] border border-input bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          {errors.description && (
            <span className="text-xs text-destructive">{errors.description}</span>
          )}
        </div>
      </div>

      {/* 5M Root Cause Analysis */}
      <div className="rounded-[var(--radius)] border border-border bg-card p-5">
        <h3 className="mb-4 text-base font-semibold text-card-foreground">
          5M Root Cause Analysis
        </h3>
        <div className="flex flex-col gap-3">
          {(Object.keys(ROOT_CAUSE_LABELS) as (keyof RootCause5M)[]).map(
            (key) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  {ROOT_CAUSE_LABELS[key].label}
                </label>
                <input
                  type="text"
                  value={rootCause5M[key]}
                  onChange={(e) =>
                    setRootCause5M({ ...rootCause5M, [key]: e.target.value })
                  }
                  placeholder={ROOT_CAUSE_LABELS[key].placeholder}
                  className="h-10 rounded-[var(--radius)] border border-input bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Corrective Action */}
      <div className="rounded-[var(--radius)] border border-border bg-card p-5">
        <h3 className="mb-4 text-base font-semibold text-card-foreground">
          Corrective Action
        </h3>
        <textarea
          value={correctiveAction}
          onChange={(e) => setCorrectiveAction(e.target.value)}
          placeholder="Describe the corrective action taken or planned..."
          rows={3}
          className="w-full rounded-[var(--radius)] border border-input bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Photo Evidence */}
      <div className="rounded-[var(--radius)] border border-border bg-card p-5">
        <PhotoUpload photos={photos} onPhotosChange={setPhotos} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="h-11 rounded-[var(--radius)] bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:bg-primary/80"
      >
        Submit Inspection
      </button>
    </form>
  );
}
