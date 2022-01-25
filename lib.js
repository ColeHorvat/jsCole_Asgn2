function jsCole(x) {
    const VERSION = '0.0.1';

    if(x == document) {
        return jsCole_document(x);
    } else if(x instanceof HTMLElement) {
        return jsCole_htmlelement(x)
    } else if(typeof x == 'string') {
        return jsCole_htmlselector(x);
    } else if(x == undefined) {
        return {
            version: function() {
                return VERSION;
            }
        }
    } else {
        return 'not recognized'
    }


}


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
        },

        click: function(callback) {
            document.addEventListener('click', function() {
                this.jsCole_callback = callback;
                this.jsCole_callback();
            });
        },

        dblclick: function(callback) {
            document.addEventListener('dblclick', function() {
                this.jsCole_callback = callback;
                this.jsCole_callback();
            });
        },
    }
}

function jsCole_htmlelement(element) {

    return {
        on: function(event, callback) {
            element.addEventListener(event, function() {
               this.jsCole_callback = callback;
               this.jsCole_callback();
            });
        },

        click: function(callback) {
            element.addEventListener('click', function() { 
                this.jsCole_callback = callback;
                this.jsCole_callback();
            });
        },

        dblclick: function(callback) {
            element.addEventListener('dblclick', function() { 
                this.jsCole_callback = callback;
                this.jsCole_callback();
            });
        },

        css: function(property, value) {
            if(value === undefined) 
                return window.getComputedStyle(element)[property];
            else
                element.style.setProperty(property, value);
            
        },

        hide: function() {
            if(getComputedStyle(element).display == 'none' || getComputedStyle(element).display == 'NONE')
                return;
            else
                element.style.display = 'none';
        },

        show: function() {
            if(getComputedStyle(element).display == 'block' || getComputedStyle(element).display == 'BLOCK')
                return;
            else
                element.style.display = 'block';
        },

        toggle: function() {
            if(window.getComputedStyle(element).display == 'block') {
                element.style.display = 'none'
            } else {
                element.style.display = 'block'
            }
        }
    }
}

function jsCole_htmlselector(selector) {
    selector = selector.trim();
    elements = [];

    if (!selector.startsWith('.') && !selector.startsWith('#')) {
        elements = document.getElementsByTagName(selector);
    } else if(selector.startsWith('.')) {
        elements = document.getElementsByClassName(selector.substring(1, selector.length));
    } else {
        elements = [];
        if(document.getElementById(selector.substring(1, selector.length) != null))
            elements[0] = document.getElementById(selector.substring(1, selector.length));
    }

    return {

        on: function(event, callback) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener(event, function() {
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        click: function(callback) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener('click', function() { 
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        dblclick: function(callback) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener('dblclick', function() { 
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        css: function(property, value) {
            for (var i = 0; i < elements.length; i++)
                elements[i].style.setProperty(property, value);
        },

        hide: function() {
            for(var i = 0; i < elements.length; i++)
                elements[i].style.display = 'none';
        },

        show: function() {
            for (var i = 0; i < elements.length; i++)
                elements[i].style.display = 'block';
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