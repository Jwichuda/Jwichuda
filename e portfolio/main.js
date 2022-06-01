
const TypeWriter = function(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordsIndex = 0;
    this.wait = parseInt(wait, 20);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordsIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    // Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /=10;
    }

    // If words is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
     this.wordIndex++;
        // Pause before start typing
     typeSpeed = 150;
     
    }
    setTimeout(() => this.type(), 200)

    }

//Init On Dom Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWritter
    new TypeWriter(txtElement, words, wait);
}

