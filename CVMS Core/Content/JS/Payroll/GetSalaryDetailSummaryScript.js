$(document).ready(function () {

    alert('!!!!Wellcome to Salary Detail Summary Page!!!!');
    getsalarydetail();
});

function getsalarydetail() {
    debugger
    $.ajax({
        type: 'GET',
        url: "/Payroll/GetSalarydetailSummary",
        data: {},
        dataType: 'json',
        context: document.body,
        success: function (data) {
            //debugger
            var row = "";
            var rowcount = 1;
            //console.log(employees);
            $.each(data.getSalarydetail, function (item, value) {
                debugger
                row += "<tr>";
                row += "<td>" + rowcount + "</td>";
                row += "<td>" + value.employeeName + "</td>";
                row += "<td>" + value.employeeId + "</td>";
                row += "<td>" + value.basicSalary + "</td>";
                row += "<td>" + value.allowanceType + "</td>";
                row += "<td>" + value.allowanceAmount + "</td>";
                row += "<td>" + value.deductionType + "</td>";
                row += "<td>" + value.deductionAmount + "</td>";
                row += "<td>" + value.totalSalary + "</td>";
                row += "<td>" + value.month + "</td>";
                row += "<td>" + value.absentDays + "</td>";
                row += "<td>" + value.payableDays + "</td>";

                row += "<td>" +
                    "<button type='button' class='btn btn-sm btn-primary'data-id=''onclick='viewSalarySlip(" + value.id + ",event)' ><i class='fa fa-eye' aria-hidden='true'></i></button>" +
                    
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

function viewSalarySlip(id) {
    debugger
    window.location.href = '../Payroll/SalarySlip?id=' + id;
}
