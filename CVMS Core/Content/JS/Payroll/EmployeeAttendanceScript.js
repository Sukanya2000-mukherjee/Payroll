$(document).ready(function () {

    alert('!!!!Wellcome to Attendance Page!!!!');
    calculateDays();

    $('#editcontact').on('keyup', function () {
        var value = $(this).val();
        var digitArray = value.match(/[0-9]/g);

        if (digitArray && digitArray.length <= 10) {
            var validValue = digitArray.join('').substr(0, 10);
            $(this).val(validValue);
        } else {
            $(this).val('');
        }
    });


    
        



});
function calculateDays() {
    debugger
    
    var workingdays = parseInt($("#workingDays").val()) || 0;
    //var totalDays = parseInt($("#totalDays").val()) || 0;
    var leaveDays = parseInt($("#leaveDays").val()) || 0;
    var holidays = parseInt($("#holidays").val()) || 0;
    var weeklyOffDays = parseInt($("#weeklyOffDays").val()) || 0;
    var earlyGoingDays = parseInt($("#earlyGoingDays").val()) || 0;
    var lateComingDays = parseInt($("#lateComingDays").val()) || 0;
    //var attachment = $("#attachment").val();

    
    var additionalAbsentDays = lateComingDays > 3 ? 1 : 0;

    var absentDays = leaveDays + earlyGoingDays +additionalAbsentDays;

    var presentdays = workingdays - absentDays;
    
    var payableDays = presentdays - (holidays + weeklyOffDays);

    

    debugger
    $("#absentDays").val(absentDays);
    $("#payableDays").val(payableDays);
    $("#presentDays").val(presentdays);
    //if (leaveDays > 3 && !attachment) {
    //    alert("You need to upload a document for leave days exceeding 3.");
        
    //}
    $('#totalDays, #leaveDays, #holidays,#weeklyOffDays,#earlyGoingDays,#lateComingDays').on('input', calculateDays);
}

