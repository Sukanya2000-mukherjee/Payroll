$(document).ready(function () {

    alert('!!!!Wellcome to Employee Details Page!!!!');

    bindAllowanceName();
    bindDeductionName();
    calculateTotalSalary();

    $('#contact').on('keyup', function () {
        var value = $(this).val();
        var digitArray = value.match(/[0-9]/g);

        if (digitArray && digitArray.length <= 10) {
            var validValue = digitArray.join('').substr(0, 10);
            $(this).val(validValue);
        } else {
            $(this).val('');
        }
    });

    $('#accountNumberSelector').on('keyup', function () {
        var value = $(this).val();
        var digitArray = value.match(/[0-9]/g);

        if (digitArray && digitArray.length <= 18) {
            var validValue = digitArray.join('').substr(0, 18);
            $(this).val(validValue);
        } else {
            $(this).val('');
        }
    });

    var today = new Date().toISOString().split('T')[0];

    // Set the max attribute of the date input to today
    $('#dateOfJoiningSelector').attr('max', today);

    $('#dateOfJoiningSelector').change(function () {
        var selectedDate = $(this).val();
        var isValid = true;

        // Check if the selected date is in the future
        if (new Date(selectedDate) > new Date(today)) {
            isValid = false;
            $('#errordoj').text('Please select a date on or before today').addClass('text-danger');
            $(this).addClass('border-danger');
        } else {
            $(this).removeClass('border-danger');
            $('#errordoj').text('').removeClass('text-danger');
        }

        // Perform any additional actions based on the validation result
        if (isValid) {
            // Your additional actions if the date is valid
        }
    });

    $('#dateOfBirth').attr('max', today);

    $('#dateOfBirth').change(function () {
        var selectedDate = $(this).val();
        var isValid = true;

        // Check if the selected date is in the future
        if (new Date(selectedDate) > new Date(today)) {
            isValid = false;
            $('#errorMessagedob').text('Please select a date on or before today').addClass('text-danger');
            $(this).addClass('border-danger');
        } else {
            $(this).removeClass('border-danger');
            $('#errorMessagedob').text('').removeClass('text-danger');
        }

        // Perform any additional actions based on the validation result
        if (isValid) {
            // Your additional actions if the date is valid
        }
    });

    
});




debugger
function calculateTotalSalary() {
    
    var basicSalary = parseFloat($('#basicSalary').val()) || 0;
    var allowanceAmount = parseFloat($('#allowanceamount').val()) || 0;
    var deductionAmount = parseFloat($('#deductionamount').val()) || 0;
    
    
    var totalSalary = basicSalary + allowanceAmount - deductionAmount;
    debugger
    
    $('#totalSalary').val(totalSalary);
    $('#basicSalary, #allowanceamount, #deductionamount').on('input', calculateTotalSalary);
}
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
//--------------------------------------------bind deduction---------------------------------//
function bindDeductionName() {
    debugger
    $.ajax({
        type: 'GET',
        url: "../Payroll/getDeductionName",
        data: {},
        dataType: "JSON",
        context: document.body,
        success: function (data) {
            debugger
            //var row = "";
            //var rowcount = 1;
            $.each(data.bdeduction, function (item, value) {
                debugger
                $("#deductionname").append($("<option></option>").val(value.deductionId).html(value.deductionName));
            });

        },

        error: function (error) {

            alert("Not Found");
        }
    });
};

