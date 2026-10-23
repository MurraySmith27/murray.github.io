// sparkly cursor trail, the most important feature of any homepage
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(pointer: fine)").matches) return;

  var colors = ["#ff0", "#f0f", "#0ff", "#fff", "#f90"];
  var last = 0;

  document.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - last < 40) return;
    last = now;

    var s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = "✦";
    s.style.left = e.clientX + 6 + "px";
    s.style.top = e.clientY + 6 + "px";
    s.style.color = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 800);
  });
})();

document.getElementById("year").textContent = new Date().getFullYear();