$("#btn-submit").click(function (event) {

    event.preventDefault();
    var isValid = true;

    function isValidInput(input) {
        return /^[A-Z][a-z]*$/.test(input);
    }
    function isValidName(input) {
        return /^[A-Z][a-z]* [A-Z][a-z]*$/.test(input);
    }

    var employeename = $("#employeeName").val();
    var employeeid = $("#employeeId").val();
    //var selectedMonth = $('#monthselector').val();
    var month = $("#monthselector").val();
    var totaldays = $("#totalDays").val();
    var workingdays = $("#workingDays").val();
    var presentdays = $("#presentDays").val();
    var leavedays = $("#leaveDays").val();
    var holidays = $("#holidays").val();
    var weeklyoffdays = $("#weeklyOffDays").val();
    var earlygoingdays = $("#earlyGoingDays").val();
    var latecomingdays = $("#lateComingDays").val();
    var absentdays = $("#absentDays").val();
    var payabledays = $("#payableDays").val();
    var fileInput1 = $("#attachment")[0].files[0];
    //var daysInMonth;
    //switch (selectedMonth) {
    //    case 'January':
    //    case 'March':
    //    case 'May':
    //    case 'July':
    //    case 'August':
    //    case 'October':
    //    case 'December':
    //        daysInMonth = 31;
    //        break;
    //    case 'April':
    //    case 'June':
    //    case 'September':
    //    case 'November':
    //        daysInMonth = 30;
    //        break;
    //    case 'February':
    //        // For simplicity, considering February always has 28 days
    //        daysInMonth = 28;
    //        break;
    //    default:
    //        daysInMonth = 0; // Set to an invalid value for other months
    //}
    debugger
    if (!isValidName(employeename)) {
        isValid = false;
        $('#errorMessageName').text('Please enter  valid name').addClass('text-danger');
        $('#employeeName').addClass('border-danger');
    }
    else {
        $('#employeeName').removeClass('border-danger');
        $('#errorMessageName').text('').removeClass('text-danger');
    }

    if (employeeid == '') {
        isValid = false;
        $('#errorMessageId').text('Please enter valid ID').addClass('text-danger');
        $('#employeeId').addClass('border-danger');
    }
    else {
        $('#employeeId').removeClass('border-danger');
        $('#errorMessageId').text('').removeClass('text-danger');
    }

    if (month == null) {
        isValid = false;
        $('#errormonth').text('Please Select month').addClass('text-danger');
        $('#monthselector').addClass('border-danger');
    }
    else {
        $('#monthselector').removeClass('border-danger');
        $('#errormonth').text('').removeClass('text-danger');
    }
    if (totaldays === '' || totaldays > 99 || totaldays > 31) {
        isValid = false;
        $('#errortotaldays').text('Please enter total days').addClass('text-danger');
        $('#totalDays').addClass('border-danger');
    } else {
        $('#totalDays').removeClass('border-danger');
        $('#errortotaldays').text('').removeClass('text-danger');
    }
    //if (totalDays === '' || parseInt(totalDays) > daysInMonth || totalDays.length > 2) {
    //    isValid = false;
    //    $('#totalDays').addClass('border-danger');
    //} else {
    //    $('#totalDays').removeClass('border-danger');
    //    // If valid, you can proceed with form submission or other actions
    //}
    if (workingdays === '' || workingdays >= totaldays) {
        isValid = false;
        $('#errorworkingdays').text('Please enter workingdays').addClass('text-danger');
        $('#workingDays').addClass('border-danger');
    } else {
        $('#workingDays').removeClass('border-danger');
        $('#errorworkingdays').text('').removeClass('text-danger');
    }

    //if (presentdays == '') {
    //    isValid = false;
    //    $('#presentDays').addClass('border-danger');
    //}
    //else {
    //    $('#presentDays').removeClass('border-danger');
    //}

    if (leavedays == '') {
        isValid = false;
        $('#errorleavedays').text('Please enter leave days').addClass('text-danger');
        $('#leaveDays').addClass('border-danger');

    }
    else {
        $('#leaveDays').removeClass('border-danger');
        $('#errorleavedays').text('').removeClass('text-danger');
    }

    if (holidays == '' || holidays.length > 1) {
        isValid = false;
        $('#errorholidays').text('Please enter holidays').addClass('text-danger');
        $('#holidays').addClass('border-danger');
    }
    else {
        $('#holidays').removeClass('border-danger');
        $('#errorholidays').text('').removeClass('text-danger');
    }
    if (weeklyoffdays == '' || weeklyoffdays.length > 1) {
        isValid = false;
        $('#errorweeklydays').text('Please enter weekly off days').addClass('text-danger');
        $('#weeklyOffDays').addClass('border-danger');
    }
    else {
        $('#weeklyOffDays').removeClass('border-danger');
        $('#errorweeklydays').text('').removeClass('text-danger');
    }
    if (earlygoingdays == '' || earlygoingdays.length > 1) {
        isValid = false;
        $('#errorearlydays').text('Please enter early going days').addClass('text-danger');
        $('#earlyGoingDays').addClass('border-danger');
    }
    else {
        $('#earlyGoingDays').removeClass('border-danger');
        $('#errorearlydays').text('').removeClass('text-danger');
    }

    if (latecomingdays == '' || latecomingdays.length > 1) {
        isValid = false;
        $('#errorlatedays').text('Please enter late coming days').addClass('text-danger');
        $('#lateComingDays').addClass('border-danger');
    }
    else {
        $('#lateComingDays').removeClass('border-danger');
        $('#errorlatedays').text('').removeClass('text-danger');
    }
    //if (absentdays == '') {
    //    isValid = false;
    //    $('#absentDays').addClass('border-danger');
    //}
    //else {
    //    $('#absentDays').removeClass('border-danger');
    //}
    //if (payabledays == '') {
    //    isValid = false;
    //    $('#payableDays').addClass('border-danger');

    //}
    //else {
    //    $('#payableDays').removeClass('border-danger');
    //}

    if (fileInput1 == undefined) {
        isValid = false;
        $('#attachment').addClass('border-danger');

    }
    else {
        $('#attachment').removeClass('border-danger');
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
        formData.append('Month', month);
        formData.append('TotalDays', totaldays);
        formData.append('WorkingDays', workingdays);
        formData.append('PresentDays', presentdays);
        formData.append('LeaveDays', leavedays);
        formData.append('Holidays', holidays);
        formData.append('WeeklyOffDays', weeklyoffdays);
        formData.append('EarlyGoingDays', earlygoingdays);
        formData.append('LateComingDays', latecomingdays);
        formData.append('AbsentDays', absentdays);
        formData.append('PayableDays', payabledays);
        if (fileInput1) {
            formData.append('filepath1', fileInput1);

            debugger
            $.ajax({
                type: "POST",
                url: "../Payroll/SaveAttendanceDetail",
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

        else {
            $("#message").html("<div class='alert alert-danger'>Please select a file to upload.</div>");
        }
    }
});
