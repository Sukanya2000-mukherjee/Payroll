using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CVMSCore.BAL.Models.Payroll;

namespace CVMSCore.BAL.Repository
{

    public class AdminLoginRepo
    {
        private SqlConnection _conn;  
        private DapperConnection dapper = new DapperConnection(ConnectionFile.Connection_ANTSDB);
        

        //public int AdminSignupRepository(AdminSignupModel obj)
        //{
        //    DynamicParameters dynamicParameters = new DynamicParameters();
        //    dynamicParameters.Add("@UserName", obj.Username);
        //    dynamicParameters.Add("@Password", obj.Password);
        //    dynamicParameters.Add("@ConfirmPassword", obj.ConfirmPassword);
        //    this._conn = this.dapper.GetConnection();
        //    DapperConnection.OpenConnection(this._conn);
        //    SqlConnection conn = this._conn;
        //    var result = conn.QueryFirstOrDefault<int>("Saf_AdminSignup", dynamicParameters, commandType: CommandType.StoredProcedure);
        //    DapperConnection.CloseConnection(this._conn);

        //    return result;

        //}

        public int AdminLoginRepository(LoginViewModel obj)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@UserName", obj.Username);
            dynamicParameters.Add("@Password", obj.Password);
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            var result = conn.QueryFirstOrDefault<int>("Saf_AdminLogin", dynamicParameters, commandType: CommandType.StoredProcedure);
            DapperConnection.CloseConnection(this._conn);

            return result;

        }

