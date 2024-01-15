$(document).ready(function () {

    alert('!!!!Wellcome to Leave Request Summary Page!!!!');
    getleaverequests();
});

function getleaverequests() {
    debugger
    $.ajax({
        type: 'GET',
        url: "/Payroll/GetLeavedetail",
        data: {},
        dataType: 'json',
        context: document.body,
        success: function (data) {
            //debugger
            var row = "";
            var rowcount = 1;
            //console.log(employees);
            $.each(data.getleave, function (item, value) {
                debugger
                row += "<tr>";
                row += "<td>" + rowcount + "</td>";
                row += "<td>" + value.employeeName + "</td>";
                row += "<td>" + value.employeeId + "</td>";
                row += "<td>" + value.leaveType + "</td>";
                row += "<td>" + value.leaveDuration + "</td>";
                row += "<td>" + value.startdate + "</td>";
                row += "<td>" + value.enddate + "</td>";
                row += "<td>" + value.reason + "</td>";
               
                row += "<td>" +
                    "<button type='button' class='btn btn-sm btn-success' data-id=''onclick='CheckLeave(" + value.id + ",event)'><i aria-hidden='true'>Check</i></button>" +
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
//-------------------------------------------------- Check Leave-----------------------------------------//

function CheckLeave(control, e) {
    debugger
    // ClearSubmitForm()
    e.preventDefault();
    //Id = mid;

    var Id = control;
    debugger
    $.ajax({

        type: "POST",
        url: "../Payroll/checkleave",
        data: { id: Id },
        dataType: "JSON",
        context: document.body,
        success: function (data) {
            debugger
            alert("data checked");
            window.location.href = '../Payroll/LeaveDetailSummary'
            //window.location.reload();


        },
        error: function (xhr) {

            debugger;
            alert('Some error occured.');
        }
    });

}

