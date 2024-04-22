using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayRollAPI.Models;

namespace PayRollAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employees>>> GetEmployees()
        {
            return await _context.tblEmployee.ToListAsync();
        }

        [HttpGet("{emp_id}")]
        public async Task<ActionResult<Employees>> GetEmployeeDetail(int emp_id)
        {
            var EmployeeDetail = await _context.tblEmployee.FindAsync(emp_id);

            if (EmployeeDetail == null)
            {
                return NotFound();
            }

            return EmployeeDetail;
        }


        [HttpPost]
        public async Task<ActionResult<Employees>> PostEmployeeDetail(Employees EmployeeDetail)
        {

            _context.tblEmployee.Add(EmployeeDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeDetail", new { emp_id = EmployeeDetail.emp_id }, EmployeeDetail);
        }

        // DELETE: api/PaymentDetail/5
        [HttpDelete("{emp_id}")]
        public async Task<IActionResult> DeleteEmployeeDetail(int emp_id)
        {
            var EmployeeDetail = await _context.tblEmployee.FindAsync(emp_id);
            if (EmployeeDetail == null)
            {
                return NotFound();
            }

            _context.tblEmployee.Remove(EmployeeDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeDetailExists(int id)
        {
            return _context.tblEmployee.Any(e => e.emp_id == id);
        }



        [HttpPut("{emp_id}")]
        public async Task<IActionResult> PutEmployeeDetail(int emp_id, Employees EmployeeDetail)
        {
            if (emp_id != EmployeeDetail.emp_id)
            {
                return BadRequest();
            }

            _context.Entry(EmployeeDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeDetailExists(emp_id))
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

    }
}
