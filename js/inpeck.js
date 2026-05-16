
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showtoast('Sorry :(', 'error');
    return false;
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }
  });
  setInterval(function() {
    debugger;
  }, 100);