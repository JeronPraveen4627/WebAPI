using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement_API.Data
{
    [Table("userDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int UserID{get;set;}

        public string UserName{get;set;}

        public string Gender{get;set;}

        public string Department{get;set;}

        public string MobileNumber{get;set;}

        public string MailID{get;set;}

        public string UserPassword{get;set;}

        public double WalletBalance{get;set;}
    }
}