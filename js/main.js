document.addEventListener('DOMContentLoaded', () => {

  const toggle = document.querySelector('.nav-toggle-4');
  const panel = document.querySelector('.mobile-panel-4');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? closeIcon() : menuIcon();
    });
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = menuIcon();
      });
    });
  }
  function menuIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>';
  }
  function closeIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  const revealEls = document.querySelectorAll('.reveal-4');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }


  // Fridge program profit calculator
  const fridgeSlider = document.getElementById('fridge-slider');
  if (fridgeSlider) {
    const hostProfitPerCup = 15; // NT$55 avg bottled price, estimated host share
    const valEl = document.getElementById('fridge-slider-val');
    const hostEl = document.getElementById('fridge-host-profit');
    const fmt = (n) => 'NT$ ' + n.toLocaleString('en-US');
    function updateFridge() {
      const cups = Number(fridgeSlider.value);
      valEl.textContent = cups + ' 瓶 / 日';
      hostEl.textContent = fmt(cups * hostProfitPerCup * 30);
    }
    fridgeSlider.addEventListener('input', updateFridge);
    updateFridge();
  }
});
