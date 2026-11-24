using System.Security.Claims;
using HotelBooking.Api.Data;
using HotelBooking.Api.Dtos;
using HotelBooking.Api.Models;
using HotelBooking.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly TokenService _tokens;

    public AuthController(AppDbContext db, TokenService tokens)
    {
        _db = db;
        _tokens = tokens;
    }

    // POST /api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest req)
    {
        var email = req.Email.Trim().ToLowerInvariant();

        if (await _db.Users.AnyAsync(u => u.Email == email))
            return Conflict(new { message = "Email này đã được đăng ký." });

        var user = new User
        {
            Email = email,
            FullName = req.FullName.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password), // không lưu mật khẩu thô
            Role = "User"
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return StatusCode(StatusCodes.Status201Created,
            new { message = "Đăng ký thành công. Vui lòng đăng nhập." });
    }

    // POST /api/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
    {
        var email = req.Email.Trim().ToLowerInvariant();

        // Query DB lấy user theo email
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
            return Unauthorized(new { message = "Email hoặc mật khẩu không đúng." });

        var token = _tokens.CreateToken(user);
        return Ok(new AuthResponse(token, ToDto(user)));
    }

    // GET /api/auth/me  (cần token)
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me()
    {
        var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await _db.Users.FindAsync(id);
        return user is null ? Unauthorized() : Ok(ToDto(user));
    }

    private static UserDto ToDto(User u) => new(u.Id, u.Email, u.FullName, u.Role);
}
