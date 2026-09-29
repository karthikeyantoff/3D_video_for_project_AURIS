import React from 'react';
import { DRONE_COMPONENT_SPECS } from '../../data/droneSpecs';
import { X, Cpu, Eye, Shield, Zap, Radio, Layers, Wrench, Sparkles } from 'lucide-react';

interface ComponentInspectorModalProps {
  componentId: string | null;
  onClose: () => void;
}

export const ComponentInspectorModal: React.FC<ComponentInspectorModalProps> = ({
  componentId,
  onClose,
}) => {
  if (!componentId) return null;

  const spec = DRONE_COMPONENT_SPECS[componentId];
  if (!spec) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AVIONICS': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'PERCEPTION': return <Eye className="w-4 h-4 text-cyan-400" />;
      case 'STRUCTURE': return <Shield className="w-4 h-4 text-slate-300" />;
      case 'POWER': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'COMMUNICATION': return <Radio className="w-4 h-4 text-blue-400" />;
      case 'PROPULSION': return <Wrench className="w-4 h-4 text-orange-400" />;
      default: return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-950/95 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative text-left overflow-hidden ring-1 ring-cyan-400/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category Badge & Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono font-semibold">
            {getCategoryIcon(spec.category)}
            <span className="text-slate-200">{spec.category}</span>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
            AURIS SPEC CAD
          </span>
        </div>

        <h3 className="text-xl font-bold text-white tracking-wide font-sans mb-1">
          {spec.name}
        </h3>
        <p className="text-xs text-cyan-300/80 font-mono mb-4">
          ROLE: {spec.role}
        </p>

        {/* Description */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
          {spec.description}
        </div>

        {/* Technical Specifications Table */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Engineering Specifications
          </h4>
          <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
            {Object.entries(spec.specs).map(([key, value]) => (
              <div 
                key={key} 
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-800/80"
              >
                <span className="text-slate-400 font-medium">{key}</span>
                <span className="text-slate-100 font-semibold text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all shadow-lg shadow-cyan-900/30"
          >
            DISMISS INSPECTION
          </button>
        </div>
      </div>
    </div>
  );
};
