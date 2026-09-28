import { issueSeed } from "@/data/demoData";

export type ReviewIssue = {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  line: number;
  title: string;
  explanation: string;
  impact: string;
  recommendation: string;
  confidence: number;
  complexity: string;
};

export type AnalysisResult = {
  score: number;
  metrics: { readability: number; maintainability: number; security: number; performance: number; complexity: number };
  summary: string;
  issues: ReviewIssue[];
  duration: string;
};

export type SecurityFinding = {
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  cwe: string;
  owasp: string;
  line: number;
  description: string;
  fix: string;
};

const pause = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function analyzeCode(code: string, language = "python"): Promise<AnalysisResult> {
  await pause(1250);
  if (!code.trim()) throw new Error("Add a code snippet before starting the review.");
  if (code.length > 50000) throw new Error("This demo accepts code samples up to 50,000 characters.");
  if (language === "sql" || code.includes("SELECT * FROM users WHERE")) {
    return {
      score: 68,
      metrics: { readability: 83, maintainability: 74, security: 48, performance: 72, complexity: 80 },
      summary: "The query is readable, but user-controlled input is reaching the query string directly. Parameterize the filter before this reaches production.",
      duration: "1.24s",
      issues: [
        { id: "sql-injection", severity: "critical", category: "Security", line: 4, title: "SQL injection risk", explanation: "A value is interpolated into the SQL statement rather than bound as a parameter.", impact: "An attacker may alter the query and access or modify records outside the intended scope.", recommendation: "Use a prepared statement with a bound parameter for the email value.", confidence: 99, complexity: "—" },
        { id: "select-star", severity: "medium", category: "Performance", line: 1, title: "Avoid selecting every column", explanation: "The query returns fields that the caller may not need.", impact: "Extra data increases transfer size and couples this query to schema changes.", recommendation: "Select only the columns required by the calling view.", confidence: 95, complexity: "—" },
      ],
    };
  }
  const issues = code.includes("for candidate in users") ? issueSeed : issueSeed.slice(1);
  return {
    score: code.length < 80 ? 91 : 87,
    metrics: { readability: 91, maintainability: 89, security: 92, performance: 81, complexity: 78 },
    summary: "The code is functional and clearly structured. A few targeted changes can improve lookup cost, input resilience, and test determinism.",
    duration: "1.18s",
    issues: issues as ReviewIssue[],
  };
}

export async function refactorCode(source: string, language = "python"): Promise<{ code: string; changes: string[]; validation: string[] }> {
  await pause(850);
  if (language === "python" && source.includes("for candidate in users")) {
    return {
      code: `from datetime import datetime, timezone\n\ndef process_transactions(transactions, users):\n    users_by_id = {user.id: user for user in users}\n    processed_at = datetime.now(timezone.utc)\n\n    return [\n        {\n            "user": user.name,\n            "amount": transaction.amount,\n            "processed_at": processed_at,\n        }\n        for transaction in transactions\n        if transaction.amount > 0\n        if (user := users_by_id.get(transaction.user_id)) is not None\n    ]\n`,
      changes: ["Replaced repeated scans with a hash map", "Reduced lookup complexity to O(n + m)", "Captured one timezone-aware timestamp", "Simplified control flow with a focused comprehension"],
      validation: ["Syntax valid", "Static analysis passed", "14 / 14 tests passed", "Complexity reduced", "Security unchanged"],
    };
  }
  return {
    code: source.replace(/\bSELECT \*\b/gi, "SELECT id, email"),
    changes: ["Reduced unnecessary data retrieval", "Clarified the intent of the code", "Preserved existing behavior"],
    validation: ["Syntax valid", "Static analysis passed", "8 / 8 tests passed", "Security review complete"],
  };
}

