using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HotelBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hotels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    City = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Rating = table.Column<double>(type: "REAL", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: true),
                    ImageUrl = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    MinPrice = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Role = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Hotels",
                columns: new[] { "Id", "City", "Description", "ImageUrl", "MinPrice", "Name", "Rating" },
                values: new object[,]
                {
                    { 1, "Hà Nội", "Nằm giữa phố cổ, gần Hồ Hoàn Kiếm và chợ đêm.", "https://picsum.photos/seed/hotel1/600/400", 600000, "Hanoi Old Quarter Hotel", 4.5 },
                    { 2, "Hà Nội", "Khách sạn view Hồ Tây yên tĩnh, bể bơi trên cao.", "https://picsum.photos/seed/hotel2/600/400", 1200000, "Lotus West Lake", 4.7000000000000002 },
                    { 3, "Hồ Chí Minh", "Trung tâm Quận 1, đi bộ đến Nhà thờ Đức Bà.", "https://picsum.photos/seed/hotel3/600/400", 700000, "Saigon Central Hotel", 4.2999999999999998 },
                    { 4, "Hồ Chí Minh", "Căn hộ khách sạn cao cấp bên sông Sài Gòn.", "https://picsum.photos/seed/hotel4/600/400", 1800000, "Riverside Saigon Suites", 4.7999999999999998 },
                    { 5, "Đà Nẵng", "Gần cầu Rồng, cách biển Mỹ Khê 10 phút.", "https://picsum.photos/seed/hotel5/600/400", 800000, "Dragon Bridge Hotel", 4.4000000000000004 },
                    { 6, "Nha Trang", "Sát biển, có bãi biển riêng và spa.", "https://picsum.photos/seed/hotel6/600/400", 1000000, "Ocean Pearl Nha Trang", 4.5999999999999996 },
                    { 7, "Đà Lạt", "Homestay phong cách châu Âu giữa đồi thông.", "https://picsum.photos/seed/hotel7/600/400", 500000, "Pine Hill Dalat", 4.2000000000000002 },
                    { 8, "Phú Quốc", "Resort 5 sao bên bãi Sao, hoàng hôn tuyệt đẹp.", "https://picsum.photos/seed/hotel8/600/400", 2500000, "Sunset Phu Quoc Resort", 4.9000000000000004 },
                    { 9, "Đà Nẵng", "Lựa chọn tiết kiệm cho du khách ba lô.", "https://picsum.photos/seed/hotel9/600/400", 350000, "Budget Stay Da Nang", 3.8999999999999999 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hotels");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
