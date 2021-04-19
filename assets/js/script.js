const drawer = function () {
  const settings = {
    speedOpen: 50,
    speedClose: 350,
    activeClass: 'is-active',
    visibleClass: 'is-visible',
    selectorTarget: '[data-drawer-target]',
    selectorTrigger: '[data-drawer-trigger]',
    selectorClose: '[data-drawer-close]',
  };

  const toggleccessibility = function (event) {
    if (event.getAttribute('aria-expanded') === 'true') {
      event.setAttribute('aria-expanded', false);
    } else {
      event.setAttribute('aria-expanded', true);
    }
  };

  const openDrawer = function (trigger) {
    let target = document.getElementById(trigger.getAttribute('aria-controls'));

    target.classList.add(settings.activeClass);

    document.documentElement.style.overflow = 'hidden';

    toggleccessibility(trigger);

    setTimeout(function () {
      target.classList.add(settings.visibleClass);
    }, settings.speedOpen);
  };

  const closeDrawer = function (event) {
    let closestParent = event.closest(settings.selectorTarget),
      childrenTrigger = document.querySelector(
        '[aria-controls="' + closestParent.id + '"'
      );

    closestParent.classList.remove(settings.visibleClass);

    document.documentElement.style.overflow = '';

    toggleccessibility(childrenTrigger);

    setTimeout(function () {
      closestParent.classList.remove(settings.activeClass);
    }, settings.speedClose);
  };

  const clickHandler = function (event) {
    var toggle = event.target,
      open = toggle.closest(settings.selectorTrigger),
      close = toggle.closest(settings.selectorClose);

    if (open) {
      openDrawer(open);
    }

    if (close) {
      closeDrawer(close);
    }

    if (open || close) {
      event.preventDefault();
    }
  };

  const keydownHandler = function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      let drawers = document.querySelectorAll(settings.selectorTarget),
        i;

      for (i = 0; i < drawers.length; ++i) {
        if (drawers[i].classList.contains(settings.activeClass)) {
          closeDrawer(drawers[i]);
        }
      }
    }
  };

  document.addEventListener('click', clickHandler, false);
  document.addEventListener('keydown', keydownHandler, false);
};

drawer();
