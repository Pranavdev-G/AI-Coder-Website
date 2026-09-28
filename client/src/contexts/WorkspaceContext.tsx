import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { demoFiles, issueSeed } from "@/data/demoData";
import type { AnalysisResult } from "@/services/aiService";

const initialAnalysis: AnalysisResult = {
  score: 87,
  metrics: { readability: 91, maintainability: 89, security: 92, performance: 81, complexity: 78 },
  summary: "The code is functional and clearly structured. A few targeted changes can improve lookup cost, input resilience, and test determinism.",
  issues: issueSeed as unknown as AnalysisResult["issues"],
  duration: "1.18s",
};

type WorkspaceContextValue = {
  selectedFile: string;
  setSelectedFile: (name: string) => void;
  code: string;
  setCode: (value: string) => void;
  analysis: AnalysisResult | null;
  setAnalysis: (value: AnalysisResult | null) => void;
  model: string;
  setModel: (value: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState(demoFiles[0].name);
  const [code, setCode] = useState(demoFiles[0].code);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(initialAnalysis);
  const [model, setModel] = useState("Balanced");
  const value = useMemo(() => ({ selectedFile, setSelectedFile, code, setCode, analysis, setAnalysis, model, setModel }), [selectedFile, code, analysis, model]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return value;
}
