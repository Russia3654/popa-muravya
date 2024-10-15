function init() {
  console.log('Initializing...');

  const loader = document.querySelector('.loader');

  gsap.set(loader, {
    scaleX: 0,
    rotation: 10,
    xPercent: -5,
    yPercent: -50,
    transformOrigin: 'left center',
    autoAlpha: 1
  });

  function loaderIn() {
    return gsap.fromTo(loader, 
      {
        rotation: 10,
        scaleX: 0,
        xPercent: -5
      },
      { 
        duration: 0.8,
        xPercent: 0,
        scaleX: 1, 
        rotation: 0,
        ease: 'Power4.inOut', 
        transformOrigin: 'left center'
      });
  }

  function loaderAway() {
    return gsap.to(loader, { 
      duration: 0.8, 
      scaleX: 0,
      xPercent: 5, 
      rotation: -10, 
      transformOrigin: 'right center', 
      ease: 'Power4.inOut'
    });
  }

  function updateHead(nextHtml) {
    const head = document.head;
    const newPageHead = nextHtml.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
    const newHeadContent = new DOMParser().parseFromString(newPageHead, 'text/html').head.children;

    // Remove all existing stylesheets and scripts
    const oldLinks = head.querySelectorAll('link[rel="stylesheet"]');
    const oldScripts = head.querySelectorAll('script');
    oldLinks.forEach(link => link.remove());
    oldScripts.forEach(script => script.remove());

    // Add new elements to head
    Array.from(newHeadContent).forEach(item => {
      if (item.tagName === 'LINK' || item.tagName === 'SCRIPT') {
        head.appendChild(item.cloneNode(true));
      }
    });
  }

  function updateScripts(container) {
    const newScripts = container.querySelectorAll('script');
    newScripts.forEach(script => {
      const newScript = document.createElement('script');
      Array.from(script.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(script.innerHTML));
      script.parentNode.replaceChild(newScript, script);
    });
  }

  barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning');
    barba.wrapper.classList.add('is-animating');
  });

  barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning');
    barba.wrapper.classList.remove('is-animating');
  });

  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });

  barba.init({
    cacheEnabled: false,
    transitions: [{
      async leave() {
        console.log('Leave transition started');
        await loaderIn();
        console.log('Leave transition finished');
      },
      async enter(data) {
        console.log('Enter transition started');
        updateHead(data.next.html);
        loaderAway();
        updateScripts(data.next.container);
        console.log('Enter transition finished');
      }
    }]
  });
}

window.addEventListener('load', function(){
  init();
});