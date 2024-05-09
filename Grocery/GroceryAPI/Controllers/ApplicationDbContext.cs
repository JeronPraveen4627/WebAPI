using Microsoft.EntityFrameworkCore;
using GroceryAPI.Data;

namespace GroceryAPI.Controllers
{
    public class ApplicationDBContext : DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestamBehavior",true);
        }

        public DbSet<UserDetails> users{get;set;}

        public DbSet<GroceryDetails> gerocerys{get;set;}

        public DbSet<OrderDetails> orders{get;set;}
    }
}