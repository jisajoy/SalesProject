using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesProject.Models;

namespace SalesProject.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly Sale_dbContext _context;

        public SalesController(Sale_dbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SalesExists(sales.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }

        [HttpGet]
        public IEnumerable<JoinTable> getJoinTableData()
        {
            List<Customer> customerList = _context.Customer.ToList();
            List<Product> productList = _context.Product.ToList();
            List<Store> storeList = _context.Store.ToList();
            List<Sales> saleList = _context.Sales.ToList();

            var joinTableValues = from sa in saleList
                                  join c in customerList on sa.CustomerId equals c.Id into table1
                                  from c in table1.ToList()
                                  join p in productList on sa.ProductId equals p.Id into table2
                                  from p in table2.ToList()
                                  join st in storeList on sa.StoreId equals st.Id into table3
                                  from st in table3.ToList()
                                  select new JoinTable
                                  {
                                      saleId = sa.Id,
                                      customerId = c.Id,
                                      customerName = c.Name,
                                      productId = p.Id,
                                      productName = p.Name,
                                      storeId = st.Id,
                                      storeName = st.Name,
                                      datesold = sa.DateSold
                                   
                                  };
            return joinTableValues.ToList();
        }
    }
}
