using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_End.Models
{
    public class Producto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Codigo { get; set; }

        [Required]
        public string Descripcion { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal PrecioUnitario { get; set; }
    }
}