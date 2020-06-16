$(document).ready(function() {
    $("#currentDay").text(moment().format("MMM Do YYYY"));

    var currentDate = moment();

    currentDate.set({ // Initialize time to 9am
        hour: 9,
        minute: 0,
        second: 0
    });

    while (currentDate.hour() <= 17) { // Loop from 9am to 5pm
        var hourRow = $("<div>").addClass("row");
        var colHour = $("<div>").addClass("col-lg-1 hour").text(currentDate.format("h A"));
        var colDescription = $("<div>").addClass("col-lg-10")
        var textArea = $("<textarea>").prop("data-description", currentDate.hour()).addClass("description");
        colDescription.append(textArea);
        var colSaveBtn = $("<div>").addClass("col-lg-1 saveBtn").append($("<i>").addClass("fas fa-save fa-3x").prop("data-button", currentDate.hour()).on("click", saveTask));

        if (currentDate.hour() == moment().hour()) // Present
            colDescription.addClass("present");
        else if (currentDate.hour() < moment().hour())
            colDescription.addClass("past");
        else
            colDescription.addClass("future");

        //Check localStorage
        var storedDescription = localStorage.getItem(`hour-${currentDate.hour()}`);
        if (storedDescription != null)
            textArea.text(storedDescription);

        currentDate.hour(currentDate.hour() + 1);
        $(hourRow).append(colHour, colDescription, colSaveBtn);
        $(".container").append(hourRow);
    }
});

function saveTask() {
    var hourClicked = $(this).prop("data-button");

    // $('.description[data-description=`${hourClicked}`]') not working for some reason, doing a loop instead
    $('.description').each(function(index, item) {
        if($(item).prop("data-description") == hourClicked)
            localStorage.setItem(`hour-${hourClicked}`, item.value);
    });
}