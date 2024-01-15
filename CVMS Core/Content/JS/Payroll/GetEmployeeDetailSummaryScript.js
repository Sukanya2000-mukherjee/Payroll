$(document).ready(function () {

    alert('!!!!Wellcome to Employee Detail Summary Page!!!!');
    getemployeedetail();
});

function getemployeedetail() {
    debugger
    $.ajax({
        type: 'GET',
        url: "/Payroll/GetEmpdetailSummary",
        data: {},
        dataType: 'json',
        context: document.body,
        success: function (data) {
            //debugger
            var row = "";
            var rowcount = 1;
            //console.log(employees);
            $.each(data.getempdetail, function (item, value) {
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
                    " <button type='button' class='btn btn-sm btn-success' data-id=''onclick='editempdetail(" + value.id + ",event)'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>" +
                    "<button type='button' class='btn btn-sm btn-danger' data-id=''onclick='DeleteEmpDetail(" + value.id + ",event)'><i class='fa fa-trash' aria-hidden='true'></i></button>" +
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



function editempdetail(id) {
    debugger
    window.location.href = '../Payroll/EditEmployeeDetail?id=' + id;
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

//-------------------------------------------------- Delete Employe Detail-----------------------------------------//

function DeleteEmpDetail(control, e) {
    debugger
    // ClearSubmitForm()
    e.preventDefault();
    //Id = mid;

    var Id = control;
    debugger
    $.ajax({

        type: "POST",
        url: "../Payroll/DeleteEmpDetail",
        data: { id: Id },
        dataType: "JSON",
        context: document.body,
        success: function (data) {
            debugger
            alert("data deleted");
            window.location.href = '../Payroll/EmployeeDetailSummary'
            //window.location.reload();


        },
        error: function (xhr) {

            debugger;
            alert('Some error occured.');
        }
    });

}
