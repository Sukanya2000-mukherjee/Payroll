$(document).ready(function () {

    alert('!!!!Wellcome to Salary Slip!!!!');

    var params = new window.URLSearchParams(window.location.search);
    GetSalaryDetail(params.get('id'));
    getAllowanceName();
    getDeductionName();
    

});
//$('#downloadSlip').on('click', function () {


//    debugger

//    $.getScript('https://unpkg.com/html2pdf.js', function () {
//        debugger;


//        var element = $('#salary-tag')[0];
//        $(element).find('.container-fluid').css({
//            position: 'absolute',
//            top: '10px',
//            left: '10px',
//        });


//        var options = {
//            margin: 10,
//            filename: 'salary_slip.pdf',
//            image: { type: 'jpeg', quality: 1 },
//            html2canvas: { scale: 2 },
//            jsPDF: {
//                unit: 'mm',
//                format: 'a4',
//                orientation: 'landscape',
//                putOnlyUsedFonts: true,
//            },

//        };

//        html2pdf(element, options);
//    });







//-------------------------salary slip download another code------------------//


    //var contentDiv = $('#salary-tag')[0];
    //var params = new window.URLSearchParams(window.location.search);
    //GetSalaryDetail(params.get('id'));


    //var pdf = new jsPDF({
    //    unit: 'mm',
    //    format: 'a4',
    //    orientation: 'landscape',
    //});


    //console.log(params);
    //pdf.fromHTML(contentDiv, 15, 15);


    //pdf.save('salary_slip.pdf');

//});

//function downloadPDF() {
//    const salaryTag = document.getElementById('salary-tag');

//    // Use html2canvas to capture the salary-tag div as an image
//    html2canvas(salaryTag).then(canvas => {
//        const imgData = canvas.toDataURL('image/png');

//        // Create a jsPDF instance
//        const pdf = new jsPDF({
//        unit: 'mm',
//        format: 'a4',
//        orientation: 'landscape',
//    });

//        // Add the image to the PDF
//        pdf.addImage(imgData, 'PNG', 0, 0);

//        // Save the PDF
//        pdf.save('salary_slip.pdf');
//    });
//}

//function downloadPDF() {
//    const salaryTag = document.getElementById('salary-tag');

//    // Use html2canvas to capture the salary-tag div as an image
//    html2canvas(salaryTag, { scrollY: -window.scrollY }).then(canvas => {
//        const imgData = canvas.toDataURL('image/png');

//        // Create a jsPDF instance
//        const pdf = new jsPDF('p', 'mm', 'a4'); // Landscape mode (change to 'p' for portrait)

//        // Calculate scale factor to fit the entire content on a single page
//        const scaleFactor = pdf.internal.pageSize.width / canvas.width;

//        // Add the image to the PDF
//        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, canvas.height * scaleFactor);

//        // Save the PDF
//        pdf.save('salary_slip.pdf');
//    });
//}

//$('#downloadSlip').on('click', function () {
//    const pdf = new jsPDF('landscape', 'mm', 'a4');
//    const salaryTag = document.getElementById('salary-tag');

//    // Use html2canvas to capture the salary-tag div as an image
//    html2canvas(salaryTag, { scrollY: -window.scrollY }).then(canvas => {
//        const imgData = canvas.toDataURL('image/png');

//        // Calculate scale factor to fit the entire content on a single page
//        const scaleFactor = pdf.internal.pageSize.width / canvas.width;

//        // Add the image to the PDF
//        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, canvas.height * scaleFactor);

//        // Save the PDF
//        pdf.save('salary_slip.pdf');
//    });
//});

$('#downloadSlip').on('click', function () {
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const salaryTag = document.getElementById('salary-tag');

    // Calculate the total height of the content in the salary-tag div
    const contentHeight = salaryTag;

    // Set the height of the HTML and body elements to the total height of the content
    document.documentElement.style.height = contentHeight + 'px';
    document.body.style.height = contentHeight + 'px';

    // Use html2canvas to capture the salary-tag div as an image
    html2canvas(salaryTag).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Calculate scale factor to fit the entire content on a single page
        const scaleFactor = pdf.internal.pageSize.width / canvas.width;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, canvas.height * scaleFactor);

        // Reset the height of the HTML and body elements to their original values
        document.documentElement.style.height = '';
        document.body.style.height = '';

        // Save the PDF
        pdf.save('salary_slip.pdf');
    });
});




function GetSalaryDetail(id) {
    debugger
    if (id > 0) {
        $.ajax({
            type: "GET",
            url: "../Payroll/getdatasalaryslip?id=" + id,
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                debugger
              
                $("#getemployeeName").val(data.obj.employeeName);
                $("#getemployeeId").val(data.obj.employeeId);
                $("#getdateOfBirth").val(data.obj.dateOfBirth);
                $("#getgender").val(data.obj.gender);
                $("#getcontact").val(data.obj.contactNo);
                $("#getPersonalEmail").val(data.obj.personalEmail);
                $("#getaddress").val(data.obj.address);
                $("#getdepartmentSelector").val(data.obj.department);
                $("#getdesignationSelector").val(data.obj.designation);
                $("#getOfficialEmailSelector").val(data.obj.officialEmail);
                $("#getdateOfJoiningSelector").val(data.obj.dateOfJoining);
                $("#getbasicSalary").val(data.obj.basicSalary);
                $("#getallowancename").val(data.obj.allowanceName);
                $("#getallowanceamount").val(data.obj.allowanceAmount);
                $("#getdeductionname").val(data.obj.deductionName);
                $("#getdeductionamount").val(data.obj.deductionAmount);
                $("#gettotalSalary").val(data.obj.totalSalary);
                $("#getaccountHolderNameSelector").val(data.obj.accountHolderName);
                $("#getaccountNumberSelector").val(data.obj.accountNumber);
                $("#getbankNameSelector").val(data.obj.bankName);
                $("#getbranchSelector").val(data.obj.branch);
                

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
                $("#getallowancename").append($("<option></option>").val(value.allowanceId).html(value.allowanceName));
            });

        },

        error: function (error) {

            alert("Not Found");
        }
    });
};

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
                $("#getdeductionname").append($("<option></option>").val(value.deductionId).html(value.deductionName));
            });

        },

        error: function (error) {

            alert("Not Found");
        }
    });
};

