using PayRollAPI.Models;
using System.Diagnostics.Eventing.Reader;

namespace PayRollAPI.BLogic
{
    public class BLogic
    {
        public static string FinalSalary(int emp_id, string emp_name, int dependant, string gender, double itex, double ei, double cpp, double additions, double grosssalary)
        {
            double Deductions = 0;
            double finalgross = 0;
            string FinalValues = "";

            if (gender == "Male")
            {
                switch (dependant)
                {
                    case (2):
                        Deductions = ((grosssalary * itex) + (grosssalary * ei) + (grosssalary * cpp)) / 12;

                        Deductions = Math.Round(Deductions, 2);

                        finalgross = ((grosssalary - Deductions) + additions) / 12;

                        finalgross = Math.Round(finalgross, 2);


                        FinalValues = "Final Salary: $" + Convert.ToString(finalgross) + ", Total Deductions: $" + Convert.ToString(Deductions) + ", Total Additions: $" + Convert.ToString(additions);
                        break;
                    case (3):
                        Deductions = ((grosssalary * (itex - 0.01)) + (grosssalary * ei) + (grosssalary * cpp)) / 12;
                        Deductions = Math.Round(Deductions, 2);


                        finalgross = ((grosssalary - Deductions) + additions) / 12;
                        finalgross = Math.Round(finalgross, 2);


                        FinalValues = "Final Salary: $" + Convert.ToString(finalgross) + ", Total Deductions: $" + Convert.ToString(Deductions) + ", Total Additions: $" + Convert.ToString(additions);
                        break;
                    case (4):
                        Deductions = ((grosssalary * (itex - 0.02)) + (grosssalary * ei) + (grosssalary * cpp)) / 12;

                        Deductions = Math.Round(Deductions, 2);

                        finalgross = ((grosssalary - Deductions) + additions) / 12;

                        finalgross = Math.Round(finalgross, 2);

                        FinalValues = "Final Salary:  $" + Convert.ToString(finalgross) + ", Total Deductions: $" + Convert.ToString(Deductions) + ", Total Additions: $" + Convert.ToString(additions);
                        break;
                }

            }
            else if (gender == "Female")
            {
                switch (dependant)
                {
                    case (2):
                        Deductions = ((grosssalary * itex) + (grosssalary * ei) + (grosssalary * cpp)) / 12;

                        Deductions = Math.Round(Deductions, 2);

                        finalgross = ((grosssalary - Deductions) + additions) / 12;

                        finalgross = Math.Round(finalgross, 2);

                        FinalValues = "Final Salary: $" + Convert.ToString(finalgross) + ", Total Deductions: $" + Convert.ToString(Deductions) + ", Total Additions: $" + Convert.ToString(additions);
                        break;
                    case (3):
                        Deductions = ((grosssalary * (itex - 0.01)) + (grosssalary * ei) + (grosssalary * cpp)) / 12;
                        Deductions = Math.Round(Deductions, 2);

                        finalgross = ((grosssalary - Deductions) + additions) / 12;

                        finalgross = Math.Round(finalgross, 2);

                        FinalValues = "Final Salary: $" + Convert.ToString(finalgross) + ", Total Deductions: $" + Convert.ToString(Deductions) + ", Total Additions: $" + Convert.ToString(additions);
                        break;
                    case (4):
                        Deductions = ((grosssalary * (itex - 0.02)) + (grosssalary * ei) + (grosssalary * cpp)) / 12;
                        Deductions = Math.Round(Deductions, 2);

                        finalgross = ((grosssalary - Deductions) + additions) / 12;

                        finalgross = Math.Round(finalgross, 2);

                        FinalValues = "Final Salary: $" + Convert.ToString(finalgross) + ", Total Deductions: $" + Convert.ToString(Deductions) + ", Total Additions: $" + Convert.ToString(additions);
                        break;
                }

            }
            return FinalValues;
        }
    }
}
