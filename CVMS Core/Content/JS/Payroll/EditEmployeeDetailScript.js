$(document).ready(function () {

    alert('!!!!Wellcome to Employee Detail Edit Page!!!!');
    //getemployeedetail();
    var params = new window.URLSearchParams(window.location.search);
    GetEmployeeDetail(params.get('id'));
    getAllowanceName();
    getDeductionName();
    UpdatecalculateTotalSalary();
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

    $('#editaccountNumber').on('keyup', function () {
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
    $('#editdateOfJoiningSelector').attr('max', today);

    $('#editdateOfJoiningSelector').change(function () {
        var selectedDate = $(this).val();
        var isValid = true;

        // Check if the selected date is in the future
        if (new Date(selectedDate) > new Date(today)) {
            isValid = false;
            $('#errordateofjoin').text('Please select a date on or before today').addClass('text-danger');
            $(this).addClass('border-danger');
        } else {
            $(this).removeClass('border-danger');
            $('#errordateofjoin').text('').removeClass('text-danger');
        }

        // Perform any additional actions based on the validation result
        if (isValid) {
            // Your additional actions if the date is valid
        }
    });

    $('#editdateOfBirth').attr('max', today);

    $('#editdateOfBirth').change(function () {
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
//----------------------------------for calculate salary------------------------------------------------//
debugger
function UpdatecalculateTotalSalary() {
   
    var basicSalary = parseFloat($('#editbasicSalary').val()) || 0;
    var allowanceAmount = parseFloat($('#editallowanceamount').val()) || 0;
    var deductionAmount = parseFloat($('#editdeductionamount').val()) || 0;

   
    var totalSalary = basicSalary + allowanceAmount - deductionAmount;
    debugger
    
    $('#edittotalSalary').val(totalSalary);
    $('#editbasicSalary, #editallowanceamount, #editdeductionamount').on('input', UpdatecalculateTotalSalary);
}



function GetEmployeeDetail(id) {
    debugger
    if (id > 0) {
        $.ajax({
            type: "GET",
            url: "../Payroll/EditEmpDetail?id=" + id,
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                debugger
                
                $("#editemployeeName").val(data.obj.employeeName);
                $("#editemployeeId").val(data.obj.employeeId);
                $("#editdateOfBirth").val(data.obj.dateOfBirth);
                $("#editgender").val(data.obj.gender);
                $("#editcontact").val(data.obj.contactNo);
                $("#editPersonalEmail").val(data.obj.personalEmail);
                $("#editaddress").val(data.obj.address);
                $("#editemployeeUsername").val(data.obj.username);
                $("#editpasswordSelector").val(data.obj.password);
                $("#editdepartmentSelector").val(data.obj.department);
                $("#editdesignationSelector").val(data.obj.designation);
                $("#editOfficialEmailSelector").val(data.obj.officialEmail);
                $("#editdateOfJoiningSelector").val(data.obj.dateOfJoining);
                $("#editbasicSalary").val(data.obj.basicSalary);
                $("#editallowancename").val(data.obj.allowanceName);
                $("#editallowanceamount").val(data.obj.allowanceAmount);
                $("#editdeductionname").val(data.obj.deductionName);
                $("#editdeductionamount").val(data.obj.deductionAmount);
                $("#edittotalSalary").val(data.obj.totalSalary);
                $("#editaccountHolderName").val(data.obj.accountHolderName);
                $("#editaccountNumber").val(data.obj.accountNumber);
                $("#editbankName").val(data.obj.bankName);
                $("#editbranch").val(data.obj.branch);
                $("#hiddenid").val(data.obj.id);
                


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

function getAllowanceName() {
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
                $("#editallowancename").append($("<option></option>").val(value.allowanceId).html(value.allowanceName));
            });

        },

        error: function (error) {

            alert("Not Found");
        }
    });
};

//------------------------------------------------Auto Populate for allowance amount----------------------------------------------//
$("#editallowancename").change(function () {
    debugger;

    var allowancen = $(this).val();
    var empidhidden = $("#editallowancename option:selected").text(); // Fix: Use text() to get the selected option text

    $.ajax({
        url: '/Payroll/getallowanceAmount',
        type: 'GET',
        data: { AllowanceId: allowancen },
        success: function (data) {
            debugger;

            var allowanceAmount = data.autoamount[0].allowanceAmount;

            $("#editallowanceamount").val(allowanceAmount);
        },
        error: function (error) {
            console.error("Error fetching allowance amount:", error);
        }
    });
});

function getDeductionName() {
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
                $("#editdeductionname").append($("<option></option>").val(value.deductionId).html(value.deductionName));
            });

        },

        error: function (error) {

            alert("Not Found");
        }
    });
};
//------------------------------------------Auto populate for Deduction Amount----------------------------------//
$("#editdeductionname").change(function () {
    debugger;

    var deductionname = $(this).val();
    var empidhidden = $("#editdeductionname option:selected").text(); // Fix: Use text() to get the selected option text

    $.ajax({
        url: '/Payroll/getdeductionAmount',
        type: 'GET',
        data: { DeductionId: deductionname },
        success: function (data) {
            debugger;

            var deductionAmount = data.autodeductamount[0].deductionAmount;

            $("#editdeductionamount").val(deductionAmount);
        },
        error: function (error) {
            console.error("Error fetching allowance amount:", error);
        }
    });
});

