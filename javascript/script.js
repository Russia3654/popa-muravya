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
      
      // Remove old page-specific stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (!htmlDoc.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
          link.remove();
        }
      });
  
      // Load new CSS files
      const cssLinks = htmlDoc.querySelectorAll('link[rel="stylesheet"]');
      cssLinks.forEach(link => {
        if (!document.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = link.getAttribute('href');
          document.head.appendChild(newLink);
        }
      });
  
      // Remove old page-specific scripts
      document.querySelectorAll('script').forEach(script => {
        if (script.src && !htmlDoc.querySelector(`script[src="${script.src}"]`)) {
          script.remove();
        }
      });
  
      // Load new JS files
      const scripts = htmlDoc.querySelectorAll('script');
      let scriptsToLoad = scripts.length;
      
      if (scriptsToLoad === 0) {
        resolve();
      } else {
        scripts.forEach(script => {
          if (script.src) {
            if (!document.querySelector(`script[src="${script.src}"]`)) {
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
          } else {
            // For inline scripts
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
            scriptsToLoad--;
            if (scriptsToLoad === 0) resolve();
          }
        });
      }
    });
  }
  
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
      },
      async after(data) {
        // This hook runs after the new content has been added to the page
        // You can use it to reinitialize any scripts that need to run on the new page
        if (data.next.namespace === 'quiz') {
          // Reinitialize quiz-specific scripts here
          if (typeof initQuiz === 'function') {
            initQuiz();
          }
        } else if (data.next.namespace === 'project') {
          // Reinitialize project-specific scripts here
          if (typeof initProject === 'function') {
            initProject();
          }
        }
        // Add similar checks for other page-specific scripts
      }
    }]
  });
}

window.addEventListener('load', function(){
  init();
});