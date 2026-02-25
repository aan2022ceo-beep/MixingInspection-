"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ClipboardPlus,
  LayoutDashboard,
  History as HistoryIcon,
  ShieldCheck,
} from "lucide-react";
import type { Inspection } from "@/lib/types";
import {
  getInspections,
  saveInspection,
  updateInspection,
} from "@/lib/storage";
import { cn } from "@/lib/utils";
import { NewInspectionForm } from "./new-inspection-form";
import { Dashboard } from "./dashboard";
import { History } from "./history";
import { InspectionDetail } from "./inspection-detail";

type Tab = "new" | "dashboard" | "history";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    key: "new",
    label: "New",
    icon: <ClipboardPlus className="h-4 w-4" />,
  },
  {
    key: "history",
    label: "History",
    icon: <HistoryIcon className="h-4 w-4" />,
  },
];

export function InspectionApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [selectedInspection, setSelectedInspection] =
    useState<Inspection | null>(null);

  useEffect(() => {
    setInspections(getInspections());
  }, []);

  const handleNewInspection = useCallback((inspection: Inspection) => {
    saveInspection(inspection);
    setInspections(getInspections());
  }, []);

  const handleStatusChange = useCallback(
    (inspection: Inspection, newStatus: Inspection["status"]) => {
      const updated = { ...inspection, status: newStatus };
      updateInspection(updated);
      setInspections(getInspections());
      if (selectedInspection?.id === inspection.id) {
        setSelectedInspection(updated);
      }
    },
    [selectedInspection]
  );

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-primary">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-card-foreground leading-tight">
              IP. Mixing Inspection
            </h1>
            <p className="text-xs text-muted-foreground">
              Abnormal Process Program
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-5">
        {activeTab === "dashboard" && (
          <Dashboard
            inspections={inspections}
            onSelectInspection={setSelectedInspection}
            onStatusChange={handleStatusChange}
          />
        )}
        {activeTab === "new" && (
          <NewInspectionForm onSubmit={handleNewInspection} />
        )}
        {activeTab === "history" && (
          <History
            inspections={inspections}
            onSelectInspection={setSelectedInspection}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {/* Bottom Tab Bar */}
      <nav
        className="sticky bottom-0 z-40 border-t border-border bg-card"
        role="tablist"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-2xl">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors",
                activeTab === tab.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Detail Modal */}
      {selectedInspection && (
        <InspectionDetail
          inspection={selectedInspection}
          onClose={() => setSelectedInspection(null)}
          onStatusChange={(ins, status) => {
            handleStatusChange(ins, status);
          }}
        />
      )}
    </div>
  );
}
