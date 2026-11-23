# Hệ thống Quản lý Nhà Đại đoàn kết

**Ủy ban Mặt trận Tổ quốc Việt Nam tỉnh An Giang**

Trang GitHub Pages chính thức của dự án giao diện (không phải xác nhận tên miền chính thức của cơ quan):

https://mattransoag.github.io/nhadaidoanket/

## Kiến trúc

- `index.html`: cổng truy cập công khai, thiết kế đỏ–cam, responsive, dùng biểu trưng MTTQ.
- Google Apps Script Web App: hệ thống quản trị hồ sơ, tài khoản, phân quyền, tiến độ, kinh phí và hình ảnh.
- Google Sheets và Google Drive: lưu trữ dữ liệu và minh chứng, được bảo vệ bởi quyền truy cập ứng dụng.

**Không đưa dữ liệu cá nhân, mật khẩu, mã phiên đăng nhập, khóa API hoặc mã máy chủ nội bộ lên repository Public.**

## Bật GitHub Pages

Vào **Settings → Pages → Build and deployment**, chọn **Deploy from a branch**, nhánh **main**, thư mục **/(root)**, rồi **Save**.

## Liên kết GAS

Cổng truy cập mở ứng dụng GAS hiện tại bằng một liên kết rõ ràng. GitHub Pages không trực tiếp gọi `google.script.run`, vì API này chỉ hoạt động trong trang HTML do Apps Script phục vụ.

Khi muốn đổi URL triển khai GAS, sửa liên kết trong `index.html` và commit.

## Ghi chú

Nội dung và tài khoản quản lý vẫn được phân quyền trên GAS. Không sử dụng xác thực tại GitHub Pages để thay thế xác thực máy chủ.
