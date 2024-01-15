$(document).ready(function () {

    alert('!!!!Wellcome to Employee Leave Request Page!!!!');
    //getemployeedetail();
    var StartDateInput = $('#leaveStartDate');
    var EndDateInput = $('#leaveEndDate');
    StartDateInput.on('change', function () {
        var startDate = new Date(StartDateInput.val());
        var endDateInput = EndDateInput.get(0);

        if (startDate && endDateInput) {
            var endDate = new Date(endDateInput.value);
            if (endDate < startDate) {

                EndDateInput.val('');
            }
            endDateInput.min = StartDateInput.val();
        }
    });
});
//-------------------------------------------post--------------------------------------
$("#btnsave").click(function (event) {

    event.preventDefault();
    var isValid = true;
    function isValidName(input) {
        return /^[A-Z][a-z]* [A-Z][a-z]*$/.test(input);
    }
    var employeename = $("#employeeName").val();
    var employeeid = $("#employeeId").val();
    var leaveType = $("#leaveType").val();
    var radio = $('input[name="leaveDuration"]:checked').val();
    var startdate = $("#leaveStartDate").val();
    var enddate = $("#leaveEndDate").val();
    var reason = $("#reason").val();

    debugger
    if (!isValidName(employeename)) {
        isValid = false;
        $('#errorempname').text('Please enter  valid name').addClass('text-danger');
        $('#employeeName').addClass('border-danger');
    }
    else {
        $('#employeeName').removeClass('border-danger');
        $('#errorempname').text('').removeClass('text-danger');
    }

    if (employeeid == '') {
        isValid = false;
        $('#errorempid').text('Please enter Employee  ID').addClass('text-danger');
        $('#employeeId').addClass('border-danger');
    }
    else {
        $('#employeeId').removeClass('border-danger');
        $('#errorempid').text('').removeClass('text-danger');
    }
    if (leaveType == null) {
        isValid = false;
        $('#errorleavetype').text('Please enter  a type').addClass('text-danger');
        $('#leaveType').addClass('border-danger');
    }
    else {
        $('#leaveType').removeClass('border-danger');
        $('#errorleavetype').text('').removeClass('text-danger');
    }
    var radio = null;
    if ($('input[name=leaveDuration]:checked').length <= 0) {
        $('#leavedurationselector').css('outline', '1px solid red');
        $('#errorleave').text('Please enter  a duration').addClass('text-danger');

    }
    else {
        $('#leavedurationselector').css('outline', '');
        radio = $('input[type=radio]:checked').val();
        $('#errorleave').text('').removeClass('text-danger');
        // radio = $('input[type=radio]:checked');
    }
    //if (startdate == '') {
    //    isValid = false;
    //    $('#leaveStartDate').addClass('border-danger');
    //}
    //else {
    //    $('#leaveStartDate').removeClass('border-danger');
    //}

    //if (enddate == '') {
    //    isValid = false;
    //    $('#leaveEndDate').addClass('border-danger');

    //}
    //else {
    //    $('#leaveEndDate').removeClass('border-danger');
    //}

    if (startdate == '') {
        $('#leaveStartDate').addClass('border-danger');
        $('#errorstartdays').text('Please enter  Start date').addClass('text-danger');
        isValid = false;

    }
    else {
        $('#leaveStartDate').removeClass('border-danger');
        $('#errorstartdays').text('').removeClass('text-danger');
    }

    if (enddate == '') {
        $('#leaveEndDate').addClass('border-danger');
        $('#errorenddate').text('Please enter  End date').addClass('text-danger');
        isValid = false;

    }
    else if (startdate > enddate) {
        isValid = false;
       
        $('#leaveEndDate').addClass('border-danger');
        $('#errorenddate').text('Please enter  valid End date').addClass('text-danger');

    }

    else {
        $('#leaveEndDate').removeClass('border-danger');
        $('#errorenddate').text('').removeClass('text-danger');
    }

    if (reason == '') {
        isValid = false;
        $('#reason').addClass('border-danger');
        $('#errorreason').text('Please enter  reason').addClass('text-danger');
    }
    else {
        $('#reason').removeClass('border-danger');
        $('#errorreason').text('').removeClass('text-danger');
    }
    if (!isValid) {
        alert('form is not valid.');
        return isValid;

    }


    else {

        debugger
        var formData = new FormData();
        formData.append('EmployeeName', employeename);
        formData.append('EmployeeId', employeeid);
        formData.append('LeaveType', leaveType);
        formData.append('LeaveDuration', radio);
        formData.append('Startdate', startdate);
        formData.append('Enddate', enddate);
        formData.append('Reason', reason);



        debugger
        $.ajax({
            type: "POST",
            url: "../Payroll/SaveEmpLeaveDetail",
            data: formData,
            contentType: false,
            processData: false,
            context: document.body,

            success: function (data) {
                debugger
                alert('Data has been stored in the database');
                //getemployee();
                window.location.reload();

            }



        });
    }

});
