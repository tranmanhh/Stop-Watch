//create variables for main time
var hour = 0;
var minute = 0;
var second = 0;
var centisecond = 0;
//create variables for lap time
var lapHour = 0;
var lapMinute = 0;
var lapSecond = 0;
var lapCentisecond = 0;
//create variable to keep trach the number of laps; the first lap will be lap 1
var lapNum = 1;
//create main-time interval and lap-time interval
var runInterval;
var lapInterval;

//users click on startStopResume button
$("#startStopResume").click(function(){
    //if the main time start from 00:00:00 -> run the main time and lap time
    if($(this).text().toLowerCase() == "start")
    {
        $(this).text("Stop"); //change "Start" button's text to "Stop"
        runInterval = setInterval(mainTimerun, 10);
        lapInterval = setInterval(lapTimerun, 10);
    }
    //if the main time and lap time are running -> pause the main time and lap time
    else if($(this).text().toLowerCase() == "stop")
    {
        $(this).text("Resume"); //change "Stop" button's text to "Resume"
        $("#lapReset").text("Reset"); //change "Lap" button's text to "Reset"
        clearInterval(runInterval);
        clearInterval(lapInterval);
    }
    //if the main time and lap time are paused -> resume them
    else if($(this).text().toLowerCase() == "resume")
    {
        $(this).text("Stop"); //change "Resume" button's text to "Stop"
        $("#lapReset").text("Lap"); //change "Reset" button's text to "Lap"
        runInterval = setInterval(mainTimerun, 10);
        lapInterval = setInterval(lapTimerun, 10);
    }
});

//users click on lapReset button
$("#lapReset").click(function(){
    //if main time and lap time are paused -> reload page
    if($(this).text().toLowerCase() == "reset")
    {
        location.reload();
    }
    //if main time and lap time are running -> create new lap and store it
    else if($(this).text().toLowerCase() == "lap" && $("#startStopResume").text().toLowerCase() != "start")
    {
        //create new lap div and store it
        $("#lapStore").prepend(`
        <div class="row">
            <div class="col-xs-6"><p>Lap${lapNum}</p></div>
            <div class="time col-xs-6"><p>${$("#lapCounting").find("p").text()}</p></div>
        </div>`);
        //increase the number of laps, clear the lap-time interval, and set all lap-time's variables to 0
        lapNum++;
        clearInterval(lapInterval);
        lapHour = 0;
        lapMinute = 0;
        lapSecond = 0;
        lapCentisecond = 0;
        //set the lap-time interval again
        lapInterval = setInterval(lapTimerun, 10);
    }
});

function displayTime(name, val)
{
    if(val < 10)
    {
        $(`#${name}`).text(`0${val}`);
    }
    else
    {
        $(`#${name}`).text(val);
    }
}

//run time interval function
function mainTimerun()
{
    if(centisecond == 99)
    {
        centisecond = 0;
        if(second == 59)
        {
            second = 0;
            if(minute == 59)
            {
                minute = 0;
                hour++;
            }
            else
            {
                minute++;
            }
        }
        else
        {
            second++;
        }
    }
    else
    {
        centisecond++;
    }

    displayTime("milisecond", centisecond);
    displayTime("second", second);
    displayTime("minute", minute);
    displayTime("hour", hour);
}
//lap time interval function
function lapTimerun()
{
    if(lapCentisecond == 99)
    {
        lapCentisecond = 0;
        if(lapSecond == 59)
        {
            lapSecond = 0;
            if(lapMinute == 59)
            {
                lapMinute = 0;
                lapHour++;
            }
            else
            {
                lapMinute++;
            }
        }
        else
        {
            lapSecond++;
        }
    }
    else
    {
        lapCentisecond++;
    }

    displayTime("lapMilisecond", lapCentisecond);
    displayTime("lapSecond", lapSecond);
    displayTime("lapMinute", lapMinute);
    displayTime("lapHour", lapHour);
}