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

  function loadPageResources(data) {
    return new Promise((resolve) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data.next.html, 'text/html');
      
      // Load CSS files
      const cssLinks = htmlDoc.querySelectorAll('link[rel="stylesheet"]');
      cssLinks.forEach(link => {
        if (!document.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
          document.head.appendChild(link.cloneNode());
        }
      });

      // Load JS files
      const scripts = htmlDoc.querySelectorAll('script');
      let scriptsToLoad = scripts.length;
      if (scriptsToLoad === 0) resolve();
      
      scripts.forEach(script => {
        if (script.src && !document.querySelector(`script[src="${script.src}"]`)) {
          const newScript = document.createElement('script');
          newScript.src = script.src;
          newScript.onload = () => {
            scriptsToLoad--;
            if (scriptsToLoad === 0) resolve();
          };
          document.body.appendChild(newScript);
        } else {
          scriptsToLoad--;
          if (scriptsToLoad === 0) resolve();
        }
      });
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
        await loadPageResources(data);
        loaderAway();
        console.log('Enter transition finished');
      }
    }]
  });
}

window.addEventListener('load', function(){
  init();
});