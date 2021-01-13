<p align="center">
 <img width="20%" height="20%" src="./assets/logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> Smoking hot  Notifications for Angular.<br>
> Lightweight, customizable and beautiful by default<br>
> Inspired from [react-hot-toast](https://github.com/timolins/react-hot-toast)

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)
  - [Import Toaster in your app](#import-toaster-in-your-app)
  - [Start toasting](#start-toasting)
- [Contributors ✨](#contributors-)

## Features

- 🔥 **Hot by default**
- 🔩 **Easily Customizable**
- ⏳ **Observable API** - _Automatic loader from aan observable_
- 🕊 **Lightweight** - _less than ??kb including styles_
- ✅ **Accessible**

## Installation

### NPM

`npm install @ngneat/hot-toast`

### Yarn

`yarn add @ngneat/hot-toast`

## Usage

### Import Toaster in your app

You can set options here.

```typescript
// ..
import { HotToastModule } from '@ngneat/hot-toast';

// ...
@NgModule({
  imports: [HotToastModule.forRoot()],
})

// ...
```

### Start toasting

Call it from anywhere in the component

```typescript
// ...
import { HotToastService } from '@ngneat/hot-toast';

@Component({})
export class AppComponent {
  constructor(private toast: HotToastService) {}
}

showToast() {
  this.toast.show('Hello World!')
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/shhdharmen"><img src="https://avatars3.githubusercontent.com/u/6831283?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dharmen Shah</b></sub></a><br /><a href="https://github.com/@ngneat/hot-toast/commits?author=shhdharmen" title="Code">💻</a> <a href="#content-shhdharmen" title="Content">🖋</a> <a href="#design-shhdharmen" title="Design">🎨</a> <a href="https://github.com/@ngneat/hot-toast/commits?author=shhdharmen" title="Documentation">📖</a> <a href="#example-shhdharmen" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.netbasal.com/"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="https://github.com/@ngneat/hot-toast/issues?q=author%3ANetanelBasal" title="Bug reports">🐛</a> <a href="#business-NetanelBasal" title="Business development">💼</a> <a href="#ideas-NetanelBasal" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-NetanelBasal" title="Maintenance">🚧</a> <a href="#mentoring-NetanelBasal" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-NetanelBasal" title="Project Management">📆</a> <a href="#research-NetanelBasal" title="Research">🔬</a> <a href="https://github.com/@ngneat/hot-toast/pulls?q=is%3Apr+reviewed-by%3ANetanelBasal" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
