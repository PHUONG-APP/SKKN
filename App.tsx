
import React, { useState } from 'react';
import { UserInfo, GenerationStep, GenerationState } from './types';
import { STEPS_INFO } from './constants';
import { initializeGeminiChat, sendMessageStream } from './services/geminiService';
import { SKKNForm } from './components/SKKNForm';
import { DocumentPreview } from './components/DocumentPreview';
import { Button } from './components/Button';
import { Download, Wand2, FileText, CheckCircle, Search, MoreHorizontal } from 'lucide-react';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    topic: '',
    subject: '',
    grade: '',
    school: '',
    textbook: ''
  });

  const [state, setState] = useState<GenerationState>({
    step: GenerationStep.INPUT_FORM,
    messages: [],
    fullDocument: '',
    isStreaming: false,
    error: null
  });

  const handleUserChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const startGeneration = async () => {
    if (!process.env.API_KEY) {
      setState(prev => ({ ...prev, error: "API Key not found." }));
      return;
    }

    try {
      setState(prev => ({ ...prev, step: GenerationStep.OUTLINE, isStreaming: true, error: null }));
      initializeGeminiChat(process.env.API_KEY);

      const initMessage = `Chào chuyên gia. Tôi cần lập bản MÔ TẢ SÁNG KIẾN theo Mẫu 02/MTSK-QLCN.
      Đề tài: ${userInfo.topic}, Môn: ${userInfo.subject}, Khối: ${userInfo.grade}, Trường: ${userInfo.school}.
      Hãy bắt đầu bằng việc chuẩn hóa: 
      1. Tên sáng kiến (ngắn gọn, đúng chuẩn).
      2. Lĩnh vực áp dụng sáng kiến.
      Và lập dàn ý cho các mục 3.1, 3.2, 3.3, 3.4, 3.5.`;

      let generatedText = "";
      await sendMessageStream(initMessage, (chunk) => {
        generatedText += chunk;
        setState(prev => ({ ...prev, fullDocument: generatedText }));
      });
      setState(prev => ({ ...prev, isStreaming: false }));
    } catch (error: any) {
      setState(prev => ({ ...prev, isStreaming: false, error: error.message }));
    }
  };

  const generateNextSection = async () => {
    const nextStepMap: Record<number, { prompt: string, nextStep: GenerationStep }> = {
      [GenerationStep.OUTLINE]: { prompt: "Hãy viết chi tiết mục '3.1. Tình trạng giải pháp đã biết'. Phân tích hiện trạng, ưu nhược điểm của cách làm cũ một cách thực tế.", nextStep: GenerationStep.PART_I_II },
      [GenerationStep.PART_I_II]: { prompt: "Hãy viết chi tiết mục '3.2. Nội dung giải pháp đề nghị công nhận là sáng kiến'. Bao gồm Mục đích và Nội dung chi tiết (Tính mới, các bước thực hiện cụ thể).", nextStep: GenerationStep.PART_III },
      [GenerationStep.PART_III]: { prompt: "Hãy viết mục '3.3. Khả năng áp dụng của giải pháp'. Nêu rõ đối tượng, đơn vị và khả năng nhân rộng.", nextStep: GenerationStep.PART_IV_SOL1 },
      [GenerationStep.PART_IV_SOL1]: { prompt: "Hãy viết mục '3.4. Hiệu quả, lợi ích thu được hoặc dự kiến có thể thu được'. Cung cấp các con số dự kiến hoặc kết quả khảo sát so sánh trước/sau.", nextStep: GenerationStep.PART_IV_SOL2 },
      [GenerationStep.PART_IV_SOL2]: { prompt: "Cuối cùng, hãy viết mục '3.5. Tài liệu kèm theo' và lời cam đoan của tác giả. Hoàn thiện văn bản.", nextStep: GenerationStep.PART_V_VI },
    };

    const currentAction = nextStepMap[state.step];
    if (!currentAction) return;

    setState(prev => ({ ...prev, isStreaming: true, error: null, step: currentAction.nextStep }));
    try {
      await sendMessageStream(currentAction.prompt, (chunk) => {
        setState(prev => ({ ...prev, fullDocument: prev.fullDocument + chunk }));
      });
      setState(prev => ({ ...prev, isStreaming: false, step: currentAction.nextStep === GenerationStep.PART_V_VI ? GenerationStep.COMPLETED : currentAction.nextStep }));
    } catch (error: any) {
      setState(prev => ({ ...prev, isStreaming: false, error: error.message }));
    }
  };

  const exportToWord = () => {
    const proseElement = document.querySelector('.prose');
    if (!proseElement) return;

    const content = proseElement.innerHTML;
    const style = `
      <style>
        @page { size: A4; margin: 2cm 2cm 2cm 3cm; }
        body { font-family: "Times New Roman", Times, serif; line-height: 1.5; font-size: 14pt; color: black; }
        .header-center { text-align: center; font-weight: bold; margin-bottom: 20px; }
        .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 40px 0; text-transform: uppercase; }
        h1, h2, h3 { font-family: "Times New Roman", Times, serif; color: black; margin-top: 15pt; }
        h1 { font-size: 15pt; font-weight: bold; }
        p { margin-bottom: 10pt; text-align: justify; }
        table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
        th, td { border: 1px solid black; padding: 8pt; text-align: left; }
      </style>
    `;

    const htmlTemplate = `
      <html>
        <head><meta charset="utf-8">${style}</head>
        <body>
          <div class="header-center">
            <p style="margin: 0; font-size: 13pt;">Mẫu 02/MTSK-QLCN</p>
            <p style="margin: 10px 0 0 0; font-size: 14pt;">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p style="margin: 0; font-size: 14pt; text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</p>
          </div>
          
          <div class="title">MÔ TẢ SÁNG KIẾN</div>
          
          <p><b>Mã số (do Thường trực HĐ ghi):</b> ....................................</p>
          
          <div style="margin-top: 20px;">
            ${content}
          </div>

          <div style="margin-top: 50px; text-align: right; font-style: italic;">
            <p>............, ngày ..... tháng ..... năm 20...</p>
            <p style="font-weight: bold; text-align: right; padding-right: 50px;">Tác giả sáng kiến</p>
            <br><br><br>
            <p style="text-align: right; padding-right: 50px;">(Ký và ghi rõ họ tên)</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlTemplate], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mo_ta_SKKN_${userInfo.topic.substring(0, 30)}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 lg:p-10 font-sans select-none">
      <div className="mac-glass w-full max-w-[1400px] h-full max-h-[900px] shadow-2xl rounded-mac overflow-hidden flex flex-col border border-white/40">
        
        <div className="h-12 flex items-center px-4 mac-sidebar-glass border-b border-black/10 flex-shrink-0">
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="bg-black/10 px-3 py-1 rounded-md text-[13px] font-semibold text-slate-800 flex items-center gap-2">
              <FileText size={14} className="text-slate-900" />
              Mẫu 02/MTSK-QLCN — Master AI
            </div>
          </div>

          <div className="flex items-center gap-4 w-20 justify-end text-slate-600">
            <Search size={18} className="hover:text-black transition-colors cursor-pointer" />
            <MoreHorizontal size={18} className="hover:text-black transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 mac-sidebar-glass border-r border-black/10 p-4 flex flex-col flex-shrink-0">
            <div className="mb-6 px-2">
              <div className="flex items-center gap-3 text-mac-blue mb-6">
                <Wand2 className="h-5 w-5 fill-current" />
                <span className="font-extrabold text-slate-900 tracking-tight uppercase text-xs">Mẫu 02/MTSK-QLCN</span>
              </div>
              
              <div className="space-y-1.5">
                {Object.entries(STEPS_INFO).map(([key, info]) => {
                  const stepNum = parseInt(key);
                  if (stepNum > 7) return null;
                  const isActive = state.step === stepNum;
                  const isDone = state.step > stepNum;

                  return (
                    <div 
                      key={key} 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all cursor-default font-medium ${
                        isActive ? 'bg-mac-blue text-white shadow-md' : 'text-slate-800 hover:bg-black/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : isDone ? 'text-mac-blue' : 'bg-black/20'}`}>
                        {isDone ? <CheckCircle size={13} strokeWidth={3} /> : <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-600'}`} />}
                      </div>
                      <span className="truncate">{info.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              {state.step > 0 && !state.isStreaming && state.step < GenerationStep.COMPLETED && (
                <Button onClick={generateNextSection} className="w-full rounded-xl py-3 bg-mac-blue text-white font-bold text-sm shadow-xl shadow-mac-blue/30">
                  Tiếp tục mục mới
                </Button>
              )}
              {state.step >= 1 && (
                <Button variant="secondary" onClick={exportToWord} className="w-full rounded-xl py-3 bg-white/60 text-slate-900 border border-black/10 hover:bg-white text-sm font-bold" icon={<Download size={15} strokeWidth={2.5} />}>
                  Tải Mẫu 02 (.doc)
                </Button>
              )}
            </div>
          </aside>

          <main className="flex-1 bg-white/50 overflow-y-auto p-6 lg:p-10 relative">
            {state.error && (
              <div className="absolute top-6 left-6 right-6 z-20 bg-red-100 border border-red-300 text-red-900 p-4 rounded-2xl text-sm font-semibold flex items-center gap-3 shadow-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
                {state.error}
              </div>
            )}

            {state.step === GenerationStep.INPUT_FORM ? (
              <div className="h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
                <SKKNForm 
                  userInfo={userInfo} 
                  onChange={handleUserChange} 
                  onSubmit={startGeneration}
                  isSubmitting={state.isStreaming}
                />
              </div>
            ) : (
              <div className="max-w-4xl mx-auto h-full animate-in slide-in-from-bottom-8 duration-700">
                <DocumentPreview content={state.fullDocument} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
