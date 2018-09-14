(function() {

  'use strict';

  // Hamburger menu
  const navbar = document.getElementById('js-navbar');
  const hamburger = document.getElementById('js-hamburger');
  hamburger.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      navbar.style.display = 'none';
      this.classList.remove('active');
    } else {
      navbar.style.display = 'block';
      this.classList.add('active');
    }
  });

  // Disable current link
  const currentLinks = document.getElementsByClassName('js-current');
  for (let i = 0; i < currentLinks.length; i++) {
    currentLinks[i].removeAttribute('href');
  }

  // Contact form
  const sendButton = document.getElementById('js-send');
  if (sendButton !== null) {
    const subjectField = document.getElementById('js-subject');
    const messageField = document.getElementById('js-message');
    sendButton.addEventListener('click', function() {
      const subject = subjectField.value.trim();
      const message = messageField.value.trim();
      let valid = true;
      if (subject === '') {
        subjectField.classList.add('invalid');
        valid = false;
      }
      if (message === '') {
        messageField.classList.add('invalid');
        valid = false;
      }
      if (valid) {
        const mailString =
          `mailto:chunkhang@gmail.com?subject=${subject}&body=${message}`;
        const mailUrl = mailString
          .replace(/ /g, '%20')
          .replace(/\n/g, '%0A');
        window.location.href = mailUrl;
      }
    });
    subjectField.addEventListener('focus', function() {
      this.classList.remove('invalid');
    });
    messageField.addEventListener('focus', function() {
      this.classList.remove('invalid');
    });
  }

})();
