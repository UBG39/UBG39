const area = document.getElementById("gameArea");
const fullscreenButton = document.getElementById("fullscreenButton");
const demoButton = document.getElementById("demoButton");
const status = document.getElementById("status");

if (demoButton) demoButton.addEventListener("click", () => {
  status.textContent = "Template is working. Replace this placeholder with your game.";
});

if (fullscreenButton && area) fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await area.requestFullscreen();
    else await document.exitFullscreen();
  } catch {
    status.textContent = "Fullscreen is not available in this browser.";
  }
});