        public int PostAllowanceRepo(AllowanceModel allowancedtl)
        {
            int NUM = 0;
            try
            {
                DynamicParameters dynamicParameters1 = new DynamicParameters();
               

                dynamicParameters1.Add("AllowanceName", (object)allowancedtl.AllowanceName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AllowanceAmount", (object)allowancedtl.AllowanceAmount, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                

                this._conn = this.dapper.GetConnection();
                DapperConnection.OpenConnection(this._conn);
                SqlConnection conn = this._conn;
                DynamicParameters dynamicParameters2 = dynamicParameters1;
                CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
                int? nullable2 = new int?();
                CommandType? nullable3 = nullable1;
                string? str = SqlMapper.ExecuteScalar((IDbConnection)conn, "Saf_SaveAllowance", (object)dynamicParameters2, (IDbTransaction)null, nullable2, nullable3).ToString();
                DapperConnection.CloseConnection(this._conn);
                NUM = Convert.ToInt32(str);

            }
            catch (Exception ex)
            {


            }

            return NUM;

        }

        public List<BindingAllowance> getAllowancenameRepo()   
        {                                                                                      
            DynamicParameters dynamicParameters1 = new DynamicParameters();
            List<BindingAllowance> store = new List<BindingAllowance>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            DynamicParameters dynamicParameters2 = dynamicParameters1;
            CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
            
            CommandType? nullable3 = nullable1;
            store = _conn.Query<BindingAllowance>("SAF_BindAllowanceName", commandType: CommandType.StoredProcedure).ToList();
            DapperConnection.CloseConnection(this._conn);
           
            return store;
        }
       //--------------------------------auto populate for allowance---------------------------//
        public List<AllowanceModel> getAllowancenamountRepo(int AllowanceId)
        {
            List<AllowanceModel> obj = new List<AllowanceModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            DynamicParameters param = new DynamicParameters();
            param.Add("AllowanceId", AllowanceId);
            obj = conn.Query<AllowanceModel>("Saf_AutoPopulateAllowanceAmount", param, commandType: CommandType.StoredProcedure).ToList();
            DapperConnection.CloseConnection(this._conn);

            return obj;
        }
        public int PostDeductionRepo(DeductionModel deductiondtl)
        {
            int NUM = 0;
            try
            {
                DynamicParameters dynamicParameters1 = new DynamicParameters();
                dynamicParameters1.Add("DeductionName", (object)deductiondtl.DeductionName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DeductionAmount", (object)deductiondtl.DeductionAmount, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());


                
                this._conn = this.dapper.GetConnection();
                DapperConnection.OpenConnection(this._conn);
                SqlConnection conn = this._conn;
                DynamicParameters dynamicParameters2 = dynamicParameters1;
                CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
                int? nullable2 = new int?();
                CommandType? nullable3 = nullable1;
                string? str = SqlMapper.ExecuteScalar((IDbConnection)conn, "Saf_SaveDeduction", (object)dynamicParameters2, (IDbTransaction)null, nullable2, nullable3).ToString();
                DapperConnection.CloseConnection(this._conn);
                NUM = Convert.ToInt32(str);

            }
            catch (Exception ex)
            {


            }

            return NUM;
        }
        public List<BindDeductionModel> getDeductionenameRepo()   //list creating using the controller method GetData
        {                                                                                      //
            DynamicParameters dynamicParameters1 = new DynamicParameters();
            List<BindDeductionModel> store = new List<BindDeductionModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            DynamicParameters dynamicParameters2 = dynamicParameters1;
            CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
            // int? nullable2 = new int?();
            CommandType? nullable3 = nullable1;
            store = _conn.Query<BindDeductionModel>("SAF_BindDeduction", commandType: CommandType.StoredProcedure).ToList();
            DapperConnection.CloseConnection(this._conn);
            //int num = Convert.ToInt32(str);
            return store;
        }

        //-----------------------------------auto populate for deduction--------------------------//

        public List<DeductionModel> getdeductnamountRepo(int DeductionId)
        {
            List<DeductionModel> obj = new List<DeductionModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            DynamicParameters param = new DynamicParameters();
            param.Add("DeductionId", DeductionId);
            obj = conn.Query<DeductionModel>("Saf_AutoPopulateDeductionAmount", param, commandType: CommandType.StoredProcedure).ToList();
            DapperConnection.CloseConnection(this._conn);

            return obj;
        }
        

       
        //--------------------------------------post employee detail---------------------

        public int PostEmployeeDetailRepo(EmployeeDetailModel empdtl)
        {
            int NUM = 0;
            try
            {
                DynamicParameters dynamicParameters1 = new DynamicParameters();
                dynamicParameters1.Add("EmployeeName", (object)empdtl.EmployeeName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("EmployeeId", (object)empdtl.EmployeeId, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DateOfBirth", (object)empdtl.DateOfBirth, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Gender", (object)empdtl.Gender, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("ContactNo", (object)empdtl.ContactNo, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("PersonalEmail", (object)empdtl.PersonalEmail, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Address", (object)empdtl.Address, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Username", (object)empdtl.Username, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Password", (object)empdtl.Password, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Department", (object)empdtl.Department, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Designation", (object)empdtl.Designation, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("OfficialEmail", (object)empdtl.OfficialEmail, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DateOfJoining", (object)empdtl.DateOfJoining, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("BasicSalary", (object)empdtl.BasicSalary, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AllowanceName", (object)empdtl.AllowanceName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AllowanceAmount", (object)empdtl.AllowanceAmount, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DeductionName", (object)empdtl.DeductionName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DeductionAmount", (object)empdtl.DeductionAmount, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("TotalSalary", (object)empdtl.TotalSalary, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AccountHolderName", (object)empdtl.AccountHolderName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AccountNumber", (object)empdtl.AccountNumber, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("BankName", (object)empdtl.BankName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Branch", (object)empdtl.Branch, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());


                this._conn = this.dapper.GetConnection();
                DapperConnection.OpenConnection(this._conn);
                SqlConnection conn = this._conn;
                DynamicParameters dynamicParameters2 = dynamicParameters1;
                CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
                int? nullable2 = new int?();
                CommandType? nullable3 = nullable1;
                string? str = SqlMapper.ExecuteScalar((IDbConnection)conn, "SAF_PayrollPostEmployeeDetails", (object)dynamicParameters2, (IDbTransaction)null, nullable2, nullable3).ToString();
                DapperConnection.CloseConnection(this._conn);
                NUM = Convert.ToInt32(str);

            }
            catch (Exception ex)
            {


            }

            return NUM;
        }

        //---------------------------get data for employee detail---------------------------------

        public List<EmployeeDetailModel> GetEmpDetailSummaryRepo()
        {
            List<EmployeeDetailModel> obj = new List<EmployeeDetailModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            obj = conn.Query<EmployeeDetailModel>("SAF_GetEmpDetails", commandType: CommandType.StoredProcedure).ToList(); //emptblshow
            DapperConnection.CloseConnection(this._conn);
            return obj;
        }

        //---------------------------get data for Leave Request detail---------------------------------

        public List<EmployeeLeaveModel> GetLeaveDetailRepo()
        {
            List<EmployeeLeaveModel> obj = new List<EmployeeLeaveModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            obj = conn.Query<EmployeeLeaveModel>("SAF_GetLeaveDetail", commandType: CommandType.StoredProcedure).ToList(); //emptblshow
            DapperConnection.CloseConnection(this._conn);
            return obj;
        }
        //----------------------------------------Check LeaveDetail--------------------------------------//

        public int checkLeaveRepo(int id)
        {
            try
            {
                using (this._conn = dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);

                    
                    var parameters = new DynamicParameters();
                    parameters.Add("@Id", id);

                    var result = _conn.Execute("SAF_Checkleave", parameters, commandType: CommandType.StoredProcedure);

                    DapperConnection.CloseConnection(this._conn);
                    return result; 
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }


        //-----------------------------------Employee log in-----------------------------------


        public int EmployeeLoginRepository(EmployeeLoginViewModel obj)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@UserName", obj.Username);
            dynamicParameters.Add("@Password", obj.Password);
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            var result = conn.QueryFirstOrDefault<int>("Saf_EmployeeLogin", dynamicParameters, commandType: CommandType.StoredProcedure);
            DapperConnection.CloseConnection(this._conn);

            return result;

        }

        //save attendance
        public int PostAttendanceRepo(EmployeeAttendanceModel attendance,string filepath1)
        {
            int NUM = 0;
            try
            {
                
                DynamicParameters dynamicParameters1 = new DynamicParameters();
                
                dynamicParameters1.Add("EmployeeName", (object)attendance.EmployeeName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("EmployeeId", (object)attendance.EmployeeId, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Month", (object)attendance.Month, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("TotalDays", (object)attendance.TotalDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("WorkingDays", (object)attendance.WorkingDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("PresentDays", (object)attendance.PresentDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("LeaveDays", (object)attendance.LeaveDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Holidays", (object)attendance.Holidays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("WeeklyOffDays", (object)attendance.WeeklyOffDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("EarlyGoingDays", (object)attendance.EarlyGoingDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("LateComingDays", (object)attendance.LateComingDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AbsentDays", (object)attendance.AbsentDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("PayableDays", (object)attendance.PayableDays, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("filepath1", filepath1);


                
                this._conn = this.dapper.GetConnection();
                DapperConnection.OpenConnection(this._conn);
                SqlConnection conn = this._conn;
                DynamicParameters dynamicParameters2 = dynamicParameters1;
                CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
                int? nullable2 = new int?();
                CommandType? nullable3 = nullable1;
                string? str = SqlMapper.ExecuteScalar((IDbConnection)conn, "SAF_PostEmployeeAttendance", (object)dynamicParameters2, (IDbTransaction)null, nullable2, nullable3).ToString();
                DapperConnection.CloseConnection(this._conn);
                NUM = Convert.ToInt32(str);

            }
            catch (Exception ex)
            {


            }

            return NUM;
        }
        //-----------------------------------------get data for salary slip-----------------------------
        public EmployeeDetailModel getdatasalaryslipRepo(int id)
        {
            try
            {
                using (this._conn = dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);

                    
                    var parameters = new DynamicParameters();
                    parameters.Add("@Id", id);

                    var sitedtl = _conn.QueryFirstOrDefault<EmployeeDetailModel>("SAF_viewsalaryslip", parameters, commandType: CommandType.StoredProcedure);

                    DapperConnection.CloseConnection(this._conn);
                    return sitedtl;
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        //----------------------------------------------------- JSON Repository Method------------------------------------------------------------------------//
        public List<EmployeeDetailModel> getdatasalaryslipRepoList(int id)
        {
            List<EmployeeDetailModel> data = new List<EmployeeDetailModel>();
            using (this._conn = dapper.GetConnection())
            {
                DapperConnection.OpenConnection(this._conn);
                
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id);
                data = (List<EmployeeDetailModel>)_conn.Query<EmployeeDetailModel>("SAF_viewsalaryslip", parameters, commandType: CommandType.StoredProcedure).ToList();
                DapperConnection.CloseConnection(this._conn);
                return data;
            }




        }

        // ---------------------------------save leave detail--------------------------------
        public int PostEmpLeaveDetailRepo(EmployeeLeaveModel empleave)
        {
            int NUM = 0;
            try
            {
                DynamicParameters dynamicParameters1 = new DynamicParameters();
                dynamicParameters1.Add("EmployeeName", (object)empleave.EmployeeName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("EmployeeId", (object)empleave.EmployeeId, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("LeaveType", (object)empleave.LeaveType, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("LeaveDuration", (object)empleave.LeaveDuration, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Startdate", (object)empleave.Startdate, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Enddate", (object)empleave.Enddate, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Reason", (object)empleave.Reason, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
               

                

                this._conn = this.dapper.GetConnection();
                DapperConnection.OpenConnection(this._conn);
                SqlConnection conn = this._conn;
                DynamicParameters dynamicParameters2 = dynamicParameters1;
                CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
                int? nullable2 = new int?();
                CommandType? nullable3 = nullable1;
                string? str = SqlMapper.ExecuteScalar((IDbConnection)conn, "SAF_PostEmpLeave", (object)dynamicParameters2, (IDbTransaction)null, nullable2, nullable3).ToString();
                DapperConnection.CloseConnection(this._conn);
                NUM = Convert.ToInt32(str);

            }
            catch (Exception ex)
            {


            }

            return NUM;
        }

        //-----------------------------------------Edit for Employee Detail-----------------------------
        public EmployeeDetailModel editEmpDetailRepo(int id)
        {
            try
            {
                using (this._conn = dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);

                    
                    var parameters = new DynamicParameters();
                    parameters.Add("@Id", id);

                    var sitedtl = _conn.QueryFirstOrDefault<EmployeeDetailModel>("SAF_EditEmpDetail", parameters, commandType: CommandType.StoredProcedure);

                    DapperConnection.CloseConnection(this._conn);
                    return sitedtl;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions and log them
                throw ex;
            }
        }

        //----------------------------------------------JSON Repository Method------------------------------------------------------------------------//
        public List<EmployeeDetailModel> editEmpDetailRepoList(int id)
        {
            List<EmployeeDetailModel> data = new List<EmployeeDetailModel>();
            using (this._conn = dapper.GetConnection())
            {
                DapperConnection.OpenConnection(this._conn);
                //Implement for Dapper for Stored Procedure
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id);
                data = (List<EmployeeDetailModel>)_conn.Query<EmployeeDetailModel>("SAF_EditEmpDetail", parameters, commandType: CommandType.StoredProcedure).ToList();
                DapperConnection.CloseConnection(this._conn);
                return data;
            }




        }

        //--------------------------------------------Delete Employee Detail--------------------------------------//

        public int DeleteEmpDetailRepo(int id)
        {
            try
            {
                using (this._conn = dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);

                    
                    var parameters = new DynamicParameters();
                    parameters.Add("@Id", id);

                    var result = _conn.Execute("SAF_DeleteEmployeeDetail", parameters, commandType: CommandType.StoredProcedure);

                    DapperConnection.CloseConnection(this._conn);
                    return result;
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }


        //--------------------------------Update Employee Detail---------------------------
        public int UpdateEmpdetailRepo(EmployeeDetailModel empdtl, int id)
        {
           

            int num = 0;
            try
            {
                DynamicParameters dynamicParameters1 = new DynamicParameters();
                dynamicParameters1.Add("Id", (object)id, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("EmployeeName", (object)empdtl.EmployeeName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("EmployeeId", (object)empdtl.EmployeeId, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DateOfBirth", (object)empdtl.DateOfBirth, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Gender", (object)empdtl.Gender, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("ContactNo", (object)empdtl.ContactNo, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("PersonalEmail", (object)empdtl.PersonalEmail, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Address", (object)empdtl.Address, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Username", (object)empdtl.Username, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Password", (object)empdtl.Password, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Department", (object)empdtl.Department, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Designation", (object)empdtl.Designation, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("OfficialEmail", (object)empdtl.OfficialEmail, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DateOfJoining", (object)empdtl.DateOfJoining, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("BasicSalary", (object)empdtl.BasicSalary, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AllowanceName", (object)empdtl.AllowanceName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AllowanceAmount", (object)empdtl.AllowanceAmount, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DeductionName", (object)empdtl.DeductionName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("DeductionAmount", (object)empdtl.DeductionAmount, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("TotalSalary", (object)empdtl.TotalSalary, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AccountHolderName", (object)empdtl.AccountHolderName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("AccountNumber", (object)empdtl.AccountNumber, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("BankName", (object)empdtl.BankName, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());
                dynamicParameters1.Add("Branch", (object)empdtl.Branch, new DbType?(), new ParameterDirection?(), new int?(), new byte?(), new byte?());

                
                this._conn = this.dapper.GetConnection();
                DapperConnection.OpenConnection(this._conn);
                SqlConnection conn = this._conn;
                DynamicParameters dynamicParameters2 = dynamicParameters1;
                CommandType? nullable1 = new CommandType?(CommandType.StoredProcedure);
                int? nullable2 = new int?();
                CommandType? nullable3 = nullable1;
                string? str = SqlMapper.ExecuteScalar((IDbConnection)conn, "SAF_PayrollUpdateEmployeeDetails", (object)dynamicParameters2, (IDbTransaction)null, nullable2, nullable3).ToString();
                DapperConnection.CloseConnection(this._conn);
                num = Convert.ToInt32(str);

            }
            catch (Exception ex)
            {


            }
            return num;
        }
        //----------------------------get data for employee attendance detail-------------------
        public List<EmployeeAttendanceModel> GetEmpAttendanceDetailSummaryRepo()
        {
            List<EmployeeAttendanceModel> obj = new List<EmployeeAttendanceModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            obj = conn.Query<EmployeeAttendanceModel>("SAF_GetAttendanceDetail", commandType: CommandType.StoredProcedure).ToList(); //emptblshow
            DapperConnection.CloseConnection(this._conn);
            return obj;
        }
        //---------------------------get data for Salary detail---------------------------------

        public List<EmployeeDetailModel> GetSalaryDetailSummaryRepo()
        {
            List<EmployeeDetailModel> obj = new List<EmployeeDetailModel>();
            this._conn = this.dapper.GetConnection();
            DapperConnection.OpenConnection(this._conn);
            SqlConnection conn = this._conn;
            obj = conn.Query<EmployeeDetailModel>("SAF_GetSalaryDetails", commandType: CommandType.StoredProcedure).ToList(); //emptblshow
            DapperConnection.CloseConnection(this._conn);
            return obj;
        }

        //log in

        public UserLogin AdminLoginpageRepo(string UserName, string Password)
        {
            UserLogin userDetail = null;

            try
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@UserName", UserName);
                dynamicParameters.Add("@Password", Password);

                using (this._conn = this.dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);

                    userDetail = _conn.Query<UserLogin>("ValidateUserLogin", dynamicParameters, commandType: CommandType.StoredProcedure)
                                      .FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                // Handle the exception, log, or rethrow if needed
            }
            finally
            {
                DapperConnection.CloseConnection(this._conn);
            }

            return userDetail;
        }

        //-----------------------------------------Edit for Employee Attendance Detail-----------------------------
        public EmployeeAttendanceModel editEmpAttendanceRepo(int attendanceId)
        {
            try
            {
                using (this._conn = dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);


                    var parameters = new DynamicParameters();
                    parameters.Add("@AttendanceId", attendanceId);

                    var attendancedtl = _conn.QueryFirstOrDefault<EmployeeAttendanceModel>("SAF_EditEmpAttendanceDetail", parameters, commandType: CommandType.StoredProcedure);

                    DapperConnection.CloseConnection(this._conn);
                    return attendancedtl;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions and log them
                throw ex;
            }
        }

        //----------------------------------------------JSON Repository Method------------------------------------------------------------------------//
        public List<EmployeeAttendanceModel> editEmpAttendanceRepoList(int attendanceId)
        {
            List<EmployeeAttendanceModel> data = new List<EmployeeAttendanceModel>();
            using (this._conn = dapper.GetConnection())
            {
                DapperConnection.OpenConnection(this._conn);
                //Implement for Dapper for Stored Procedure
                var parameters = new DynamicParameters();
                parameters.Add("@AttendanceId", attendanceId);
                data = (List<EmployeeAttendanceModel>)_conn.Query<EmployeeAttendanceModel>("SAF_EditEmpAttendanceDetail", parameters, commandType: CommandType.StoredProcedure).ToList();
                DapperConnection.CloseConnection(this._conn);
                return data;
            }




        }

        //--------------------------------------------Delete Attendance Detail--------------------------------------//

        public int DeleteAttendanceDetailRepo(int attendanceId)
        {
            try
            {
                using (this._conn = dapper.GetConnection())
                {
                    DapperConnection.OpenConnection(this._conn);


                    var parameters = new DynamicParameters();
                    parameters.Add("@AttendanceId", attendanceId);

                    var result = _conn.Execute("SAF_DeleteAttendanceDetail", parameters, commandType: CommandType.StoredProcedure);

                    DapperConnection.CloseConnection(this._conn);
                    return result;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        

    }




}
