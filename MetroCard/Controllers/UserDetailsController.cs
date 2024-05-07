using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using MetroCard.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace MetroCard.Controllers;
    [ApiController]
   [Route("api/[controller]")]
    
public class UserDetailsController : ControllerBase
{   
    private readonly ApplicationDBContext _DbContext;
    public UserDetailsController(ApplicationDBContext applicationDBContext)
    {
        _DbContext=applicationDBContext;
    }
        [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(_DbContext.users.ToList());
        }

        // GET: api/UserDetails/1
        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var userDetails = _DbContext.users.FirstOrDefaultAsync(m => m.CardNumber == id);
            if (userDetails == null)
            {
                return NotFound();
            }
            return Ok(userDetails);
        }

        //Adding a new userDetails
        // POST: api/UserDetails
        [HttpPost]
        public IActionResult PostUserDetails([FromBody] UserDetails userDetails)
        {
            _DbContext.users.Add(userDetails);
            _DbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PutuserDetails(int id, [FromBody] UserDetails userDetails)
        {
            var userOld = _DbContext.users.FirstOrDefault(m => m.CardNumber == id);
            if (userOld==null)
            {
                return NotFound();
            }
             userOld.CardNumber = userDetails.CardNumber;
             userOld.UserEmail = userDetails.UserEmail;
             userOld.UserPassword = userDetails.UserPassword;
             userOld.UserBalance = userDetails.UserBalance;
             userOld.UserName = userDetails.UserName;
             userOld.PhoneNumber = userDetails.PhoneNumber;

            _DbContext.SaveChanges();
            return Ok();
        }

        // Deleting an existing userDetails
        // DELETE: api/UserDetails/1
        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var userDetails = _DbContext.users.FirstOrDefault(m => m.CardNumber == id);
            if (userDetails == null)
            {
                return NotFound();
            }
           _DbContext.users.Remove(userDetails);
           _DbContext.SaveChanges();
            return Ok();
        }
    
}



