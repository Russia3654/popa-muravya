function initProjectAnimation() {
  let sliderRotation = 0;
  let autoRotation = 0;
  const autoRotationSpeed = 1;
  const autoRotationInterval = 40; // 1 second
  const stopPoints = [60, 120, 180, 240, 300, 360]; // add more stop points as needed
  let isIdle = false;
  let idleTimeout = null;
  let lastIndex = stopPoints.length - 1; // index of the last stop point
  let isScrolling = false; // flag to track if the user is scrolling
  let lastScrollTime = 0; // last scroll time
  let scrollDirection = 0; // scroll direction

  function updateSliderRotation() {
    const slider = document.querySelector('.slider');
    const particleSphere = document.querySelector('.particle-sphere');
    const items = slider.querySelectorAll('.item'); // Get all items in the slider
    const numberOfItems = items.length; // Total number of items

    if (slider) {
      slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${sliderRotation}deg)`;
    }
    particleSphere.style.transform = `translate(-50%, -50%) rotateY(${-sliderRotation}deg)`;

    // Check if the screen width is smaller than or equal to 768px
    // Check if the screen width is smaller than or equal to 768px
    if (window.innerWidth <= 768) {
      // Remove hover class from all items
      items.forEach(item => {
        item.classList.remove('hovered'); // Remove hover class from all items
      });

      // Calculate the current index based on the slider rotation
      const indexPerStop = 360 / numberOfItems; // Calculate the angle per item
    const normalizedRotation = (360 - (sliderRotation + indexPerStop / 2)) % 360; // Reverse the rotation
    const currentIndex = Math.floor(normalizedRotation / indexPerStop) + 1; // Calculate the current index

      // Ensure the currentIndex is within bounds
      if (currentIndex >= 0 && currentIndex < numberOfItems) {
        // Simulate hover effect on the current item
        const currentItem = items[currentIndex];
        if (currentItem) {
          currentItem.classList.add('hovered'); // Add hover class
        }
      }
    }
  }

  // Automatic animation
  const autoRotationIntervalId = setInterval(() => {
    if (!isIdle && !isScrolling) {
      autoRotation += autoRotationSpeed;
      sliderRotation = Math.round(autoRotation);

      // check if we've reached a stop point
      for (let i = 0; i < stopPoints.length; i++) {
        if (Math.abs(autoRotation - stopPoints[i]) < autoRotationSpeed) {
          autoRotation = stopPoints[i];
          sliderRotation = stopPoints[i]; // reset sliderRotation to the stop point
          isIdle = true;
          idleTimeout = setTimeout(() => {
            isIdle = false;
            if (i === lastIndex) { // only reset autoRotation at the last stop point
              autoRotation = 0;
            }
          }, 5000); // 5 seconds
          break;
        }
      }
    }

    updateSliderRotation();
  }, autoRotationInterval);

  // Manual animation with scroll effect
  function handleWheel(event) {
    isScrolling = true; // set flag to true when user starts scrolling
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastScrollTime;
    lastScrollTime = currentTime;

    const scrollDelta = event.deltaY;
    scrollDirection = scrollDelta > 0 ? 1 : -1;

    // Adjust sliderRotation based on scroll direction
    sliderRotation += scrollDirection * 10;

    // Implement wraparound behavior
    if (sliderRotation < 0) {
      sliderRotation = 360;
    } else if (sliderRotation > 360) {
      sliderRotation = 0;
    }

    sliderRotation = Math.round(sliderRotation);

    // update autoRotation value
    autoRotation = sliderRotation;

    updateSliderRotation();

    // reset flag after a short delay to allow for smooth scrolling
    setTimeout(() => {
      isScrolling = false;
    }, 100);
  }

  document.body.addEventListener('wheel', handleWheel);

  // synchronize manual and automatic animations
  const syncIntervalId = setInterval(() => {
    if (!isScrolling) {
      sliderRotation = Math.round(autoRotation);
      updateSliderRotation();
    }
  }, autoRotationInterval);

  // Cleanup function
  return function cleanup() {
    clearInterval(autoRotationIntervalId);
    clearInterval(syncIntervalId);
    document.body.removeEventListener('wheel', handleWheel);
  };
}

// Run the initialization if we're on the project page
if (document.querySelector('.slider')) {
  const cleanup = initProjectAnimation();

  // If you're using Barba.js, you might want to call the cleanup function
  // when leaving the page. You can do this in the Barba.js leave hook.
  if (window.barba) {
    window.barba.hooks.leave(() => { cleanup(); });
  }
}