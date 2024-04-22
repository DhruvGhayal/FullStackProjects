using Microsoft.EntityFrameworkCore;
using PayRollAPI.Models;

namespace PayRollAPI.Models
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Employees> tblEmployee { get; set; }
    }
}
