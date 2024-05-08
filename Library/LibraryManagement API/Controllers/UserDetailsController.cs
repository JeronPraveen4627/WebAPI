using System.ComponentModel.DataAnnotations;
using LibraryManagement_API.Data;
using System.Data.Entity;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace LibraryManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext= applicationDBContext;
        }
         [HttpGet]
        public IActionResult GetUserList()
        {
            return Ok(_dbContext.users.ToList());
        }


        //Getting Particular UserID
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(m => m.UserID == id);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.SaveChanges();
            return Ok(user);
        }


        //Adding new User
        [HttpPost]
        public IActionResult AddUser([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            // You might want to return CreatedAtAction or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserDetails user)
        {
            var userOld = _dbContext.users.FirstOrDefault(m => m.UserID == id);
            if (userOld ==null)
            {
                return NotFound();
            }
            userOld.UserName = user.UserName;
            userOld.UserName = user.UserName;
            userOld.UserPassword = user.UserPassword;
            userOld.Gender = user.Gender;
            userOld.Department = user.Department;
            userOld.MobileNumber = user.MobileNumber;
            userOld.MailID = user.MailID;
            userOld.WalletBalance=user.WalletBalance;
            // You might want to return NoContent or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}