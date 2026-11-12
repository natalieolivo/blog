(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try {
      var value = localStorage.getItem('theme');
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null;
    }
  }

  function current() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }

  function sync() {
    if (button) button.setAttribute('aria-pressed', String(current() === 'dark'));
  }

  sync();

  if (button) {
    button.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  // Follow OS changes until the visitor makes a manual choice.
  var onChange = function () { if (!stored()) sync(); };
  if (media.addEventListener) media.addEventListener('change', onChange);
  else if (media.addListener) media.addListener(onChange);
})();
