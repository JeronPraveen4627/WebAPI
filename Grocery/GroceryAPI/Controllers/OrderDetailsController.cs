using GroceryAPI.Data;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace GroceryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        
        [HttpGet]
        public IActionResult GetOrderList()
        {
            return Ok(_dbContext.orders.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(m => m.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }
            _dbContext.SaveChanges();
            return Ok(order);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] OrderDetails order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] OrderDetails order)
        {
            var orderOld = _dbContext.orders.FirstOrDefault(m => m.OrderID == id);
            if (orderOld == null)
            {
                return NotFound();
            }
            orderOld.OrderID = order.OrderID;
            orderOld.ItemName = order.ItemName;
            orderOld.Quantity = order.Quantity;
            orderOld.Price = order.Price;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _dbContext.orders.FirstOrDefault(m => m.OrderID == id);
            if (order == null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}