import React, { useState, useEffect } from 'react';
import { InputGroup } from './components/InputGroup';
import { ResultCard } from './components/ResultCard';
import { LampSelector } from './components/LampSelector';
import { calculateOverPower } from './utils/chunithmMath';
import { ClearLamp } from './types';
import { Calculator } from 'lucide-react';

function App() {
  const [score, setScore] = useState<number>(1007500);
  const [constant, setConstant] = useState<number>(14.0);
  const [lamp, setLamp] = useState<ClearLamp>(ClearLamp.FULL_COMBO);
  
  // Calculate results
  const result = calculateOverPower(score, constant, lamp);

  // Handle Score > 1,010,000 edge case (clamp)
  useEffect(() => {
    if (score > 1010000) setScore(1010000);
  }, [score]);

  // Handle AJC Logic: If score is 1,010,000, lamp is effectively AJ (and gets AJC bonus in calc)
  const isMaxScore = score === 1010000;
  
  useEffect(() => {
    if (isMaxScore) {
      setLamp(ClearLamp.ALL_JUSTICE);
    }
  }, [isMaxScore]);

  const scorePresets = [
    { val: 1010000, label: 'AJC' },
    { val: 1009000, label: 'SSS+' },
    { val: 1007500, label: 'SSS' },
    { val: 1005000, label: 'SS+' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center py-6 px-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <Calculator className="text-yellow-500" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Over Power 計算機</h1>
            <p className="text-xs text-slate-500">Chunithm (中二節奏) 專用工具</p>
          </div>
        </header>

        {/* Results Area - Stickyish on mobile or just prominent */}
        <section>
          <ResultCard result={result} />
        </section>

        {/* Inputs Area */}
        <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6 shadow-sm">
          
          <InputGroup 
            label="譜面定數 (Constant)" 
            subLabel="14.0 - 15.7"
            value={constant}
            onChange={setConstant}
            min={14.0}
            max={15.7}
            step={0.1}
          />
          <p className="text-[10px] text-slate-600 -mt-4 text-right">
             * 計算 Over Power 必須數值
          </p>

          <div className="h-px bg-slate-800" />

          <InputGroup 
            label="遊玩分數 (Score)"
            subLabel="975,000 - 1,010,000"
            value={score}
            onChange={setScore}
            min={975000}
            max={1010000}
            step={100} // Coarse step for slider
          />
          {/* Preset Buttons for Score */}
          <div className="grid grid-cols-4 gap-2">
            {scorePresets.map((preset) => (
              <button
                key={preset.val}
                onClick={() => setScore(preset.val)}
                className="text-xs py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors border border-slate-700 font-bold"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-slate-800" />

          <LampSelector 
            value={lamp} 
            onChange={setLamp} 
            disabled={isMaxScore}
          />

        </section>

        {/* Footer info */}
        <footer className="text-center text-xs text-slate-600 pb-8">
          <p>計算公式基於 NEW/SUN/LUMINOUS 版本邏輯。</p>
          <p className="mt-2">數值僅供參考，實際請以遊戲內為準。</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
