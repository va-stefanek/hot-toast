<p align="center">
  <img width="20%" height="20%" src="./assets/logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> Smoking hot Notifications for Angular. Lightweight, customizable and beautiful by default. Inspired from [react-hot-toast](https://github.com/timolins/react-hot-toast)

<p align="center">
 <img src="./assets/demo.gif">
</p>

## Features

- 🔥 **Hot by default**
- ☕ **Easy to use**
- ♿ **Accessible**
- 🖐️ **Reduce motion support**
- 😊 **Emoji Support**
- 🛠 **Customizable**
- ⏳ **Observable API**
- ✋ **Pause on hover**
- 🔁 **Events**
- 🔒 **Persistent**

## Installation

You can install it through **Angular CLI**:

```bash
ng add @ngneat/hot-toast
```

or with **npm**:

```bash
npm install @ngneat/{overview,hot-toast}
```

When you install using **npm or yarn**, you will also need to import `HotToastModule` in your `app.module`. You can also set global toast options ([`Partial<ToastConfig>`](#toastconfig)) here.:

```typescript
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  imports: [HotToastModule.forRoot()],
})
class AppModule {}
```

## Basic Usage

```typescript
import { HotToastService } from '@ngneat/hot-toast';

@Component({})
export class AppComponent {
  constructor(private toast: HotToastService) {}
}

showToast() {
  this.toast.show('Hello World!');
  this.toast.success('Yeah!!');
  this.toast.warn('Boo!');
  this.toast.error('Oh no!');
}
```

## Examples

You can checkout examples at: <https://ngneat.github.io/hot-toast>.

### ToastConfig

All options, which are set _Available in global config?_ from `ToastOptions` are supported. Below are extra configurable options:

| Name         | Type                         | Description                                                                                                        |
| ------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| reverseOrder | `boolean`                    | Sets the reverse order for hot-toast stacking<br>_Default: false_                                                  |
| windowRef    | `Window & typeof globalThis` | Sets the window, from which document will be fetched and hot-toasts will be added to there.<br>_Default: `window`_ |

### ToastOptions

Configuration used when opening an hot-toast.

| Name        | Type                                          | Description                                                                                                                                                    | Available in global config? |
| ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| id          | `string`                                      | Unique id to associate with hot-toast. There can't be multiple hot-toasts opened with same id.                                                                 | No                          |
| duration    | `number`                                      | Duration in milliseconds after which hot-toast will be auto closed. Can be disabled via `autoClose: false`<br>_Default: `3000, error = 4000, loading = 30000`_ | Yes                         |
| autoClose   | `boolean`                                     | Auto close hot-toast after duration<br>_Default: `true`_                                                                                                       | Yes                         |
| position    | [`ToastPosition`](#toastposition)             | The position to place the hot-toast.<br>_Default: `top-center`_                                                                                                | Yes                         |
| dismissible | `boolean`                                     | Show close button in hot-toast<br>_Default: `false`_                                                                                                           | Yes                         |
| role        | [`ToastRole`](#toastrole)                     | Role of the live region.<br>_Default: `status`_                                                                                                                | Yes                         |
| ariaLive    | [`ToastAriaLive`](#toastarialive)             | aria-live value for the live region.<br>_Default: `polite`_                                                                                                    | Yes                         |
| theme       | [`ToastTheme`](#toasttheme)                   | Visual appearance of hot-toast<br>_Default: `toast`_                                                                                                           | Yes                         |
| persist     | [`{ToastPersistConfig}`](#toastpersistconfig) | Useful when you want to keep a persistance for toast based on ids, across sessions.                                                                            | No                          |
| icon        | [`Content`](#content)                         | Icon to show in the hot-toast                                                                                                                                  | Yes                         |
| iconTheme   | [`IconTheme`](#icontheme)                     | Use this to change icon color                                                                                                                                  | Yes                         |
| className   | `string`                                      | Extra CSS classes to be added to the hot toast container.                                                                                                      | Yes                         |
| style       | `any`                                         | Extra styles to apply for hot-toast                                                                                                                            | Yes                         |
| closeStyle  | `any`                                         | Extra styles to apply for close button                                                                                                                         | Yes                         |

---

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
