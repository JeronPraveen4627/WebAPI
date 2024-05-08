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
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        
        [HttpGet]
        public IActionResult GetBorrowList()
        {
            return Ok(_dbContext.borrows.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetBorrow(int id)
        {
            var borrow = _dbContext.borrows.FirstOrDefault(m => m.BorrowID == id);
            if (borrow == null)
            {
                return NotFound();
            }
            _dbContext.SaveChanges();
            return Ok(borrow);
        }

        [HttpPost]
        public IActionResult AddBorrow([FromBody] BorrowDetails borrow)
        {
            _dbContext.borrows.Add(borrow);
            // You might want to return CreatedAtAction or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBorrow(int id, [FromBody] BorrowDetails borrow)
        {
            var oldBorrow = _dbContext.borrows.FirstOrDefault(m => m.BookID == id);
            if (oldBorrow == null)
            {
                return NotFound();
            }
            oldBorrow.BorrowID = borrow.BorrowID;
            oldBorrow.BookID = borrow.BookID;
            oldBorrow.UserID = borrow.UserID;
            oldBorrow.BorrowedDate = borrow.BorrowedDate;
            oldBorrow.BorrowBookCount =borrow.BorrowBookCount;
            oldBorrow.Status = borrow.Status;
            oldBorrow.Status = borrow.Status;
            oldBorrow.PaidFineAmount = borrow.PaidFineAmount;
            // You might want to return NoContent or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteBorrow(int id)
        {
            var borrow = _dbContext.borrows.FirstOrDefault(m => m.BorrowID == id);
            if (borrow == null)
            {
                return NotFound();
            }
            _dbContext.borrows.Remove(borrow);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}