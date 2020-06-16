$(document).ready(function() {
    $("#currentDay").text(moment().format("MMM Do YYYY"));

    var currentDate = moment();

    currentDate.set({ // Initialize time to 9am
        hour: 9,
        minute: 0,
        second: 0
    });

    while (currentDate.hour() <= 17) { // Loop from 9am to 5pm
        var hourRow = $("<div>").addClass("row").data("hour", currentDate.hour());
        var colHour = $("<div>").addClass("col-lg-1 hour").text(currentDate.format("h A"));
        var colDescription = $("<div>").addClass("col-lg-10").append($("<textarea>").addClass("description"));
        var colSaveBtn = $("<div>").addClass("col-lg-1 saveBtn").append($("<i>").addClass("fas fa-save fa-3x"));

        if (currentDate.hour() == moment().hour()) // Present
            colDescription.addClass("present");
        else if (currentDate.hour() < moment().hour())
            colDescription.addClass("past");
        else
            colDescription.addClass("future");

        currentDate.hour(currentDate.hour() + 1);
        $(hourRow).append(colHour, colDescription, colSaveBtn);
        $(".container").append(hourRow);
    }
});