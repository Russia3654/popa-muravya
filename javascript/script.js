function init(){
    console.log('Initializing...');

  const loader = document.querySelector('.loader');

  gsap.set(loader,{
    scaleX:0,
    rotation:10,
    xPercent:-5,
    yPercent:-50,
    transformOrigin: 'left center',
    autoAlpha:1
  });
  function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
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
    // GSAP tween to hide the loading screen
    return gsap.to(loader, { 
        duration: 0.8, 
        scaleX: 0,
        xPercent: 5, 
        rotation: -10, 
        transformOrigin: 'right center', 
        ease: 'Power4.inOut'
    });
}

// do something before the transition starts
barba.hooks.before(() => {

    document.querySelector('html').classList.add('is-transitioning');
    barba.wrapper.classList.add('is-animating');

});

// do something after the transition finishes
barba.hooks.after(() => {

    document.querySelector('html').classList.remove('is-transitioning');
    barba.wrapper.classList.remove('is-animating');

});

// scroll to the top of the page
barba.hooks.enter(() => {

    window.scrollTo(0, 0);

});

function updateHeadSection(currentPage) {
  const head = document.querySelector('head');
  const main = document.querySelector('main');
  const cssFiles = {
    index: [
      '/popa-muravya/style.css',
      '/popa-muravya/style/header.css',
      '/popa-muravya/style/animation.css'
    ],
    quiz: [
      '/popa-muravya/style.css',
      '/popa-muravya/style/header.css',
      '/popa-muravya/style/animation.css',
      '/popa-muravya/style/quiz.css'
    ],
    about: [
      '/popa-muravya/style.css',
      '/popa-muravya/style/header.css',
      '/popa-muravya/style/animation.css',
      '/popa-muravya/style/about.css'
    ],
    // Add more pages here
  };
  const scriptFiles = {
    index: [
      '/popa-muravya/javascript/script.js',
      '/popa-muravya/javascript/template.js'
    ],
    quiz: [
      '/popa-muravya/javascript/script.js',
      '/popa-muravya/javascript/template.js',
      '/popa-muravya/javascript/quiz.js'
    ],
    about: [
      '/popa-muravya/javascript/script.js',
      '/popa-muravya/javascript/template.js',
      '/popa-muravya/javascript/about.js'
    ],
    // Add more pages here
  };

  const newCssFiles = cssFiles[currentPage];
  newCssFiles.forEach((cssFile) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    head.appendChild(link);
  });

  // Remove any old CSS files that are no longer needed
  const oldCssFiles = head.querySelectorAll('link[rel="stylesheet"]');
  oldCssFiles.forEach((oldCssFile) => {
    if (!newCssFiles.includes(oldCssFile.href)) {
      oldCssFile.remove();
    }
  });

  const newScriptFiles = scriptFiles[currentPage];
  main.innerHTML = '';
  newScriptFiles.forEach((scriptFile) => {
    const script = document.createElement('script');
    script.src = scriptFile;
    script.defer = true;
    main.appendChild(script);
  });
}

barba.init({
  cacheEnabled: false,
  transitions: [{
    async leave() {
      await loaderIn();
    },
    enter() {
      loaderAway();
    }
  }],
  hooks: {
    after() {
      console.log('After hook called');

      // Get the current page from the URL
      const currentPage = window.location.pathname.split('/').pop();

      // Update the head section with the new CSS files
      updateHeadSection(currentPage);
    }
  }
});
}

window.addEventListener('load', function(){
  init();
});