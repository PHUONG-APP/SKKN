
import React from 'react';
import { COMPETENCY_LIST } from '../constants';
import { DigitalCompetency } from '../types';

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CompetencySelector: React.FC<Props> = ({ selected, onChange }) => {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(i => i !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {COMPETENCY_LIST.map((comp) => (
        <button
          key={comp.id}
          type="button"
          onClick={() => toggle(comp.id)}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            selected.includes(comp.id)
              ? 'border-indigo-600 bg-indigo-50 shadow-md'
              : 'border-slate-200 bg-white hover:border-indigo-300'
          }`}
        >
          <div className="text-2xl mb-2">{comp.icon}</div>
          <div className="font-semibold text-slate-800 text-sm mb-1">{comp.id}</div>
          <p className="text-xs text-slate-500 leading-relaxed">{comp.description}</p>
        </button>
      ))}
    </div>
  );
};

export default CompetencySelector;
