using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroCard.Data;

[Table("usersdetails", Schema = "public")]
public class UserDetails
{
    
    [Key]
    public int CardNumber{get;set;}
    public string UserEmail{get;set;}

    public string UserPassword{get;set;}

    public int UserBalance{get;set;}
    public string UserName{get;set;}
    public string PhoneNumber{get;set;}
    
}