const MIRROR_URL = chrome.runtime.getURL("mirror.html");

// Clicking the toolbar icon opens the mirror tab, or focuses it if it's already open.
chrome.action.onClicked.addListener(async () => {
  const [existing] = await chrome.tabs.query({ url: MIRROR_URL });
  if (existing) {
    await chrome.tabs.update(existing.id, { active: true });
    await chrome.windows.update(existing.windowId, { focused: true });
  } else {
    await chrome.tabs.create({ url: MIRROR_URL });
  }
});

// Global hotkey flips the shield. The mirror page watches storage for the change.
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-shield") return;
  const { shielded = true } = await chrome.storage.local.get("shielded");
  await chrome.storage.local.set({ shielded: !shielded });
});

// Toolbar badge shows what viewers currently see.
async function updateBadge(shielded) {
  await chrome.action.setBadgeText({ text: shielded ? "HIDE" : "LIVE" });
  await chrome.action.setBadgeBackgroundColor({ color: shielded ? "#d93025" : "#188038" });
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.shielded) updateBadge(changes.shielded.newValue);
});

chrome.runtime.onStartup.addListener(async () => {
  const { shielded = true } = await chrome.storage.local.get("shielded");
  updateBadge(shielded);
});

chrome.runtime.onInstalled.addListener(async () => {
  // Fail closed: always start shielded.
  await chrome.storage.local.set({ shielded: true });
  updateBadge(true);
});
