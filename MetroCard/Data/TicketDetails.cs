using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroCard.Data;

[Table("ticketdetails", Schema = "public")]
 public class TicketDetails
{
    [Key]
    public int TicketID{get;set;}

   
    public string FromLocation{get;set;}

    public string ToLocation{get;set;}

    public double Price{get;set;}
} 
 