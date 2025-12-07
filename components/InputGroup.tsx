import React from 'react';

interface InputGroupProps {
  label: string;
  subLabel?: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  subLabel, 
  value, 
  onChange, 
  min, 
  max, 
  step,
  className 
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-end">
        <label className="text-sm font-semibold text-slate-300">{label}</label>
        {subLabel && <span className="text-xs text-slate-500">{subLabel}</span>}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (max !== undefined && val > max) val = max;
            onChange(val);
          }}
          className="w-24 bg-slate-800 border border-slate-600 text-white text-right rounded-md p-2 font-mono focus:ring-2 focus:ring-yellow-500 outline-none"
        />
      </div>
    </div>
  );
};