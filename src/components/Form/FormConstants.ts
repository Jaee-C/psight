import { Issue } from "@/interfaces";

export type StatusType = 1 | 2 | 3;

export const ISSUE_STATUSES = [
  {
    label: "Done",
    value: 3,
  },
  {
    label: "In Progress",
    value: 2,
  },
  {
    label: "To Do",
    value: 1,
  },
];

export const ISSUE_PRIORITIES = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

export const EMPTY_FORM: Issue = new Issue(-1);
