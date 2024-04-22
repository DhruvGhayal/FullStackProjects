using System.ComponentModel.DataAnnotations;

namespace PayRollAPI.Models
{
    public class Employees
    {
        [Key]
        public int emp_id { get; set; }
        public string? emp_name { get; set; }
        public string? emp_email { get; set; }
        public string? emp_password { get; set; }
        public string? emp_gender { get; set; }
        public Nullable<int> noOfDependants { get; set; }



        public Nullable<decimal> Additions { get; set; }
        public Nullable<decimal> ITex { get; set; }
        public Nullable<decimal> CPP { get; set; }
        public Nullable<decimal> EI { get; set; }
        public Nullable<decimal> FinalSalary { get; set; }


    }
}
