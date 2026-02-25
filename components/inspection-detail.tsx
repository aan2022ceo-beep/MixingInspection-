"use client";

import {
  X,
  MapPin,
  Wrench,
  User,
  Calendar,
  AlertTriangle,
  FileText,
  Camera,
} from "lucide-react";
import type { Inspection } from "@/lib/types";
import { StatusBadge, PriorityBadge } from "./status-badge";

interface InspectionDetailProps {
  inspection: Inspection;
  onClose: () => void;
  onStatusChange: (inspection: Inspection, newStatus: Inspection["status"]) => void;
}

const ROOT_CAUSE_LABELS: Record<string, string> = {
  man: "Man",
  machine: "Machine",
  material: "Material",
  method: "Method",
  milieu: "Milieu (Environment)",
};

export function InspectionDetail({
  inspection,
  onClose,
  onStatusChange,
}: InspectionDetailProps) {
  const canStart =
    inspection.status === "Open" || inspection.status === "Pending";
  const canClose = inspection.status === "In Progress";
  const hasRootCause = Object.values(inspection.rootCause5M).some(
    (v) => v.trim() !== ""
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Inspection details for ${inspection.ticketId}`}
    >
      <div
        className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-card sm:max-w-lg sm:rounded-[var(--radius)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-base font-bold text-card-foreground">
              {inspection.ticketId}
            </span>
            <div className="flex items-center gap-2">
              <StatusBadge status={inspection.status} />
              <PriorityBadge priority={inspection.priority} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close detail view"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-5">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="font-medium text-card-foreground">{inspection.area}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Equipment</p>
                  <p className="font-medium text-card-foreground">{inspection.equipment}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Inspector</p>
                  <p className="font-medium text-card-foreground">{inspection.inspector}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium text-card-foreground">
                    {new Date(inspection.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-card-foreground">
                <FileText className="h-3.5 w-3.5 text-primary" />
                Description
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {inspection.description}
              </p>
            </div>

            {/* 5M Root Cause */}
            {hasRootCause && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-card-foreground">
                  <AlertTriangle className="h-3.5 w-3.5 text-priority-medium" />
                  5M Root Cause Analysis
                </h4>
                <div className="flex flex-col gap-2">
                  {(
                    Object.entries(inspection.rootCause5M) as [string, string][]
                  )
                    .filter(([, v]) => v.trim())
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-[var(--radius)] bg-muted px-3 py-2"
                      >
                        <span className="text-xs font-semibold text-foreground">
                          {ROOT_CAUSE_LABELS[key]}:
                        </span>{" "}
                        <span className="text-xs text-muted-foreground">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Corrective Action */}
            {inspection.correctiveAction && (
              <div>
                <h4 className="mb-1.5 text-sm font-semibold text-card-foreground">
                  Corrective Action
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {inspection.correctiveAction}
                </p>
              </div>
            )}

            {/* Photos */}
            {inspection.photos.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-card-foreground">
                  <Camera className="h-3.5 w-3.5 text-primary" />
                  Photo Evidence ({inspection.photos.length})
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {inspection.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt={`Evidence ${i + 1}`}
                      className="aspect-square w-full rounded-[var(--radius)] border border-border object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">
                Created:{" "}
                {new Date(inspection.createdAt).toLocaleString("en-GB")}
              </p>
              {inspection.updatedAt !== inspection.createdAt && (
                <p className="text-xs text-muted-foreground">
                  Updated:{" "}
                  {new Date(inspection.updatedAt).toLocaleString("en-GB")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {(canStart || canClose) && (
          <div className="flex border-t border-border p-4">
            {canStart && (
              <button
                onClick={() => onStatusChange(inspection, "In Progress")}
                className="flex-1 rounded-[var(--radius)] bg-status-inprogress py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-status-inprogress/90"
              >
                Start Work
              </button>
            )}
            {canClose && (
              <button
                onClick={() => onStatusChange(inspection, "Closed")}
                className="flex-1 rounded-[var(--radius)] bg-status-closed py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-status-closed/90"
              >
                Mark Complete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
