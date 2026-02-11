# Jigsaw game

This is just a simple Electron app packaging of the excellent [Dillon's Jigsaw Puzzle on Codepen](https://codepen.io/Dillo/pen/QWKLYab), with a few changes. I put this together for my wife, who loves jigsaw puzzles.

# Credits and Licenses

- [Dillon's Jigsaw Puzzle on Codepen](https://codepen.io/Dillo/pen/QWKLYab)
  - The files `src/index.html`, `src/jigsaw.js`, `src/index.css` are all under [this](licenses/Dillon-Jigsaw-Puzzle-License.txt) license.
- Icon by [Read](https://freeicons.io/profile/1) on [freeicons.io](https://freeicons.io/)
- Otherwise licensed under [MIT license](licenses/MIT-License.txt) 

# Developer instructions

```shell
npm install

# To start the app in development mode
npm start

# To make and package the app
npm run make
```

## Fedora 42 instructions

There is currently an issue running `npm run make` on Fedora 42.

As a workaround, change `node_modules/electron-installer-redhat/resources/spec.ejs` line 27:

```
- cp <%= process.platform === 'darwin' ? '-R' : '-r' %> usr/* %{buildroot}/usr/
+ cp <%= process.platform === 'darwin' ? '-R' : '-r' %> ../usr/. %{buildroot}/usr/
```

From: https://github.com/electron/forge/issues/3701#issuecomment-2552233499

## Windows Instructions

You'll need to install:

- [nvm for Windows](https://www.nvmnode.com/guide/download.html)
- [Git for Windows](https://git-scm.com/install/windows)
- [GitHub desktop](https://desktop.github.com/download/)

**Install `node`**

`cd` to this repo, then run `nvm use`. 

Then, after all of the above are done installing, you need to do a couple things.

**Allow execution of `npm` command**

After installing 

Search for "PowerShell" on the Start menu. Right-click on it and click "Run as administrator". Run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then check that it was set:
```powershell
Get-ExecutionPolicy
```

This should return `RemoteSigned`.

Then to actually run `npm`, open a new Terminal window and create a new PowerShell tab (if it isn't the default one set).
