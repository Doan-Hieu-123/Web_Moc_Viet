# MỘC VIỆT Restaurant

Website giới thiệu nhà hàng và hệ thống đặt bàn, quản lý vận hành cho nhà hàng MỘC VIỆT.
## Công nghệ

- Next.js 16 với App Router
- React 19 và TypeScript
- Tailwind CSS 4
- SQLite với `better-sqlite3`
- Xác thực tài khoản bằng cookie HttpOnly
## Chức năng chính

- Trang chủ, câu chuyện, thực đơn, món đặc trưng, đầu bếp, không gian và sự kiện
- Xem thực đơn theo danh mục và chi tiết món ăn
- Đăng ký, đăng nhập và quản lý tài khoản khách hàng
- Đặt bàn bắt buộc đăng nhập
- Tự điền họ tên, email và số điện thoại khi đặt bàn
- Đề xuất khu vực theo số lượng khách
- Khu vực quản trị dành cho tài khoản ADMIN
- Quản lý đặt bàn, bàn ăn, thực đơn, sự kiện, khách hàng và đánh giá
- Tự động cập nhật trạng thái đặt bàn và làm mới danh sách quản lý

## Yêu cầu môi trường
- Node.js 20.9 trở lên
- npm
- SQLite CLI nếu cần tạo database bằng `schema.sql`
Kiểm tra phiên bản:

```text
.env
dev.db
node_modules/
.next/
out/
dist/
coverage/
*.tsbuildinfo
```

Sau khi clone, thành viên trong team chỉ cần tạo database mới theo phần cài đặt ở trên.
cd moc-viet-restaurant
```

Cài dependency:

```bash
npm install
```

Tạo database SQLite từ schema:

```bash
sqlite3 dev.db ".read schema.sql"
```

Tạo dữ liệu mẫu:

```bash
npm run seed
```

Script seed tạo dữ liệu menu, bàn ăn và tài khoản quản trị mẫu. Script dùng `INSERT OR IGNORE`, nên có thể chạy lại mà không tạo bản ghi trùng.

## Chạy project

Chạy môi trường phát triển:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

Các lệnh khác:

```bash
npm run build   # kiểm tra và tạo bản build production
npm start       # chạy bản build production
npm run lint    # kiểm tra lint
```

## Tài khoản quản trị mẫu

Sau khi chạy `npm run seed`:

```text
Email: admin@mocviet.vn
Mật khẩu: MocViet@2026
```

Không sử dụng mật khẩu này trong môi trường thật. Khi triển khai chính thức, hãy đổi thông tin đăng nhập và không commit thông tin bí mật lên GitHub.

## Database

Ứng dụng hiện mở database SQLite tại file `dev.db` trong thư mục project. Cấu trúc database nằm trong [schema.sql](schema.sql), còn dữ liệu mẫu nằm trong [scripts/seed.ts](scripts/seed.ts).

Để xóa toàn bộ dữ liệu đặt bàn mà không xóa bảng:

```bash
sqlite3 dev.db ".read scripts/clear-reservations.sql"
```

Lệnh trên chỉ nên dùng khi muốn xóa dữ liệu reservation. Hãy sao lưu `dev.db` trước khi thao tác với dữ liệu quan trọng.

## Biến môi trường

File `.env` là file local và không nên commit. File `.env.example` chỉ dùng làm mẫu cấu hình cho thành viên trong team.

Hiện tại database được mở trực tiếp bằng `dev.db` trong mã nguồn. Biến `DATABASE_URL` chưa được sử dụng để chọn database runtime.

## Quy tắc commit

Nên commit:

```text
src/
public/
scripts/
schema.sql
package.json
package-lock.json
tsconfig.json
next.config.ts
postcss.config.mjs
eslint.config.mjs
.env.example
README.md
```

Không commit:

```text
.env
dev.db
node_modules/
.next/
out/
dist/
coverage/
*.tsbuildinfo
```

Sau khi clone, thành viên trong team chỉ cần tạo database mới theo phần cài đặt ở trên.
