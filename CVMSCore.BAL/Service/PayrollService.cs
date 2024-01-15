using CVMSCore.BAL.Models.Payroll;
using CVMSCore.BAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVMSCore.BAL.Service
{
    public class PayrollService
    {
        AdminLoginRepo _repo = new AdminLoginRepo();
       
//-----------------------------------------SIGN UP-----------------------------------//


        //public int AdminSignupSer(AdminSignupModel obj)
        //{
        //    return _repo.AdminSignupRepository(obj);
        //}

//------------------------------------------LOG IN--------------------------------------//
        public int AdminloginSer(LoginViewModel obj)
        {
            return _repo.AdminLoginRepository(obj);
        }

        //---------------------------------for save allowance--------------------------------//

        public int PostAllowanceSer(AllowanceModel Obj)
        {
            int num = 102;
            try
            {
                return _repo.PostAllowanceRepo(Obj);


            }
            catch
            {

            }
            return num;
        }
        //-----------------------------bind allowance name----------------------------------//
        public List<BindingAllowance> GetAllowanceNameSer()
        {
            List<BindingAllowance> list = new List<BindingAllowance>();
            list = _repo.getAllowancenameRepo();

            return list;
        }

        
        //------------------------auto populate for allowance------------------------------//
        public List<AllowanceModel> GetAllowanceAmountSer(int AllowanceId)
        {
            List<AllowanceModel> amount = new List<AllowanceModel>();
            amount = _repo.getAllowancenamountRepo(AllowanceId);
            return amount;
        }
        //-----------------------------for save  deduction-----------------------------------//
        public int PostDeductionSer(DeductionModel Obj)
        {
            int num = 102;
            try
            {
                return _repo.PostDeductionRepo(Obj);


            }
            catch
            {

            }
            return num;
        }
        //--------------------------------bind deduction------------------------------------//
        public List<BindDeductionModel> GetDeductionNameSer()
        {
            List<BindDeductionModel> deduction = new List<BindDeductionModel>();
            deduction = _repo.getDeductionenameRepo();

            return deduction;
        }
        //----------------------------auto populate for deduction-----------------------------//
        public List<DeductionModel> GetDeductionAmountSer(int DeductionId)
        {
            List<DeductionModel> deductamount = new List<DeductionModel>();
            deductamount = _repo.getdeductnamountRepo(DeductionId);
            return deductamount;
        }

       

        //----------------------------for post employee details----------------------------------

        public int PostEmployeeDetailSer(EmployeeDetailModel Obj)
        {
            int num = 102;
            try
            {
                return _repo.PostEmployeeDetailRepo(Obj);
                    

            }
            catch
            {

            }
            return num;
        }

        //----------------------------get data for employee detail summary--------------------------

        public List<EmployeeDetailModel> GetEmpDetailSummarySer()
        {
            List<EmployeeDetailModel> getemp = new List<EmployeeDetailModel>();
            getemp = _repo.GetEmpDetailSummaryRepo();
            return getemp;
        }

        //----------------------------get data for leave detail summary--------------------------

        public List<EmployeeLeaveModel> GetLeaveDetailSer()
        {
            List<EmployeeLeaveModel> getleavedtl = new List<EmployeeLeaveModel>();
            getleavedtl = _repo.GetLeaveDetailRepo();
            return getleavedtl;
        }
        //------------------------------Check leave-----------------------------------//

        public int checkLeaveSer(int id)
        {
            try
            {
                return _repo.checkLeaveRepo(id);
            }
            catch (Exception ex)
            {
                //Handle exceptions and log them
                throw ex;
            }
        }


        //-----------------------------------Employee part-------------------------------------------------//

        public int EmployeeloginSer(EmployeeLoginViewModel obj)
        {
            return _repo.EmployeeLoginRepository(obj);
        }

        //-----------------------------------post attendancedetail--------------------------------------
        public int PostAttendanceSer(EmployeeAttendanceModel Obj,string filepath1)
        {
            int num = 102;
            try
            {
                return _repo.PostAttendanceRepo(Obj, filepath1);


            }
            catch
            {

            }
            return num;
        }

        //------------------------------------for salary slip-----------------------------------------------//
        public EmployeeDetailModel getdatasalaryslipService(int id)
        {
            try
            {
                return _repo.getdatasalaryslipRepo(id);
            }
            catch (Exception ex)
            {
                // Handle exceptions and log them
                throw ex;
            }
        }

        //-----------------------------------------------JSON service Method---------------------------------------------------------------------------//

        public List<EmployeeDetailModel> getdatasalaryslipServiceList(int id)
        {
            List<EmployeeDetailModel> salary = new List<EmployeeDetailModel>();

            salary = _repo.getdatasalaryslipRepoList(id);
            return salary;

        }

        //----------------------------------save Employee Leave page--------------------------//
        public int PostEmpLeaveDetailSer(EmployeeLeaveModel Obj)
        {
            int num = 102;
            try
            {
                return _repo.PostEmpLeaveDetailRepo(Obj);


            }
            catch
            {

            }
            return num;
        }


        //------------------------------------Edit Employee Detail-----------------------------------------------//
        public EmployeeDetailModel editEmpDetailSer(int id)
        {
            try
            {
                return _repo.editEmpDetailRepo(id);
            }
            catch (Exception ex)
            {
                // Handle exceptions and log them
                throw ex;
            }
        }

        //--------------------------------------------JSON service Method---------------------------------------------------------------------------//

        public List<EmployeeDetailModel> editEmpDetailServiceList(int id)
        {
            List<EmployeeDetailModel> emp = new List<EmployeeDetailModel>();

            emp = _repo.editEmpDetailRepoList(id);
            return emp;

        }
        //-------------------------------------------Delete Employee Details-----------------------------------//

        public int DeleteEmpDetailSer(int id)
        {
            try
            {
                return _repo.DeleteEmpDetailRepo(id);
            }
            catch (Exception ex)
            {
                //Handle exceptions and log them
                throw ex;
            }
        }

        //-----------------------------------Update Employee  detail service-------------------

        public int UpdateEmpdetailSer(EmployeeDetailModel obj, int id)
        {
            try
            {
                return _repo.UpdateEmpdetailRepo(obj, id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //----------------------------get data for employee attendance detail summary--------------------------

        public List<EmployeeAttendanceModel> GetEmpAttendanceDetailSummarySer()
        {
            List<EmployeeAttendanceModel> getattendance = new List<EmployeeAttendanceModel>();
            getattendance = _repo.GetEmpAttendanceDetailSummaryRepo();
            return getattendance;
        }

        //----------------------------get data for Salary detail summary--------------------------

        public List<EmployeeDetailModel> GetSalaryDetailSummarySer()
        {
            List<EmployeeDetailModel> getsalary = new List<EmployeeDetailModel>();
            getsalary = _repo.GetSalaryDetailSummaryRepo();
            return getsalary;
        }
        //-------------------------------------log in---------------------------------------------
        public UserLogin AdminLogSer(string UserName, string Password)
        {
            return _repo.AdminLoginpageRepo(UserName, Password);
        }

        //------------------------------------Edit Employee Attendance Detail-----------------------------------------------//
        public EmployeeAttendanceModel editEmpAttendanceSer(int attendanceId)
        {
            try
            {
                return _repo.editEmpAttendanceRepo(attendanceId);
            }
            catch (Exception ex)
            {
                // Handle exceptions and log them
                throw ex;
            }
        }

        //--------------------------------------------JSON service Method---------------------------------------------------------------------------//

        public List<EmployeeAttendanceModel> editEmpAttendanceServiceList(int attendanceId)
        {
            List<EmployeeAttendanceModel> attendance = new List<EmployeeAttendanceModel>();

            attendance = _repo.editEmpAttendanceRepoList(attendanceId);
            return attendance;

        }

        //-------------------------------------------Delete attendance Details-----------------------------------//

        public int DeleteAttendanceDetailSer(int attendanceId)
        {
            try
            {
                return _repo.DeleteAttendanceDetailRepo(attendanceId);
            }
            catch (Exception ex)
            {
                //Handle exceptions and log them
                throw ex;
            }
        }

        
    }
}
