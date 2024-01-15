using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVMSCore.BAL.Models.Payroll
{
    public class PayrollModel
    {
    }
    public class LoginViewModel
    {
       
        public string Username { get; set; }

        
        public string Password { get; set; }
    }

    public class AdminSignupModel
    {
        
        public string Username { get; set; }

        
        public string Password { get; set; }

       
        public string ConfirmPassword { get; set; }
    }

   



    public class AllowanceModel
    {
        public int AllowanceId { get; set;}

        public string AllowanceName { get; set;}

        public int AllowanceAmount { get; set;}
    }

    public class BindingAllowance
    {

        public string AllowanceId { get; set; }


        public string AllowanceName { get; set; }
    }

    










    public class DeductionModel
    {
        public int DeductionId { get; set; }

        public string DeductionName { get; set; }

        public int DeductionAmount { get; set; }
    }

    public class BindDeductionModel
    {
        public int DeductionId { get; set; }

        public string DeductionName { get; set; }

       
    }

    //----------------------------post------------------------------

    public class EmployeeDetailModel
    {
        public int Id { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeId { get; set; }

        public string DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string ContactNo { get; set; }

        public string PersonalEmail { get; set; }

        public string Address { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Department { get; set; }

        public string Designation { get; set; }

        public string OfficialEmail { get; set; }

        public string DateOfJoining { get; set; }

        public string BasicSalary { get; set; }

        public int     AllowanceName { get; set; }

        public string AllowanceType { get; set; }



        public int AllowanceAmount { get; set; }

        public int     DeductionName { get; set; }

        public string DeductionType { get; set; }

        public int DeductionAmount { get; set; }

        public string TotalSalary { get; set; }


        public string month { get; set; }
        public string AbsentDays { get; set; }
        public string PayableDays { get; set; }

        public string AccountHolderName { get; set; }

        public string AccountNumber { get; set; }

        public string BankName { get; set; }

        public string Branch { get; set; }



    }
    //--------------------------------------Employee part--------------------------------
    public class EmployeeLoginViewModel
    {

        public string Username { get; set; }


        public string Password { get; set; }
    }

    public class EmployeeAttendanceModel
    {

        public int AttendanceId { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeId { get; set; }
        public string TotalDays { get; set; }
        public string Month { get; set; }
        public string WorkingDays { get; set; }

        public string PresentDays { get; set; }

        public string LeaveDays { get; set; }

        public string Holidays { get; set; }

        public string WeeklyOffDays { get; set; }

        public string EarlyGoingDays { get; set; }

        public string LateComingDays { get; set; }

        public string AbsentDays { get; set; }

        public string PayableDays { get; set; }

        public string filepath1 { get; set; }
    }

    public class EmployeeLeaveModel
    {

        public int Id { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeId { get; set; }
        public string LeaveType { get; set; }

        public string LeaveDuration { get; set; }

        public string Startdate { get; set; }

        public string Enddate { get; set; }

        public string Reason { get; set; }

       
    }
    public class UserLogin
    {
        public int Userid { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
        public string UserSubType { get; set; }
        public int IsAuthenticated { get; set; }
        public string LoggedInName { get; set; }
    }











}