export async function generateTests(functionName = "process_transactions"): Promise<{ code: string; count: number; coverage: number }> {
  await pause(760);
  return {
    count: 8,
    coverage: 94,
    code: `import pytest\nfrom transaction_service import ${functionName}\n\n\ndef test_processes_valid_transactions():\n    transactions = [Transaction(user_id=1, amount=24.5)]\n    users = [User(id=1, name="Avery")]\n    result = process_transactions(transactions, users)\n    assert len(result) == 1\n    assert result[0]["amount"] == 24.5\n\n\ndef test_skips_unknown_users():\n    result = process_transactions([Transaction(user_id=9, amount=20)], [])\n    assert result == []\n\n\ndef test_skips_non_positive_amounts():\n    transaction = Transaction(user_id=1, amount=0)\n    result = process_transactions([transaction], [User(id=1, name="Avery")])\n    assert result == []\n\n\ndef test_handles_empty_batch():\n    assert process_transactions([], []) == []\n\n\ndef test_preserves_order_for_matching_records():\n    # Valid transactions remain in their original input order.\n    ...\n`,
  };
}

export async function analyzeSecurity(): Promise<SecurityFinding[]> {
  await pause(620);
  return [
    { severity: "critical", title: "SQL injection in authentication query", cwe: "CWE-89", owasp: "A03:2021 Injection", line: 4, description: "User input is concatenated into a SQL statement. Crafted email values could change the query's logic.", fix: "Replace string interpolation with a prepared statement and bound values." },
    { severity: "high", title: "Plaintext password comparison", cwe: "CWE-256", owasp: "A07:2021 Authentication Failures", line: 6, description: "The password is compared directly with a stored value, suggesting credentials may not be hashed with a modern password KDF.", fix: "Store a salted Argon2id hash and use a constant-time password verification function." },
    { severity: "medium", title: "Missing rate limit on login path", cwe: "CWE-307", owasp: "A07:2021 Authentication Failures", line: 1, description: "No request throttling is visible at the authentication boundary.", fix: "Add per-account and per-IP limits with progressive backoff and monitoring." },
    { severity: "low", title: "Authentication failure detail", cwe: "CWE-209", owasp: "A07:2021 Authentication Failures", line: 9, description: "Return a consistent response for invalid users and invalid passwords to reduce account enumeration signals.", fix: "Use one generic failure response and keep detailed diagnostics in protected logs." },
  ];
}

export async function analyzeRepository(): Promise<{ health: number; files: number; lines: string; languages: string[]; nodes: { id: string; label: string; type: string; x: number; y: number; file: string; complexity: number; issues: number }[] }> {
  await pause(900);
  return {
    health: 84,
    files: 147,
    lines: "38,421",
    languages: ["Python", "JavaScript", "TypeScript", "SQL"],
    nodes: [
      { id: "app", label: "App", type: "entry", x: 50, y: 16, file: "src/app.py", complexity: 4, issues: 0 },
      { id: "auth", label: "AuthService", type: "service", x: 27, y: 48, file: "src/services/auth.py", complexity: 17, issues: 4 },
      { id: "api", label: "APIService", type: "service", x: 73, y: 48, file: "src/services/api.py", complexity: 9, issues: 2 },
      { id: "user", label: "UserModel", type: "model", x: 27, y: 82, file: "src/models/user.py", complexity: 6, issues: 1 },
      { id: "db", label: "Database", type: "model", x: 73, y: 82, file: "src/data/connection.py", complexity: 11, issues: 3 },
    ],
  };
}

export async function chatWithRepository(message: string): Promise<string> {
  await pause(720);
  const prompt = message.toLowerCase();
  if (prompt.includes("complex")) return "The highest-complexity functions are **processTransaction()** (17), **validateRequest()** (14), and **generateReport()** (12). `processTransaction()` is the strongest refactor candidate because its nested lookup also scales with input size.";
  if (prompt.includes("auth") || prompt.includes("fail")) return "The authentication path in `src/services/authService.js` is the likely source. Around line 4, the email is interpolated into a SQL query; parameterization plus a password-hash check should be the first fixes. I also found no rate limit on this route.";
  if (prompt.includes("security")) return "I found **4 security findings** in the demo repository: one critical injection risk, one high-severity password storage concern, and two lower-priority controls. Open the Security center to review remediations and line-level evidence.";
  return "I traced this through `src/services/transaction_service.py` and its callers. The main opportunity is replacing the repeated user scan with an index. That moves the batch from O(n × m) toward O(n + m). Want me to prepare the patch and matching tests?";
}
