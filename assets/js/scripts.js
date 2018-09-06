(function() {
  'use strict';

  let navigation = document.getElementById('navigation');
  let hamburger = document.getElementById('hamburger-toggle');
  hamburger.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      navigation.style.display = 'none';
      this.classList.remove('active');
    } else {
      navigation.style.display = 'block';
      this.classList.add('active');
    }
  });
})();
