using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_End.Models
{
    public class Venta
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; } = null!;

        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }
    }
}