//-------------------------------------------------Auto Populate for deduction---------------------------------//
$("#deductionname").change(function () {
    debugger;

    var deductionname = $(this).val();
    var empidhidden = $("#deductionname option:selected").text(); // Fix: Use text() to get the selected option text

    $.ajax({
        url: '/Payroll/getdeductionAmount',
        type: 'GET',
        data: { DeductionId: deductionname },
        success: function (data) {
            debugger;

            var deductionAmount = data.autodeductamount[0].deductionAmount;

            $("#deductionamount").val(deductionAmount);
        },
        error: function (error) {
            console.error("Error fetching allowance amount:", error);
        }
    });
});
//-------------------------------------for post---------------------------------------
$("#btnsave").click(function (event) {

    event.preventDefault();
    var isValid = true;
    //function isValidInput(input) {
    //    return /^[A-Z][a-z]*$/.test(input);
    //}
    function isValidInput(input) {
        // Update the regular expression to allow only alphabetical characters
        return /^[A-Za-z]+$/.test(input);
    }
    //function isValidInput(input) {
    //    // Update the regular expression to disallow numbers
    //    return /^[^\d]+$/.test(input);
    //}
    function isValidName(input) {
        return /^[A-Z][a-z]* [A-Z][a-z]*$/.test(input);
    }

    var employeename = $("#employeeName").val().trim();
    var employeeid = $("#employeeId").val();
    var dateofbirth = $("#dateOfBirth").val();
    var gender = $("#gender").val();
    var contactno = $("#contact").val();
    var phonePattern = /^[0-9]{10}$/;
    var personalemail = $("#PersonalEmail").val();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var address = $("#address").val();
    var employeeusername = $("#employeeUsername").val();
    var password = $("#passwordSelector").val();
    var department = $("#departmentSelector").val();
    var designation = $("#designationSelector").val();
    var officialemail = $("#OfficialEmailSelector").val();
    var dateofjoining = $("#dateOfJoiningSelector").val();
    var basicsalary = $("#basicSalary").val();
    var allowencename = $("#allowancename").val();
    var allowenceamount = $("#allowanceamount").val();
    var deductionname = $("#deductionname").val();
    var deductionamount = $("#deductionamount").val();
    var totalsalary = $("#totalSalary").val();
    var accountHolderName = $("#accountHolderNameSelector").val();
    var accountNumber = $("#accountNumberSelector").val();
    var bankName = $("#bankNameSelector").val();
    var branch = $("#branchSelector").val();

    debugger
    if (!isValidName(employeename)) {
        $('#errorMessageforname').text('Please enter Full Name').addClass('text-danger');
        isValid = false;
        $('#employeeName').addClass('border-danger');
    }
    else {
        $('#employeeName').removeClass('border-danger');
        $('#errorMessageforname').text('').removeClass('text-danger');
    }

    if (employeeid == '') {
        isValid = false;
        $('#errorMessageId').text('Please enter a valid ID').addClass('text-danger');
        $('#employeeId').addClass('border-danger');
    }
    else {
        $('#employeeId').removeClass('border-danger');
        $('#errorMessageId').text('').removeClass('text-danger');
    }
    if (dateofbirth == '') {
        isValid = false;
        $('#errorMessagedob').text('Please enter a valid Date of Birth').addClass('text-danger');
        $('#dateOfBirth').addClass('border-danger');
    }
    else {
        $('#dateOfBirth').removeClass('border-danger');
        $('#errorMessagedob').text('').removeClass('text-danger');
    }
    if (gender == null) {
        isValid = false;
        $('#errorgender').text('Please enter  Gender').addClass('text-danger');
        $('#gender').addClass('border-danger');
    }
    else {
        $('#gender').removeClass('border-danger');
        $('#errorgender').text('').removeClass('text-danger');
    }
    if (!phonePattern.test(contactno) || (contactno == '')) {
        isValid = false;
        $('#errorContact').text('Please enter a valid contact no.').addClass('text-danger');
        $('#contact').addClass('border-danger');
    }
    else {
        $('#contact').removeClass('border-danger');
        $('#errorContact').text('').removeClass('text-danger');
    }

    if (!personalemail.match(emailPattern) || personalemail == '') {
        isValid = false;
        $('#errorpersonalemail').text('Please enter a valid email').addClass('text-danger');
        $('#PersonalEmail').addClass('border-danger');

    }
    else {
        $('#PersonalEmail').removeClass('border-danger');
        $('#errorpersonalemail').text('').removeClass('text-danger');
    }

    if (address == '') {
        isValid = false;
        $('#erroraddress').text('Please enter a valid Address').addClass('text-danger');
        $('#address').addClass('border-danger');
    }
    else {
        $('#address').removeClass('border-danger');
        $('#erroraddress').text('').removeClass('text-danger');
    }
    if (employeeusername == '') {
        isValid = false;
        $('#errorusername').text('Please enter a valid Username').addClass('text-danger');
        $('#employeeUsername').addClass('border-danger');
    }
    else {
        $('#employeeUsername').removeClass('border-danger');
        $('#errorusername').text('').removeClass('text-danger');
    }
    if (password == '') {
        isValid = false;
        $('#errorpassword').text('Please enter a valid Password').addClass('text-danger');
        $('#passwordSelector').addClass('border-danger');
    }
    else {
        $('#passwordSelector').removeClass('border-danger');
        $('#errorpassword').text('').removeClass('text-danger');
    }

    if (!isValidInput(department)) {
        isValid = false;
        $('#errordepartment').text('Please enter a valid Department').addClass('text-danger');
        $('#departmentSelector').addClass('border-danger');
    }
    else {
        $('#departmentSelector').removeClass('border-danger');
        $('#errordepartment').text('').removeClass('text-danger');
    }
    if (!isValidInput(designation)) {
        isValid = false;
        $('#errordesignation').text('Please enter a valid Designation').addClass('text-danger');
        $('#designationSelector').addClass('border-danger');
    }
    else {
        $('#designationSelector').removeClass('border-danger');
        $('#errordesignation').text('').removeClass('text-danger');
    }
    if (!officialemail.match(emailPattern) || officialemail == '') {
        isValid = false;
        $('#errorofficialemail').text('Please enter a valid Official Email').addClass('text-danger');
        $('#OfficialEmailSelector').addClass('border-danger');

    }
    else {
        $('#OfficialEmailSelector').removeClass('border-danger');
        $('#errorofficialemail').text('').removeClass('text-danger');
    }
    if (dateofjoining == '') {
        isValid = false;
        $('#errordoj').text('Please enter  date of joining ').addClass('text-danger');
        $('#dateOfJoiningSelector').addClass('border-danger');
    }
    else {
        $('#dateOfJoiningSelector').removeClass('border-danger');
        $('#errordoj').text('').removeClass('text-danger');
    }
    //if (basicsalary == '') {
    //    isValid = false;
    //    $('#errorbasicsalary').text('Please enter a valid Amount').addClass('text-danger');
    //    $('#basicSalary').addClass('border-danger');
    //}
    //else {
    //    $('#basicSalary').removeClass('border-danger');
    //    $('#errorbasicsalary').text('').removeClass('text-danger');
    //}

    if (basicsalary === '' || !/^\d+$/.test(basicsalary)) {
        $('#basicSalary').addClass('border-danger');
        $('#errorbasicsalary').text('Please enter a valid integer for Basic Salary.').addClass('text-danger');
        isValid = false;
    } else {
        $('#basicSalary').removeClass('border-danger');
        $('#errorbasicsalary').text('').removeClass('text-danger');
    }
    if (allowencename == null) {
        isValid = false;
        $('#errorallowname').text('Please enter allowance').addClass('text-danger');
        $('#allowancename').addClass('border-danger');
    }
    else {
        $('#allowancename').removeClass('border-danger');
        $('#errorallowname').text('').removeClass('text-danger');
    }
    if (allowenceamount == '') {
        isValid = false;
        
        $('#allowanceamount').addClass('border-danger');
    }
    else {
        $('#allowanceamount').removeClass('border-danger');
       
    }
    if (deductionname == null) {
        isValid = false;
        $('#errordeductname').text('Please enter Deductions').addClass('text-danger');
        $('#deductionname').addClass('border-danger');
    }
    else {
        $('#deductionname').removeClass('border-danger');
        $('#errordeductname').text('').removeClass('text-danger');
    }
    if (deductionamount == '') {
        isValid = false;
       
        $('#deductionamount').addClass('border-danger');
    }
    else {
        $('#deductionamount').removeClass('border-danger');
        
    }
    if (totalsalary == '') {
        isValid = false;
        $('#errortotalsalary').text('Please enter total salary').addClass('text-danger');
        
        $('#totalSalary').addClass('border-danger');
    }
    else {
        $('#totalSalary').removeClass('border-danger');
        $('#errortotalsalary').text('').removeClass('text-danger');
        
    }
    if (!isValidName(accountHolderName)) {
        isValid = false;
        $('#erroraccountholdername').text('Please enter Full Name').addClass('text-danger');
        $('#accountHolderNameSelector').addClass('border-danger');
    }
    else {
        $('#accountHolderNameSelector').removeClass('border-danger');
        $('#erroraccountholdername').text('').removeClass('text-danger');
    }
    if (accountNumber == '') {
        isValid = false;
        $('#erroracnumber').text('Please enter a valid Number').addClass('text-danger');
        $('#accountNumberSelector').addClass('border-danger');
    }
    else {
        $('#accountNumberSelector').removeClass('border-danger');
        $('#erroracnumber').text('').removeClass('text-danger');
    }
    if (bankName == null) {
        isValid = false;
        $('#errorbankname').text('Please enter Bank Name').addClass('text-danger');
        $('#bankNameSelector').addClass('border-danger');
    }
    else {
        $('#bankNameSelector').removeClass('border-danger');
        $('#errorbankname').text('').removeClass('text-danger');
    }

    if (branch == null) {
        isValid = false;
        $('#errorbranch').text('Please enter Branch').addClass('text-danger');
        $('#branchSelector').addClass('border-danger');
    }
    else {
        $('#branchSelector').removeClass('border-danger');
        $('#errorbranch').text('').removeClass('text-danger');
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
        formData.append('DateOfBirth', dateofbirth);
        formData.append('Gender', gender);
        formData.append('ContactNo', contactno);
        formData.append('PersonalEmail', personalemail);
        formData.append('Address', address);
        formData.append('Username', employeeusername);
        formData.append('Password', password);
        formData.append('Department', department);
        formData.append('Designation', designation);
        formData.append('OfficialEmail', officialemail);
        formData.append('DateOfJoining', dateofjoining);
        formData.append('BasicSalary', basicsalary);
        formData.append('AllowanceName', allowencename);
        formData.append('AllowanceAmount', allowenceamount);
        formData.append('DeductionName', deductionname);
        formData.append('DeductionAmount', deductionamount);
        formData.append('TotalSalary', totalsalary);
        formData.append('AccountHolderName', accountHolderName);
        formData.append('AccountNumber', accountNumber);
        formData.append('BankName', bankName);
        formData.append('Branch', branch);



        debugger
        $.ajax({
            type: "POST",
            url: "../Payroll/SaveEmployeeDetail",
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




