 // Project 1
    // Break timer

    // input for number of minutes break is
    // button to start timer
    // display timer with length of break but don't start it until user presses start button
    // when start button pressed - display start and end times of break and start timer
    // labels for quick access breaks - "5 mins", "15 mins", "20 mins", "Meal Break (60 min)", "Meal Break (90 min)"
    // Easily visible countdown timer
    // option for 24 hr display or am/pm
    // Display warnings when 30 min left, 15 min left, 5 min left, etc
    // Change background to yellow at 1-minute left
    // Change background to red when time is up
    // Ability to reset the timer
    // Bonus: Ability to stop the timer (Can't figure out how to do while using setInterval)
    // Bonus: Ability to have multiple timers running at same time (May add this in the future)

    //when the user clicks one of the fixed break time buttons, text will appear under the start button saying "This is a ?? min break" and the value of that button will be assigned to the breakLength variable. The timer will change to display the value of breakLength. The user will also be prompted to select if they want time displayed in 12 or 24 hour clock format. That will be assigned to the clockFormat variable

    // when the user selects the "custom break length" button, a prompt will ask for the length of break in minutes. That will be assigned to breaklength. Text will appear under the start button with the length of break. The counter will change to display the length inputted by the user. They will also be prompted for 12 or 24 hour clock format

    // when the user clicks the start button, under the text stating the length of the break, text will appear stating what time the break started and what time it will end. The displayed clock timer will begin to countdown in minutes and seconds. Also a reset button will appear

    // when the timer reaches certain milestones, text will appear below the clock eg "There is 5 min left in the break"

    // when the timer is done, the background will change and text will appear below the timer "Break is over". 

    //when reset buttom is pressed the screen will reload 

