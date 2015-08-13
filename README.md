Slash Preserver
===============

Slash Preserver (slashpreserver) is a simple Firefox addon intended to prevent
websites from hijacking the slash key ('/') for something other than the
standard Firefox find bar.

If there is a simple GreaseMonkey script that can do this for all web sites, I
would use that instead, unfortunately, I've yet to find that script...

From what I've been able to gather, when Firefox gets a keystroke, it lets the
javascript engine get first access to it, and then (if the JS engine allows
it) the key event it sent to the Firefox UI (XUL).

This design strikes me an unfortunate as it allows websites to "run amok".
The FF designers probably consider that to be a feature and not a bug...

Anywho, a regular "xul overlay" style addon is not able to solve the slash
abuse problem as the xul layer never gets to see the key event!

The good news is that addons can also have a "JS overlay", and that's what
this addon uses to get first crack at the key event (inside JS) as the addon
gets loaded before the JS from the website.

In essence, when the JS overlay sees the slash key, it does:

```java
  gFindBar.onFindCommand();
  event.preventDefault();
  event.stopPropagation();
```

I had hoped that the stop/prevent methods would be sufficient to solve the
problem, but it's not as they block the XUL layer from getting the key too.  I
would prefer to not have to fire the gFindBar method in the addon because that
method is what would fire if I succeed in simply blocking "evil site" from
seeing the slash key event.  Alas, I could not get that to work...

This is also why (I think) GreaseMonkey can not handle this problem for all
cases.  GM has the ability to intercept the key and fire an alert(), or
whatever, but it does not have access to the gFindBar method (AFAIK), so it
can't fire that.  Also, if GM merely does a stopPropagation(), then XUL never
gets the slash key (same problem as with the JS overlay).

Sample sites that abuse the slash key (I'm looking at you google):
------------------------------------------------------------------

* [YouTube](https://www.youtube.com/watch?v=TllPrdbZ-VI)
* [Google Groups](https://groups.google.com/forum/#!msg/vim_use/r3TdW9G9ms4/s-Jr3BpcnvUJ)

See also:
---------

* [](http://github.com/perkint/slashpreserver)

* [](http://en.wikipedia.org/wiki/Don't_be_evil)

* [](http://stackoverflow.com/questions/29732741)

* [](http://developer.mozilla.org/en-US/Add-ons/Code_snippets/On_page_load)

Installing this addon:
----------------------

* For paranoid people:

    Download the zip archive and inspect/build from source (it's small).

* For trusting people:

    DL the XPI file (listed above) and then install the addon from your local
    drive, e.g.:

```
      file:///tmp/slashpreserver.xpi
```

