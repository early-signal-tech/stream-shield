const cfg = window.SHIELD_CONFIG;
const body = document.body;
const video = document.getElementById("screen");

// Apply branding.
const root = document.documentElement.style;
root.setProperty("--blur", `${cfg.blurPx}px`);
root.setProperty("--accent", cfg.accent);
root.setProperty("--card-bg", cfg.cardBackground);
root.setProperty("--text", cfg.textColor);
document.getElementById("hold-title").textContent = cfg.title;
document.getElementById("hold-subtitle").textContent = cfg.subtitle;
if (cfg.logo) {
  const logo = document.getElementById("hold-logo");
  logo.src = cfg.logo;
  logo.hidden = false;
}

function setShielded(on) {
  body.classList.toggle("shielded", on);
}

chrome.storage.local.get("shielded").then(({ shielded = true }) => setShielded(shielded));
chrome.storage.onChanged.addListener((changes) => {
  if (changes.shielded) setShielded(changes.shielded.newValue);
});

document.getElementById("start").addEventListener("click", async () => {
  // Fail closed: shield on before anything is shown.
  await chrome.storage.local.set({ shielded: true });

  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: "monitor",
      cursor: "always",
      frameRate: { ideal: 30 },
      width: { ideal: 3840 },
      height: { ideal: 2160 },
    },
    audio: false,
    monitorTypeSurfaces: "include",
    selfBrowserSurface: "exclude",
  });

  video.srcObject = stream;
  body.classList.add("capturing");

  // If the capture stops (e.g. "Stop sharing" clicked), go back to setup.
  stream.getVideoTracks()[0].addEventListener("ended", () => {
    video.srcObject = null;
    body.classList.remove("capturing");
  });
});
