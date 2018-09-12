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

})();
