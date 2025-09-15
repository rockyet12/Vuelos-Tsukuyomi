using Back_End.Models;
using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class PRoductoCOntroller : ControllerBase
{
    private readonly AppDbContext _context;

    public PRoductoCOntroller(AppDbContext context)
    {
        _context = context;
    }
    //COnsegui lista de productos (Clientes)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
    {
        return await _context.Productos.ToListAsync();
    }

    //Publicar un nuevo producto (Clientes)
    [HttpPost]
    public async Task<ActionResult<Producto>> PostProducto(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProductos), new { id = producto.Id }, producto);
    }
}