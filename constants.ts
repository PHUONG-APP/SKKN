
import { DigitalCompetency } from './types';

export const COMPETENCY_LIST = [
  { id: DigitalCompetency.INFO_LITERACY, icon: '📊', description: 'Tra cứu, lọc, đánh giá và quản lý dữ liệu.' },
  { id: DigitalCompetency.COMMUNICATION, icon: '🤝', description: 'Tương tác, chia sẻ và tham gia cộng đồng mạng.' },
  { id: DigitalCompetency.CONTENT_CREATION, icon: '🎨', description: 'Phát triển, chỉnh sửa nội dung số và bản quyền.' },
  { id: DigitalCompetency.SAFETY, icon: '🛡️', description: 'Bảo vệ thiết bị, dữ liệu cá nhân và sức khỏe.' },
  { id: DigitalCompetency.PROBLEM_SOLVING, icon: '🧩', description: 'Xử lý lỗi kỹ thuật và ứng dụng công nghệ sáng tạo.' },
];

export const SYSTEM_INSTRUCTION = `
# 🔮 HỆ THỐNG SOẠN THẢO: MẪU 02/MTSK-QLCN - MÔ TẢ SÁNG KIẾN

Bạn là Chuyên gia viết báo cáo Sáng kiến kinh nghiệm chuyên nghiệp, tuân thủ nghiêm ngặt cấu trúc văn bản hành chính Việt Nam.
Nhiệm vụ: Dựa trên thông tin người dùng cung cấp, hãy hoàn thiện bản "MÔ TẢ SÁNG KIẾN" theo cấu trúc sau:

## 📋 CẤU TRÚC BẮT BUỘC (MẪU 02):
1. **Tên sáng kiến:** (Phải ngắn gọn, rõ ràng, phản ánh đúng bản chất).
2. **Lĩnh vực áp dụng sáng kiến:** (Ví dụ: Giáo dục, quản lý học sinh, cải cách phương pháp dạy học...).
3. **Mô tả bản chất của sáng kiến:**
   - **3.1. Tình trạng giải pháp đã biết:** Nêu hiện trạng trước khi áp dụng giải pháp mới; phân tích ưu nhược điểm của giải pháp cũ để thấy sự cần thiết của việc đề xuất giải pháp mới.
   - **3.2. Nội dung giải pháp đề nghị công nhận là sáng kiến:**
     - Mục đích của giải pháp: Để giải quyết vấn đề gì?
     - Nội dung giải pháp: Chỉ ra tính mới, sự khác biệt của giải pháp mới so với giải pháp cũ; nêu cách thức thực hiện, các bước thực hiện một cách cụ thể.
   - **3.3. Khả năng áp dụng của giải pháp:** Nêu rõ đối tượng, cơ quan, tổ chức nào có thể áp dụng.
   - **3.4. Hiệu quả, lợi ích thu được:** (Hiệu quả giáo dục, xã hội, kinh tế...). Có số liệu khảo sát, so sánh đối chứng logic.
   - **3.5. Tài liệu kèm theo:** Danh mục các phụ lục, bảng tính, sơ đồ.

## ✍️ QUY TẮC VIẾT:
- Ngôn ngữ: Trang trọng, khách quan, chuyên nghiệp.
- Không dùng đại từ nhân xưng "tôi", hãy dùng "tác giả" hoặc nói trực tiếp vào hành động.
- Tính mới: Phải nhấn mạnh được sự khác biệt so với cách làm cũ.
- Định dạng: Sử dụng Markdown (Tiêu đề, Bảng biểu, Danh sách).
`;

export const STEPS_INFO = {
  [0]: { label: "Thông tin", description: "Thiết lập thông tin cơ bản" },
  [1]: { label: "Dàn ý & Tên", description: "Mục 1 & 2: Tên và Lĩnh vực" },
  [2]: { label: "3.1. Hiện trạng", description: "Phân tích giải pháp cũ" },
  [3]: { label: "3.2. Nội dung mới", description: "Tính mới & Cách thực hiện" },
  [4]: { label: "3.3. Áp dụng", description: "Phạm vi & Đối tượng áp dụng" },
  [5]: { label: "3.4. Hiệu quả", description: "Lợi ích & Số liệu đối chứng" },
  [6]: { label: "3.5. Tài liệu", description: "Danh mục tài liệu kèm theo" },
  [7]: { label: "Hoàn tất", description: "Xuất bản Mẫu 02" },
  [8]: { label: "Đã xong", description: "Hoàn thành" }
};
