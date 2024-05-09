using GroceryAPI.Data;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace GroceryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]

        public IActionResult GetUserList()
        {
            return Ok(_dbContext.users.ToList());
        }

        [HttpGet("{id}")]

        public IActionResult GetUser(int id)
        {
            var user= _dbContext.users.FirstOrDefault(m=>m.UserID==id);
            if(user ==null)
            {
                return NotFound();
            }
            _dbContext.SaveChanges();
            return Ok(user);
        }

        [HttpPost]

        public IActionResult AddUser([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
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
            userOld.EmailID = user.EmailID;
            userOld.UserPassword = user.UserPassword;
            userOld.PhoneNumber = user.PhoneNumber;
            userOld.WalletBalance = user.WalletBalance;
            userOld.UserPhoto=user.UserPhoto;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}




























  