
import React from 'react';
import { GeneratedPlan } from '../types';

interface Props {
  plan: GeneratedPlan;
}

const ResultView: React.FC<Props> = ({ plan }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>✨</span> Đề xuất Tích hợp Năng lực số
          </h2>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Summary */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-2 border-l-4 border-indigo-500 pl-3">Tóm tắt bài dạy</h3>
            <p className="text-slate-600 leading-relaxed">{plan.originalSummary}</p>
          </section>

          {/* Tools */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-3">Công cụ đề xuất</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plan.suggestedTools.map((tool, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-bold text-indigo-600 block mb-1">{tool.name}</span>
                  <p className="text-sm text-slate-600">{tool.purpose}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Activities */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-3">Chuỗi hoạt động số</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-3 border text-sm font-bold text-slate-700">Tiến trình</th>
                    <th className="p-3 border text-sm font-bold text-slate-700">Hành động số</th>
                    <th className="p-3 border text-sm font-bold text-slate-700">Năng lực số</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.enhancedActivities.map((act, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 border text-sm font-medium text-slate-800">{act.step}</td>
                      <td className="p-3 border text-sm text-slate-600">{act.digitalAction}</td>
                      <td className="p-3 border text-sm text-indigo-600 italic">{act.competencyAddressed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Full Content */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-indigo-500 pl-3">Toàn văn giáo án (Markdown)</h3>
              <button 
                onClick={() => navigator.clipboard.writeText(plan.fullMarkdown)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded transition-colors"
              >
                Sao chép Markdown
              </button>
            </div>
            <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
              {plan.fullMarkdown}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
