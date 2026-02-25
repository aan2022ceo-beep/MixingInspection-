"use client";

import { MapPin, Wrench, User, Clock, ChevronRight } from "lucide-react";
import type { Inspection } from "@/lib/types";
import { StatusBadge, PriorityBadge } from "./status-badge";

interface InspectionCardProps {
  inspection: Inspection;
  onSelect: (inspection: Inspection) => void;
  onStatusChange: (inspection: Inspection, newStatus: Inspection["status"]) => void;
}

export function InspectionCard({
  inspection,
  onSelect,
  onStatusChange,
}: InspectionCardProps) {
  const canStart =
    inspection.status === "Open" || inspection.status === "Pending";
  const canClose = inspection.status === "In Progress";

  return (
    <div className="group rounded-[var(--radius)] border border-border bg-card transition-shadow hover:shadow-md">
      <button
        onClick={() => onSelect(inspection)}
        className="flex w-full flex-col gap-3 p-4 text-left"
        aria-label={`View inspection ${inspection.ticketId}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm font-bold text-foreground">
              {inspection.ticketId}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(inspection.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={inspection.priority} />
            <StatusBadge status={inspection.status} />
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-foreground">
          {inspection.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {inspection.area}
          </span>
          <span className="flex items-center gap-1">
            <Wrench className="h-3 w-3" />
            {inspection.equipment}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {inspection.inspector}
          </span>
          {inspection.photos.length > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {inspection.photos.length} photo{inspection.photos.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center justify-end text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <span>View Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </button>

      {(canStart || canClose) && (
        <div className="flex border-t border-border">
          {canStart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(inspection, "In Progress");
              }}
              className="flex-1 px-4 py-2.5 text-xs font-semibold text-status-inprogress transition-colors hover:bg-status-inprogress-bg"
            >
              Start Work
            </button>
          )}
          {canClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(inspection, "Closed");
              }}
              className="flex-1 px-4 py-2.5 text-xs font-semibold text-status-closed transition-colors hover:bg-status-closed-bg"
            >
              Mark Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
