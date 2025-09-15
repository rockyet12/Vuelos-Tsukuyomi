using Back_End;
using Back_End.Models;
using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq; // Es necesario para usar .Any() y .FirstOrDefault()
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly AppDbContext _context;

    public PedidosController(AppDbContext context)
    {
        _context = context;
    }
    // Crear nuevos pedidos (Clientes)
    [HttpPost]
    public async Task<ActionResult<Pedido>> PostPedido(Pedido pedido)
    {
        _context.Pedidos.Add(pedido);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedido);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Pedido>> GetPedido(int id)
    {
        var pedido = await _context.Pedidos
            .Include(P => P.Items)
            .ThenInclude(pi => pi.Producto)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pedido == null)
        {
            return NotFound();
        }
        return pedido;
    }
}