using GroceryAPI.Data;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace GroceryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public GroceryDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetGroceryList()
        {
            return Ok(_dbContext.gerocerys.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetMedicine(int id)
        {
            
            var grocery = _dbContext.gerocerys.FirstOrDefault(grocery => grocery.ItemID == id);
            if ( grocery == null)
            {
                return NotFound();
            }
             _dbContext.SaveChanges();

            return Ok(grocery);
        }
        [HttpPost]
        public IActionResult AddGrocery([FromBody] GroceryDetails grocery)
        {
            _dbContext.gerocerys.Add(grocery);
             _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGrocery(int id, [FromBody] GroceryDetails grocery)
        {
            var groceryOld = _dbContext.gerocerys.FirstOrDefault(grocery => grocery.ItemID == id);
            if (groceryOld == null)
            {
                return NotFound();
            }
           groceryOld.ItemName = grocery.ItemName;
            groceryOld.ItemQuantity = grocery.ItemQuantity;
            groceryOld.ItemExpiredDate = grocery.ItemExpiredDate;
            groceryOld.ItemQuantity=grocery.ItemQuantity;
            groceryOld.UnitPrice=grocery.UnitPrice;
            groceryOld.ItemPhoto=grocery.ItemPhoto;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGrocery(int id)
        {
            var grocery = _dbContext.gerocerys.FirstOrDefault(grocery =>grocery.ItemID  == id);
            if (grocery == null)
            {
                return NotFound();
            }
            _dbContext.gerocerys.Remove(grocery);
            _dbContext.SaveChanges();
            return Ok();
        }
    }   
}