$(document).ready(function(){
    
let breakLength = 0;
let twentyFourHourClock = true;
    
// hide start message and start and reset buttons
// hide breakLength buttons
$('.startMessage').hide();
$('#start').hide();
// $('#resetButton').hide();
$('breakButtonList').hide();
$('.break').hide();
$('.custom').hide();
    
const getClockFormat = () => {
    // function gets input from the user to determine if clock is displayed in 24 hour or am/pm format
    const clockFormat = prompt('Would you like the time displayed in 24 hour format? (Y/N)');

    if (clockFormat !== null){
        if (clockFormat.toLowerCase() === 'y' || clockFormat.toLowerCase() === 'yes') {
            twentyFourHourClock = true;
        } else {
            twentyFourHourClock = false;
        };
    };
    return twentyFourHourClock
};

const convertToAmPm = (time) => {
    //check if display should be in 24 hour format or am/pm 
    if (!twentyFourHourClock) {
        //make time am/pm format 
        if (time.hour >= 12) {
            time.period = 'pm';
            if (time.hour > 12){
                time.hour = time.hour - 12;
            };
        } else {
            time.period = 'am'
            if (time.hour === 0) {
                time.hour = 12;
            };
        };
        return time;
    }; 


};

const breakStartAt = () => {
    // calculates the current time
    const today = new Date();
    const startTime = {
        hour: today.getHours(),
        minutes: today.getMinutes(),
        period: ''
    };

    //check if display should be in 24 hour format or am/pm 
    convertToAmPm(startTime);

    // display the start time
    $('.breakStart').text(`The break started at ${startTime.hour}:${String(startTime.minutes).padStart(2, '0')} ${startTime.period}`);

    return startTime;
};

const breakOverAt = () => {
    //calculates time the break is over
    //Note: Doesn't reflect the date of the end time if the number is larger or if the time passes over midnight
    //convert breakLength to milliseconds
    const breakInMilliseconds = breakLength * 60 * 1000;
    
    //get the current time in milliseconds
    const time = new Date().getTime();
    const timeAdded = time + breakInMilliseconds;
    
    // put the timeAdded into a new date and get the hours and minutes for the endTime
    const newTime = new Date(timeAdded);
    
    const endTime = {
        hour: newTime.getHours(),
        minutes: newTime.getMinutes(),
        period: ''
     };

    //check if display should be in 24 hour format or am/pm 
    convertToAmPm(endTime);

    // display the end time
    $('.breakEnd').text(`The break ends at ${endTime.hour}:${String(endTime.minutes).padStart(2, '0')} ${endTime.period}`);

    return endTime;
 };

const timer = () => {
    //display a countdown timer starting at the breakLength inputted by the user 
    //countdown by seconds
    //stop when it reaches 0
    let minutesCounter = 0;
    let secondsCounter = 0;

    if (breakLength !== 0){
        minutesCounter = breakLength -1;
        secondsCounter = 60;
    };

    if (secondsCounter !== 0){
        let counter = setInterval(function(){
            secondsCounter -=1;
            //displays counter
            $('.timer').text(`${String(minutesCounter).padStart(2, '0')}:${String(secondsCounter).padStart(2, '0')}`);
            // checks for certain milestones and displays warnings for 30 seconds
            if (minutesCounter === 30 && secondsCounter === 0){
                $('.warning').text('30 minutes left in the break');
            } else if ((minutesCounter === 29 && secondsCounter === 30)){
                $('.warning').text('');
            } else if (minutesCounter === 15 && secondsCounter === 0){
                $('.warning').text('15 minutes left in the break');
            } else if ((minutesCounter === 14 && secondsCounter === 30)){
                $('.warning').text('');
            } else if (minutesCounter === 5 && secondsCounter === 0){
                $('.warning').text('5 minutes left in the break');
            } else if ((minutesCounter === 4 && secondsCounter === 30)){
                $('.warning').text('');
            }  else if (minutesCounter === 1 && secondsCounter === 0){
                $('.warning').text('1 minute left in the break');
                //change screen to yellow
                $('.timerDisplay').css('background-color', 'yellow')
            };
            //checks if counter still has time left or is done
            if (secondsCounter === 0 && minutesCounter > 0){
                minutesCounter -= 1;
                secondsCounter = 60;
            } else if (secondsCounter === 0 && minutesCounter === 0){
                clearInterval(counter);
                $('.warning').text(`The break is over!`);
                //change screen to red
                $('.timerDisplay').css('background-color', 'red'); 
            };
        }, 1000);   
    } else if (breakLength === 0) {
        $('.warning').text('No break time was entered.');
    };
};

// when select break time button is clicked
$('.select').on('click',function (){
    $('breakButtonList').show();
    $('.break').show();
    $('.custom').show();
});

// below are for when buttons for break length are clicked
//checks the value of the button that was clicked
//shows the start message and button, displays the length of the break and sets the counter to the appropriate value

$('.break').on('click', function() {
    const length = $(this).val();
    breakLength = length;

   // hide the break Length buttons
   $('.buttonList').hide();

    // create start message 
    $('.startMenu').append('<h2 class="startMessage">Press the start button to start the break timer</h2>');
    // $('.startMenu').append('<button type="button" id="start" >Start</button>');

    // show start button
    $('#start').show();

    // create breakInfo text
    $('.breakInfo').append(`<p class='breakLength'>This is a ${breakLength} minute break</p>`);

    // create break start and end messages
    $('.breakInfo').append('<p class="breakStart"></p>');
    $('.breakInfo').append('<p class="breakEnd"></p>');
    
    $('.timer').text(`${breakLength}:00`);
    $('.warning').text('');
    twentyFourHourClock = getClockFormat();
});

//prompts user to enter their own break length
//note: I haven't set a maximum time; If the number entered is too large might get NaN in some values. 
$('.custom').on('click', function() {
    // hide the break Length buttons
   $('.buttonList').hide();

   // create start message and button
   $('.startMenu').append('<h2 class="startMessage">Press the start button to start the break timer</h2>');
//    $('.startMenu').append('<button type="button" id="start" >Start</button>');

   // create break start and end messages
   $('.breakInfo').append('<p class="breakStart"></p>');
   $('.breakInfo').append('<p class="breakEnd"></p>');

   // create breakInfo text
   $('.breakInfo').append(`<p class='breakLength'>This is a ${breakLength} minute break</p>`);

   // prompt user for custom break length
    breakLength = prompt(`How many minutes is the break?`);
    if (breakLength === null || breakLength === ''|| breakLength === '0'){
        //hides the start button and message and clears text and sets counter to 0(if another timer button had already been pressed)
        $('.startMessage').hide();
        $('#start').hide();
        $('.timer').text(`0:00`);
        $('.breakLength').text('');
        $('.warning').text('No break time was entered');
    } else if(isNaN(breakLength)){
        $('.startMessage').hide();
        $('#start').hide();
        $('.timer').text('0:00');
        $('.breakLength').text('');
        $('.warning').text('Please enter a valid number');
    } else {
        breakLength = parseInt(breakLength);
        $('.startMessage').show();
        $('#start').show();
        $('.breakLength').text(`This is a ${breakLength} minute break`);
        $('.timer').text(`${breakLength}:00`);
        $('.warning').text('');
        twentyFourHourClock = getClockFormat();
    };
});

// when the start button is clicked
$('#start').on('click', function() {
    
    // hide the start message and start button
    $('.startMenu').hide();
    // $('.startMessage').hide();
    // $('#start').hide();

    //disable the other break time buttons
    $('.break').prop('disabled', true);
    $('.custom').prop('disabled', true);

    //show reset button
    // $('#resetButton').show();
    
    //get break start and end time and start the timer
    const startTime = breakStartAt();
    const endTime = breakOverAt();
    timer();
});

//when the reset button is clicked the page is reloaded
$('#resetButton').on('click', function() {
    history.go(0);
});

});




   
 
    
    
    

