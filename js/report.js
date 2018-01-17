$(function () {

    function onPageLoad() {
        getCandidateData();
        getReports();
    }

    function getCandidateData() {
        var id = localStorage.getItem("id");
        var url = "http://localhost:3333/api/candidates/" + id;

        $.getJSON(url)
            .done(function (candidate) {
                showCandidate(candidate);

            })
            .fail(function () {
                errorMessage($(".candidateError"), "It seems there is an error in our system. We will fix it as soon as possible!");
            });
    }

    function getReports() {
        var id = localStorage.getItem("id");
        var url = "http://localhost:3333/api/reports/";

        $.getJSON(url)
            .done(function (reports) {

                if (reports.length == 0) {
                    errorMessage($(".reportError"), "Currently there are no reports for this candidate.")
                } else {
                    var filteredCandidate = reports.filter(function (candidate) {
                        return candidate.candidateId == id;

                    });
                    showReports(filteredCandidate);

                }
            })
            .fail(function () {
                errorMessage($(".reportError"), "We are not able to load any reports at the moment.");
            });
    }

    function getReportsDetails(reportId) {

        var url = "http://localhost:3333/api/reports";

        $.getJSON(url)
            .done(function (reports) {
                var filteredReport = reports.filter(function (report) {
                    return report.id == reportId;

                });
                showReportDetails(filteredReport[0]);
            })
            .fail(function () {
                errorMessage($(".modalErrorMessage"), "There has been an error while trying to load report details");
            });
    }

    function showCandidate(candidate) {
        var defaultAvatar = "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";
        var image = candidate.avatar
            ? candidate.avatar
            : defaultAvatar;

        $(".candidateImage").attr("src", image);
        $(".candidateName").text(candidate.name);
        $(".candidateEmail").text(candidate.email);
        $(".candidateDate").text(formatDate(candidate.birthday));
        $(".candidateEducation").text(candidate.education);
    }

    function showReports(reports) {
        var title = $("<h4>").text("Reports").attr("class", "my-3");
        $("table").before(title);
        $("table").removeClass("hide");

        $.each(reports, function (index, report) {
            var reportData = [report.companyName, formatDate(report.interviewDate), report.status];
            var reportId = report.id;
            addTableRow(reportData, reportId);
        })
    }

    function showReportDetails(report) {
        $(".modal-title").text(report.candidateName);
        $(".companyName").text(report.companyName);
        $(".interviewDate").text(formatDate(report.interviewDate));
        $(".phase").text(report.phase);
        $(".status").text(report.status);
        $(".notes").text(report.note);
    }

    function addTableRow(data, id) {
        var row = $("<tr>");
        $.each(data, function (index, item) {
            var cell = $("<td>").text(item);
            row.append(cell);
        })
        var view = $("<i>").attr("class", "fa fa-eye");
        var viewButton = $("<button>").html(view).attr({
            "type": "button",
            "data-toggle": "modal",
            "data-target": "#modal",
            "data-id": id,
            "class": "btn w-100 modal-button pointer"
        });
        setUpLink(viewButton);
        var viewCell = $("<td>").html(viewButton).attr("class", "text-center");

        row.append(viewCell);
        $("#tableBody").append(row);

    }

    function errorMessage(element, cause) {
        var errorMessage = $("<h5>");
        errorMessage.text(cause).attr("class", "mx-auto text-justify mt-4 p-3");
        element.append(errorMessage);
    }

    function setUpLink(element) {
        $(element).on("click", function () {
            var reportId = $(this).attr("data-id");
            console.log(reportId);
            getReportsDetails(reportId);
        })
    }

    function formatDate(date) {
        var dob = new Date(date);
        var month = dob.getMonth() + 1;
        var birthday = dob.getDate() + "." + month + "." + dob.getFullYear();
        return birthday;
    }

    onPageLoad();
});