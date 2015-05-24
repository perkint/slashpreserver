
//
// main.js - a javascript overlay
//
// This code prevents youtube (etc.) from stealing the slash key...
//

window.addEventListener("load", function load(event) {  // new browser window
  window.removeEventListener("load", load, false);      // we just do this once
  myThingy.init();                                      // must has object
}, false);

var myThingy = {
  init: function() {
    window.addEventListener("keypress", function(event) {
      var target = event.originalTarget;
      if ( target instanceof HTMLTextAreaElement ||
          (target instanceof HTMLInputElement && target.type == "text") ) {
        // no-op: allow slash to be typed into input fields, etc...
      } else {
        if ( event.charCode ) {
          switch( String.fromCharCode(event.charCode) ) {
            case '/':
              if( !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey ) {
                if ( gFindBar && gFindBar.hidden ) {
                  gFindBar.onFindCommand();
                }
                event.preventDefault();  // nuke it (needed?)
                event.stopPropagation(); // nuke it (essential)
              }
              break;
          }
        }
      }
    }, true);
  },
}

