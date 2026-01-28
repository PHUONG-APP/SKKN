
import React from 'react';
import { UserInfo } from '../types';
import { Button } from './Button';

interface Props {
  userInfo: UserInfo;
  onChange: (field: keyof UserInfo, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SKKNForm: React.FC<Props> = ({ userInfo, onChange, onSubmit, isSubmitting }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name as keyof UserInfo, e.target.value);
  };

  const isFormValid = Object.values(userInfo).every(val => (val as string).trim() !== '');

  // Increased text contrast for input and placeholder
  const inputClass = "w-full bg-black/5 border border-black/10 focus:bg-white focus:ring-4 focus:ring-mac-blue/15 focus:border-mac-blue outline-none transition-all px-4 py-3.5 rounded-xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400";
  // Bolder label style
  const labelClass = "text-[12px] font-extrabold text-slate-700 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Thông tin Sáng kiến</h2>
        <p className="text-slate-600 font-medium text-base">Cung cấp thông tin cơ bản để AI thiết lập ngữ cảnh chuyên gia</p>
      </div>

      <div className="bg-white/70 p-8 rounded-3xl border border-white/80 shadow-2xl space-y-7">
        <div className="space-y-1">
          <label className={labelClass}>Tên đề tài SKKN</label>
          <input
            name="topic"
            value={userInfo.topic}
            onChange={handleChange}
            className={inputClass}
            placeholder="VD: Một số biện pháp giúp học sinh lớp 5 học tốt..."
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className={labelClass}>Môn học</label>
            <input name="subject" value={userInfo.subject} onChange={handleChange} className={inputClass} placeholder="VD: Toán, Ngữ Văn" />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Khối lớp / Cấp học</label>
            <input name="grade" value={userInfo.grade} onChange={handleChange} className={inputClass} placeholder="VD: Lớp 4, THCS" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className={labelClass}>Trường công tác</label>
            <input name="school" value={userInfo.school} onChange={handleChange} className={inputClass} placeholder="VD: Tiểu học Nguyễn Du" />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Bộ sách giáo khoa</label>
            <input name="textbook" value={userInfo.textbook} onChange={handleChange} className={inputClass} placeholder="VD: Cánh Diều, KNTT" />
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={onSubmit} 
            disabled={!isFormValid || isSubmitting} 
            isLoading={isSubmitting}
            className="w-full py-4.5 rounded-2xl bg-mac-blue text-white text-lg font-black shadow-2xl shadow-mac-blue/40 hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            Bắt đầu lập dàn ý
          </Button>
        </div>
      </div>
    </div>
  );
};
