function attachEventsListeners() {

    document.getElementsByTagName('main')[0]
        .addEventListener('click', onClick);

    daysInput = document.getElementById('days');
    hoursInput = document.getElementById('hours');
    minutesInput = document.getElementById('minutes');
    secondsInput = document.getElementById('seconds');

    const selector = {
        'daysBtn': calculateDays,
        'hoursBtn': calculateHours,
        'minutesBtn': calculateMinutes,
        'secondsBtn': calculateSeconds
    }
    
    function onClick(ev) {
        const target = ev.target;
        if (target.tagName == 'INPUT'
            && target.getAttribute('type') == 'button') {
            selector[target.getAttribute('id')]();      
        }
    }

    function calculateDays() {
        hoursInput.value = Number(daysInput.value) * 24
        minutesInput.value = Number(daysInput.value) * 1440
        secondsInput.value = Number(daysInput.value) * 86400
    };
    function calculateHours() {
        daysInput.value = Number(hoursInput.value) / 24
        minutesInput.value = Number(hoursInput.value) * 60
        secondsInput.value = Number(hoursInput.value) * 60 * 60
    };
    function calculateMinutes() {
        daysInput.value = Number(minutesInput.value) / 1440
        hoursInput.value = Number(minutesInput.value) / 60
        secondsInput.value = Number(minutesInput.value) * 60
    };
    function calculateSeconds() {
        daysInput.value = Number(secondsInput.value) / 86400
        hoursInput.value = Number(secondsInput.value) / 60 / 60
        minutesInput.value = Number(secondsInput.value) / 60
    }
}