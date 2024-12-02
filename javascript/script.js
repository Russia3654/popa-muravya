function init() {

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

      // Function to get the full URL of a resource
      function getFullUrl(url) {
        const a = document.createElement('a');
        a.href = url;
        return a.href;
      }

      // Remove old page-specific stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const fullHref = getFullUrl(link.getAttribute('href'));
        if (!Array.from(htmlDoc.querySelectorAll('link[rel="stylesheet"]')).some(newLink => getFullUrl(newLink.getAttribute('href')) === fullHref)) {
          link.remove();
        }
      });

      // Load new CSS files
      htmlDoc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const fullHref = getFullUrl(link.getAttribute('href'));
        if (!Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(existingLink => getFullUrl(existingLink.getAttribute('href')) === fullHref)) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = fullHref;
          document.head.appendChild(newLink);
        }
      });

      // Remove old page-specific scripts
      document.querySelectorAll('script').forEach(script => {
        if (script.src) {
          const fullSrc = getFullUrl(script.src);
          if (!Array.from(htmlDoc.querySelectorAll('script')).some(newScript => newScript.src && getFullUrl(newScript.src) === fullSrc)) {
            script.remove();
          }
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
            const fullSrc = getFullUrl(script.src);
            if (!Array.from(document.querySelectorAll('script')).some(existingScript => existingScript.src && getFullUrl(existingScript.src) === fullSrc)) {
              const newScript = document.createElement('script');
              newScript.src = fullSrc;
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
        await loaderIn();
      },
      async enter(data) {
        await loadPageResources(data);
        loaderAway();
      },
      async after(data) {
        // This hook runs after the new content has been added to the page
        // You can use it to reinitialize any scripts that need to run on the new page
        if (data.next.namespace === 'quiz') {
          console.log('Entering quiz page');
          if (typeof window.initQuiz === 'function') {
            window.initQuiz();
          } else {
            console.error('initQuiz function not found');
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

window.addEventListener('load', function () {
  init();
});
