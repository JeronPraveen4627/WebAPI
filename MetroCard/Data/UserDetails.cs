using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroCard.Data;

[Table("userdetails", Schema = "public")]
public class UserDetails
{
    public int CardNumber{get;set;}
    public string UserEmail{get;set;}

    public string UserPassword{get;set;}

    public int UserBalance{get;set;}
    public string UserName{get;set;}
    public int PhoneNumber{get;set;}
    
}