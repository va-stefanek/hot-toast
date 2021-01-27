<h1 id="ngneat-hot-toast" align="center">ngneat hot toast</h1>

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

> Smoking hot  Notifications for Angular. Lightweight, customizable and beautiful by default. Inspired from [react-hot-toast](https://github.com/timolins/react-hot-toast)

<p align="center">
 <img src="./assets/demo.gif">
</p>

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Installation](#installation)
  - [Angular CLI](#angular-cli)
  - [NPM or Yarn](#npm-or-yarn)
    - [Import Toaster in your app](#import-toaster-in-your-app)
- [Usage](#usage)
  - [Start toasting](#start-toasting)
- [Examples](#examples)
- [API](#api)
  - [HotToastModule](#hottoastmodule)
    - [forRoot(config?: Partial<ToastConfig>)](#forrootconfig-partialtoastconfig)
  - [HotToastService](#hottoastservice)
    - [show(message: Content, options?: ToastOptions): CreateHotToastRef](#showmessage-content-options-toastoptions-createhottoastref)
    - [error(message: Content, options?: ToastOptions): CreateHotToastRef](#errormessage-content-options-toastoptions-createhottoastref)
    - [success(message: Content, options?: ToastOptions): CreateHotToastRef](#successmessage-content-options-toastoptions-createhottoastref)
    - [loading(message: Content, options?: ToastOptions): CreateHotToastRef](#loadingmessage-content-options-toastoptions-createhottoastref)
    - [observe<T>( messages: ObservableMessages<T>, options?: DefaultToastOptions ): <T>(source: Observable<T>) => Observable<T>](#observet-messages-observablemessagest-options-defaulttoastoptions--tsource-observablet--observablet)
    - [close(id: string): void](#closeid-string-void)
  - [Classes](#classes)
    - [ToastConfig](#toastconfig)
  - [Types](#types)
    - [CreateHotToastRef](#createhottoastref)
      - [Methods](#methods)
      - [Properties](#properties)
    - [ToastOptions](#toastoptions)
    - [ObservableMessages](#observablemessages)
    - [ToastPersistConfig](#toastpersistconfig)
    - [ToastPosition](#toastposition)
- [Contributors ✨](#contributors-)

## Features

- 🔥 **Hot by default**
- ☕ **Easy to use**
- ♿ **Accessible**
- 🖐️ **Reduce motion support**
- 😊 **Emoji Support**
- 🛠 **Customizable**
- ⏳ **Observable API** - _Automatic loader from an observable_
- ✋ **Pause on hover** - *No JavaScript, paused through CSS `animation-play-state`*
- 🔁 **Events**
- 🔒 **Persistent** - *Opens one toast at a time with unique id. Can be configured.*
- 🕊 **Lightweight** - _less than ??kb including styles_

## Installation

### Angular CLI

`ng add @ngneat/hot-toast`

### NPM or Yarn

`npm install @ngneat/overview @ngneat/hot-toast`

`yarn add @ngneat/overview @ngneat/hot-toast`

#### Import Toaster in your app

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

## Usage

Once installed and imported...

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

## Examples

You can checkout examples at: <https://ngneat.github.io/hot-toast>.

## API

### HotToastModule

#### forRoot(config?: Partial<ToastConfig>)

Initializes the hot-toast module and creates and appends container component with help of `HotToastService`.

- **Parameters:**
  - `config?` - [`Partial<ToastConfig>`](#toastconfig) - Default configuration options to set for all hot-toasts.

### HotToastService

Service to dispatch Hot Toasts.

#### show(message: Content, options?: ToastOptions): CreateHotToastRef

Opens up an hot-toast without any pre-configurations.

- **Parameters:**
  - `message` — [`Content`](#toastmessage) — The message to show in the hot-toast
  - `[options]` — [`ToastOptions`](#toastoptions) — Additional configuration options for the hot-toast
- **Returns:** [`CreateHotToastRef`](#createhottoastref)
- **Basic Usage**:

```typescript
toast.show('Hello World!')
```

#### error(message: Content, options?: ToastOptions): CreateHotToastRef

Opens up an hot-toast with pre-configurations for error state.

Parameters and Returns are same as [`show`](#showmessage-toastmessage-options-toastoptions-createhottoastref)

- **Basic Usage**:

```typescript
toast.error("This didn't work.")
```

#### success(message: Content, options?: ToastOptions): CreateHotToastRef

Opens up an hot-toast with pre-configurations for success state.

Parameters and Returns are same as [`show`](#showmessage-toastmessage-options-toastoptions-createhottoastref)

- **Basic Usage**:

```typescript
toast.success('Successfully toasted!')
```

#### loading(message: Content, options?: ToastOptions): CreateHotToastRef

Opens up an hot-toast with pre-configurations for loading state.

Parameters and Returns are same as [`show`](#showmessage-toastmessage-options-toastoptions-createhottoastref)

- **Basic Usage**:

```typescript
toast.loading('Saving...);
```

#### observe<T>( messages: ObservableMessages<T>, options?: DefaultToastOptions ): <T>(source: Observable<T>) => Observable<T>

Opens up an hot-toast with pre-configurations for loading initially, subscribes to observable and then changes state based on messages.

- **Parameters:**
  - `messages`: [`ObservableMessages<T>`](#observablemessages) - Messages for each state i.e. `loading`, `next` and `error`
  - `[options]` — [`ToastOptions`](#toastoptions) — Additional configuration options for the hot-toast
  - `[observable]` — `Observable<T>` — Observable to which subscription will happen and messages will be displayed according to messages
- **Returns:** [`CreateHotToastRef`](#createhottoastref)
- **Basic Usage**:

```typescript
saveSettings(settings).pipe(toast.observe(
  {
    loading: 'Saving...',
    success: successTemplate,
    error: errorTemplate,
  }
)).subscribe();

// template
// <ng-template #successTemplate>
//   <b>Settings saved!</b>
// </ng-template>
// <ng-template #errorTemplate>
//   <b>Could not save.</b>
// </ng-template>
```

#### close(id: string): void

Closes the hot-taost.

- **Parameters:**
  - `id`: `string` - ID of the toast
- **Basic Usage**:

```typescript
toast.close(toastID);
```

### Classes

#### ToastConfig

All options, which are set *Available in global config?* from `ToastOptions` are supported. Below are extra configurable options:

| Name         | Type                         | Description                                                                                                        |
| ------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| reverseOrder | `boolean`                    | Sets the reverse order for hot-toast stacking<br>*Default: false*                                                  |
| windowRef    | `Window & typeof globalThis` | Sets the window, from which document will be fetched and hot-toasts will be added to there.<br>*Default: `window`* |

### Types

#### CreateHotToastRef

##### Methods

| Method        | Parameters                                           | Description                                                                | Returns        |
| ------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| getToast      | --                                                   | Returns all the toast options                                              | `ToastOptions` |
| updateMessage | message: [`Content`](#content)                       | Updates only message                                                       | --             |
| updateToast   | options: [`UpdateToastOptions`](#updatetoastoptions) | Update updatable options of toast                                          | --             |
| close         | dismissedByAction: `boolean` = `false`               | Closes the toast. Make `dismissedByAction` true when calling from template | --             |

##### Properties

| Name        | Type                                          | Description                                                       |
| ----------- | --------------------------------------------- | ----------------------------------------------------------------- |
| afterClosed | [`Observable<HotToastClose>`](#hottoastclose) | Observable for notifying the user that the toast has been closed. |

#### ToastOptions

Configuration used when opening an hot-toast.

| Name        | Type                                          | Description                                                                                                                                                    | Available in global config? |
| ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| id          | `string`                                      | Unique id to associate with hot-toast. There can't be multiple hot-toasts opened with same id.                                                                 | No                          |
| duration    | `number`                                      | Duration in milliseconds after which hot-toast will be auto closed. Can be disabled via `autoClose: false`<br>*Default: `3000, error = 4000, loading = 30000`* | Yes                         |
| autoClose   | `boolean`                                     | Auto close hot-toast after duration<br>*Default: `true`*                                                                                                       | Yes                         |
| position    | [`ToastPosition`](#toastposition)             | The position to place the hot-toast.<br>*Default: `top-center`*                                                                                                | Yes                         |
| dismissible | `boolean`                                     | Show close button in hot-toast<br>*Default: `false`*                                                                                                           | Yes                         |
| role        | [`ToastRole`](#toastrole)                     | Role of the live region.<br>*Default: `status`*                                                                                                                | Yes                         |
| ariaLive    | [`ToastAriaLive`](#toastarialive)             | aria-live value for the live region.<br>*Default: `polite`*                                                                                                    | Yes                         |
| theme       | [`ToastTheme`](#toasttheme)                   | Visual appearance of hot-toast<br>*Default: `toast`*                                                                                                           | Yes                         |
| persist     | [`{ToastPersistConfig}`](#toastpersistconfig) | Useful when you want to keep a persistance for toast based on ids, across sessions.                                                                            | No                          |
| icon        | [`Content`](#content)                         | Icon to show in the hot-toast                                                                                                                                  | Yes                         |
| iconTheme   | [`IconTheme`](#icontheme)                     | Use this to change icon color                                                                                                                                  | Yes                         |
| className   | `string`                                      | Extra CSS classes to be added to the hot toast container.                                                                                                      | Yes                         |
| style       | `any`                                         | Extra styles to apply for hot-toast                                                                                                                            | Yes                         |
| closeStyle  | `any`                                         | Extra styles to apply for close button                                                                                                                         | Yes                         |

#### ObservableMessages

```typescript
type ObservableMessages<T> = {
  loading?: Content;
  next: ValueOrFunction<Content, T>;
  error?: ValueOrFunction<Content, any>;
};
```

#### ToastPersistConfig

| Name    | Type                  | Description                                                                                                                              |
| ------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| storage | `'local' | 'session'` | In which storage id vs. counts should be stored<br>*Default: `local`*                                                                    |
| key     | `string`              | The key pattern to store object in storage. `${id}` in pattern is replaced with actual toast id.<br>*Default: `'ngneat/hottoast-${id}'`* |
| count   | `number`              | The number of toasts allowed to show.<br>*Default: `1`*                                                                                  |
| enabled | `boolean`             | Enable or disable persistance.<br>*Default: `false`*                                                                                     |

#### ToastPosition

```typescript
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
```
  
#### Content <!-- omit in toc -->

```typescript
type Content = string | TemplateRef<any> | Type<any>
```

#### HotToastClose <!-- omit in toc -->

```typescript
interface HotToastClose {
  /** Whether the snack bar was dismissed using the action button. */
  dismissedByAction: boolean;
  id: string;
}
```

#### IconTheme <!-- omit in toc -->

```typescript
type IconTheme = {
  primary: string;
  secondary?: string;
};
```

#### ToastAriaLive <!-- omit in toc -->

```typescript
type ToastAriaLive = 'assertive' | 'off' | 'polite';
```

#### ToastRole <!-- omit in toc -->

```typescript
type ToastRole = 'status' | 'alert';
```

#### ToastTheme <!-- omit in toc -->

```typescript
type ToastTheme = 'toast' | 'snackbar';
```

#### UpdateToastOptions <!-- omit in toc -->

```typescript
type UpdateToastOptions = Partial<
  Pick<
    ToastOptions,
    'icon' | 'duration' | 'dismissible' | 'className' | 'style' | 'iconTheme' | 'type' | 'theme' | 'closeStyle'
  >
>
```

#### ValueOrFunction <!-- omit in toc -->

```typescript
type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
```

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
