function init(){

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
  
        // Reload CSS files
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
          const absoluteUrl = 'https://your-github-username.github.io/your-repo-name/' + link.href;
          console.log('Reloading CSS file:', absoluteUrl);
          link.href = absoluteUrl + '?v=' + new Date().getTime();
        });
  
        // Reload JS files
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach((script) => {
          const absoluteUrl = 'https://your-github-username.github.io/your-repo-name/' + script.src;
          console.log('Reloading JS file:', absoluteUrl);
          script.src = absoluteUrl + '?v=' + new Date().getTime();
        });
      }
    }
  });
}

window.addEventListener('load', function(){
  init();
});