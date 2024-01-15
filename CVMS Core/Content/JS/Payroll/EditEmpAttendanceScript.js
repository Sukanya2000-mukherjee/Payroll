$(document).ready(function () {

    alert('!!!!Wellcome to Attendance Edit Page!!!!');
    //calculateDays();
    //getemployeeattendancedetail();

    var params = new window.URLSearchParams(window.location.search);
    GetAttendanceDetail(params.get('attendanceId'));
});

function GetAttendanceDetail(attendanceId) {
    debugger
    if (attendanceId > 0) {
        $.ajax({
            type: "GET",
            url: "../Payroll/EditEmpAttendanceDetail?attendanceId=" + attendanceId,
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                debugger

                $("#employeeName").val(data.obj.employeeName);
                $("#employeeId").val(data.obj.employeeId);
                $("#monthselector").val(data.obj.month);
                $("#totalDays").val(data.obj.totalDays);
                $("#workingDays").val(data.obj.workingDays);
                $("#presentDays").val(data.obj.presentDays);
                $("#leaveDays").val(data.obj.leaveDays);
                $("#holidays").val(data.obj.holidays);
                $("#weeklyOffDays").val(data.obj.weeklyOffDays);
                $("#earlyGoingDays").val(data.obj.earlyGoingDays);
                $("#lateComingDays").val(data.obj.lateComingDays);
                $("#absentDays").val(data.obj.absentDays);
                $("#payableDays").val(data.obj.payableDays);
                $("#file-path").text(data.obj.filepath1);
                
                //$("#hiddenid").val(data.obj.attendanceId);



            },
            error: function (xhr) {


                alert('Some error occured.');
            }
        });
    }
    //else {
    //    //alert('Some error occured. Please try again.');
    //}
};



 

