using MetroCard.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace MetroCard.Conrtoller;

    [Route("api/[controller]")]
    [ApiController]

public class TravelDetailsController : ControllerBase
{

   private static List<TravelDetails> _TravelArrayList=new List<TravelDetails>()
   {
            new TravelDetails{CardNumber=1001,FromLocation="Airport",ToLocation="Egmore",Date="2023,10,10",TravelCost=55},
            new TravelDetails{CardNumber=1001,FromLocation="Egmore",ToLocation="Koyambedu",Date="2023,10,10",TravelCost=32}
    };
    [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(_TravelArrayList);
        }

        // GET: api/TravelTravel/1
        [HttpGet("{id}")]
        public IActionResult GetTravel(int id)
        {
            var TravelDetails = _TravelArrayList.Find(m => m.TravelID == id);
            if (TravelDetails == null)
            {
                return NotFound();
            }
            return Ok(TravelDetails);
        }

        //Adding a new TravelDetails
        // POST: api/TravelTravel
        [HttpPost]
        public IActionResult PostTravel([FromBody] TravelDetails Travel)
        {
            _TravelArrayList.Add(Travel);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing _travel
        // PUT: api/TravelDetails/1
        [HttpPut("{id}")]
        public IActionResult PutTravel(int id, [FromBody] TravelDetails TravelDetails)
        {
            var index = _TravelArrayList.FindIndex(m => m.TravelID == id);
            if (index < 0)
            {
                return NotFound();
            }
            _TravelArrayList[index] = TravelDetails;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing _travel
        // DELETE: api/TravelDetails/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var _travel = _TravelArrayList.Find(m => m.TravelID == id);
            if (_travel == null)
            {
                return NotFound();
            }
            _TravelArrayList.Remove(_travel);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }

