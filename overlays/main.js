
//
// main.js - a javascript overlay
//
// This code prevents youtube (etc.) from stealing the slash key...
//

// // alert() does not work here but this does:
// Services.prompt.alert(null, 'title of alert', 'message content');

window.addEventListener("load", function load(event) {  // new browser window
  window.removeEventListener("load", load, false);      // we just do this once
  myThingy.init();                                      // must has object
}, false);

var myThingy = {
  init: function() {
    window.addEventListener("keypress", function(event) {
      var target = event.originalTarget;
      //
      // You can test slashpreserver on an editable div here:
      //
      //   http://html5doctor.com/the-contenteditable-attribute/
      //
      // If testing for attribute contentEditable == 'true' starts to catch
      // too many things (?), one can limit it to various tags like so:
      //
      //   && (/DIV|BLOCKQOTE/).test(target.tagName)
      //
      // Testing for contentEditable may be sufficient.  If not, here are some
      // other attributes of interest:
      //
      //   g_editable="true"  <--  google specific
      //
      //   spellcheck="true"  <--  generaly used
      //
      //   role="textbox"     <--  generaly used
      //   role="combobox"    <--  this one is text related too
      //
      //     http://www.w3.org/TR/wai-aria/roles#role_definitions
      //
      if ( target.contentEditable == 'true'      ||
           target instanceof HTMLTextAreaElement ||
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

