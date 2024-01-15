$(document).ready(function () {

    alert('!!Welcome To My Deduction Master Page!!');

});

$("#btnsave").click(function (event) {

    event.preventDefault();
    var isValid = true;
    var deductionName = $("#deductionnameselector").val();
    var deductionAmount = $("#deductionamountselector").val();
    if (deductionName == '') {
        isValid = false;
        $('#deductionnameselector').addClass('border-danger');
    }
    else {
        $('#deductionnameselector').removeClass('border-danger');
    }

    if (deductionAmount == '') {
        isValid = false;
        $('#deductionamountselector').addClass('border-danger');
    }
    else {
        $('#deductionamountselector').removeClass('border-danger');
    }
    if (!isValid) {
        alert('form is not valid.');
        return isValid;

    }


    else {

        debugger
        var formData = new FormData();
        formData.append('DeductionName', deductionName);
        formData.append('DeductionAmount', deductionAmount);



        debugger
        $.ajax({
            type: "POST",
            url: "../Payroll/SaveDeduction",
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