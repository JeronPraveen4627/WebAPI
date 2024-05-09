using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryAPI.Data
{
    [Table("UserDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int UserID{get;set;}

        public string UserName{get;set;}

        public string EmailID{get;set;}

        public string PhoneNumber{get;set;}

        public string UserPassword{get;set;}

        public double WalletBalance{get;set;}
        public string[] UserPhoto{get;set;}

    
    }
}