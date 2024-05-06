using MetroCard.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace MetroCard.Conrtoller;

    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]

public class TicketDetailsController : ControllerBase
{
         private static List<TicketDetails> _ticketArrayList=new List<TicketDetails>()
        {
            new TicketDetails{FromLocation="Airport",ToLoaction="Egmore",Price=55},
            new TicketDetails{FromLocation="Airport",ToLoaction="Koyambedu",Price=25},
            new TicketDetails{FromLocation="Alandur",ToLoaction="Koyambedu",Price=25}
        };
         [HttpGet]
        public IActionResult GetTicket()
        {
            return Ok(_ticketArrayList);
        }

        // GET: api/TicketTicketDetails/1
        [HttpGet("{id}")]
        public IActionResult GetTicketTicketDetails(int id)
        {
            var Ticket = _ticketArrayList.Find(m => m.TicketID == id);
            if (Ticket == null)
            {
                return NotFound();
            }
            return Ok(Ticket);
        }

        //Adding a new TicketDetails
        // POST: api/TicketTicketDetails
        [HttpPost]
        public IActionResult PostTicketTicketDetails([FromBody] TicketDetails Ticket)
        {
            _ticketArrayList.Add(Ticket);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing TicketDetails
        // PUT: api/TicketTicketDetails/1
        [HttpPut("{id}")]
        public IActionResult PutTicketTicketDetails(int id, [FromBody]TicketDetails TicketDetails)
        {
            var index = _ticketArrayList.FindIndex(m => m.TicketID == id);
            if (index < 0)
            {
                return NotFound();
            }
            _ticketArrayList[index] = TicketDetails;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing TicketDetails
        // DELETE: api/TicketTicketDetails/1
        [HttpDelete("{id}")]
        public IActionResult DeleteTicketTicketDetails(int id)
        {
            var TicketDetails = _ticketArrayList.Find(m => m.TicketID == id);
            if (TicketDetails == null)
            {
                return NotFound();
            }
            _ticketArrayList.Remove(TicketDetails);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
}






// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class MedicineDetailsController:ControllerBase
//     {
//         private readonly ApplicationDBContext _dbContext;
//         public MedicineDetailsController(ApplicationDBContext applicationDBContext)
//         {
//             _dbContext=applicationDBContext;
//         }
//         [HttpGet]
//     //Get Details
//         public IActionResult GetMedicineDetails()
//         {
//             return Ok(_dbContext.medicines.ToList());
//         }
//         //Set Details
//          [HttpGet("{MedicineID}")]
//         public IActionResult GetIndividualMedicineDetails(int medicineID)
//         {
//             var medicine=_dbContext.medicines.FirstOrDefaultAsync(medicine=>medicine.MedicineID==medicineID);
//             if(medicine==null)
//             {
//                 return NotFound();
//             }
//             return Ok(medicine);
//         }
//         //Add Details
//         [HttpPost]
//         public IActionResult AddMedicineDetails([FromBody] MedicineDetails medicine)
//         {
//             _dbContext.medicines.Add(medicine);
//             _dbContext.SaveChanges();
//             return Ok();
//         }
        //Update Details
        [HttpPut("{MedicineID}")]
        public IActionResult UpdateMedicineDetails(int medicineID,[FromBody] MedicineDetails medicine)
        {
            var medicineOld=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==medicineID);
            if(medicineOld==null)
            {
                return NotFound();
            }
            medicineOld.AvailableCount=medicine.AvailableCount;
            medicineOld.ExpiryDate=medicine.ExpiryDate;
            medicineOld.MedicineName=medicine.MedicineName;
            medicineOld.Price=medicine.Price;
            _dbContext.SaveChanges();
            return Ok();
        }
        Delete Details
        [HttpDelete("{MedicineID}")]
        public IActionResult DeleteMedicine(int medicineID)
        {
        var medicine=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==medicineID);
            if(medicine==null)
            {
                return NotFound();
            }
            _dbContext.medicines.Remove(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}