(() => {
  "use strict";

  const frame = document.querySelector("#film-frame");
  const errorMessage = document.querySelector("#film-error");
  const fullscreenButton = document.querySelector("#film-fullscreen");
  const videoId = window.ANTONY_FILM?.youtubeVideoId?.trim() ?? "";
  const validVideoId = /^[A-Za-z0-9_-]{11}$/.test(videoId);

  if (!frame || !fullscreenButton || !videoId) return;

  if (!validVideoId) {
    frame.hidden = true;
    errorMessage.hidden = false;
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.title = "Depuis 1979, une histoire qui s'affine — Fromagerie Antony";
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=0&controls=1&rel=0&playsinline=1&disablekb=1&fs=0`;
  iframe.allow = "encrypted-media";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  iframe.addEventListener("error", () => {
    frame.hidden = true;
    fullscreenButton.hidden = true;
    errorMessage.hidden = false;
  });

  const topCover = document.createElement("div");
  topCover.className = "film__cover film__cover--top";
  topCover.setAttribute("aria-hidden", "true");

  const cornerCover = document.createElement("div");
  cornerCover.className = "film__cover film__cover--corner";
  cornerCover.setAttribute("aria-hidden", "true");

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "film__close";
  closeButton.textContent = "Quitter le plein écran ×";
  closeButton.hidden = true;

  const isExpanded = () => frame.classList.contains("film__frame--expanded");

  const syncFullscreen = () => {
    const expanded = isExpanded();
    closeButton.hidden = !expanded;
    fullscreenButton.setAttribute("aria-expanded", String(expanded));
  };

  const exitFullscreen = () => {
    frame.classList.remove("film__frame--expanded");
    document.body.classList.remove("film-is-expanded");
    syncFullscreen();
    fullscreenButton.focus();
  };

  fullscreenButton.addEventListener("click", () => {
    frame.classList.add("film__frame--expanded");
    document.body.classList.add("film-is-expanded");
    syncFullscreen();
  });

  closeButton.addEventListener("click", exitFullscreen);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && frame.classList.contains("film__frame--expanded")) exitFullscreen();
  });

  frame.replaceChildren(iframe, topCover, cornerCover, closeButton);
  fullscreenButton.hidden = false;
})();
