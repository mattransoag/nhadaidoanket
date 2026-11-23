# Hệ thống quản lý Nhà Đại đoàn kết – MTTQ An Giang

## Kiến trúc

- **GitHub Pages** (`index.html`): toàn bộ giao diện quản trị, đăng nhập, hồ sơ, kinh phí, thống kê, tài khoản và ảnh.
- **Google Apps Script** (`gas/Bridge.gs` + `Code.gs` cũ): xử lý đăng nhập và phân quyền, lưu/đọc Sheets và Drive.
- **Google Sheets**: dữ liệu nghiệp vụ.
- **Google Drive**: minh chứng và ảnh (không chia sẻ công khai).

**Không nhúng GAS bằng iframe để hiển thị giao diện.** Phần kết nối dữ liệu dùng POST sang GAS qua iframe vận chuyển ẩn và phản hồi qua `postMessage` có kiểm tra origin. Đây là giải pháp tích hợp thử nghiệm cần kiểm thử trên trình duyệt thực tế.

## Cài đặt GAS bắt buộc

1. Mở đúng **dự án Apps Script đang vận hành URL /exec**.
2. Sao lưu dự án Apps Script và Google Sheets trước khi chỉnh.
3. Tạo **file Script mới tên `Bridge.gs`**, sao chép toàn bộ nội dung trong [gas/Bridge.gs](gas/Bridge.gs) vào đó. **Giữ nguyên Code.gs, các bảng và cài đặt Drive**. Không tạo doPost khác trùng tên.
4. Trên GAS chọn **Deploy → Manage deployments → Edit → New version → Deploy**; xác minh URL /exec vẫn là URL cấu hình trong index.html.
5. Chính sách Execute as / Who has access phải được đánh giá phù hợp với cơ chế xác thực. Bản hiện tại dùng **mật khẩu nội bộ dạng thử nghiệm**, chưa được kiểm toán; **không mở rộng truy cập công khai tới dữ liệu hộ dân khi chưa rà soát bảo mật**.
6. Mở trang GitHub, đăng nhập bằng **tài khoản đã cấp trong NDK_CREDENTIALS** và thử dữ liệu **giả lập** trước; kiểm tra mỗi vai trò, thêm/sửa, phê duyệt, tải ảnh, xuất CSV, đăng xuất, timeout.
7. Nếu lỗi, mở Console/Network để xem biểu mẫu POST, status và phản hồi; việc chỉnh GAS không tự triển khai từ GitHub.

## Giới hạn và lưu ý bảo mật

- Kết nối chỉ hỗ trợ nếu bản triển khai GAS trả về trang HTML bridge và trình duyệt cho phép thực thi phản hồi trong iframe ẩn.
- Máy chủ GAS hiện có cơ chế mật khẩu/phiên **PILOT**, tự ghi chú trong mã rằng token không sử dụng CSPRNG; cần thay thế bằng giải pháp danh tính đã kiểm toán trước khi lưu dữ liệu cá nhân thực tế.
- Dữ liệu cá nhân, mật khẩu, token đăng nhập, Script Properties và ID thư mục Drive **không** được đặt trên GitHub.
- GitHub Pages là website công khai; **giao diện không đồng nghĩa với quyền truy cập dữ liệu**. Mọi hành động phải qua `authRpc` và kiểm tra quyền ở GAS.
- Phiên đăng nhập chỉ giữ trong bộ nhớ của trang, không ghi localStorage.
- Không đổi chia sẻ file Drive thành “Anyone with the link”.
- Tải ảnh lớn có thể vượt giới hạn gửi POST của GAS, phải thử nghiệm theo giới hạn thực tế.

## URL

- Giao diện: https://mattransoag.github.io/nhadaidoanket/
- Repository: https://github.com/mattransoag/nhadaidoanket/
