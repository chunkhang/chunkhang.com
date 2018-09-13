(function() {

  'use strict';

  // Hamburger menu
  const navigation = document.getElementById('navigation');
  const hamburger = document.getElementById('hamburger-toggle');
  hamburger.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      navigation.style.display = 'none';
      this.classList.remove('active');
    } else {
      navigation.style.display = 'block';
      this.classList.add('active');
    }
  });

  // Disable current link
  const currentLinks = document.getElementsByClassName('current');
  for (let i = 0; i < currentLinks.length; i++) {
    currentLinks[i].removeAttribute('href');
  }

  // Contact form
  const subjectField = document.getElementById('subject-field');
  const messageField = document.getElementById('message-field');
  const sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', function() {
    const subject = subjectField.value.trim();
    const message = messageField.value.trim();
    let valid = true;
    if (subject === '') {
      subjectField.style.borderColor = 'red';
      valid = false;
    }
    if (message === '') {
      messageField.style.borderColor = 'red';
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
    this.style = '';
  });
  messageField.addEventListener('focus', function() {
    this.style = '';
  });

})();
