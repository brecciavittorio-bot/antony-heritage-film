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
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
  iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  iframe.addEventListener("error", () => {
    frame.hidden = true;
    errorMessage.hidden = false;
  });

  frame.replaceChildren(iframe);
})();
