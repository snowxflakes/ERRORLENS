import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Code2, 
  FileCode, 
  Maximize2, 
  ChevronDown,
  Info,
  Layers,
  Wand2,
  AlertCircle
} from 'lucide-react';
import Editor, { OnMount } from '@monaco-editor/react';
import { LanguageId, LanguageConfig, ErrorLocation } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

interface CodeWorkspaceProps {
  code: string;
  setCode: (code: string) => void;
  language: LanguageId;
  setLanguage: (lang: LanguageId) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  highlightLocation?: ErrorLocation;
  onLoadSample: (lang: LanguageId) => void;
}

export const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onAnalyze,
  isAnalyzing,
  highlightLocation,
  onLoadSample,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14);
  const [useMonaco, setUseMonaco] = useState(true);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const activeLangConfig = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0];

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Register Ctrl+Enter / Cmd+Enter shortcut
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onAnalyze();
    });
  };

  // Update line error decorations in Monaco editor
  useEffect(() => {
    if (editorRef.current && monacoRef.current && highlightLocation?.line) {
      const monaco = monacoRef.current;
      const line = highlightLocation.line;
      
      const newDecorations = [
        {
          range: new monaco.Range(line, 1, line, 100),
          options: {
            isWholeLine: true,
            className: 'bg-red-500/20 border-l-4 border-red-500',
            glyphMarginClassName: 'myGlyphMarginClass',
            overviewRuler: {
              color: 'rgba(239, 68, 68, 0.8)',
              position: monaco.editor.OverviewRulerLane.Full,
            },
            hoverMessage: { value: `⚠️ **Error detected here on line ${line}**` },
          },
        },
      ];

      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        newDecorations
      );

      // Smooth scroll to error line
      editorRef.current.revealLineInCenter(line);
    } else if (editorRef.current && decorationsRef.current.length > 0) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  }, [highlightLocation]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCode('');
    if (editorRef.current) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  };

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    } else {
      // Basic fallback indentation cleanup
      const cleaned = code
        .split('\n')
        .map(l => l.trimEnd())
        .join('\n');
      setCode(cleaned);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Editor Top Toolbar */}
      <div className="p-3 bg-[#0a0a0a] border-b border-[#262626] flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Toolbar: Language Dropdown & Sample Presets */}
        <div className="flex items-center gap-2">
          
          {/* Language Selector */}
          <div className="relative">
            <select
              id="language-select-dropdown"
              value={language}
              onChange={(e) => {
                const newLang = e.target.value as LanguageId;
                setLanguage(newLang);
                onLoadSample(newLang);
              }}
              className="appearance-none bg-[#141414] hover:bg-[#1a1a1a] text-[#f5f5f5] font-mono text-xs font-semibold pl-3 pr-8 py-1.5 rounded-lg border border-[#262626] hover:border-[#383838] focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-[#141414] text-[#f5f5f5]">
                  {lang.name} ({lang.extension})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#737373] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Load Sample Error Button */}
          <button
            id="load-sample-error-btn"
            onClick={() => onLoadSample(language)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all"
            title="Load a classic beginner error example in this language"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Load Sample Error</span>
            <span className="sm:hidden">Sample</span>
          </button>

          {/* Active Error Sample Description tooltip */}
          <span className="hidden xl:inline-block text-[11px] text-[#737373] font-mono italic max-w-xs truncate">
            {activeLangConfig.sampleDescription}
          </span>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-1.5">
          
          {/* Font Size Adjusters */}
          <div className="hidden sm:flex items-center rounded-lg bg-[#141414] border border-[#262626] px-1 py-0.5 text-xs text-[#a3a3a3]">
            <button
              onClick={() => setFontSize(f => Math.max(11, f - 1))}
              className="px-1.5 py-0.5 hover:text-white font-mono"
              title="Decrease font size"
            >
              A-
            </button>
            <span className="text-[10px] text-[#737373] px-1 font-mono">{fontSize}px</span>
            <button
              onClick={() => setFontSize(f => Math.min(20, f + 1))}
              className="px-1.5 py-0.5 hover:text-white font-mono"
              title="Increase font size"
            >
              A+
            </button>
          </div>

          {/* Format Code */}
          <button
            onClick={handleFormatCode}
            className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#a3a3a3] hover:text-[#f5f5f5] border border-[#262626] transition-colors"
            title="Format Code"
          >
            <Wand2 className="w-3.5 h-3.5" />
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#a3a3a3] hover:text-[#f5f5f5] border border-[#262626] transition-colors"
            title="Copy source code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Clear Editor */}
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-[#a3a3a3] hover:text-red-400 border border-[#262626] transition-colors"
            title="Clear editor"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Editor Body */}
      <div className="flex-1 relative min-h-[380px] sm:min-h-[440px] bg-[#0c0c0c]">
        {useMonaco ? (
          <Editor
            height="100%"
            language={activeLangConfig.monacoLang}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            onMount={handleEditorDidMount}
            options={{
              fontSize: fontSize,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              glyphMargin: true,
              wordWrap: 'on',
              tabSize: language === 'python' ? 4 : 2,
              automaticLayout: true,
              padding: { top: 12, bottom: 12 },
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
            }}
          />
        ) : (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your source code or terminal error log here..."
            className="w-full h-full p-4 bg-[#0c0c0c] font-mono text-sm text-[#f5f5f5] resize-none focus:outline-none"
            style={{ fontSize: `${fontSize}px` }}
          />
        )}

        {/* Gutter Alert Floating Badge if active error */}
        {highlightLocation?.line && (
          <div className="absolute top-3 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-950/90 border border-red-500/50 text-red-300 text-xs font-mono shadow-lg backdrop-blur-sm animate-pulse-subtle">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Error on line {highlightLocation.line}</span>
          </div>
        )}
      </div>

      {/* Editor Bottom Bar with Action CTA */}
      <div className="p-3 bg-[#0a0a0a] border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-[#737373] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {activeLangConfig.name} Engine Active
          </span>
          <span className="hidden md:inline text-[#3a3a3a]">|</span>
          <span className="hidden md:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#141414] text-[10px] text-[#a3a3a3] border border-[#262626]">Ctrl + Enter</kbd> to analyze
          </span>
        </div>

        {/* Primary Analyze Button */}
        <button
          id="analyze-code-primary-btn"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
            isAnalyzing
              ? 'bg-indigo-800 opacity-80 cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Syntax & Logic...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Analyze My Code</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
