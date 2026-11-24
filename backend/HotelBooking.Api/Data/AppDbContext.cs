using HotelBooking.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBooking.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Hotel> Hotels => Set<Hotel>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Email là duy nhất
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Dữ liệu mẫu cho bảng Hotels
        modelBuilder.Entity<Hotel>().HasData(
            new Hotel { Id = 1, Name = "Hanoi Old Quarter Hotel", City = "Hà Nội", Rating = 4.5, MinPrice = 600000, Description = "Nằm giữa phố cổ, gần Hồ Hoàn Kiếm và chợ đêm.", ImageUrl = "https://picsum.photos/seed/hotel1/600/400" },
            new Hotel { Id = 2, Name = "Lotus West Lake", City = "Hà Nội", Rating = 4.7, MinPrice = 1200000, Description = "Khách sạn view Hồ Tây yên tĩnh, bể bơi trên cao.", ImageUrl = "https://picsum.photos/seed/hotel2/600/400" },
            new Hotel { Id = 3, Name = "Saigon Central Hotel", City = "Hồ Chí Minh", Rating = 4.3, MinPrice = 700000, Description = "Trung tâm Quận 1, đi bộ đến Nhà thờ Đức Bà.", ImageUrl = "https://picsum.photos/seed/hotel3/600/400" },
            new Hotel { Id = 4, Name = "Riverside Saigon Suites", City = "Hồ Chí Minh", Rating = 4.8, MinPrice = 1800000, Description = "Căn hộ khách sạn cao cấp bên sông Sài Gòn.", ImageUrl = "https://picsum.photos/seed/hotel4/600/400" },
            new Hotel { Id = 5, Name = "Dragon Bridge Hotel", City = "Đà Nẵng", Rating = 4.4, MinPrice = 800000, Description = "Gần cầu Rồng, cách biển Mỹ Khê 10 phút.", ImageUrl = "https://picsum.photos/seed/hotel5/600/400" },
            new Hotel { Id = 6, Name = "Ocean Pearl Nha Trang", City = "Nha Trang", Rating = 4.6, MinPrice = 1000000, Description = "Sát biển, có bãi biển riêng và spa.", ImageUrl = "https://picsum.photos/seed/hotel6/600/400" },
            new Hotel { Id = 7, Name = "Pine Hill Dalat", City = "Đà Lạt", Rating = 4.2, MinPrice = 500000, Description = "Homestay phong cách châu Âu giữa đồi thông.", ImageUrl = "https://picsum.photos/seed/hotel7/600/400" },
            new Hotel { Id = 8, Name = "Sunset Phu Quoc Resort", City = "Phú Quốc", Rating = 4.9, MinPrice = 2500000, Description = "Resort 5 sao bên bãi Sao, hoàng hôn tuyệt đẹp.", ImageUrl = "https://picsum.photos/seed/hotel8/600/400" },
            new Hotel { Id = 9, Name = "Budget Stay Da Nang", City = "Đà Nẵng", Rating = 3.9, MinPrice = 350000, Description = "Lựa chọn tiết kiệm cho du khách ba lô.", ImageUrl = "https://picsum.photos/seed/hotel9/600/400" }
        );
    }
}
