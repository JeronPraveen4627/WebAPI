using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroCard.Data;

namespace MetroCard.Controllers
{
    public class ApplicationDBContext:DbContext,IDisposable
    {
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
      public DbSet<UserDetails> users{get;set;}

       public DbSet<TravelDetails> travels{get;set;}

      public DbSet<TicketDetails> tickets{get;set;}
    }    

}