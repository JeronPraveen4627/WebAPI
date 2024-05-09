using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryAPI.Data
{
    [Table("GroceryDetails", Schema = "public")]

    public class GroceryDetails
    {
        [Key]
        public int ItemID{get;set;}

        public string ItemName{get;set;}

        public int ItemQuantity{get;set;}

        public int UnitPrice{get;set;}

        public DateTime ItemExpiredDate{get;set;}

        public string[] ItemPhoto{get;set;}
    }
}
