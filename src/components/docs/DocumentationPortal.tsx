import React, { useState, useMemo } from 'react';
import {
  BookOpen, Search, Layers, Cpu, Activity,
  ExternalLink, ChevronRight, ChevronDown, CheckCircle,
  Info, Sparkles, Sliders
} from 'lucide-react';
import { DOCUMENTATION_CATEGORIES, DOC_SECTIONS, RESEARCH_PAPERS } from '../../data/documentationData';
import { DOC_SECTIONS_FULL } from '../../data/docContentFull';
import { useAurisStore } from '../../state/aurisStore';

export const DocumentationPortal: React.FC = () => {
  const { setViewerMode } = useAurisStore();
  const [selectedSectionId, setSelectedSectionId] = useState<string>('sec-1-home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    overview: true,
    intelligence: true,
    hardware: true,
    software: true,
    acoustics_edge: true,
    validation: true,
    research_repo: true,
  });

  // Interactive Live Bayesian Fusion Simulator State
  const [simRgb, setSimRgb] = useState<number>(65);
  const [simThermal, setSimThermal] = useState<number>(75);
  const [simAcoustic, setSimAcoustic] = useState<number>(60);
  const [simOcclusion, setSimOcclusion] = useState<number>(50);

  // Compute live Bayesian Score for simulator
  const simFusedScore = useMemo(() => {
    const wRgb = 0.40 * (1.0 - simOcclusion / 100);
    const wThermal = 0.35;
    const wAcoustic = 0.25;
    const totalWeight = wRgb + wThermal + wAcoustic;
    const score = ((simRgb * wRgb) + (simThermal * wThermal) + (simAcoustic * wAcoustic)) / totalWeight;
    return Math.round(score);
  }, [simRgb, simThermal, simAcoustic, simOcclusion]);

  const simDisagreement = useMemo(() => {
    return Math.max(Math.abs(simRgb - simThermal), Math.abs(simThermal - simAcoustic));
  }, [simRgb, simThermal, simAcoustic]);

  const simState = useMemo(() => {
    if (simFusedScore >= 80 && simDisagreement < 30) {
      return {
        label: 'HIGH-CONFIDENCE CONFIRMED INCIDENT',
        color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/50',
        action: 'Dispatch NDRF Rescue Squad & Transmit Geo-Tag',
        nbv: false
      };
    } else if (simFusedScore >= 45 || simDisagreement >= 30 || simOcclusion >= 40) {
      return {
        label: 'UNCERTAIN CANDIDATE — TRIGGER NEXT-BEST-VIEW',
        color: 'text-amber-400 bg-amber-950/60 border-amber-500/50',
        action: 'Command Hexacopter Orbital Repositioning (NBV)',
        nbv: true
      };
    } else {
      return {
        label: 'INSUFFICIENT EVIDENCE / BACKGROUND CLUTTER',
        color: 'text-slate-400 bg-slate-900/60 border-slate-700',
        action: 'Update Probabilistic Search Memory Grid (0.40)',
        nbv: false
      };
    }
  }, [simFusedScore, simDisagreement, simOcclusion]);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return DOC_SECTIONS;
    const q = searchQuery.toLowerCase();
    return DOC_SECTIONS.filter(
      s => s.title.toLowerCase().includes(q) ||
           s.summary.toLowerCase().includes(q) ||
           s.category.toLowerCase().includes(q) ||
           s.number.toString() === q
    );
  }, [searchQuery]);

  const currentSectionDetail = DOC_SECTIONS_FULL[selectedSectionId] || DOC_SECTIONS_FULL['sec-1-home'];

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const jumpToNextSection = () => {
    const currentIndex = DOC_SECTIONS.findIndex(s => s.id === selectedSectionId);
    if (currentIndex < DOC_SECTIONS.length - 1) {
      setSelectedSectionId(DOC_SECTIONS[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToPrevSection = () => {
    const currentIndex = DOC_SECTIONS.findIndex(s => s.id === selectedSectionId);
    if (currentIndex > 0) {
      setSelectedSectionId(DOC_SECTIONS[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#040711] text-slate-100 font-sans select-text overflow-hidden">
      {/* Top Universal Navbar */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-6 flex items-center justify-between z-30 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-auris-cyan/10 border border-auris-cyan flex items-center justify-center text-auris-cyan shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-white text-base tracking-widest">AURIS DOCS</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 font-bold">
                v2.4 MASTER TECHNICAL TRUTH
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Autonomous Uncertainty-aware Rescue Intelligence System
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-72 md:w-96 hidden md:block">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search all 38 sections, sensors, algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/70 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewerMode('STUDIO')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-all"
            title="Open 3D Drone CAD Studio & Component Inspector"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">3D DRONE CAD</span>
          </button>
          <button
            onClick={() => setViewerMode('DISASTER')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500 text-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(0,229,255,0.25)]"
            title="Launch 3D Tactical Disaster Simulation"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>DISASTER SIM</span>
          </button>
        </div>
      </header>

      {/* Main Documentation Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-80 md:w-88 lg:w-96 border-r border-slate-800/80 bg-slate-950/60 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          {/* Mobile Search input if small screen */}
          <div className="p-3 md:hidden border-b border-slate-800">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search 38 sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200"
              />
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="p-3.5 border-b border-slate-800/80 bg-gradient-to-r from-cyan-950/20 to-transparent">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>TABLE OF CONTENTS</span>
              <span className="text-cyan-400 font-bold">38 SECTIONS</span>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>SENSE • VERIFY • DECIDE • REPLAN</span>
            </div>
          </div>

          {/* Categorized List */}
          <div className="p-2 space-y-3 flex-1">
            {DOCUMENTATION_CATEGORIES.map((cat) => {
              const catSections = filteredSections.filter(
                s => s.number >= cat.range[0] && s.number <= cat.range[1]
              );
              if (catSections.length === 0) return null;

              const isExpanded = expandedCategories[cat.id] ?? true;

              return (
                <div key={cat.id} className="rounded-lg border border-slate-800/60 bg-slate-900/30 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full px-3 py-2 flex items-center justify-between text-left text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="truncate">{cat.name}</span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800">
                        {catSections.length}
                      </span>
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="py-1 px-1 space-y-0.5">
                      {catSections.map((sec) => {
                        const isSelected = sec.id === selectedSectionId;
                        return (
                          <button
                            key={sec.id}
                            onClick={() => {
                              setSelectedSectionId(sec.id);
                              // Smooth scroll to top on desktop
                              const mainPanel = document.getElementById('doc-content-container');
                              if (mainPanel) mainPanel.scrollTop = 0;
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-md text-xs transition-all flex items-start gap-2.5 group ${
                              isSelected
                                ? 'bg-cyan-950/80 border border-cyan-500/60 text-white shadow-md shadow-cyan-950/50'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(0,229,255,0.6)]'
                                  : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                              }`}
                            >
                              {sec.number}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-xs leading-tight truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                                {sec.title}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate mt-0.5 leading-none font-sans">
                                {sec.summary}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Direct Links Card */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80">
            <button
              onClick={() => setSelectedSectionId('sec-37-research-foundation')}
              className="w-full flex items-center justify-between px-3 py-2 rounded bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 text-xs font-mono font-bold transition-all"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>8 PRIMARY CITATIONS</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Right Documentation Content View */}
        <main
          id="doc-content-container"
          className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 max-w-5xl mx-auto custom-scrollbar"
        >
          {/* Breadcrumb & Section Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{currentSectionDetail.badge}</span>
              <span>/</span>
              <span>SECTION {currentSectionDetail.number} OF 38</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={jumpToPrevSection}
                disabled={currentSectionDetail.number === 1}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1 transition-all"
              >
                ← Prev
              </button>
              <button
                onClick={jumpToNextSection}
                disabled={currentSectionDetail.number === 38}
                className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 disabled:opacity-40 border border-cyan-700 text-cyan-300 font-mono text-xs flex items-center gap-1 transition-all"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Section Hero Header */}
          <div className="mt-8 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>CHAPTER {currentSectionDetail.number}</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {currentSectionDetail.title}
            </h1>
            <p className="text-base text-cyan-200/80 font-sans mt-2 font-medium">
              {currentSectionDetail.subtitle}
            </p>
          </div>

          {/* Master Overview Card */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm leading-relaxed mb-8 shadow-inner">
            <p>{currentSectionDetail.overview}</p>
          </div>

          {/* Interactive Bayesian Evidence Fusion & NBV Simulator Widget (Featured on Section 7 & Section 8 & Section 20) */}
          {(currentSectionDetail.number === 1 || currentSectionDetail.number === 7 || currentSectionDetail.number === 8 || currentSectionDetail.number === 20 || currentSectionDetail.number === 21) && (
            <div className="my-8 p-6 rounded-xl bg-slate-950 border border-cyan-500/50 shadow-[0_0_25px_rgba(0,229,255,0.15)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-mono font-bold text-white text-sm">
                    LIVE INTERACTIVE BAYESIAN EVIDENCE FUSION SIMULATOR
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-700">
                  REAL-TIME EDGE ARBITRATION
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Drag the slider bars to simulate different disaster conditions and observe how the AURIS Edge AI engine calculates combined evidence and triggers Next-Best-View (NBV) orbital reinspection.
              </p>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {/* RGB Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span> RGB Optical Confidence
                    </span>
                    <span className="text-cyan-400 font-bold">{simRgb}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simRgb}
                    onChange={(e) => setSimRgb(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">YOLOv8 INT8 Human Silhouette Score</span>
                </div>

                {/* Thermal Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span> MLX90640 Thermal Hotspot
                    </span>
                    <span className="text-amber-400 font-bold">{simThermal}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simThermal}
                    onChange={(e) => setSimThermal(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">36-38°C Human Heat Gradient Anomaly</span>
                </div>

                {/* Acoustic Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span> 4-Ch Acoustic Distress Score
                    </span>
                    <span className="text-purple-400 font-bold">{simAcoustic}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simAcoustic}
                    onChange={(e) => setSimAcoustic(Number(e.target.value))}
                    className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">GCC-PHAT Distress Shout / Tapping SNR</span>
                </div>

                {/* Rubble Occlusion Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span> Rubble Occlusion Factor
                    </span>
                    <span className="text-rose-400 font-bold">{simOcclusion}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simOcclusion}
                    onChange={(e) => setSimOcclusion(Number(e.target.value))}
                    className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">Physical line-of-sight blockage from top-down nadir</span>
                </div>
              </div>

              {/* Simulation Result Output */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">FUSED BAYESIAN PROBABILITY:</span>
                    <span className="text-lg font-mono font-black text-white">{simFusedScore}%</span>
                    <span className="text-xs font-mono text-slate-400 ml-2">DISAGREEMENT:</span>
                    <span className={`text-xs font-mono font-bold ${simDisagreement > 30 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {simDisagreement}%
                    </span>
                  </div>
                  <div className={`inline-block px-2.5 py-1 rounded text-xs font-mono font-bold border ${simState.color}`}>
                    {simState.label}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">RECOMMENDED AUTONOMOUS ACTION</span>
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded border border-cyan-800 inline-block">
                    {simState.action}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Architecture Flow Diagram (if present) */}
          {currentSectionDetail.architectureDiagram && (
            <div className="mb-8">
              <h3 className="font-mono font-bold text-xs text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Architecture Flow Diagram</span>
              </h3>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar shadow-lg">
                {currentSectionDetail.architectureDiagram.trim()}
              </pre>
            </div>
          )}

          {/* Data Table (if present) */}
          {currentSectionDetail.tableData && (
            <div className="mb-8 overflow-hidden rounded-xl border border-slate-800 shadow-lg">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-cyan-300 font-mono">
                      {currentSectionDetail.tableData.headers.map((header, idx) => (
                        <th key={idx} className="py-3 px-4 font-bold tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {currentSectionDetail.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3 px-4 text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Deep Dive Blocks */}
          <div className="space-y-8 mb-10">
            {currentSectionDetail.deepDiveBlocks.map((block, bIdx) => (
              <div key={bIdx} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <div className="w-1.5 h-4 bg-cyan-400 rounded-full"></div>
                  <span>{block.heading}</span>
                </h3>

                {block.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-slate-300 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {block.bulletPoints && (
                  <ul className="space-y-2 mt-3 pl-2">
                    {block.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {block.codeBlock && (
                  <div className="mt-4">
                    <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto custom-scrollbar">
                      {block.codeBlock.trim()}
                    </pre>
                  </div>
                )}

                {block.alertBox && (
                  <div
                    className={`p-4 rounded-lg border text-xs flex items-start gap-3 mt-4 ${
                      block.alertBox.type === 'axiom'
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                        : block.alertBox.type === 'warning'
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                        : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    }`}
                  >
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                    <p className="font-mono leading-relaxed font-semibold">{block.alertBox.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Research Citations Master Section (Always detailed on Section 37) */}
          {currentSectionDetail.number === 37 && (
            <div className="mt-10 p-6 rounded-xl bg-slate-950 border border-emerald-500/40 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <ExternalLink className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-mono font-bold text-white">
                  PEER-REVIEWED SCIENTIFIC LITERATURE CITATIONS & DIRECT ACCESS
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Below is the comprehensive literature index validating the fundamental scientific principles underpinning AURIS, complete with clean direct publication links without tracking parameters.
              </p>

              <div className="space-y-4">
                {RESEARCH_PAPERS.map((paper) => (
                  <div
                    key={paper.num}
                    className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] font-bold flex items-center justify-center">
                          {paper.num}
                        </span>
                        <h4 className="font-mono font-bold text-xs text-emerald-300">{paper.domain}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                          {paper.sourceLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans italic">{paper.citation}</p>
                      <p className="text-[11px] text-slate-400 font-sans">
                        <strong className="text-slate-300">Scientific Principle:</strong> {paper.principle}
                      </p>
                      <p className="text-[11px] text-cyan-400 font-mono">
                        <strong>Edge Action in AURIS:</strong> {paper.edgeAction}
                      </p>
                    </div>

                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-md group-hover:scale-105 transition-all"
                    >
                      <span>Read Publication</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Footer Navigation */}
          <div className="mt-14 pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={jumpToPrevSection}
              disabled={currentSectionDetail.number === 1}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all"
            >
              ← Previous Section
            </button>
            <button
              onClick={jumpToNextSection}
              disabled={currentSectionDetail.number === 38}
              className="px-4 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 disabled:opacity-40 border border-cyan-600 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all"
            >
              Next Section →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
