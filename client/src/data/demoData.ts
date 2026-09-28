export const demoFiles = [
  {
    name: "transaction_service.py",
    language: "python",
    label: "Python",
    code: `from datetime import datetime\n\ndef process_transactions(transactions, users):\n    results = []\n    for transaction in transactions:\n        user = None\n        for candidate in users:\n            if candidate.id == transaction.user_id:\n                user = candidate\n                break\n        if user and transaction.amount > 0:\n            results.append({\n                "user": user.name,\n                "amount": transaction.amount,\n                "processed_at": datetime.now()\n            })\n    return results\n`,
  },
  {
    name: "authService.js",
    language: "javascript",
    label: "JavaScript",
    code: `export async function authenticateUser(db, email, password) {\n  const query = \`SELECT * FROM users WHERE email = '\${email}'\`;\n  const user = await db.query(query);\n  if (!user) return null;\n  const valid = password === user.password;\n  if (valid) {\n    return { id: user.id, token: createToken(user) };\n  }\n  return null;\n}\n`,
  },
  {
    name: "PaymentService.java",
    language: "java",
    label: "Java",
    code: `public class PaymentService {\n  public Receipt charge(Account account, double amount) {\n    if (amount > account.getBalance()) {\n      throw new IllegalArgumentException("Insufficient funds");\n    }\n    account.setBalance(account.getBalance() - amount);\n    accountRepository.save(account);\n    return new Receipt(account.getId(), amount);\n  }\n}\n`,
  },
  {
    name: "customer_queries.sql",
    language: "sql",
    label: "SQL",
    code: `SELECT c.id, c.email, o.total\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nWHERE c.email = '<user-input>';\n`,
  },
];

export const issueSeed = [
  {
    id: "perf-nested-loop",
    severity: "high",
    category: "Performance",
    line: 6,
    title: "Inefficient nested iteration",
    explanation:
      "Each transaction scans the full users collection to find a match. This compounds quickly as both lists grow.",
    impact: "Lookup cost grows to O(n × m), adding latency to larger batches.",
    recommendation:
      "Index users by ID once, then use constant-time lookups while processing transactions.",
    confidence: 98,
    complexity: "O(n × m)",
  },
  {
    id: "security-time",
    severity: "medium",
    category: "Reliability",
    line: 13,
    title: "Non-deterministic timestamp",
    explanation:
      "The system clock is read during each record construction, which makes replay and test results harder to reproduce.",
    impact: "Retries can produce inconsistent audit timestamps.",
    recommendation:
      "Inject a clock dependency or capture one UTC timestamp at the start of the operation.",
    confidence: 94,
    complexity: "—",
  },
  {
    id: "maintainability-input",
    severity: "low",
    category: "Maintainability",
    line: 4,
    title: "Missing input contract",
    explanation:
      "The function assumes both inputs are iterable and that transactions contain an amount and user ID.",
    impact: "Malformed payloads can fail halfway through a batch.",
    recommendation:
      "Validate the batch before processing and return a typed result for invalid records.",
    confidence: 91,
    complexity: "—",
  },
];

export const navGroups = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", path: "/dashboard", icon: "grid" },
      { label: "Code review", path: "/review", icon: "scan" },
      { label: "Refactor", path: "/refactor", icon: "sparkles" },
    ],
  },
  {
    label: "Codebase",
    items: [
      { label: "Repository", path: "/repository", icon: "network" },
      { label: "Security", path: "/security", icon: "shield" },
      { label: "Test lab", path: "/testing", icon: "flask" },
      { label: "AI assistant", path: "/assistant", icon: "message" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", path: "/analytics", icon: "chart" },
      { label: "Review history", path: "/history", icon: "clock" },
      { label: "Settings", path: "/settings", icon: "settings" },
    ],
  },
];

export const reviewHistory = [
  { file: "transaction_service.py", language: "Python", score: 87, issues: 12, security: 2, time: "2 hours ago", status: "Reviewed" },
  { file: "authService.js", language: "JavaScript", score: 72, issues: 8, security: 4, time: "Yesterday", status: "Needs attention" },
  { file: "PaymentService.java", language: "Java", score: 93, issues: 3, security: 0, time: "Sep 24, 2026", status: "Reviewed" },
  { file: "customer_queries.sql", language: "SQL", score: 78, issues: 6, security: 2, time: "Sep 22, 2026", status: "Needs attention" },
  { file: "retry_policy.ts", language: "TypeScript", score: 91, issues: 4, security: 0, time: "Sep 20, 2026", status: "Reviewed" },
];

export const pipelineSteps = [
  "Code received",
  "Parsing syntax",
  "Static analysis",
  "Security scan",
  "Performance review",
  "AI reasoning",
  "Generating recommendations",
  "Validating suggestions",
];
