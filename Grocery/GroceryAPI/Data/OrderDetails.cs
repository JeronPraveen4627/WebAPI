using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryAPI.Data
{
    [Table("rderDetails", Schema = "public")]
    public class OrderDetails
    {
        [Key]
        public int OrderID{get;set;}

        public string UserName{get;set;}

        public string ItemName{get;set;}

        public int Quantity{get;set;}

        public double Price{get;set;}
    }
}