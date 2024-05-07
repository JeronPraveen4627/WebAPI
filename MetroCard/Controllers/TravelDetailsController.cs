using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Threading.Tasks;
using MetroCard.Data;
using MetroCard.Controllers;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace MetroCard.Conrtoller;

    [Route("api/[controller]")]
    [ApiController]

public class TravelDetailsController : ControllerBase
{
    private readonly ApplicationDBContext _DbContext;
   public TravelDetailsController(ApplicationDBContext applicationDBContext)
    {
        _DbContext=applicationDBContext;
    }
    [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(_DbContext.travels.ToList());
        }

        // GET: api/TravelTravel/1
       
       [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var travelDetails = _DbContext.travels.FirstOrDefault(m => m.CardNumber == id);
            if (travelDetails == null)
            {
                return NotFound();
            }
            _DbContext.SaveChanges();
            return Ok(travelDetails);
        }


        [HttpPost]
        public IActionResult PostTravel([FromBody] TravelDetails travel)
        {
            _DbContext.Add(travel);
            _DbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTravel(int id, [FromBody] TravelDetails travelDetails)
        {
            var index = _DbContext.travels.FirstOrDefault(m => m.TravelID == id);
            if (index== null)
            {
                return NotFound();
            }
            index.TravelID=travelDetails.TravelID;   
            index.CardNumber=travelDetails.CardNumber;  
            index.FromLocation=travelDetails.FromLocation;
            index.ToLocation=travelDetails.ToLocation;
            index.Date=travelDetails.Date;
            index.TravelCost=travelDetails.TravelCost;         
           _DbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravel(int id)
        {
            var _travel = _DbContext.travels.FirstOrDefault(m => m.TravelID == id);
            if (_travel == null)
            {
                return NotFound();
            }
            _DbContext.Remove(_travel);
            _DbContext.SaveChanges();
            return Ok();
        }
    }

