export const throughput = [
  { t: "Mon", raw: 42, structured: 30 },
  { t: "Tue", raw: 58, structured: 46 },
  { t: "Wed", raw: 51, structured: 45 },
  { t: "Thu", raw: 74, structured: 63 },
  { t: "Fri", raw: 68, structured: 61 },
  { t: "Sat", raw: 40, structured: 37 },
  { t: "Sun", raw: 36, structured: 34 },
];

export const signalMix = [
  { name: "Product usage", value: 38 },
  { name: "Support", value: 24 },
  { name: "Revenue ops", value: 21 },
  { name: "Infra", value: 17 },
];

export const insights = [
  {
    id: "IN-0192",
    title: "Checkout latency correlates with EU traffic spikes",
    source: "Infra · Signals",
    confidence: 0.94,
    status: "Ready",
  },
  {
    id: "IN-0188",
    title: "Trial cohort churn linked to onboarding step 3 drop-off",
    source: "Product · Usage",
    confidence: 0.88,
    status: "Ready",
  },
  {
    id: "IN-0181",
    title: "Support tickets on invoicing up 22% week over week",
    source: "Support",
    confidence: 0.81,
    status: "Reviewing",
  },
  {
    id: "IN-0176",
    title: "Expansion revenue tracking ahead of forecast in APAC",
    source: "Revenue ops",
    confidence: 0.9,
    status: "Ready",
  },
];

export const automations = [
  { name: "Route infra alerts to on-call", runs: 1204, state: "Active" },
  { name: "Draft weekly revenue brief", runs: 52, state: "Active" },
  { name: "Flag churn-risk accounts to CS", runs: 318, state: "Active" },
  { name: "Escalate invoicing spike", runs: 4, state: "Paused" },
];

export const sidebarItems = [
  { key: "overview", label: "Overview" },
  { key: "signals", label: "Signals" },
  { key: "automations", label: "Automations" },
] as const;

export type TabKey = (typeof sidebarItems)[number]["key"];
