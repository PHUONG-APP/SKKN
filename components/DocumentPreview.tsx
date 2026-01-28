
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
}

export const DocumentPreview: React.FC<Props> = ({ content }) => {
  return (
    <div className="bg-white shadow-2xl rounded-3xl min-h-full flex flex-col border border-black/5 animate-in slide-in-from-bottom-12 duration-1000">
      <div className="p-10 lg:p-20 select-text overflow-y-auto">
        {content ? (
          <article className="prose prose-slate prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black 
            prose-p:text-slate-800 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-black prose-strong:font-bold 
            prose-table:border prose-table:border-slate-300 prose-table:rounded-xl prose-table:overflow-hidden 
            prose-th:bg-slate-100 prose-th:p-4 prose-th:text-slate-900 prose-th:font-bold
            prose-td:p-4 prose-td:border-t prose-td:border-slate-200 prose-td:text-slate-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-300 space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center animate-pulse border border-slate-100">
              <div className="w-12 h-1.5 bg-mac-blue/40 rounded-full animate-bounce"></div>
            </div>
            <p className="font-black tracking-widest text-slate-400 text-sm uppercase">Đang khởi tạo nội dung SKKN...</p>
          </div>
        )}
      </div>
    </div>
  );
};
