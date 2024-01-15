using CVMSCore.BAL.Models.Payroll;
using CVMSCore.BAL.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace CVMS_Core.Controllers
{
    public class PayrollController : BaseController
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        PayrollService service = new PayrollService();

        public IActionResult payrollHome()
        {
            return View();
        }

        public IActionResult AboutUs()
        {
            return View();
        }

        public IActionResult ContactUs()
        {
            return View();
        }






        //-----------------------------------------------------LOG IN----------------------------------------------------//

        public IActionResult payrollLogIn()
        {
            
            return View();
        }
        [HttpPost]
        public IActionResult AdminLoginPage(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = service.AdminloginSer(model);

                if (result == 1)
                {
                    ViewBag.ReturnMessage = "Congrats Login successfull!!!";

                    return RedirectToAction("AdminHomePage", "Payroll");
                    //ViewBag.ReturnMessage = "Login successfull";
                }
                else
                {
                    ViewBag.ReturnMessage = "Invalid credentials";
                    return View("payrollLogIn", model);
                }
            }

            return View("payrollLogIn", model);
        }
//------------------------------------------------------SIGN UP---------------------------------------------------//
        public IActionResult AdminSignup()
        {

            return View();
        }

        //[HttpPost]
        //public IActionResult AdminSignupPage(AdminSignupModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = service.AdminSignupSer(model);

        //        if (result == 101)
        //        {
        //            ViewBag.ReturnMessage = "Congrats SignUp successfull!!!";

        //            return RedirectToAction("payrollLogIn", "Payroll");
        //            //ViewBag.ReturnMessage = "Login successfull";
        //        }
        //        else
        //        {
        //            ViewBag.ReturnMessage = "Invalid credentials";
        //            return View("AdminSignup", model);
        //        }
        //    }

        //    return View("AdminSignup", model);
        //}
        public IActionResult AdminHomePage(string LoggedInName)
        {
            ViewBag.LoggedInName = LoggedInName;

            return View();
        }




        

        public IActionResult AllowanceMaster()
        {

            return View();
        }

        

        public int SaveAllowance(IFormCollection formcollection)
        {
            var result = 0;
            if (formcollection != null)
            {
                AllowanceModel obj = new AllowanceModel();

                
                obj.AllowanceName = Convert.ToString(formcollection["AllowanceName"]);
                obj.AllowanceAmount = Convert.ToInt32(formcollection["AllowanceAmount"]);
                


                result = service.PostAllowanceSer(obj);


            }
            return result;

        }
        
        public IActionResult DeductionMaster()
        {

            return View();
        }

        public int SaveDeduction(IFormCollection formcollection)
        {
            var result = 0;
            if (formcollection != null)
            {
                DeductionModel obj = new DeductionModel();


                obj.DeductionName = Convert.ToString(formcollection["DeductionName"]);
                obj.DeductionAmount = Convert.ToInt32(formcollection["DeductionAmount"]);



                result = service.PostDeductionSer(obj);


            }
            return result;

        }
        


        public IActionResult EmployeeDetailMaster()
        {

            return View();
        }

        //---------------------------------------for post Employee Detail--------------------------------

        public int SaveEmployeeDetail(IFormCollection formcollection)
        {
            var result = 0;
            if (formcollection != null)
            {
                EmployeeDetailModel obj = new EmployeeDetailModel();


                obj.EmployeeName = Convert.ToString(formcollection["EmployeeName"]);
                obj.EmployeeId = Convert.ToString(formcollection["EmployeeId"]);
                obj.DateOfBirth = Convert.ToString(formcollection["DateOfBirth"]);
                obj.Gender = Convert.ToString(formcollection["Gender"]);
                obj.ContactNo = Convert.ToString(formcollection["ContactNo"]);
                obj.PersonalEmail = Convert.ToString(formcollection["PersonalEmail"]);
                obj.Address = Convert.ToString(formcollection["Address"]);
                obj.Username = Convert.ToString(formcollection["Username"]);
                obj.Password = Convert.ToString(formcollection["Password"]);
                obj.Department = Convert.ToString(formcollection["Department"]);
                obj.Designation = Convert.ToString(formcollection["Designation"]);
                obj.OfficialEmail = Convert.ToString(formcollection["OfficialEmail"]);
                obj.DateOfJoining = Convert.ToString(formcollection["DateOfJoining"]);
                obj.BasicSalary = Convert.ToString(formcollection["BasicSalary"]);
                obj.AllowanceName = Convert.ToInt32(formcollection["AllowanceName"]);
                obj.AllowanceAmount = Convert.ToInt32(formcollection["AllowanceAmount"]);
                obj.DeductionName = Convert.ToInt32(formcollection["DeductionName"]);
                obj.DeductionAmount = Convert.ToInt32(formcollection["DeductionAmount"]);
                obj.TotalSalary = Convert.ToString(formcollection["TotalSalary"]);
                obj.AccountHolderName = Convert.ToString(formcollection["AccountHolderName"]);
                obj.AccountNumber = Convert.ToString(formcollection["AccountNumber"]);
                obj.BankName = Convert.ToString(formcollection["BankName"]);
                obj.Branch = Convert.ToString(formcollection["Branch"]);
                var id = Convert.ToInt32(formcollection["Id"]);

                if (id > 0)
                {
                    result = service.UpdateEmpdetailSer(obj, id);

                }
                else
                {

                    result = service.PostEmployeeDetailSer(obj);
                    }



            }
            return result;

        }


        //bind allowance
        public JsonResult getallowanceName()
        {
            List<BindingAllowance> ballowancen = new List<BindingAllowance>();
            ballowancen = service.GetAllowanceNameSer();
            return Json(new { ballowancen = ballowancen });
        }


        //---------------------------------Auto Populate for allowance--------------------------------
        public JsonResult getallowanceAmount(int AllowanceId)
        {
            List<AllowanceModel> autoamount = new List<AllowanceModel>();
            autoamount = service.GetAllowanceAmountSer(AllowanceId);
            return Json(new { autoamount = autoamount });

        }

        //bind deduction
        public JsonResult getDeductionName()
        {
            List<BindDeductionModel> bdeduction = new List<BindDeductionModel>();
            bdeduction = service.GetDeductionNameSer();
            return Json(new { bdeduction = bdeduction });
        }

        //-----------------------------Auto Populate for deduction------------------------------
        public JsonResult getdeductionAmount(int DeductionId)
        {
            List<DeductionModel> autodeductamount = new List<DeductionModel>();
            autodeductamount = service.GetDeductionAmountSer(DeductionId);
            return Json(new { autodeductamount = autodeductamount });

        }

       
        
       






        public IActionResult EmployeeDetailSummary()
        {

            return View();
        }

        //---------------------------get data for employee detail for admin-----------------------------//
        public JsonResult GetEmpdetailSummary()
        {
            List<EmployeeDetailModel> getempdetail = new List<EmployeeDetailModel>();
            getempdetail = service.GetEmpDetailSummarySer();
            return Json(new { getempdetail = getempdetail });
        }

        //----------------------------------- salary slip view-----------------------------------------//
        public IActionResult SalarySlip()
        {

            return View();
        }

        //---------------------------------- for salary slip------------------------------------------//
        public JsonResult getdatasalaryslip(int id)
        {



            var obj = service.getdatasalaryslipService(id);
            var salaryslip = service.getdatasalaryslipServiceList(id);



            return Json(new { salaryslip = salaryslip, obj = obj });


        }

        //------------------------------------------------edit employeee detail-----------------------------------------//

        public IActionResult EditEmployeeDetail()
        {

            return View();
        }

        public JsonResult EditEmpDetail(int id)
        {



            var obj = service.editEmpDetailSer(id);
            var empdtl = service.editEmpDetailServiceList(id);



            return Json(new { empdtl = empdtl, obj = obj });


        }

        //----------------------------------------------------Delete Employee Detail Data---------------------------//
        public JsonResult DeleteEmpDetail(int id)
        {
            try
            {
                int result = service.DeleteEmpDetailSer(id);

                if (result > 0)
                {

                    return Json(new { success = true, message = "deleted successfully" });
                }
                else
                {

                    return Json(new { success = false, message = "data not found" });
                }
            }
            catch (Exception ex)
            {

                return Json(new { success = false, message = "An error occurred while deleting" });
            }

        }


        public IActionResult EmployeeAttendanceSummary()
        {

            return View();
        }

        //------------------------------------------get data for employee attendance-------------------------//
        public JsonResult GetEmpAttendancedetailSummary()
        {
            List<EmployeeAttendanceModel> getempattendance = new List<EmployeeAttendanceModel>();
            getempattendance = service.GetEmpAttendanceDetailSummarySer();
            return Json(new { getempattendance = getempattendance });
        }

        public IActionResult LeaveDetailSummary()
        {

            return View();
        }

        //-------------------------------------get data for leave page for admin----------------------------------//

        public JsonResult GetLeavedetail()
        {
            List<EmployeeLeaveModel> getleave = new List<EmployeeLeaveModel>();
            getleave = service.GetLeaveDetailSer();
            return Json(new { getleave = getleave });
        }

        //--------------------------------------check leave Data---------------------------//
        public JsonResult checkleave(int id)
        {
            try
            {
                int result = service.checkLeaveSer(id);

                if (result > 0)
                {

                    return Json(new { success = true, message = "Checked successfully" });
                }
                else
                {

                    return Json(new { success = false, message = "data not found" });
                }
            }
            catch (Exception ex)
            {

                return Json(new { success = false, message = "An error occurred while checking" });
            }

        }









        
        public IActionResult PayrollEmployeeLogin()
        {

            return View();
        }

        public IActionResult EmployeeLoginPage(EmployeeLoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = service.EmployeeloginSer(model);

                if (result == 1)
                {
                    ViewBag.ReturnMessage = "Congrats Login successfull!!!";

                    return RedirectToAction("EmployeeHomePage", "Payroll");
                    //ViewBag.ReturnMessage = "Login successfull";
                }
                else
                {
                    ViewBag.ReturnMessage = "Invalid credentials";
                    return View("PayrollEmployeeLogin", model);
                }
            }

            return View("PayrollEmployeeLogin", model);
        }

        public IActionResult EmployeeHomePage(string LoggedInName)
        {
            ViewBag.LoggedInName = LoggedInName;

            return View();
        }


        public IActionResult EmployeeAttendancePage()
        {

            return View();
        }

        //-------------------------------------post attendance---------------------------------

        public JsonResult SaveAttendanceDetail(IFormCollection formcollection)
        {

            var result = 0;
            IFormFile fileInput1 = Request.Form.Files[0];

            string filename = "";

            string filepath1 = "";


            if (formcollection != null && fileInput1 != null && fileInput1.Length > 0)
            {
                EmployeeAttendanceModel obj = new EmployeeAttendanceModel();

                obj.EmployeeName = Convert.ToString(formcollection["EmployeeName"]);
                obj.EmployeeId = Convert.ToString(formcollection["EmployeeId"]);
                obj.Month = Convert.ToString(formcollection["Month"]);
                obj.TotalDays = Convert.ToString(formcollection["TotalDays"]);
                obj.WorkingDays = Convert.ToString(formcollection["WorkingDays"]);
                obj.PresentDays = Convert.ToString(formcollection["PresentDays"]);
                obj.LeaveDays = Convert.ToString(formcollection["LeaveDays"]);
                obj.Holidays = Convert.ToString(formcollection["Holidays"]);
                obj.WeeklyOffDays = Convert.ToString(formcollection["WeeklyOffDays"]);
                obj.EarlyGoingDays = Convert.ToString(formcollection["EarlyGoingDays"]);
                obj.LateComingDays = Convert.ToString(formcollection["LateComingDays"]);
                obj.AbsentDays = Convert.ToString(formcollection["AbsentDays"]);
                obj.PayableDays = Convert.ToString(formcollection["PayableDays"]);


                


                filename = fileInput1.FileName;
                filepath1 = Path.Combine("~/paymodel/", filename);

                ////filename2 = fileInput1.FileName;
                ////filepath2 = Path.Combine("~/NewFolder/", filename);

                result = service.PostAttendanceSer(obj, filepath1);

                //result = service.AddDPSer(obj);


            }
            return Json(new { result = result });
        }

        public IActionResult EmployeeLeavePage()
        {

            return View();
        }

        //--------------------------------------------------save leave page---------------------//
        public int SaveEmpLeaveDetail(IFormCollection formcollection)
        {
            var result = 0;
            if (formcollection != null)
            {
                EmployeeLeaveModel obj = new EmployeeLeaveModel();


                obj.EmployeeName = Convert.ToString(formcollection["EmployeeName"]);
                obj.EmployeeId = Convert.ToString(formcollection["EmployeeId"]);
                obj.LeaveType = Convert.ToString(formcollection["LeaveType"]);
                obj.LeaveDuration = Convert.ToString(formcollection["LeaveDuration"]);
                obj.Startdate = Convert.ToString(formcollection["Startdate"]);
                obj.Enddate = Convert.ToString(formcollection["Enddate"]);
                obj.Reason = Convert.ToString(formcollection["Reason"]);
                


                result = service.PostEmpLeaveDetailSer(obj);


            }
            return result;

        }

        public IActionResult EmployeeSalaryDetailSummary()
        {

            return View();
        }
        //---------------------------get data for salary detail for Employee---------------------------
        public JsonResult GetSalarydetailSummary()
        {
            List<EmployeeDetailModel> getSalarydetail = new List<EmployeeDetailModel>();
            getSalarydetail = service.GetSalaryDetailSummarySer();
            return Json(new { getSalarydetail = getSalarydetail });
        }

        // log in
        public IActionResult login(string UserName, string Password)
        {
            UserLogin userdt = new UserLogin();
            List<UserLogin> userdtt = new List<UserLogin>();
            if (UserName != null && Password != null)
            {
                userdt = service.AdminLogSer(UserName, Password);
                if (userdt != null)
                {
                    HttpContext.Session.SetString("LoggedUserInfo", JsonConvert.SerializeObject(userdt));
                    var value = HttpContext.Session.GetString("LoggedUserInfo");
                    //string _userDetail = Security.GetEncryptString(userdt.UserName.Trim() + "|" + encryptPassword.Trim());
                   
                    ViewBag.LoggedInName = userdt.LoggedInName;
                    userdt = GetUserDetail();
                }

                if (userdt != null)
                {
                    if (userdt.UserSubType == "Admin")
                    {

                        return RedirectToAction("AdminHomePage", "Payroll", new { LoggedInName = userdt.LoggedInName });
                    }
                    else if (userdt.UserSubType == "Employee")
                    {

                        return RedirectToAction("EmployeeHomePage", "Payroll", new { LoggedInName = userdt.LoggedInName });
                    }
                    //else if (userdt.UserSubType == "Doctor")
                    //{

                    //    return RedirectToAction("DoctorDashBoardPage", "Hospital");
                    //}
                    //else if (userdt.UserSubType == "Patient")
                    //{

                    //    return RedirectToAction("PatientDashBoardPage", "Hospital", new { Userid = userdt.Userid });
                    //}
                }
                //if(userdt != null)
                //{
                //    HttpContext.Session.SetString("LoggedUserInfo", JsonConvert.SerializeObject(userdt));
                //    var value = HttpContext.Session.GetString("LoggedUserInfo");
                //    //string _userDetail = Security.GetEncryptString(userdt.UserName.Trim() + "|" + encryptPassword.Trim());
                //    userdt = GetUserDetail();
                //}


                ViewData["ErrorMessage"] = "Invalid username or password";
                return View("PayrollLogin");
            }
            else
            {

                return View();
            }
        }

        //edit data for employee attendance
        public IActionResult EditEmpAttendance()
        {

            return View();
        }

        public JsonResult EditEmpAttendanceDetail(int attendanceId)
        {



            var obj = service.editEmpAttendanceSer(attendanceId);
            var empattendance = service.editEmpAttendanceServiceList(attendanceId);



            return Json(new { empattendance = empattendance, obj = obj });


        }




        //----------------------------------------------------Delete Employee Attendance Detail Data---------------------------//
        public JsonResult DeleteAttendanceDetail(int attendanceId)
        {
            try
            {
                int result = service.DeleteAttendanceDetailSer(attendanceId);

                if (result > 0)
                {

                    return Json(new { success = true, message = "deleted successfully" });
                }
                else
                {

                    return Json(new { success = false, message = "data not found" });
                }
            }
            catch (Exception ex)
            {

                return Json(new { success = false, message = "An error occurred while deleting" });
            }

        }



//-------------------------------------------------------------------
 public IActionResult demoview()
        {
            return View();
        }

        public IActionResult demoviewanother()
        {
            return View();
        }

    }
}























    

