const width = 500;
const height = width;
const lw = 1;
const padding = 50;
const r = width / 2 - padding - lw;
const o = width / 2;
const a = 40;
const b = 2 * r + padding + lw + 10;

const tau = Math.PI * 2;
const cos = (fraction) => Math.cos(rad(fraction));
const sin = (fraction) => Math.sin(rad(fraction));

const tauEl = document.getElementById("tau");
const textEl = document.getElementById("text");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

ctx.font = "16px serif";

// Circle
ctx.beginPath();
ctx.arc(o, o, r, tau, 0);
ctx.lineWidth = lw;
ctx.strokeStyle = "#000";
ctx.stroke();
ctx.closePath();

// Horizontal line
ctx.strokeStyle = "#999";
ctx.beginPath();
ctx.moveTo(a, o);
ctx.lineTo(b, o);
ctx.stroke();
ctx.closePath();

// Vertical line
ctx.beginPath();
ctx.moveTo(o, a);
ctx.lineTo(o, b);
ctx.stroke();
ctx.closePath();

// Draw text
const r2 = r + 20;
ctx.strokeStyle = "#000";
ctx.textBaseline = "middle";
ctx.fillText("0 t", o + r2, o);
ctx.fillText("1 / 8 t", o + r2 * cos(1 / 8), o + r2 * sin(-1 / 8));
ctx.fillText("2 / 8 t", o - 14 + r2 * cos(1 / 4), o + r2 * sin(-1 / 4));
ctx.fillText("3 / 8 t", o - 30 + r2 * cos(3 / 8), o + r2 * sin(-3 / 8));
ctx.fillText("4 / 8 t", o - 30 + r2 * cos(1 / 2), o);
ctx.fillText("5 / 8 t", o - 30 + r2 * cos(5 / 8), o + r2 * sin(3 / 8));
ctx.fillText("6 / 8 t", o - 14, o + 4 + r2 * sin(1 / 4));
ctx.fillText("7 / 8 t", o + r2 * cos(7 / 8), o + r2 * sin(1 / 8));

// Draw triangle
ctx.strokeStyle = "#999";
ctx.beginPath();
ctx.moveTo(o + r * cos(1 / 8), o - 20);
ctx.lineTo(o + r * cos(1 / 8) - 20, o - 20);
ctx.lineTo(o + r * cos(1 / 8) - 20, o);
ctx.arc(o, o, 20, 0, rad(-1 / 8), true);
ctx.stroke();
ctx.closePath();

ctx.strokeStyle = "#000";
ctx.beginPath();
ctx.moveTo(o, o);
ctx.lineTo(o + r * cos(1 / 8), o + r * sin(-1 / 8));
ctx.lineTo(o + r * cos(1 / 8), o);
ctx.lineTo(o, o);
ctx.stroke();
ctx.closePath();

function rad(fraction) {
  return fraction * tau;
}

let isDrawing = false;

canvas.addEventListener("mousedown", () => {
  isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    draw(e.offsetX, e.offsetY);
  }
});

window.addEventListener("mouseup", () => {
  if (!isDrawing) {
    return;
  }

  isDrawing = false;
});

let radAngle = 0;

async function draw(x2, y2) {
  let opposite = 0;
  let adjacent = 0;
  let tauOffset = 0;

  if (radAngle > tau * 0.99) {
    drawArc(tau);
    tauEl.innerHTML = 1;
    isDrawing = false;

    let intervalCounter = 1;
    const dotUpdater = () => {
      if (intervalCounter > 3) {
        clearInterval(timer);
      }
      const dots = new Array(intervalCounter);
      tauEl.innerHTML = `1${dots.join(".")}`;

      intervalCounter++;
    };

    dotUpdater();

    const timer = setInterval(dotUpdater, 1000);

    await wait();

    window.requestAnimationFrame(scaleCanvas);
    return;
  }

  if (x2 >= o && y2 <= o) {
    opposite = o - y2;
    adjacent = x2 - o;
  } else if (radAngle > 1.5 && x2 < o && y2 <= o) {
    opposite = o - x2;
    adjacent = o - y2;
    tauOffset = tau / 4;
  } else if (radAngle > 3 && x2 < o && y2 > o) {
    opposite = y2 - o;
    adjacent = o - x2;
    tauOffset = tau / 2;
  } else if (radAngle > 4.5 && x2 >= o && y2 > o) {
    opposite = x2 - o;
    adjacent = y2 - o;
    tauOffset = tau * (3 / 4);
  }
  const hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));
  radAngle = tauOffset + Math.asin(opposite / hypotenuse) || 0.0;

  drawArc(radAngle);
  drawFillArc(radAngle);
  tauEl.innerHTML = (radAngle / tau).toFixed(2);
}

