import type { Status, Priority } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "Open" && "bg-status-open-bg text-status-open",
        status === "Pending" && "bg-status-pending-bg text-status-pending",
        status === "In Progress" && "bg-status-inprogress-bg text-status-inprogress",
        status === "Closed" && "bg-status-closed-bg text-status-closed"
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "Open" && "bg-status-open",
          status === "Pending" && "bg-status-pending",
          status === "In Progress" && "bg-status-inprogress",
          status === "Closed" && "bg-status-closed"
        )}
      />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        priority === "High" && "bg-priority-high-bg text-priority-high",
        priority === "Medium" && "bg-priority-medium-bg text-priority-medium",
        priority === "Low" && "bg-priority-low-bg text-priority-low"
      )}
    >
      {priority}
    </span>
  );
}
