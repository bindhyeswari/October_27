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
            utils.createElement('div', '', 'half-hour', schedule);
        }

    }

    container_scheduler.addEventListener('mousedown', function () {
        container_scheduler.addEventListener('mousemove', mousemovehandler);
    });

    container_scheduler.addEventListener('mouseup', function () {
        container_scheduler.removeEventListener('mousemove', mousemovehandler);
    });

    function mousemovehandler (event) {
        if ( event.target.className.indexOf('half-hour') !== -1 ) {
            event.target.className += ' selected';
        }
    }

});




