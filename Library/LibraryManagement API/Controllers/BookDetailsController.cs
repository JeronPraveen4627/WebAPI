using System.ComponentModel.DataAnnotations;
using LibraryManagement_API.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace LibraryManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetBookList()
        {
            return Ok(_dbContext.books.ToList());
        }

        //Getting particular Book
        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            
            var book = _dbContext.books.FirstOrDefault(book => book.BookID == id);
            if (book == null)
            {
                return NotFound();
            }
             _dbContext.SaveChanges();

            return Ok(book);
        }

        //Adding new Book
        [HttpPost]
        public IActionResult AddBook([FromBody] BookDetails book)
        {
            _dbContext.books.Add(book);
            // You might want to return CreatedAtAction or another appropriate response
             _dbContext.SaveChanges();
            return Ok();
        }


        // Updating an existing Book
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] BookDetails book)
        {
            var bookOld = _dbContext.books.FirstOrDefault(m => m.BookID == id);
            if (bookOld == null)
            {
                return NotFound();
            }
            bookOld.BookName = book.BookName;
            bookOld.AuthorName = book.AuthorName;
            bookOld.BookCount = book.BookCount;
            // You might want to return NoContent or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
        }


        // Deleting an existing Book
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _dbContext.books.FirstOrDefault(m => m.BookID == id);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }



    
    
}