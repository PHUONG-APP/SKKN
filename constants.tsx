
import React from 'react';
import { DigitalCompetency } from './types';

export const COMPETENCY_LIST = [
  { id: DigitalCompetency.INFO_LITERACY, icon: '📊', description: 'Tra cứu, lọc, đánh giá và quản lý dữ liệu.' },
  { id: DigitalCompetency.COMMUNICATION, icon: '🤝', description: 'Tương tác, chia sẻ và tham gia cộng đồng mạng.' },
  { id: DigitalCompetency.CONTENT_CREATION, icon: '🎨', description: 'Phát triển, chỉnh sửa nội dung số và bản quyền.' },
  { id: DigitalCompetency.SAFETY, icon: '🛡️', description: 'Bảo vệ thiết bị, dữ liệu cá nhân và sức khỏe.' },
  { id: DigitalCompetency.PROBLEM_SOLVING, icon: '🧩', description: 'Xử lý lỗi kỹ thuật và ứng dụng công nghệ sáng tạo.' },
];

export const SYSTEM_INSTRUCTION = `Bạn là một chuyên gia giáo dục số hàng đầu với kinh nghiệm triển khai khung năng lực số (như DigComp hoặc khung của Bộ Giáo dục). 
Nhiệm vụ của bạn là nhận kế hoạch bài dạy truyền thống và chuyển đổi/tích hợp thêm các yếu tố năng lực số một cách thực tế, khả thi.
Hãy đề xuất các công cụ AI, ứng dụng tương tác (Kahoot, Padlet, Canva, etc.) và các hoạt động giúp học sinh phát triển kỹ năng số cụ thể.
Phản hồi phải bằng tiếng Việt, chuyên nghiệp và có cấu trúc JSON rõ ràng.`;
