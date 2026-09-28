import { lazy, Suspense, useCallback, useEffect, useRef } from "react";
import type { OnMount } from "@monaco-editor/react";

const Editor = lazy(() => import("@monaco-editor/react").then((module) => ({ default: module.default })));

type CodeEditorProps = {
  value: string;
  language?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  minHeight?: number | string;
  focusedLines?: number[];
  className?: string;
};

export default function CodeEditor({ value, language = "python", onChange, readOnly = false, minHeight = 420, focusedLines = [], className = "" }: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const decorationRef = useRef<{ clear: () => void } | null>(null);
  const handleMount = useCallback<OnMount>((editor, monaco) => {
    monaco.editor.defineTheme("ai-coder-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "88A9FF" },
        { token: "string", foreground: "B6D39A" },
        { token: "number", foreground: "E7B779" },
        { token: "comment", foreground: "687487", fontStyle: "italic" },
      ],
      colors: {
        "editor.background": "#101318",
        "editor.foreground": "#D9DEE7",
        "editorLineNumber.foreground": "#4C5563",
        "editorLineNumber.activeForeground": "#A3ADBC",
        "editorGutter.background": "#101318",
        "editor.lineHighlightBackground": "#ffffff07",
        "editor.selectionBackground": "#54c8dd33",
        "editorCursor.foreground": "#76D5E4",
        "editorIndentGuide.background1": "#ffffff0a",
      },
    });
    editor.updateOptions({ fontFamily: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace", fontSize: 12, lineHeight: 22 });
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    decorationRef.current?.clear();
    decorationRef.current = editor.createDecorationsCollection(focusedLines.map((line) => ({
      range: { startLineNumber: line, startColumn: 1, endLineNumber: line, endColumn: 1 },
      options: { isWholeLine: true, className: "review-line-highlight", glyphMarginClassName: "review-line-glyph" },
    })));
  }, [focusedLines]);

  const languageForEditor = language === "javascript" ? "javascript" : language === "java" ? "java" : language === "sql" ? "sql" : language === "typescript" ? "typescript" : "python";
  const height = typeof minHeight === "number" ? `${minHeight}px` : minHeight;

  return (
    <div className={`code-editor-surface ${className}`} style={{ minHeight: height }}>
      <Suspense fallback={<div className="editor-loading" role="status"><span className="step-spinner" /> Loading editor…</div>}>
        <Editor
          height={height}
          language={languageForEditor}
          value={value}
          theme="ai-coder-dark"
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("ai-coder-dark", {
              base: "vs-dark", inherit: true,
              rules: [{ token: "keyword", foreground: "88A9FF" }, { token: "string", foreground: "B6D39A" }, { token: "number", foreground: "E7B779" }, { token: "comment", foreground: "687487", fontStyle: "italic" }],
              colors: { "editor.background": "#101318", "editor.foreground": "#D9DEE7", "editorLineNumber.foreground": "#4C5563", "editorLineNumber.activeForeground": "#A3ADBC", "editorGutter.background": "#101318", "editor.lineHighlightBackground": "#ffffff07", "editor.selectionBackground": "#54c8dd33", "editorCursor.foreground": "#76D5E4", "editorIndentGuide.background1": "#ffffff0a" },
            });
          }}
          onMount={handleMount}
          onChange={(next) => onChange?.(next ?? "")}
          options={{
            readOnly,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "line",
            lineNumbersMinChars: 3,
            glyphMargin: true,
            folding: false,
            overviewRulerBorder: false,
            scrollbar: { verticalScrollbarSize: 7, horizontalScrollbarSize: 7 },
            contextmenu: true,
            tabSize: 4,
          }}
        />
      </Suspense>
    </div>
  );
}
