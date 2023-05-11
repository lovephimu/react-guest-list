## Aria Label

It's an attribute designed to help assistive technology (e.g. screen readers) attach a label to an otherwise anonymous HTML element.

So there's the <label> element:

<label for="fmUserName">Your name</label>
<input id="fmUserName">

The <label> explicitly tells the user to type their name into the input box where id="fmUserName".

aria-label does much the same thing, but it's for those cases where it isn't practical or desirable to have a label on screen. Take the MDN example:

<button aria-label="Close" onclick="myDialog.close()">X</button>`

Most people would be able to infer visually that this button will close the dialog. A blind person using assistive technology might just hear "X" read aloud, which doesn't mean much without the visual clues. aria-label explicitly tells them what the button will do.