//--------------------------------------------update-----------------------------------------------//
$("#btnUpdate").click(function (event) {
    event.preventDefault();
    var isValid = true;


    function isValidInput(input) {
        return /^[A-Z][a-z]*$/.test(input);
    }
    //function isValidInput(input) {
    //    // Update the regular expression to disallow numbers
    //    return /^[^\d]+$/.test(input);
    //}

    function isValidName(input) {
        return /^[A-Z][a-z]* [A-Z][a-z]*$/.test(input);
    }

    var employeename = $("#editemployeeName").val();
    var employeeid = $("#editemployeeId").val();
    var dateofbirth = $("#editdateOfBirth").val();
    var gender = $("#editgender").val();
    var contactno = $("#editcontact").val();
    var phonePattern = /^[0-9]{10}$/;
    var personalemail = $("#editPersonalEmail").val();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var address = $("#editaddress").val();
    var employeeusername = $("#editemployeeUsername").val();
    var password = $("#editpasswordSelector").val();
    var department = $("#editdepartmentSelector").val();
    var designation = $("#editdesignationSelector").val();
    var officialemail = $("#editOfficialEmailSelector").val();
    var dateofjoining = $("#editdateOfJoiningSelector").val();
    var basicsalary = $("#editbasicSalary").val();
    var allowencename = $("#editallowancename").val();
    var allowenceamount = $("#editallowanceamount").val();
    var deductionname = $("#editdeductionname").val();
    var deductionamount = $("#editdeductionamount").val();
    var totalsalary = $("#edittotalSalary").val();
    var accountHolderName = $("#editaccountHolderName").val();
    var accountNumber = $("#editaccountNumber").val();
    var bankName = $("#editbankName").val();
    var branch = $("#editbranch").val();
    var id = $("#hiddenid").val();
    //Validation

    debugger
    if (!isValidName(employeename)) {
        $('#errorMessageforname').text('Please enter a valid Name').addClass('text-danger');
        isValid = false;
        $('#editemployeeName').addClass('border-danger');
    }
    else {
        $('#editemployeeName').removeClass('border-danger');
        $('#errorMessageforname').text('').removeClass('text-danger');
    }

    if (employeeid == '') {
        isValid = false;
        $('#errorMessageId').text('Please enter valid ID').addClass('text-danger');
        $('#editemployeeId').addClass('border-danger');
    }
    else {
        $('#editemployeeId').removeClass('border-danger');
        $('#errorMessageId').text('').removeClass('text-danger');
    }
    if (dateofbirth == '') {
        isValid = false;
        $('#errorMessagedob').text('Please enter date of birth').addClass('text-danger');
        $('#editdateOfBirth').addClass('border-danger');
    }
    else {
        $('#editdateOfBirth').removeClass('border-danger');
        $('#errorMessagedob').text('').removeClass('text-danger');
    }
    if (gender == null) {
        isValid = false;
        $('#errorgender').text('Please enter gender').addClass('text-danger');
        $('#editgender').addClass('border-danger');
    }
    else {
        $('#editgender').removeClass('border-danger');
        $('#errorgender').text('').removeClass('text-danger');
    }
    if (!phonePattern.test(contactno) || (contactno == '')) {
        isValid = false;
        $('#errorcontact').text('Please enter a valid contact no.').addClass('text-danger');
        $('#editcontact').addClass('border-danger');
    }
    else {
        $('#editcontact').removeClass('border-danger');
        $('#errorcontact').text('').removeClass('text-danger');
    }

    if (!personalemail.match(emailPattern) || personalemail == '') {
        isValid = false;
        $('#errorpemail').text('Please enter proper email').addClass('text-danger');
        $('#editPersonalEmail').addClass('border-danger');

    }
    else {
        $('#editPersonalEmail').removeClass('border-danger');
        $('#errorpemail').text('').removeClass('text-danger');
    }

    if (address == '') {
        isValid = false;
        $('#erroraddress').text('Please enter address').addClass('text-danger');
        $('#editaddress').addClass('border-danger');
    }
    else {
        $('#editaddress').removeClass('border-danger');
        $('#erroraddress').text('').removeClass('text-danger');
    }
    if (employeeusername == '') {
        isValid = false;
        $('#errorusername').text('Please enter username').addClass('text-danger');
        $('#editemployeeUsername').addClass('border-danger');
    }
    else {
        $('#editemployeeUsername').removeClass('border-danger');
        $('#errorusername').text('').removeClass('text-danger');
    }
    if (password == '') {
        isValid = false;
        $('#errorpassword').text('Please enter password').addClass('text-danger');
        $('#editpasswordSelector').addClass('border-danger');
    }
    else {
        $('#editpasswordSelector').removeClass('border-danger');
        $('#errorpassword').text('').removeClass('text-danger');
    }

    if (!isValidInput(department)) {
        isValid = false;
        $('#errordepartment').text('Please enter department').addClass('text-danger');
        $('#editdepartmentSelector').addClass('border-danger');
    }
    else {
        $('#editdepartmentSelector').removeClass('border-danger');
        $('#errordepartment').text('').removeClass('text-danger');
    }
    if (!isValidInput(designation)) {
        isValid = false;
        $('#errordesignation').text('Please enter designation').addClass('text-danger');
        $('#editdesignationSelector').addClass('border-danger');
    }
    else {
        $('#editdesignationSelector').removeClass('border-danger');
        $('#errordesignation').text('').removeClass('text-danger');
    }
    if (!officialemail.match(emailPattern) || officialemail == '') {
        isValid = false;
        $('#errorofficialemail').text('Please enter proper email').addClass('text-danger');
        $('#editOfficialEmailSelector').addClass('border-danger');

    }
    else {
        $('#editOfficialEmailSelector').removeClass('border-danger');
        $('#errorofficialemail').text('').removeClass('text-danger');
    }
    if (dateofjoining == '') {
        isValid = false;
        $('#errordateofjoin').text('Please enter date of joining').addClass('text-danger');
        $('#editdateOfJoiningSelector').addClass('border-danger');
    }
    else {
        $('#editdateOfJoiningSelector').removeClass('border-danger');
        $('#errordateofjoin').text('').removeClass('text-danger');
    }
    if (basicsalary == '') {
        isValid = false;
        $('#errorbsalary').text('Please enter basic salary').addClass('text-danger');
        $('#editbasicSalary').addClass('border-danger');
    }
    else {
        $('#editbasicSalary').removeClass('border-danger');
        $('#errorbsalary').text('').removeClass('text-danger');
    }
    if (allowencename == null) {
        isValid = false;
        $('#errorallow').text('Please enter allowance').addClass('text-danger');
        $('#editallowancename').addClass('border-danger');
    }
    else {
        $('#editallowancename').removeClass('border-danger');
        $('#errorallow').text('').removeClass('text-danger');
    }
    if (allowenceamount == '') {
        isValid = false;
        $('#editallowanceamount').addClass('border-danger');
    }
    else {
        $('#editallowanceamount').removeClass('border-danger');
    }
    if (deductionname == null) {
        isValid = false;
        $('#errordeduct').text('Please enter deductions').addClass('text-danger');
        $('#editdeductionname').addClass('border-danger');
    }
    else {
        $('#editdeductionname').removeClass('border-danger');
        $('#errordeduct').text('').removeClass('text-danger');
    }
    if (deductionamount == '') {
        isValid = false;
        $('#editdeductionamount').addClass('border-danger');
    }
    else {
        $('#editdeductionamount').removeClass('border-danger');
    }
    if (totalsalary == '') {
        isValid = false;
        $('#errortotalsalary').text('Please enter salary').addClass('text-danger');
        $('#edittotalSalary').addClass('border-danger');
    }
    else {
        $('#edittotalSalary').removeClass('border-danger');
        $('#errortotalsalary').text('').removeClass('text-danger');
    }
    if (!isValidName(accountHolderName)) {
        isValid = false;
        $('#erroracname').text('Please enter a valid name').addClass('text-danger');
        $('#editaccountHolderName').addClass('border-danger');
    }
    else {
        $('#editaccountHolderName').removeClass('border-danger');
        $('#erroracname').text('').removeClass('text-danger');
    }
    if (accountNumber == '') {
        isValid = false;
        $('#errornoac').text('Please enter account number').addClass('text-danger');
        $('#editaccountNumber').addClass('border-danger');
    }
    else {
        $('#editaccountNumber').removeClass('border-danger');
        $('#errornoac').text('').removeClass('text-danger');
    }
    if (bankName == null) {
        isValid = false;
        $('#errorbank').text('Please enter bank').addClass('text-danger');
        $('#editbankName').addClass('border-danger');
    }
    else {
        $('#editbankName').removeClass('border-danger');
        $('#errorbank').text('').removeClass('text-danger');
    }

    if (branch == null) {
        isValid = false;
        $('#errorbranch').text('Please enter branch').addClass('text-danger');
        $('#editbranch').addClass('border-danger');
    }
    else {
        $('#editbranch').removeClass('border-danger');
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
        formData.append('Id', id);



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
                window.location.href = '../Payroll/EmployeeDetailSummary'
                //window.location.reload();

            }


        })
    }
});
