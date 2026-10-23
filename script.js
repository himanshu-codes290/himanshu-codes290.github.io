(function () {
  "use strict";

  var root = document.documentElement;

  /* Theme: explicit choice wins, otherwise follow the OS. Persisted per browser. */
  function readStoredTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try { localStorage.setItem("theme", value); } catch (e) { /* storage unavailable */ }
  }
  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var stored = readStoredTheme();
  if (stored === "dark" || stored === "light") root.setAttribute("data-theme", stored);

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      storeTheme(next);
      toggle.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
    });
  }

  /* Copy buttons: copy the text of the element named in data-copy. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.textContent.trim();
      var original = btn.textContent;
      function done(label) {
        btn.textContent = label;
        setTimeout(function () { btn.textContent = original; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done("copied"); }, function () { selectText(target); done("select + copy"); });
      } else {
        selectText(target);
        done("select + copy");
      }
    });
  });
  function selectText(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /* Highlight the nav link for the section in view. */
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var active = a.getAttribute("href") === "#" + entry.target.id;
          if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
