using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_End.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } = null!;

        public List<PedidoItem> Items { get; set; } = new();
        public bool Entregado { get; set; }
        public DateTime Fecha { get; set; }

        public Venta? Venta { get; set; }
    }
}