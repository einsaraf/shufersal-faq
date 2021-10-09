const navButtons = document.getElementById('nav-bar').children; // All navigation buttons
const navPages = document.getElementById('main-container').children; // All navigation pages

let i = 0;
for (i; i < navButtons.length; i++) { // Add to each navigation button and navigation page and somewhat similar id
  navButtons[i].id = 'nb' + i; // for instance 'nb1' button will reveal 'nb1-content' page content
  navButtons[i].classList.add('nav-btn'); // Add a class to each button
  navPages[i + 1].id = navButtons[i].id + '-content';
  navPages[i + 1].classList.add('button-content'); // Add a class to each page
  if ((i + 1) >= navButtons.length)
    ++i;
}

document.getElementById('wlcm-pg').classList.remove('button-content'); // The first page is welcome-page, and the class of each other page
// is hidden with the 'button-content' class, removing it to reveal the welcome page
let stats = []; // Array with all stats(id[current id],title[in hebrew],counter[times hit])
let shwnPge; // Currently shown page
let clickedNavBtn; // Currently clicked button
let fndNavBtn = false; // Found flag

let j = 0;
for (j; j < navButtons.length; j++) {
  navButtons[j].addEventListener('click', function () {

    if (shwnPge) { // There is a shown page already
      if (this.id !== clickedNavBtn) { // The shown page is not related to the button being hit
        shwnPge.style.display = 'none'; // Hide the shown element
        navPages[this.id + '-content'].style.display = 'block'; // Reveal the hit element
        shwnPge = navPages[this.id + '-content']; // Save the now shown page
      }
    } else { // First time user hits and there is not a shown page
      document.getElementById('main-container').classList.add('dark-shufersal'); // Add dark-shuferal theme for readability
      document.getElementById('wlcm-pg').style.display = 'none'; // Hide the welcome page
      navPages[this.id + '-content'].style.display = 'block'; // Reveal the content related to the button hit
      shwnPge = navPages[this.id + '-content']; // Save the shown page for later
      clickedNavBtn = this.id; // Save the recently clicked button
    }

    if (stats.length > 0) { // If there is any stat in the array
      if (this.id !== clickedNavBtn) { // Enter if
        let q = 0;
        for (q; q < stats.length; q++) {
          if (stats[q].button === this.id) { // Button hit was found in the array
            stats[q].counter += 1;        // Increase its counter
            fndNavBtn = true;                 // Flag we found the stat
          }
          // So if found is true, it will not be added more than once
        }
        if (!fndNavBtn) {                          // If found false, that it does not exist in the array
          stats.push({button: this.id, title: this.innerText, counter: 1}); // And then it is added
        }
        fndNavBtn = false; // Flag found false, for next iteration
        clickedNavBtn = this.id;
      }
    } else stats.push({button: this.id, title: this.innerText, counter: 1});
    clickedNavBtn = this.id; // Save the recently clicked button
  });
}

const grmnBtns = document.getElementsByClassName('garmon-button');
const grmnPages = document.getElementsByClassName('garmon-content');

let l = 0;
for (l; l < grmnBtns.length; l++) {
  grmnBtns[l].id = 'gb-' + l;
  grmnPages[l].id = grmnBtns[l].id + '-content';
}

let shwnGuide; // Currently shown guide
let pressedBtn; // Currently clicked guide button
let fndGrmBtn = false; // Found flag
let k = 0;
for (k; k < grmnBtns.length; k++) {
  grmnBtns[k].addEventListener('click', function () {

    shwnGuide = document.getElementById(this.id + '-content'); // Get the content of the selected button
    if (shwnGuide.style.maxHeight) { // Is it open?
      this.classList.remove('active-garmon'); // Remove the active button class
      shwnGuide.style.maxHeight = null; // Remove the content active height
    } else if (pressedBtn) { // Is there an open button already
      pressedBtn.classList.remove('active-garmon');
      document.getElementById(pressedBtn.id + '-content').style.maxHeight = null;
      this.classList.add('active-garmon');
      shwnGuide.style.maxHeight = shwnGuide.scrollHeight + 'px';
      pressedBtn = this;
    } else {
      this.classList.add('active-garmon');
      shwnGuide.style.maxHeight = shwnGuide.scrollHeight + 'px';
      pressedBtn = this;
    }

    if (this.classList.contains('active-garmon') && stats > 0) {
      let e = 0;
      for (e; e < stats.length; e++) {
        if (stats[e].button === this.id) {
          stats[e].counter += 1;
          fndGrmBtn = true;
        }
      }
      if (!fndGrmBtn)
        stats.push({button: this.id, title: this.innerText, counter: 1});
    } else if (this.classList.contains('active-garmon')) {
      stats.push({button: this.id, title: this.innerText, counter: 1});
    }
    fndGrmBtn = false;
  });
}
;

(function sendStats() {
  const rndStats = Math.floor(Math.random() * ((600000 - 60000) + 60000));
  if (stats.length === 0)
    return window.setTimeout(sendStats, rndStats);
  let statsXHR = new XMLHttpRequest();
  statsXHR.open('POST', 'X', true);
  statsXHR.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  statsXHR.send(JSON.stringify(stats));
  stats = [];
  window.setTimeout(sendStats, rndStats);
})();

window.addEventListener('beforeunload', function closingCode() {
  if (stats.length !== 0) {
    let xhrOnExit = new XMLHttpRequest();
    xhrOnExit.open('POST', 'X', true);
    xhrOnExit.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhrOnExit.send(JSON.stringify(stats));
    return null;
  }
});

(function getCounter() {
  const rndCounter = Math.floor(Math.random() * ((600000 - 60000) + 60000));

  function callback(responseText) {
    document.getElementById('counter').innerText = responseText;
  }

  let counterXHR = new XMLHttpRequest();
  counterXHR.onreadystatechange = function () {
    if (counterXHR.readyState === 4 && counterXHR.status === 200)
      callback(counterXHR.responseText);
  }
  counterXHR.open("GET", 'X', true);
  counterXHR.send(null);
  window.setTimeout(getCounter, rndCounter);
}());

function pasteConsoleLink() {
  const copyText = document.getElementById("js-console-link");
  copyText.select();
  document.execCommand("copy");
}


