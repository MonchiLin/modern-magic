import dom2element from "dom-to-image";

/**
 *
 * @param el {HTMLElement}
 * @return {Promise<unknown>}
 */
export function toCanvas(el) {
  return new Promise(resolve => {
    dom2element.toPng(el)
      .then(pngDataURI => {
        const canvas = document.createElement("canvas");
        const rect = el.getBoundingClientRect()
        canvas.style.position = "fixed"
        canvas.style.left = rect.left + "px"
        canvas.style.top = rect.top + "px"
        canvas.style.zIndex = "20"
        canvas.width = rect.width
        canvas.height = rect.height
        canvas.style.width = rect.width + 'px'
        canvas.style.height = rect.height + 'px'
        const context = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
          setTimeout(() => resolve(canvas))
        }
        img.src = pngDataURI;
      })
  })
}

export function easeInOutQuint(elapsed, initialValue, amountOfChange, duration) {
  if ((elapsed /= duration / 2) < 1) {
    return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
  }
  return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
}

export function easeInOutQuart(elapsed, initialValue, amountOfChange, duration) {
  if ((elapsed /= duration / 2) < 1) {
    return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
  }
  return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
}

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

function getMaxRadius(canvas) {
  return Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
}

export const crop = (canvas, initialPosition, {reverse = false}) => {
  const ctx = canvas.getContext('2d');
  const {x, y} = getMousePos(canvas, initialPosition);
  const maxRadius = getMaxRadius(canvas);

  return new Promise(resolve => {
    let progress = 0;
    const duration = 60;
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.globalCompositeOperation = reverse ? 'destination-in' : 'destination-out';

    function draw() {
      let radius;
      if (reverse) {
        radius = easeInOutQuint(progress, maxRadius, -maxRadius, duration);
      } else {
        radius = easeInOutQuart(progress, 0, maxRadius, duration);
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();

      progress++;

      if (progress < duration) {
        requestAnimationFrame(draw);
      } else {
        resolve(canvas);
      }
    }

    draw();
  })
}
