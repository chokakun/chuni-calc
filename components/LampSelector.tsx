import React from 'react';
import { ClearLamp } from '../types';
import { Circle, Disc, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LampSelectorProps {
  value: ClearLamp;
  onChange: (lamp: ClearLamp) => void;
  disabled?: boolean;
}

export const LampSelector: React.FC<LampSelectorProps> = ({ value, onChange, disabled }) => {
  const options = [
    { id: ClearLamp.CLEAR, label: 'Clear', subLabel: '通關', icon: Circle, color: 'text-slate-400', bg: 'bg-slate-800' },
    { id: ClearLamp.FULL_COMBO, label: 'Full Combo', subLabel: '全連', icon: Disc, color: 'text-red-400', bg: 'bg-red-900/20' },
    { id: ClearLamp.ALL_JUSTICE, label: 'All Justice', subLabel: '全正', icon: ShieldCheck, color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-300">通關狀態 (Lamp)</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = value === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => !disabled && onChange(opt.id)}
                disabled={disabled}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
                  ${isSelected 
                    ? `${opt.bg} border-${opt.color.split('-')[1]}-500 shadow-md` 
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <Icon size={24} className={`mb-1 ${isSelected ? opt.color : 'text-slate-500'}`} />
                <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                  {opt.label}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {opt.subLabel}
                </span>
                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <CheckCircle2 size={12} className={opt.color} />
                  </div>
                )}
              </button>
            );
        })}
      </div>
      {disabled && (
        <div className="text-xs text-yellow-500/70 text-center mt-1">
          * AJC (理論值) 預設為 All Justice 狀態
        </div>
      )}
    </div>
  );
};