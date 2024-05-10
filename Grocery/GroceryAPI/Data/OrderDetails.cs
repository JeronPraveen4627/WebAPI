using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryAPI.Data
{
    [Table("OrderDetails", Schema = "public")]
    public class OrderDetails
    {
        [Key]
        public int OrderID{get;set;}
        
        public int[] ItemID{get;set;}
    
        public string[] ItemName{get;set;}

        public int[] Quantity{get;set;}

        public int[]  Price{get;set;}

        public double BillAmount{get;set;}

        public DateTime PurchaseDate{get;set;}
        
    }
}