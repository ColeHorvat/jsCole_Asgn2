function jsCole(x) {
    const VERSION = '0.0.1';

    if(x == 'document') {
        return new jsCole_document(x);
    } else if(x instanceof HTMLElement) {
        return new jsCole_htmlelement(x)
    } else if(typeof x == 'string') {
        return new jsCole_htmlselector(x);
    } else if(x == undefined) {
        return undefined;
    } else {
        return {
            version: function() {
                console.log('jsCole - ' + VERSION);
            }
        }
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
            for (var i = 0; i < this.jsCole_elements.length; i++) {
                element[i].addEventListener(event, function() {
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        click: function(callback) {
            for (var i = 0; i < this.jsCole_elements.length; i++) {
                element[i].addEventListener('click', function() { 
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        dblclick: function(callback) {
            for (var i = 0; i < this.jsCole_elements.length; i++) {
                element[i].addEventListener('dblclick', function() { 
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
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

        on: function(event, callback) {
            for (var i = 0; i < this.jsCole_elements.length; i++) {
                this.jsCole_elements[i].addEventListener(event, function() {
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        click: function(callback) {
            for (var i = 0; i < this.jsCole_elements.length; i++) {
                this.jsCole_elements[i].addEventListener('click', function() { 
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
        },

        dblclick: function(callback) {
            for (var i = 0; i < this.jsCole_elements.length; i++) {
                this.__TRUjQ_elements[i].addEventListener('dblclick', function() { 
                    this.jsCole_callback = callback;
                    this.jsCole_callback();
                });
            }
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