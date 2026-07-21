/**
 * Dữ liệu mẫu (Mock Data) mô phỏng cấu trúc của Google Drive.
 * 
 * HƯỚNG DẪN THAY THẾ DỮ LIỆU:
 * 1. id: Mã định danh duy nhất cho lĩnh vực (không được trùng).
 * 2. name: Tên hiển thị của lĩnh vực.
 * 3. procedures: Danh sách các thủ tục trong lĩnh vực đó.
 *    - id: Mã thủ tục.
 *    - title: Tên thủ tục.
 *    - pdfUrl: Đường dẫn (Link) đến file PDF. 
 *      Để hiển thị PDF từ Google Drive, sử dụng link format: 
 *      https://drive.google.com/file/d/ID_CỦA_FILE/preview
 */

const mockDriveData = [
    {
        id: "cat-1",
        name: "Lĩnh vực Đất đai",
        procedures: [
            {
                id: "proc-1-1",
                title: "Thủ tục đăng ký, cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất lần đầu",
                pdfUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" // Placeholder PDF
            },
            {
                id: "proc-1-2",
                title: "Thủ tục chuyển nhượng, tặng cho quyền sử dụng đất",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                id: "proc-1-3",
                title: "Thủ tục đính chính Giấy chứng nhận đã cấp",
                pdfUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            }
        ]
    },
    {
        id: "cat-2",
        name: "Lĩnh vực Hộ tịch",
        procedures: [
            {
                id: "proc-2-1",
                title: "Thủ tục Đăng ký khai sinh",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                id: "proc-2-2",
                title: "Thủ tục Đăng ký kết hôn",
                pdfUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            },
            {
                id: "proc-2-3",
                title: "Thủ tục Đăng ký khai tử",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                id: "proc-2-4",
                title: "Thủ tục Thay đổi, cải chính hộ tịch",
                pdfUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            }
        ]
    },
    {
        id: "cat-3",
        name: "Lĩnh vực Xây dựng",
        procedures: [
            {
                id: "proc-3-1",
                title: "Thủ tục Cấp giấy phép xây dựng nhà ở riêng lẻ",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                id: "proc-3-2",
                title: "Thủ tục Cấp giấy phép xây dựng đối với công trình không theo tuyến",
                pdfUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            }
        ]
    },
    {
        id: "cat-4",
        name: "Lĩnh vực Giáo dục và Đào tạo",
        procedures: [
            {
                id: "proc-4-1",
                title: "Thủ tục Chuyển trường đối với học sinh phổ thông",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                id: "proc-4-2",
                title: "Thủ tục Cấp bản sao văn bằng, chứng chỉ từ sổ gốc",
                pdfUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            }
        ]
    }
];
