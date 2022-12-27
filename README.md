## 15 Puzzle

Play at [puzzle15.pp.ua](https://puzzle15.pp.ua/) 🙂

## bubblewrap
To build/update project you need `bubblewrap`.
[Link](https://github.com/GoogleChromeLabs/bubblewrap).
### installation
run command
```bash
npm i -g @bubblewrap/cli
```
to install project globally.
### Regen android project
If you have to update project with new bubblewrap version you should regen project.
```bash
bubblewrap init --manifest https://puzzle15.pp.ua/manifest.webmanifest
```

### Build APK
To build project Run:
```bash
bubblewrap build
```
You will be promted to app key input.

### Keystore
Keystore is in "android.keystore" in /

Password: 3456782134
