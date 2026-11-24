using System.ComponentModel.DataAnnotations;

namespace HotelBooking.Api.Models;

public class Hotel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Tên khách sạn là bắt buộc"), MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Thành phố là bắt buộc"), MaxLength(100)]
    public string City { get; set; } = string.Empty;

    [Range(0, 5, ErrorMessage = "Đánh giá phải từ 0 đến 5")]
    public double Rating { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Giá không hợp lệ")]
    public int MinPrice { get; set; }
}
