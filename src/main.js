const width = 500;
const height = width;
const lw = 1;
const padding = 50;
const r = width / 2 - padding - lw;
const o = r + padding + lw;
const a = 0 + 40;
const b = 2 * r + padding + lw + 10;

const tau = Math.PI * 2;
const cos = Math.cos;
const sin = Math.sin;

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

// Horizontal line
ctx.strokeStyle = "#999";
ctx.beginPath();
ctx.moveTo(a, o);
ctx.lineTo(b, o);
ctx.stroke();

// Vertical line
ctx.beginPath();
ctx.moveTo(o, a);
ctx.lineTo(o, b);
ctx.stroke();

// Draw text
const r2 = r + 20;
ctx.strokeStyle = "#000";
ctx.textBaseline = "middle";
ctx.fillText("0 t", o + r2, o);
ctx.fillText("1 / 8 t", o + r2 * cos(rad(1 / 8)), o - r2 * sin(rad(1 / 8)));
ctx.fillText("2 / 8 t", o - 14 + r2 * cos(rad(1 / 4)), o - r2 * sin(rad(1 / 4)));
ctx.fillText("3 / 8 t", o - 30 + r2 * cos(rad(3 / 8)), o - r2 * sin(rad(3 / 8)));
ctx.fillText("4 / 8 t", o - 30 + r2 * cos(rad(1 / 2)), o);
ctx.fillText("5 / 8 t", o - 30 + r2 * cos(rad(5 / 8)), o - r2 * sin(rad(5 / 8)));
ctx.fillText("6 / 8 t", o - 14, o + 4 - r2 * sin(rad(3 / 4)));
ctx.fillText("7 / 8 t", o - r2 * cos(rad(5 / 8)), o - r2 * sin(rad(5 / 8)));

// Draw triangle
ctx.strokeStyle = "#999";
ctx.beginPath();
ctx.moveTo(o + r * cos(rad(1 / 8)), o - 20);
ctx.lineTo(o + r * cos(rad(1 / 8)) - 20, o - 20);
ctx.lineTo(o + r * cos(rad(1 / 8)) - 20, o);
ctx.arc(o, o, 20, 0, rad(-1 / 8), true);
ctx.stroke();

ctx.strokeStyle = "#000";
ctx.beginPath();
ctx.moveTo(o, o);
ctx.lineTo(o + r * cos(rad(1 / 8)), o - r * sin(rad(1 / 8)));
ctx.lineTo(o + r * cos(rad(1 / 8)), o);
ctx.lineTo(o, o);
ctx.stroke();

function rad(fraction) {
  return fraction * tau;
}
