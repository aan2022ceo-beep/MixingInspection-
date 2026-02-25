"use client";

import { useState, useMemo } from "react";
import { Search, Filter, FileDown, Inbox } from "lucide-react";
import type { Inspection, Status, Priority } from "@/lib/types";
import { InspectionCard } from "./inspection-card";
import { exportToExcel } from "@/lib/export";

interface HistoryProps {
  inspections: Inspection[];
  onSelectInspection: (inspection: Inspection) => void;
  onStatusChange: (inspection: Inspection, newStatus: Inspection["status"]) => void;
}

export function History({
  inspections,
  onSelectInspection,
  onStatusChange,
}: HistoryProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");

  const filtered = useMemo(() => {
    return inspections.filter((ins) => {
      const matchesSearch =
        search === "" ||
        ins.ticketId.toLowerCase().includes(search.toLowerCase()) ||
        ins.description.toLowerCase().includes(search.toLowerCase()) ||
        ins.area.toLowerCase().includes(search.toLowerCase()) ||
        ins.equipment.toLowerCase().includes(search.toLowerCase()) ||
        ins.inspector.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ins.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || ins.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [inspections, search, statusFilter, priorityFilter]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket, description, area, equipment, inspector..."
            className="h-10 w-full rounded-[var(--radius)] border border-input bg-card pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
            className="h-8 rounded-[var(--radius)] border border-input bg-card px-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | "All")}
            className="h-8 rounded-[var(--radius)] border border-input bg-card px-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {inspections.length > 0 && (
            <button
              onClick={() => exportToExcel(filtered)}
              className="ml-auto flex h-8 items-center gap-1.5 rounded-[var(--radius)] border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <FileDown className="h-3.5 w-3.5" />
              Export Excel
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {inspections.length} inspection{inspections.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-card p-12 text-center">
          <Inbox className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground">
            No inspections found
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {inspections.length === 0
              ? "Create your first inspection to get started."
              : "Try adjusting your search or filters."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((ins) => (
            <InspectionCard
              key={ins.id}
              inspection={ins}
              onSelect={onSelectInspection}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
