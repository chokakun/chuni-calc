import React from 'react';
import { CalculationResult } from '../types';
import { Trophy, TrendingUp, Zap } from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  // Calculate percentage of max OP for the progress bar
  const progress = Math.min(100, (result.overPower / result.maxPossibleOverPower) * 100);

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Zap size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">單曲 Rating</h2>
            <div className="text-3xl font-bold font-mono text-white flex items-center gap-2">
              {result.rating.toFixed(2)}
              <span className="text-sm font-normal text-slate-500 px-2 py-0.5 bg-slate-700 rounded-md">
                {result.rank}
              </span>
            </div>
          </div>
          <div className="text-right">
             <h2 className="text-yellow-500/80 text-xs font-bold tracking-widest uppercase mb-1">Over Power</h2>
             <div className="text-4xl font-black font-mono text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
               {result.overPower.toFixed(2)}
             </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
           <div className="flex justify-between text-xs text-slate-500 mb-1">
             <span>達成率 (相對於理論值)</span>
             <span className="text-yellow-400 font-bold">{progress.toFixed(2)}%</span>
           </div>
           <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
             <div 
                className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
             />
           </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-slate-500 text-xs mb-1 flex items-center gap-1">
               <TrendingUp size={12} /> 基礎值 + 分數加成
            </div>
            <div className="font-mono text-slate-200">
              {result.overPowerBase.toFixed(2)}
              {result.overPowerGapBonus > 0 && (
                <span className="text-green-400 text-xs ml-1">
                  +{result.overPowerGapBonus.toFixed(4)}
                </span>
              )}
            </div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-slate-500 text-xs mb-1 flex items-center gap-1">
               <Trophy size={12} /> 通關獎勵 (Lamp)
            </div>
            <div className="font-mono text-slate-200">
              +{result.overPowerBonus.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
           <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">此定數理論最大值 (AJC)</div>
           <div className="font-mono text-lg text-slate-300">
             {result.maxPossibleOverPower.toFixed(2)}
           </div>
        </div>

      </div>
    </div>
  );
};