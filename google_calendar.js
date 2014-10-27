/**
 * Created by mishrab on 10/27/14.
 */


var utils = {
    createElement: function (type, innerHTML, className, parent) {
        var element = document.createElement(type);
        element.innerHTML = innerHTML;
        if ( className ) element.className = className;
        if ( parent ) parent.appendChild(element);
        return element;
    }
};

var tasks = [];

Number.prototype.toToStringTwoDigits = function () {
    if (this.toString().length === 1) return '0' + this.toString();
    else return this.toString();
};

document.addEventListener('DOMContentLoaded', function () {
    var container_scheduler = document.getElementsByClassName('container_scheduler')[0];
    for (var i = 0; i < 24; i++) {
        // create a row
        // create a time element
        // create a description element
        var row = utils.createElement('div', '', 'row', container_scheduler);
        utils.createElement('div', i.toToStringTwoDigits() + ' hours', 'time', row);
        var schedule = utils.createElement('div', '', 'half-schedule', row);
        for (var j = 0, len = 2; j < len; j++) {
            utils.createElement('div', '', 'half-hour', schedule).setAttribute('data-start', i + j * 0.5);
        }

    }

    var popup = document.getElementsByClassName('popup_display')[0];
    mousemovehandler.elements = [];

    // handle click event on the hyperlink
    document.getElementById('popup_cancel').addEventListener('click', function (event) {
        event.preventDefault();

        mousemovehandler.elements.forEach(function (element) {
            element.className = element.className.replace(' selected', '');
        });


        console.log('start time is: ' + mousemovehandler.elements[0].dataset.start);
        console.log('end time is: ' + (+mousemovehandler.elements[mousemovehandler.elements.length - 1].dataset.start + 0.5));
        mousemovehandler.elements = [];

        popup.className = popup.className.replace(' show', '');

    });

    container_scheduler.addEventListener('mousedown', function () {
        container_scheduler.addEventListener('mousemove', mousemovehandler);
    });

    container_scheduler.addEventListener('mouseup', function (event) {
        if ( event.target.className.indexOf('half-hour') !== -1 ) {
            showPopup(mousemovehandler);
        }

        container_scheduler.removeEventListener('mousemove', mousemovehandler);
    });

    function mousemovehandler (event) {
        if ( event.target.className.indexOf('half-hour') !== -1 ) {
            if ( event.target.className.indexOf('selected') === -1 ) event.target.className += ' selected';
            if ( mousemovehandler.elements.indexOf(event.target) === -1 ) mousemovehandler.elements.push(event.target); // clean this up
        }
    }

    function showPopup(mousemovehandler) {

        if ( mousemovehandler.elements.length === 0 ) return;
        var o = mousemovehandler.elements[0].offsetTop,
            h = popup.offsetHeight,
            margin = 5;

        console.log(o);
        console.log(h);
        popup.style.top = o - h - margin + 'px';
        console.log( o - h - margin );
        popup.className += ' show';

        console.log(mousemovehandler.elements);

    }

});




