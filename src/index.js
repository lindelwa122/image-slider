import './style/style.css';
import { nanoid } from 'nanoid';

/**
 * Creates an image slider with the specified dimensions and images.
 *
 * @param {string} height - The height of the image slider container (e.g., '350px').
 * @param {string} width - The width of the image slider container (e.g., '450px').
 * @param {...Object} images - Image objects in the format { src: 'image_url', alt: 'image_description' }.
 * @throws Will throw an error if image objects are not provided or if they don't have the src attribute.
 * @returns {Object} An object with methods to manage the image slider.
 */
const imageSlider = (height, width, ...images) => {
  // Prevent selector from starting with a number
  const id = 'd' + nanoid();
  let _current = 0;

  height = !height && width ? width : height;
  width = !width && height ? height : width;

  let _configurations = {
    animation: true,
    animationDuration: 500,
    imageFit: 'cover',
    showCounter: true,
    showControls: true,
    showDots: true,
  };

  const _counter = () => {
    const counter = document.createElement('div');
    counter.className = `lin-slider-counter`;
    counter.id = `${id}-lsc`;
    counter.innerHTML = `${_current + 1} / ${images.length}`;
    return counter;
  };

  const _currentImageTracker = () => {
    const container = document.createElement('div');
    container.className = 'lin-tracker';
    container.style.width = width;
    container.id = `${id}-tracker`;

    for (let i = 0; i < images.length; i++) {
      if (i === 0) {
        const firstDot = _dot(i);
        firstDot.classList.add('active');
        container.appendChild(firstDot);
      } else {
        container.appendChild(_dot(i));
      }
    }

    return container;
  };

  const _dot = (count) => {
    const dot = document.createElement('div');
    dot.classList = `lin-dot ${id}-ld`;
    dot.dataset.count = count;
    dot.addEventListener('click', () => {
      _current = count;
      _update();
    });
    return dot;
  };

  const _image = () => {
    const img = document.createElement('img');

    if (typeof images[_current] !== 'object' || !images[_current].src) {
      throw new Error(
        'images must contain objects and they must have the src attribute.',
      );
    }

    if (images[_current].alt) {
      img.alt = images[_current].alt;
    }

    img.src = images[_current].src;
    img.classList = `lin-img lin-img-style-${_configurations.imageFit}`;
    img.id = `${id}-limg`;

    if (height === width) {
      img.style.aspectRatio = '1/1';
    }

    return img;
  };

  const _init = () => {
    const container = document.createElement('div');

    if (_configurations.showDots) {
      container.append(_slider(), _currentImageTracker());
    } else {
      container.append(_slider());
    }

    return container;
  };

  const _moveBack = () => {
    _current = _current === 0 ? images.length - 1 : _current - 1;
    _update();
  };

  const _moveForward = () => {
    _current = _current === images.length - 1 ? 0 : _current + 1;
    _update();
  };

  const _next = () => {
    const next = document.createElement('div');
    next.className = 'lin-next';
    next.innerHTML = '❯';
    next.addEventListener('click', _moveForward);
    return next;
  };

  const _overlay = () => {
    const overlay = document.createElement('div');
    overlay.className = 'lin-overlay';

    const interactions = document.createElement('div');
    interactions.className = 'lin-interactions';

    interactions.append(_previous(), _next());

    if (_configurations.showCounter && _configurations.showControls) {
      overlay.append(_counter(), interactions);
    } else if (_configurations.showControls) {
      overlay.append(interactions);
    } else if (_configurations.showCounter) {
      overlay.append(_counter());
    }

    return overlay;
  };

  const _previous = () => {
    const prev = document.createElement('div');
    prev.className = 'lin-prev';
    prev.innerHTML = '❮';
    prev.addEventListener('click', _moveBack);
    return prev;
  };

  const _update = () => {
    _updateImg();

    if (_configurations.showCounter) {
      _updateCounter();
    }

    if (_configurations.showDots) {
      _updateTracker();
    }
  };

  const _updateCounter = () => {
    const counter = document.querySelector(`#${id}-lsc`);
    counter.innerHTML = `${_current + 1} / ${images.length}`;
  };

  const _updateImg = () => {
    const img = document.querySelector(`#${id}-limg`);

    if (typeof images[_current] !== 'object' || !images[_current].src) {
      throw new Error(
        'images must contain objects and they must have the src attribute.',
      );
    }

    if (images[_current].alt) {
      img.alt = images[_current].alt;
    }

    img.src = images[_current].src;

    if (_configurations.animation) {
      const keyframes = [{ opacity: 0.4 }, { opacity: 1 }];
      const options = {
        duration: _configurations.animationDuration,
        iteration: 1,
      };
      img.animate(keyframes, options);
    }
  };

  const _updateTracker = () => {
    const dots = document.querySelectorAll(`.${id}-ld`);
    dots.forEach((dot) => dot.classList.remove('active'));
    for (const dot of dots) {
      if (+dot.dataset.count === _current) {
        dot.classList.add('active');
      }
    }
  };

  const _slider = () => {
    const slider = document.createElement('div');
    slider.className = 'lin-image-slider';
    slider.style.height = height;
    slider.style.width = width;

    slider.append(_image(), _overlay());

    return slider;
  };

  /**
   * Creates an interval to automatically advance the image in the slider.
   *
   * @param {number} [ms=1000] - The number of milliseconds between each image update.
   * @returns {number} An interval ID that can be used with clearInterval to stop the automatic image updates.
   */
  const auto = (ms = 1000) => {
    return setInterval(_moveForward, ms);
  };

  /**
   * Appends the image slider to the specified parent element using its selector.
   *
   * @param {string} selectors - The CSS selector of the parent element where the image slider will be appended.
   */
  const append = (selectors) => {
    const parent = document.querySelector(selectors);
    parent.appendChild(_init());
  };

  /**
   * Updates the slider configuration with the specified new settings.
   *
   * @param {Object} updatedConfig - The updated configurations for the slider.
   * @param {boolean} updatedConfig.animation - Whether to enable animation.
   * @param {number} updatedConfig.animationDuration - The duration of the animation in milliseconds.
   * @param {"cover" | "none" | "fill" | "contain"} updatedConfig.imageFit - The image fit mode.
   * @param {boolean} updatedConfig.showCounter - Whether to display the image counter.
   * @param {boolean} updatedConfig.showControls - Whether to display navigation controls.
   * @param {boolean} updatedConfig.showDots - Whether to display navigation dots.
   */
  const updateConfig = (updatedConfig) => {
    Object.assign(_configurations, updatedConfig);
  };

  return { append, auto, updateConfig };
};

export default imageSlider;
