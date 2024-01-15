$(document).ready(function () {

    alert('!!!!Wellcome to Attendance Summary Page!!!!');
    
    getemployeeattendancedetail();
});

function getemployeeattendancedetail() {
    debugger
    $.ajax({
        type: 'GET',
        url: "/Payroll/GetEmpAttendancedetailSummary",
        data: {},
        dataType: 'json',
        context: document.body,
        success: function (data) {
            //debugger
            var row = "";
            var rowcount = 1;
            //console.log(employees);
            $.each(data.getempattendance, function (item, value) {
                debugger
                row += "<tr>";
                row += "<td>" + rowcount + "</td>";
                row += "<td>" + value.employeeName + "</td>";
                row += "<td>" + value.employeeId + "</td>";
                row += "<td>" + value.month + "</td>";
                row += "<td>" + value.workingDays + "</td>";
                row += "<td>" + value.presentDays + "</td>";
                row += "<td>" + value.leaveDays + "</td>";
                row += "<td>" + value.absentDays + "</td>";
                row += "<td>" + value.payableDays + "</td>";
                row += "<td>" + value.filepath1 + "</td>";

                row += "<td>" +
                    " <button type='button' class='btn btn-sm btn-primary' data-id=''onclick='editattendance(" + value.attendanceId + ",event)'><i class='fa fa-eye' aria-hidden='true'></i></button>" +
                    "<button type='button' class='btn btn-sm btn-danger' data-id=''onclick='DeleteAttendanceDetail(" + value.attendanceId + ",event)'><i class='fa fa-trash' aria-hidden='true'></i></button>" +

                    "</td>";
                row += "</tr>";
                // $("#hiddenId").val(value.Id)
                rowcount += 1;
            });
            $("#mtable").append(row);
            //mid = $("#hiddenId").val();
        },
        error: function (error) {

            // Handle errors here
            alert("Not Found");
        }
    });
}
function editattendance(attendanceId) {
    debugger
    window.location.href = '../Payroll/EditEmpAttendance?attendanceId=' + attendanceId;
}

//------------------------------------------------for searching-----------------------------------------------//

$('#search').on('keyup', function () {
    var searchTerm = $(this).val().toLowerCase();
    $('#usertbl tbody tr').each(function () {
        var lineStr = $(this).text().toLowerCase();
        if (lineStr.indexOf(searchTerm) === -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
});


function DeleteAttendanceDetail(control, e) {
    debugger
    // ClearSubmitForm()
    e.preventDefault();
    //Id = mid;

    var AttendanceId = control;
    debugger
    $.ajax({

        type: "POST",
        url: "../Payroll/DeleteAttendanceDetail",
        data: { attendanceId: AttendanceId },
        dataType: "JSON",
        context: document.body,
        success: function (data) {
            debugger
            alert("data deleted");
            window.location.href = '../Payroll/EmployeeAttendanceSummary'
            //window.location.reload();


        },
        error: function (xhr) {

            debugger;
            alert('Some error occured.');
        }
    });

}