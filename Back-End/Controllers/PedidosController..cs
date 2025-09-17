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


    [HttpPost]
    public async Task<ActionResult<Pedido>> PostPedido(Pedido pedido)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // 1-Guardar el pedido
            _context.Pedidos.Add(pedido);
            _context.SaveChanges();
            //2-Clcula el total del pedido o venta
            var totalVenta = pedido.Items.Sum(item => item.Cantidad * item.PrecioUnitario);
            //3- crea registro de la venta
            var venta = new Venta
            {
                Fecha = DateTime.UtcNow,
                Total = totalVenta,
                PedidoId = pedido.Id
            };
            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            //4- confirma la transacion
            _context.Database.CommitTransaction();

            return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedido);
        }
        catch (Exception ex)
        {
            // Si hay un error, revierte la transacción
            await transaction.RollbackAsync();
            return StatusCode(500, "Ocurrió un error al procesar el pedido: " + ex.Message);
        }
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