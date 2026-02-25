"use client";

import {
  ClipboardList,
  AlertCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import type { Inspection } from "@/lib/types";
import { InspectionCard } from "./inspection-card";

interface DashboardProps {
  inspections: Inspection[];
  onSelectInspection: (inspection: Inspection) => void;
  onStatusChange: (inspection: Inspection, newStatus: Inspection["status"]) => void;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  bgClass: string;
  textClass: string;
}

function StatCard({ label, value, icon, bgClass, textClass }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-card p-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius)] ${bgClass}`}
      >
        <span className={textClass}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function Dashboard({
  inspections,
  onSelectInspection,
  onStatusChange,
}: DashboardProps) {
  const total = inspections.length;
  const open = inspections.filter(
    (i) => i.status === "Open" || i.status === "Pending"
  ).length;
  const inProgress = inspections.filter(
    (i) => i.status === "In Progress"
  ).length;
  const closed = inspections.filter((i) => i.status === "Closed").length;

  const highCount = inspections.filter((i) => i.priority === "High").length;
  const mediumCount = inspections.filter(
    (i) => i.priority === "Medium"
  ).length;
  const lowCount = inspections.filter((i) => i.priority === "Low").length;

  const recentActive = inspections
    .filter((i) => i.status !== "Closed")
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total"
          value={total}
          icon={<ClipboardList className="h-5 w-5" />}
          bgClass="bg-primary/10"
          textClass="text-primary"
        />
        <StatCard
          label="Open / Pending"
          value={open}
          icon={<AlertCircle className="h-5 w-5" />}
          bgClass="bg-status-open-bg"
          textClass="text-status-open"
        />
        <StatCard
          label="In Progress"
          value={inProgress}
          icon={<Clock className="h-5 w-5" />}
          bgClass="bg-status-inprogress-bg"
          textClass="text-status-inprogress"
        />
        <StatCard
          label="Closed"
          value={closed}
          icon={<CheckCircle2 className="h-5 w-5" />}
          bgClass="bg-status-closed-bg"
          textClass="text-status-closed"
        />
      </div>

      {/* Distribution */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Status Distribution */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            Status Distribution
          </h3>
          <div className="flex flex-col gap-2.5">
            {[
              {
                label: "Open/Pending",
                count: open,
                color: "bg-status-open",
              },
              {
                label: "In Progress",
                count: inProgress,
                color: "bg-status-inprogress",
              },
              {
                label: "Closed",
                count: closed,
                color: "bg-status-closed",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-24 text-xs text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all`}
                      style={{
                        width:
                          total > 0
                            ? `${(item.count / total) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-xs font-semibold text-card-foreground">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="rounded-[var(--radius)] border border-border bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <AlertCircle className="h-4 w-4 text-priority-high" />
            Priority Distribution
          </h3>
          <div className="flex flex-col gap-2.5">
            {[
              {
                label: "High",
                count: highCount,
                color: "bg-priority-high",
              },
              {
                label: "Medium",
                count: mediumCount,
                color: "bg-priority-medium",
              },
              {
                label: "Low",
                count: lowCount,
                color: "bg-priority-low",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-24 text-xs text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all`}
                      style={{
                        width:
                          total > 0
                            ? `${(item.count / total) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-xs font-semibold text-card-foreground">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Active Inspections */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Recent Active Inspections
        </h3>
        {recentActive.length === 0 ? (
          <div className="rounded-[var(--radius)] border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-status-closed" />
            <p className="text-sm text-muted-foreground">
              No active inspections. All clear!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentActive.map((ins) => (
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
    </div>
  );
}