function drawArc(radAngle) {
  ctx.beginPath();
  ctx.arc(o, o, r, 0, -1 * radAngle, true);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#f00";
  ctx.stroke();
  ctx.closePath();
}

function drawFillArc(radAngle) {
  ctx.beginPath();
  ctx.arc(o, o, r * (radAngle / tau), tau, 0);
  ctx.lineWidth = 1;
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

async function wait() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

const maxIterations = 80;
let counter = 1;

function scaleCanvas() {
  if (counter > maxIterations) {
    fullscreenCanvasAnimation();
    return;
  }

  canvas.style.transform = `scale(${1 + counter * 0.04})`;

  counter++;

  window.requestAnimationFrame(scaleCanvas);
}

let ox;
let oy;
let r3;
let dy;
let w;
let h;

function fullscreenCanvasAnimation() {
  w = window.innerWidth;
  h = window.innerHeight;
  r3 = w / 2;
  ox = w / 2;
  oy = h / 2;
  dy = oy;

  canvas.width = w;
  canvas.height = h;
  canvas.style.transform = null;
  textEl.style.visibility = "hidden";

  ctx.strokeStyle = "#628";
  ctx.lineWidth = 1;

  window.requestAnimationFrame(drawVerticalLine);
}

function drawVerticalLine() {
  if (dy < 0) {
    ctx.lineWidth = 2;
    window.requestAnimationFrame(drawPatterns);
    return;
  }

  ctx.beginPath();
  ctx.moveTo(ox, dy);

  dy = dy - 10;

  ctx.lineTo(ox, dy);
  ctx.stroke();
  ctx.closePath();

  window.requestAnimationFrame(drawVerticalLine);
}

let offset = 0.01;

function drawPatterns() {
  if (offset > 1.5) {
    ctx.lineWidth = 4;
    window.requestAnimationFrame(drawEntropy);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(ox, oy);
  ctx.lineTo(ox + r3 * sin(1 / 8 - offset), oy + r3 * sin(1 / 8));
  // ctx.lineTo(ox + r3 * sin(2 / 8 - offset), oy + r3 * sin(2 / 8));
  ctx.lineTo(ox + r3 * sin(3 / 8 - offset), oy + r3 * sin(3 / 8));
  // ctx.lineTo(ox + r3 * sin(4 / 8 - offset), oy + r3 * sin(4 / 8));
  ctx.lineTo(ox + r3 * sin(5 / 8 - offset), oy + r3 * sin(-4 / 8));
  // ctx.lineTo(ox + r3 * sin(6 / 8 - offset), oy + r3 * sin(6 / 8));
  ctx.lineTo(ox + r3 * sin(7 / 8 - offset), oy + r3 * sin(-2 / 8));
  // ctx.lineTo(ox + r3 * sin(1 / (3 / 4) - offset), oy + r3 * sin(1 / (3 / 4)));
  ctx.moveTo(ox, oy);
  ctx.lineTo(ox + r3 * cos(1 / 4 - offset), oy + r3 * cos(-1 / 4));
  ctx.lineTo(ox + r3 * cos(1 / 2 - offset), oy + r3 * cos(-1 / 2));
  ctx.lineTo(ox + r3 * cos(1 / (3 / 4) - offset), oy + r3 * cos(-1 / (3 / 4)));
  ctx.stroke();
  ctx.closePath();

  offset = offset + 0.01;

  window.requestAnimationFrame(drawVerticalLine);
}

let dx = 0;
let dx2 = window.innerWidth;

function drawEntropy() {
  if (dx > w + 4) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fff";

    window.requestAnimationFrame(forArc);
    return;
  }
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(dx, 0);
  ctx.lineTo(dx, h);
  ctx.stroke();
  ctx.closePath();

  dx = dx + 4;

  if (dx < r3) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(dx2, 0);
    ctx.lineTo(dx2, h);
    ctx.stroke();
    ctx.closePath();

    dx2 = dx2 - 4;
  }

  window.requestAnimationFrame(drawEntropy);
}

const maxIterations2 = 100;
const interval = -1 / maxIterations2;
let counter2 = 1;

function forArc() {
  if (counter2 > maxIterations2) {
    return;
  }

  const currentTau = counter2 * interval * tau;
  tauEl.innerHTML = (-1 * counter2 * interval).toFixed(2);

  ctx.beginPath();
  ctx.arc(ox, oy, r, 0, currentTau, true);
  ctx.stroke();
  ctx.closePath();

  counter2++;

  window.requestAnimationFrame(forArc);
}
