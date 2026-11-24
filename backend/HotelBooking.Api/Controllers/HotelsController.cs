using HotelBooking.Api.Data;
using HotelBooking.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly AppDbContext _db;

    public HotelsController(AppDbContext db) => _db = db;

    // GET /api/hotels?q=&city=
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Hotel>>> GetAll([FromQuery] string? q, [FromQuery] string? city)
    {
        var query = _db.Hotels.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(q)) query = query.Where(h => h.Name.Contains(q));
        if (!string.IsNullOrWhiteSpace(city)) query = query.Where(h => h.City == city);
        return Ok(await query.OrderBy(h => h.Id).ToListAsync());
    }

    // GET /api/hotels/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Hotel>> GetById(int id)
    {
        var hotel = await _db.Hotels.FindAsync(id);
        return hotel is null ? NotFound(new { message = "Không tìm thấy khách sạn." }) : Ok(hotel);
    }

    // POST /api/hotels  (Admin)
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Hotel>> Create(Hotel hotel)
    {
        hotel.Id = 0;
        _db.Hotels.Add(hotel);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = hotel.Id }, hotel);
    }

    // PUT /api/hotels/5  (Admin)
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Hotel input)
    {
        var hotel = await _db.Hotels.FindAsync(id);
        if (hotel is null) return NotFound(new { message = "Không tìm thấy khách sạn." });

        hotel.Name = input.Name;
        hotel.City = input.City;
        hotel.Rating = input.Rating;
        hotel.Description = input.Description;
        hotel.ImageUrl = input.ImageUrl;
        hotel.MinPrice = input.MinPrice;

        await _db.SaveChangesAsync();
        return Ok(hotel);
    }

    // DELETE /api/hotels/5  (Admin)
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var hotel = await _db.Hotels.FindAsync(id);
        if (hotel is null) return NotFound(new { message = "Không tìm thấy khách sạn." });

        _db.Hotels.Remove(hotel);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
