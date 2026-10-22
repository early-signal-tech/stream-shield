# Stream Shield

A Chrome extension that lets you hide your screen from livestream viewers while you set up API keys and other secrets, without hiding it from yourself.

It mirrors your entire screen into a Chrome tab. You share that tab in your streaming studio instead of your screen. Viewers see everything as normal (terminal, Finder, any app) until you press the hotkey, which blurs the mirror and shows a "Hang tight" card. Your real screen never changes.

Tested with Riverside. Should work with any browser-based studio that can share a Chrome tab.

## Install

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and select this folder.
3. Pin the extension from the puzzle-piece menu.
4. Open `chrome://extensions/shortcuts`, find **Toggle the privacy shield**, set it to **⌘⇧9** if empty, and change the scope to **Global** so it works from any app.

## Use

1. Click the Stream Shield icon, then **Start mirror**, and choose **Entire Screen**.
2. In your streaming studio, share the **Stream Shield** Chrome tab (not your screen).
3. Leave that tab in the background and work normally.
4. Press **⌘⇧9** to toggle. The toolbar badge shows what viewers see: red **HIDE** or green **LIVE**.

The shield is always on when you start the mirror, so nothing is shown until you deliberately go live.

## Customize

Edit `config.js` to change the card's title, subtitle, logo, colors, and blur strength, then reload the extension.

## Limitations

This reduces risk; it does not guarantee secrets stay private.

- **Timing is on you.** Hit HIDE before a secret appears, and clear it (terminal scrollback, open tabs, `.env` files) before going LIVE again.
- **Secrets can resurface.** Shell history and your clipboard can bring a key back on screen later. Use `read -s` to enter keys, or `setopt HIST_IGNORE_SPACE` in zsh and prefix the command with a space.
- **Notifications** that pop up while LIVE are not covered. Use Do Not Disturb.
- **Sharing the wrong surface.** If you share your entire screen instead of the Stream Shield tab, the hotkey does nothing for viewers.
- **No indicator outside Chrome.** The badge is only visible in Chrome's toolbar.

Best practice: use scoped or test keys on stream, and rotate them afterward.

## Privacy

The extension has no network code. Your screen is only rendered locally in the tab; it goes wherever you choose to share that tab and nowhere else. The only permission used is `storage`, to remember whether the shield is on.
