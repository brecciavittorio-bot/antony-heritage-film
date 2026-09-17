(() => {
  "use strict";

  const frame = document.querySelector("#film-frame");
  const errorMessage = document.querySelector("#film-error");
  const videoId = window.ANTONY_FILM?.youtubeVideoId?.trim() ?? "";
  const validVideoId = /^[A-Za-z0-9_-]{11}$/.test(videoId);

  if (!frame || !videoId) return;

  if (!validVideoId) {
    frame.hidden = true;
    errorMessage.hidden = false;
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.title = "Depuis 1979, une histoire à affiner — Fromagerie Antony";
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=0&controls=1&rel=0&playsinline=1&disablekb=1&fs=0`;
  iframe.allow = "encrypted-media";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  iframe.addEventListener("error", () => {
    frame.hidden = true;
    errorMessage.hidden = false;
  });

  const topCover = document.createElement("div");
  topCover.className = "film__cover film__cover--top";
  topCover.setAttribute("aria-hidden", "true");

  const cornerCover = document.createElement("div");
  cornerCover.className = "film__cover film__cover--corner";
  cornerCover.setAttribute("aria-hidden", "true");

  frame.replaceChildren(iframe, topCover, cornerCover);
})();
