using System.ComponentModel.DataAnnotations;

namespace HotelBooking.Api.Dtos;

public class RegisterRequest
{
    [Required(ErrorMessage = "Email là bắt buộc")]
    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    [MaxLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Mật khẩu là bắt buộc")]
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).{8,}$",
        ErrorMessage = "Mật khẩu tối thiểu 8 ký tự, gồm cả chữ và số")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Họ tên là bắt buộc")]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;
}

public class LoginRequest
{
    [Required(ErrorMessage = "Email là bắt buộc")]
    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Mật khẩu là bắt buộc")]
    public string Password { get; set; } = string.Empty;
}

public record UserDto(int Id, string Email, string FullName, string Role);

public record AuthResponse(string Token, UserDto User);
