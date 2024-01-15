$(document).ready(function () {

    alert('!!Welcome To My Allowance Master Page!!');
    bindAllowanceName();
  
});

$("#btnsave").click(function (event) {

    event.preventDefault();
    var isValid = true;
   

    var allowanceName = $("#allowancenameSelector").val();
    var allowanceAmount = $("#allowanceamountSelector").val();
    
    if (allowanceName == '') {
        isValid = false;
        $('#allowancenameSelector').addClass('border-danger');
    }
    else {
        $('#allowancenameSelector').removeClass('border-danger');
    }

    if (allowanceAmount == '') {
        isValid = false;
        $('#allowanceamountSelector').addClass('border-danger');
    }
    else {
        $('#allowanceamountSelector').removeClass('border-danger');
    }
    if (!isValid) {
        alert('form is not valid.');
        return isValid;

    }


    else {
        debugger
        var formData = new FormData();

        formData.append('AllowanceName', allowanceName);
        formData.append('AllowanceAmount', allowanceAmount);



        debugger
        $.ajax({
            type: "POST",
            url: "../Payroll/SaveAllowance",
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

//------------------------------------------------------bind allowance-----------------------------//
function bindAllowanceName() {
    debugger
    $.ajax({
        type: 'GET',
        url: "../Payroll/getallowanceName",
        data: {},
        dataType: "JSON",
        context: document.body,
        success: function (data) {
            debugger
            //var row = "";
            //var rowcount = 1;
            $.each(data.ballowancen, function (item, value) {
                debugger
                $("#allowancename").append($("<option></option>").val(value.allowanceId).html(value.allowanceName));
            });

        },

        error: function (error) {

            alert("Not Found");
        }
    });
};


//-------------------------------------------------Auto Populate for allowance-------------------------//
$("#allowancename").change(function () {
    debugger;

    var allowancen = $(this).val();
    var empidhidden = $("#allowancename option:selected").text(); // Fix: Use text() to get the selected option text

    $.ajax({
        url: '/Payroll/getallowanceAmount',
        type: 'GET',
        data: { AllowanceId: allowancen },
        success: function (data) {
            debugger;

            var allowanceAmount = data.autoamount[0].allowanceAmount;

            $("#allowanceamount").val(allowanceAmount);
        },
        error: function (error) {
            console.error("Error fetching allowance amount:", error);
        }
    });
});