using Data;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Back_End.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/clientes
    [HttpGet]
    public ActionResult<IEnumerable<Cliente>> GetClientes()
    {
        return _context.Clientes.ToList();
    }

    // GET: api/clientes/5
    [HttpGet("{id}")]
    public ActionResult<Cliente> GetCliente(int id)
    {
        var cliente = _context.Clientes.Find(id);
        if (cliente == null)
            return NotFound();
        return cliente;
    }

    // PUT: api/clientes/5
    [HttpPut("{id}")]
    public IActionResult PutCliente(int id, Cliente cliente)
    {
        if (id != cliente.Id)
            return BadRequest();

        _context.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        _context.SaveChanges();
        return NoContent();
    }

    // DELETE: api/clientes/5
    [HttpDelete("{id}")]
    public IActionResult DeleteCliente(int id)
    {
        var cliente = _context.Clientes.Find(id);
        if (cliente == null)
            return NotFound();

        _context.Clientes.Remove(cliente);
        _context.SaveChanges();
        return NoContent();
    }

    //---------------------------------------------------------
    // ENDPOINTS DE AUTENTICACIÓN
    //---------------------------------------------------------

    // Endpoint para el REGISTRO de un nuevo cliente
    // La ruta de acceso es: POST api/clientes/register
    [HttpPost("register")]
    public ActionResult<Cliente> RegisterCliente([FromBody] Cliente cliente)
    {
        if (_context.Clientes.Any(c => c.Email == cliente.Email))
        {
            return BadRequest("El email ya está registrado.");
        }

        // Hashear la contraseña antes de guardarla para mayor seguridad
        cliente.Password = BCrypt.Net.BCrypt.HashPassword(cliente.Password);

        _context.Clientes.Add(cliente);
        _context.SaveChanges();

        // No devolver la contraseña hasheada en la respuesta
        cliente.Password = null;
        return CreatedAtAction(nameof(GetCliente), new { id = cliente.Id }, cliente);
    }

    // Endpoint para el LOGIN de un cliente existente
    // La ruta de acceso es: POST api/clientes/login
    [HttpPost("login")]
    public ActionResult<object> Login([FromBody] Cliente loginData)
    {
        var cliente = _context.Clientes.FirstOrDefault(c => c.Email == loginData.Email);

        if (cliente == null || !BCrypt.Net.BCrypt.Verify(loginData.Password, cliente.Password))
        {
            return Unauthorized("Email o contraseña incorrectos.");
        }

        // Si la autenticación es exitosa, creamos un nuevo objeto sin la contraseña hasheada
        var clienteSinPassword = new 
        {
            cliente.Id,
            cliente.Nombre,
            cliente.Email,
            cliente.Rol // Esto es fundamental para tu lógica en el frontend
        };

        return Ok(clienteSinPassword);
    }
}