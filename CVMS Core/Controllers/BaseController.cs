using CVMSCore.BAL.Models.Master;
using CVMSCore.BAL.Models.Payroll;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Reflection;

namespace CVMS_Core.Controllers
{
    public class BaseController : Controller
    {
        public IActionResult Index()
        {
            return View();


        }

        public UserLogin GetUserDetail()
        {
            UserLogin vMUserDetail = null;
            List<UserDetail> userDetailsList = new List<UserDetail>();
            var value = HttpContext.Session.GetString("LoggedUserInfo");
            if (value != null)
            {
                if (!string.IsNullOrEmpty(value))
                {
                    vMUserDetail = new UserLogin();
                    vMUserDetail = JsonConvert.DeserializeObject<UserLogin>(value);

                }
            }

            return vMUserDetail;
        }

        public object GetUserDetail(string ParamName)
        {
            object returnValue = string.Empty;
            var value = HttpContext.Session.GetString("LoggedUserInfo");
            if (value != null)
            {
                if (!string.IsNullOrEmpty(value))
                {
                    UserDetail vMUserDetail = new UserDetail();
                    vMUserDetail = JsonConvert.DeserializeObject<UserDetail>(value);
                    Type myType = vMUserDetail.GetType();
                    IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());
                    // var sss= propsx.GetType.)

                    foreach (PropertyInfo prop in props)
                    {
                        if (prop.Name.ToLower() == ParamName.ToLower())
                            returnValue = prop.GetValue(vMUserDetail, null);
                    }
                }
            }
            return returnValue;
        }
    }
}
