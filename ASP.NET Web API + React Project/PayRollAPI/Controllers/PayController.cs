using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayRollAPI.Models;

namespace PayRollAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayController : ControllerBase
    {
        private readonly DataContext _context;
        public PayController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Salary> Get()
        {
            List<Salary> mysalary = new List<Salary>();
            var payvalues = _context.tblEmployee.ToList();

            foreach (var sal in payvalues)
            {
                mysalary.Add(new Salary
                {
                    emp_id = sal.emp_id,
                    emp_name = sal.emp_name,
                    FinalValue = BLogic.BLogic.FinalSalary(sal.emp_id, sal.emp_name, Convert.ToInt32(sal.noOfDependants),
                sal.emp_gender, Convert.ToDouble(sal.itex), Convert.ToDouble(sal.ei), Convert.ToDouble(sal.cpp),
                Convert.ToDouble(sal.additions), Convert.ToDouble(sal.finalsalary))
                });
            }

            return mysalary;
        }

    }
}