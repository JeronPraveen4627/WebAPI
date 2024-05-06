using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using MetroCard.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace MetroCard.Controllers;

   [Route("api/[controller]")]
    [ApiController]
public class UserDetailsController : ControllerBase
{   
    private readonly ApplicationDBContext _DbContext;
    public UserDetailsController(ApplicationDBContext applicationDBContext)
    {
        _DbContext=applicationDBContext;
    }
        // private static List<UserDetails> _userArrayList=new List<UserDetails>()
        // {
        //     new UserDetails{CardNumber=1000, UserEmail="123",UserPassword="123",UserBalance=100,UserName="Praveen",PhoneNumber=96587456},
        //     new UserDetails{CardNumber=1001,UserEmail="12345",UserPassword="123456",UserBalance=0,UserName="Jeron Praveen",PhoneNumber=96587456}
        // };
          // GET: api/UserDetails
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
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing userDetails
        // PUT: api/UserDetails/1
        [HttpPut("{id}")]
        public IActionResult PutuserDetails(int id, [FromBody] UserDetails userDetails)
        {
            var index = _DbContext.users.FirstOrDefaultAsync(m => m.CardNumber == id);
            if (index==null)
            {
                return NotFound();
            }
            index.
            _DbContext.users[index] = userDetails;
            // You might want to return NoContent or another appropriate response
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
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    
}



