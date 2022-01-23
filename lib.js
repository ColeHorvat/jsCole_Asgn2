function jsCole(x) {
    const VERSION = '0.0.1';

    if(x == 'document') {
        return new jsCole_document(x);
    } else if(x instanceof HTMLElement) {
        return new jsCole_htmlselector(x);
    } else if()

    return {
        version: function() {
            console.log('jsCole - ' + VERSION);
        }
    }
}

// function check(x) {
//     if(x == document) {
//         callback('document')
//     } else if (typeof x == 'string') {
//         callback('string')
//     } else if (x instanceof HTMLElement) {
//         callback('HTMLElement')
//     } else if (x == undefined) {
//         callback('undefined')
//     } else {
//         callback('something else')
//     }
// }

function jsCole_document(thispreserved) {
    return {
        ready: function() {
            if(document.readyState == 'complete') {
                thispreserved.jsCole_callback = callback;
                thispreserved.jsCole_callback();
            } else {
                window.addEventListener('load', function() {
                    thispreserved.jsCole_callback = callback;
                    thispreserved.jsCole_callback();
                })
            }
        }
    }
}

function jsCole_htmlselector(selector) {
    selector = selector.trim();
    
    if (!selector.startsWith('.') && !selector.startsWith('#')) {
        this.jsCole_elements = document.getElementsByTagName(selector);
    } else if(selector.startsWith('.')) {
        this.jsCole_elements = document.getElementsByClassName(selector);
    } else {
        this.jsCole_elements = document.getElementById(selector);
    }

    return {

        on: function() {

        },

        click: function(callback) {

        },

        dblclick: function(callback) {

        },

        css: function(property, value) {
            window.getComputedStyle(this.jsCole_elements).getPropertyValue(property) == value;
        },

        hide: function() {
            window.getComputedStyle(this.jsCole_elements).getPropertyValue('display') == 'none'
        },

        show: function() {
            window.getComputedStyle(this.jsCole_elements).getPropertyValue('display') == 'block'
        },

        toggle: function() {
            if(window.getComputedStyle(element).getPropertyValue('display') == 'block') {
                element.style.display = 'none'
            } else {
                element.style.display = 'block'
            }
        }

    }
}