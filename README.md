# StayEasy – Bài tập 3: Đăng ký / Đăng nhập (React + ASP.NET Core + EF Core)

## Cấu trúc repo
```
frontend/   React + Vite + React Router + Axios (gồm cả giao diện bài 1)
backend/    ASP.NET Core Web API + EF Core (SQLite) + JWT
```

## Chạy backend
```bash
cd backend/HotelBooking.Api
dotnet tool install --global dotnet-ef        # chỉ cần lần đầu
dotnet restore
dotnet ef migrations add InitialCreate        # tạo migration
dotnet ef database update                     # tạo database
dotnet run
```
API chạy tại http://localhost:5080 – Swagger: http://localhost:5080/swagger
Tài khoản admin mặc định: `admin@stayeasy.vn` / `Admin@123`

## Chạy frontend
```bash
cd frontend
npm install
npm run dev
```
Mở http://localhost:3000

## Luồng chức năng
- `/register`: nhập họ tên, email, mật khẩu -> validate (client + server) -> lưu user vào DB (mật khẩu băm BCrypt)
- `/login`: query DB theo email, kiểm tra mật khẩu -> trả JWT
- Frontend lưu token + user vào `localStorage` và `AuthContext`; Header hiển thị tên và nút đăng xuất
- `/admin`: chỉ role Admin truy cập được; thao tác CRUD khách sạn qua Axios (GET/POST/PUT/DELETE)
