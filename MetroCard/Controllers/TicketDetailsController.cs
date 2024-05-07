using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using MetroCard.Data;
using MetroCard.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MetroCard.Conrtoller;

    [Route("api/[controller]")]
    [ApiController]

public class TicketDetailsController : ControllerBase
{
        private readonly ApplicationDBContext _dbContext;
       public TicketDetailsController(ApplicationDBContext applicationDBContext)
       {
          _dbContext=applicationDBContext;
       }

        [HttpGet]
        public IActionResult GetTicketList()
        {
            return Ok(_dbContext.tickets.ToList());
        }

        [HttpGet ("{id}")]
        public IActionResult GetTicket(int id)
        {
            var ticket=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public IActionResult PostTicket([FromBody] TicketDetails ticket)
        {
            
            _dbContext.tickets.Add(ticket);
            // _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTicket(int id,[FromBody] TicketDetails ticket)
        {
            var ticketOld=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticketOld==null)
            {
                return NotFound();
            }
            ticketOld.FromLocation=ticket.FromLocation;
            ticketOld.ToLocation=ticket.ToLocation;
            ticketOld.Price=ticket.Price;
            // _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(int id)
        {
            var ticket=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            _dbContext.tickets.Remove(ticket);
            // _dbContext.SaveChanges();
            return Ok();
        }
    }




