## [2.0.3-beta.1](https://github.com/ngneat/hot-toast/compare/v2.0.2...v2.0.3-beta.1) (2021-06-07)


### Code Refactoring

* 💡 update @ngneat/overview to 2.0.2 ([6aba56c](https://github.com/ngneat/hot-toast/commit/6aba56c4da948afe0a153ed31b0d96f4fe697d7f)), closes [#62](https://github.com/ngneat/hot-toast/issues/62)


### BREAKING CHANGES

* 🧨 1. Content inside `.hot-toast-message` were wrapped into
`dynamic-content`, now they are wrapped into `div` > `dynamic-view`, 2.
Use optional chaining while access `toastRef` in template. E.g.
`toastRef?.data`, 3. Add `@Optional()` decorator in components'
constructor while injecting tokens which are used by toast's injector

## [2.0.2](https://github.com/ngneat/hot-toast/compare/v2.0.1...v2.0.2) (2021-05-24)


### Bug Fixes

* 🐛 support angular 12 ([f1a08cb](https://github.com/ngneat/hot-toast/commit/f1a08cb9e74c863cf625350cdb47657fe67242d8))

## [2.0.1](https://github.com/ngneat/hot-toast/compare/v2.0.0...v2.0.1) (2021-03-15)


### Bug Fixes

* **service:** add protection in close method ([c0772bf](https://github.com/ngneat/hot-toast/commit/c0772bf019b9b05ecc809087cd939d8b4264bc24))

# [2.0.0](https://github.com/ngneat/hot-toast/compare/v1.1.1...v2.0.0) (2021-03-14)


### Features

* pass type for data ([47c893e](https://github.com/ngneat/hot-toast/commit/47c893ee8b1a8380b9cd63ae201bde761e2bb0f4)), closes [#54](https://github.com/ngneat/hot-toast/issues/54)
* remove context from options ([cab3261](https://github.com/ngneat/hot-toast/commit/cab3261160a8c8347c4d8195877ba6a30a070c7c)), closes [#54](https://github.com/ngneat/hot-toast/issues/54)
* **hot-toast:** add an option to pass data with component ([8a51703](https://github.com/ngneat/hot-toast/commit/8a51703fc56340f5f1bfd46869b2cce94ad49eb8)), closes [#54](https://github.com/ngneat/hot-toast/issues/54)


### BREAKING CHANGES

* conext is removed from option

## [1.1.1](https://github.com/ngneat/hot-toast/compare/v1.1.0...v1.1.1) (2021-03-02)


### Bug Fixes

* **animated-icon.component.scss:** remove min-width from emoji icon ([5acfdc7](https://github.com/ngneat/hot-toast/commit/5acfdc79f7f3c4b30348d34e9fe057c2393dd3e3)), closes [#52](https://github.com/ngneat/hot-toast/issues/52)

# [1.1.0](https://github.com/ngneat/hot-toast/compare/v1.0.11...v1.1.0) (2021-03-02)


### Features

* **hot-toast:** add support for context and injector ([05c5704](https://github.com/ngneat/hot-toast/commit/05c5704912f1a8f079d1f83efc9fca59279a1780)), closes [#49](https://github.com/ngneat/hot-toast/issues/49)

## [1.0.11](https://github.com/ngneat/hot-toast/compare/v1.0.10...v1.0.11) (2021-02-22)


### Bug Fixes

* **hot-toast:** iniatilize only when toast called first time ([da726d5](https://github.com/ngneat/hot-toast/commit/da726d56e761aebf885d3a1d49c2148040a11fa8)), closes [#38](https://github.com/ngneat/hot-toast/issues/38)
* **hot-toast.service.ts:** make flag true on first call ([ca766a5](https://github.com/ngneat/hot-toast/commit/ca766a509b1e774c52f38c6cb3ca41a4992ad4c9)), closes [#38](https://github.com/ngneat/hot-toast/issues/38)

## [1.0.10](https://github.com/ngneat/hot-toast/compare/v1.0.9...v1.0.10) (2021-02-17)


### Reverts

* Revert "fix: 🐛 wait until application is bootstraped through requestAni" ([75385b7](https://github.com/ngneat/hot-toast/commit/75385b74ce77fed47b5dfd2be52a9b5d59e0abcd))
* Revert "fix: 🐛 use isStable method before creating toast container" ([5d87f81](https://github.com/ngneat/hot-toast/commit/5d87f810fcdfc5950780ed245de63a3ca1c45937))
* Revert "chore(release): 1.0.9-beta.1 [skip ci]" ([d0ddb4b](https://github.com/ngneat/hot-toast/commit/d0ddb4bbe688866eedd8551aff11c8aed5138e57))
* Revert "chore(release): 1.0.9 [skip ci]" ([01e6a6c](https://github.com/ngneat/hot-toast/commit/01e6a6ca28ac88f6a75e852d062cdcf4b316e30b))

## [1.0.8](https://github.com/ngneat/hot-toast/compare/v1.0.7...v1.0.8) (2021-02-11)

## [1.0.7](https://github.com/ngneat/hot-toast/compare/v1.0.6...v1.0.7) (2021-02-11)


### Bug Fixes

* 🐛 block rendering for SSR ([6570e1b](https://github.com/ngneat/hot-toast/commit/6570e1b5496b335bfff89f60e37b49c18ccfe77b)), closes [#35](https://github.com/ngneat/hot-toast/issues/35)

## [1.0.6](https://github.com/ngneat/hot-toast/compare/v1.0.5...v1.0.6) (2021-02-08)


### Reverts

* Revert "fix: 🐛 icon and close button alignment in cross browser" ([da3f637](https://github.com/ngneat/hot-toast/commit/da3f63714e894eebcddf2d4c88cedd9369cb73bd))

## [1.0.5](https://github.com/ngneat/hot-toast/compare/v1.0.4...v1.0.5) (2021-02-07)


### Bug Fixes

* 🐛 icon and close button alignment in cross browser ([20e8fb5](https://github.com/ngneat/hot-toast/commit/20e8fb591c283df1f59eacce96339ececab0de3e)), closes [#33](https://github.com/ngneat/hot-toast/issues/33)

## [1.0.4](https://github.com/ngneat/hot-toast/compare/v1.0.3...v1.0.4) (2021-02-05)


### Bug Fixes

* 🐛 assets for release through semantic-release/git ([57d270e](https://github.com/ngneat/hot-toast/commit/57d270ee3156dace1029c900314bacebbab0500e)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 debug semantic-release ([c6e6807](https://github.com/ngneat/hot-toast/commit/c6e680797dae5c2562b78b6417cb274727320b52))
* 🐛 release asset tarball ([841eb6b](https://github.com/ngneat/hot-toast/commit/841eb6bf3f9d42c50c9f30dc7a286d1f7f221201)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 remove message ([9bfd746](https://github.com/ngneat/hot-toast/commit/9bfd746ca0436bd6b36d6db1de4f356bba934c0f)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 semantic-release config ([07f85bc](https://github.com/ngneat/hot-toast/commit/07f85bc37cd0bab9b7ea6c6fd472b402e8a6b2c4)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 semantic-release github asset fix ([be54f4b](https://github.com/ngneat/hot-toast/commit/be54f4b24bb97dd614be48642f9d5fc0d7f41951)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 semenatic-release path ([13749c5](https://github.com/ngneat/hot-toast/commit/13749c53fc5d46f4b602fe23a108831c4c06545d)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 update peer dep versions ([db2fc16](https://github.com/ngneat/hot-toast/commit/db2fc16ccdc850eab48558f098aee4361f8ad552)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)

## [1.0.4-beta.7](https://github.com/ngneat/hot-toast/compare/v1.0.4-beta.6...v1.0.4-beta.7) (2021-02-05)

## [1.0.4-beta.6](https://github.com/ngneat/hot-toast/compare/v1.0.4-beta.5...v1.0.4-beta.6) (2021-02-05)


### Bug Fixes

* 🐛 release asset tarball ([841eb6b](https://github.com/ngneat/hot-toast/commit/841eb6bf3f9d42c50c9f30dc7a286d1f7f221201)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 semenatic-release path ([13749c5](https://github.com/ngneat/hot-toast/commit/13749c53fc5d46f4b602fe23a108831c4c06545d)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)

## [1.0.4-beta.5](https://github.com/ngneat/hot-toast/compare/v1.0.4-beta.4...v1.0.4-beta.5) (2021-02-05)


### Bug Fixes

* 🐛 semantic-release config ([07f85bc](https://github.com/ngneat/hot-toast/commit/07f85bc37cd0bab9b7ea6c6fd472b402e8a6b2c4)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)

## [1.0.4-beta.4](https://github.com/ngneat/hot-toast/compare/v1.0.4-beta.3...v1.0.4-beta.4) (2021-02-05)


### Bug Fixes

* 🐛 assets for release through semantic-release/git ([57d270e](https://github.com/ngneat/hot-toast/commit/57d270ee3156dace1029c900314bacebbab0500e)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)

## [1.0.4-beta.3](https://github.com/ngneat/hot-toast/compare/v1.0.4-beta.2...v1.0.4-beta.3) (2021-02-05)


### Bug Fixes

* 🐛 remove message ([9bfd746](https://github.com/ngneat/hot-toast/commit/9bfd746ca0436bd6b36d6db1de4f356bba934c0f)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)
* 🐛 semantic-release github asset fix ([be54f4b](https://github.com/ngneat/hot-toast/commit/be54f4b24bb97dd614be48642f9d5fc0d7f41951)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)

## [1.0.4-beta.2](https://github.com/ngneat/hot-toast/compare/v1.0.4-beta.1...v1.0.4-beta.2) (2021-02-05)


### Bug Fixes

* 🐛 debug semantic-release ([c6e6807](https://github.com/ngneat/hot-toast/commit/c6e680797dae5c2562b78b6417cb274727320b52))

## [1.0.4-beta.1](https://github.com/ngneat/hot-toast/compare/v1.0.3...v1.0.4-beta.1) (2021-02-05)


### Bug Fixes

* 🐛 update peer dep versions ([db2fc16](https://github.com/ngneat/hot-toast/commit/db2fc16ccdc850eab48558f098aee4361f8ad552)), closes [#28](https://github.com/ngneat/hot-toast/issues/28)

## [1.0.3](https://github.com/ngneat/hot-toast/compare/v1.0.2...v1.0.3) (2021-02-03)


### Bug Fixes

* 🐛 schematics: create getWorkSpace function in utility ([0022596](https://github.com/ngneat/hot-toast/commit/00225963d98948e6b57808f0447e5f52fb5d95f9)), closes [#25](https://github.com/ngneat/hot-toast/issues/25)

## [1.0.2](https://github.com/ngneat/hot-toast/compare/v1.0.1...v1.0.2) (2021-02-03)


### Bug Fixes

* 🐛 prepend theme class with 'hot-toast-theme-' ([0e974c5](https://github.com/ngneat/hot-toast/commit/0e974c52d21cfd3067c8b43c9c3b08d949111b9d)), closes [#21](https://github.com/ngneat/hot-toast/issues/21)

## [1.0.1](https://github.com/ngneat/hot-toast/compare/v1.0.0...v1.0.1) (2021-02-02)


### Bug Fixes

* 🐛 add container component in entry components for viewengi ([b3e5691](https://github.com/ngneat/hot-toast/commit/b3e5691d1df18f020bce08684109c0dcf0398d45)), closes [#13](https://github.com/ngneat/hot-toast/issues/13)
* 🐛 fallback color syntax in css ([fb17ba4](https://github.com/ngneat/hot-toast/commit/fb17ba487cff2a113316791116d6d3b9044dce24)), closes [#13](https://github.com/ngneat/hot-toast/issues/13)

## [1.0.1-beta.2](https://github.com/ngneat/hot-toast/compare/v1.0.1-beta.1...v1.0.1-beta.2) (2021-02-02)


### Bug Fixes

* 🐛 fallback color syntax in css ([fb17ba4](https://github.com/ngneat/hot-toast/commit/fb17ba487cff2a113316791116d6d3b9044dce24)), closes [#13](https://github.com/ngneat/hot-toast/issues/13)

## [1.0.1-beta.1](https://github.com/ngneat/hot-toast/compare/v1.0.0...v1.0.1-beta.1) (2021-02-02)


### Bug Fixes

* 🐛 add container component in entry components for viewengi ([b3e5691](https://github.com/ngneat/hot-toast/commit/b3e5691d1df18f020bce08684109c0dcf0398d45)), closes [#13](https://github.com/ngneat/hot-toast/issues/13)

# 1.0.0 (2021-02-01)


### Bug Fixes

* 🐛 add difference in duration in observe ([c0d3136](https://github.com/ngneat/hot-toast/commit/c0d3136e1a8182aa30501f70d9376d39a58ec60f))
* 🐛 change @ngneat/overview version ([b126aff](https://github.com/ngneat/hot-toast/commit/b126affd6e4be3f57528c775e3854768e896d1e4))
* 🐛 detect changes on height update, a method to update reve ([ea5f6e5](https://github.com/ngneat/hot-toast/commit/ea5f6e5abe9c475891b98b65d00ad2bb68a19135))
* 🐛 import from correct path ([9a19883](https://github.com/ngneat/hot-toast/commit/9a1988355b7a1bdfa2c39a6600a7a0e5cca1e86b))
* 🐛 improve prism-theme ([a33e6bc](https://github.com/ngneat/hot-toast/commit/a33e6bcf59107e9162c7210d86509c6ad36c5a3e))
* 🐛 increase toast max-width to 350px ([ca39723](https://github.com/ngneat/hot-toast/commit/ca39723556c42e9f33088297a9f42c61c61c80d0))
* 🐛 mover persist option to toast ([c48e322](https://github.com/ngneat/hot-toast/commit/c48e322ce7bcd33ab9e5b697c5200e64b9a2129c))
* 🐛 override options in observe fixed ([f3b76ca](https://github.com/ngneat/hot-toast/commit/f3b76ca990366d88c7a9510be445565fc8d017e9))
* 🐛 remove failing test ([463d0a8](https://github.com/ngneat/hot-toast/commit/463d0a8c5e03beff3919b99116404f9b1585ceca))
* 🐛 remove functional support for message ([f02ca3f](https://github.com/ngneat/hot-toast/commit/f02ca3fa00b973d81474e43912b7a084c880ef0a))
* 🐛 remove injector ([b17b5aa](https://github.com/ngneat/hot-toast/commit/b17b5aa32625f4815b53a3cd66b5a15010e80621))
* 🐛 remove toastr from dom ([b2430d4](https://github.com/ngneat/hot-toast/commit/b2430d4256a989ee681337b2ab67db1c9d21e1ed))
* 🐛 remove unsubscribe from toast ref ([d65cbc6](https://github.com/ngneat/hot-toast/commit/d65cbc63e75bc32471be5f6004e80cfdc3dce6ff))
* 🐛 unsubscribe on close ([648a5f0](https://github.com/ngneat/hot-toast/commit/648a5f0ded563f8fda42a62a880d1037d6015709))


### Features

* 🎸 add a flag to show whether toastr was closed by user ac ([2587d7d](https://github.com/ngneat/hot-toast/commit/2587d7d876155e59bd9928752916794c1629c374))
* 🎸 add content in global config ([3f014cc](https://github.com/ngneat/hot-toast/commit/3f014ccf84229f00ce59bbc60cb31a841a440ce2))
* 🎸 add function to update global config through service ([15bebbc](https://github.com/ngneat/hot-toast/commit/15bebbc6a7f62dd99943bafde8373cfb50c58ba3))
* 🎸 add windowRef ([71f5319](https://github.com/ngneat/hot-toast/commit/71f5319477b3308c717f1760f8b110e459a6fb65))
* 🎸 block rendering of toastr with same id ([b2b47a8](https://github.com/ngneat/hot-toast/commit/b2b47a860d11e205eebe0927d4f4734eca9cafb2))
* 🎸 debug and persist options ([c2a3054](https://github.com/ngneat/hot-toast/commit/c2a3054eae19324e985965289373db1c30029bbc)), closes [#2](https://github.com/ngneat/hot-toast/issues/2)
* 🎸 disable debug mode in prod ([c384cc4](https://github.com/ngneat/hot-toast/commit/c384cc41e6b6dae65d1af5390f294e2b3bf6c33d))
* 🎸 dynamic component for icon and message ([e12a27c](https://github.com/ngneat/hot-toast/commit/e12a27cc9e441f47a5127685d6142dd97b873bf7))
* 🎸 error, success, loading toasters ([645d30f](https://github.com/ngneat/hot-toast/commit/645d30fb41dab7070232540927f27f6353538dba))
* 🎸 forRoot method for module with default config ([9acb31c](https://github.com/ngneat/hot-toast/commit/9acb31c0cc7d9ef7621d5145557b7d95f707e7f5))
* 🎸 hover and focus style for close button ([f160cdf](https://github.com/ngneat/hot-toast/commit/f160cdfe51e6d287de2327884ba1058b02d0f480))
* 🎸 observe operator ([9700b8b](https://github.com/ngneat/hot-toast/commit/9700b8bd95535fcd963e7ffed50accb9ac06e65a))
* 🎸 pause hide on hover ([a28a697](https://github.com/ngneat/hot-toast/commit/a28a697dd06905ae5b979507cbdfd24e45ceed83))
* 🎸 pipeable rxjs operator and close in service ([b52a8c6](https://github.com/ngneat/hot-toast/commit/b52a8c641219d279f1f20943df3e82e98303cc8a))
* 🎸 position and reverseorder done with animation ([f4a62ac](https://github.com/ngneat/hot-toast/commit/f4a62ac1b417d6260953dbfe1bb8c19e1242f3bf))
* 🎸 promise toaster ([4633c0f](https://github.com/ngneat/hot-toast/commit/4633c0fe5c4a57877a2b21de908e57085e72a9e5))
* 🎸 provide context to ng-template ([016038d](https://github.com/ngneat/hot-toast/commit/016038db63249225959b7458dad7485e2a0dbced))
* 🎸 redcue motion support ([c95cf0e](https://github.com/ngneat/hot-toast/commit/c95cf0ede38c36e70efe0f6b10e6fddc9799283c)), closes [#4](https://github.com/ngneat/hot-toast/issues/4)
* 🎸 schematics ([8cc9b27](https://github.com/ngneat/hot-toast/commit/8cc9b2732aa9ce848e23efa258597ab4425ef852))
* 🎸 snackbar theme ([67a0955](https://github.com/ngneat/hot-toast/commit/67a0955aac72d9742fc7a17aca47891aff84137a))
* 🎸 toast for observable ([5a3f763](https://github.com/ngneat/hot-toast/commit/5a3f7635d9eb9eabdc6daa782488a64eef725173))
* 🎸 toastref ([e9b87d7](https://github.com/ngneat/hot-toast/commit/e9b87d79bf31161e96b048519911ad8a34048ce6))
* 🎸 toastref with events ([abfe66c](https://github.com/ngneat/hot-toast/commit/abfe66c2fd0f938227385db2f8beabc039d6735b))
* 🎸 warn toast, doc improvements ([3c2cf6f](https://github.com/ngneat/hot-toast/commit/3c2cf6fdb3487c8ae31d76d9f2ae7b2dd8aab2a7))


### Performance Improvements

* ⚡️ change detection strategy ([168b429](https://github.com/ngneat/hot-toast/commit/168b42955e81525a4b8fed4001b20b346dc238e4))

# [1.0.0-beta.8](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2021-01-31)


### Bug Fixes

* 🐛 remove failing test ([463d0a8](https://github.com/ngneat/hot-toast/commit/463d0a8c5e03beff3919b99116404f9b1585ceca))


### Features

* 🎸 add content in global config ([3f014cc](https://github.com/ngneat/hot-toast/commit/3f014ccf84229f00ce59bbc60cb31a841a440ce2))

# [1.0.0-beta.7](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2021-01-31)


### Bug Fixes

* 🐛 add difference in duration in observe ([c0d3136](https://github.com/ngneat/hot-toast/commit/c0d3136e1a8182aa30501f70d9376d39a58ec60f))
* 🐛 increase toast max-width to 350px ([ca39723](https://github.com/ngneat/hot-toast/commit/ca39723556c42e9f33088297a9f42c61c61c80d0))

# [1.0.0-beta.6](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2021-01-31)


### Bug Fixes

* 🐛 override options in observe fixed ([f3b76ca](https://github.com/ngneat/hot-toast/commit/f3b76ca990366d88c7a9510be445565fc8d017e9))

# [1.0.0-beta.5](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2021-01-30)


### Features

* 🎸 hover and focus style for close button ([f160cdf](https://github.com/ngneat/hot-toast/commit/f160cdfe51e6d287de2327884ba1058b02d0f480))

# [1.0.0-beta.4](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2021-01-29)


### Bug Fixes

* 🐛 detect changes on height update, a method to update reve ([ea5f6e5](https://github.com/ngneat/hot-toast/commit/ea5f6e5abe9c475891b98b65d00ad2bb68a19135))


### Features

* 🎸 add function to update global config through service ([15bebbc](https://github.com/ngneat/hot-toast/commit/15bebbc6a7f62dd99943bafde8373cfb50c58ba3))

# [1.0.0-beta.3](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-01-28)

# [1.0.0-beta.2](https://github.com/ngneat/hot-toast/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-01-28)


### Bug Fixes

* 🐛 change @ngneat/overview version ([b126aff](https://github.com/ngneat/hot-toast/commit/b126affd6e4be3f57528c775e3854768e896d1e4))

# 1.0.0-beta.1 (2021-01-28)


### Bug Fixes

* 🐛 import from correct path ([9a19883](https://github.com/ngneat/hot-toast/commit/9a1988355b7a1bdfa2c39a6600a7a0e5cca1e86b))
* 🐛 improve prism-theme ([a33e6bc](https://github.com/ngneat/hot-toast/commit/a33e6bcf59107e9162c7210d86509c6ad36c5a3e))
* 🐛 mover persist option to toast ([c48e322](https://github.com/ngneat/hot-toast/commit/c48e322ce7bcd33ab9e5b697c5200e64b9a2129c))
* 🐛 remove functional support for message ([f02ca3f](https://github.com/ngneat/hot-toast/commit/f02ca3fa00b973d81474e43912b7a084c880ef0a))
* 🐛 remove injector ([b17b5aa](https://github.com/ngneat/hot-toast/commit/b17b5aa32625f4815b53a3cd66b5a15010e80621))
* 🐛 remove toastr from dom ([b2430d4](https://github.com/ngneat/hot-toast/commit/b2430d4256a989ee681337b2ab67db1c9d21e1ed))
* 🐛 remove unsubscribe from toast ref ([d65cbc6](https://github.com/ngneat/hot-toast/commit/d65cbc63e75bc32471be5f6004e80cfdc3dce6ff))
* 🐛 unsubscribe on close ([648a5f0](https://github.com/ngneat/hot-toast/commit/648a5f0ded563f8fda42a62a880d1037d6015709))


### Features

* 🎸 add a flag to show whether toastr was closed by user ac ([2587d7d](https://github.com/ngneat/hot-toast/commit/2587d7d876155e59bd9928752916794c1629c374))
* 🎸 add windowRef ([71f5319](https://github.com/ngneat/hot-toast/commit/71f5319477b3308c717f1760f8b110e459a6fb65))
* 🎸 block rendering of toastr with same id ([b2b47a8](https://github.com/ngneat/hot-toast/commit/b2b47a860d11e205eebe0927d4f4734eca9cafb2))
* 🎸 debug and persist options ([c2a3054](https://github.com/ngneat/hot-toast/commit/c2a3054eae19324e985965289373db1c30029bbc)), closes [#2](https://github.com/ngneat/hot-toast/issues/2)
* 🎸 disable debug mode in prod ([c384cc4](https://github.com/ngneat/hot-toast/commit/c384cc41e6b6dae65d1af5390f294e2b3bf6c33d))
* 🎸 dynamic component for icon and message ([e12a27c](https://github.com/ngneat/hot-toast/commit/e12a27cc9e441f47a5127685d6142dd97b873bf7))
* 🎸 error, success, loading toasters ([645d30f](https://github.com/ngneat/hot-toast/commit/645d30fb41dab7070232540927f27f6353538dba))
* 🎸 forRoot method for module with default config ([9acb31c](https://github.com/ngneat/hot-toast/commit/9acb31c0cc7d9ef7621d5145557b7d95f707e7f5))
* 🎸 observe operator ([9700b8b](https://github.com/ngneat/hot-toast/commit/9700b8bd95535fcd963e7ffed50accb9ac06e65a))
* 🎸 pause hide on hover ([a28a697](https://github.com/ngneat/hot-toast/commit/a28a697dd06905ae5b979507cbdfd24e45ceed83))
* 🎸 pipeable rxjs operator and close in service ([b52a8c6](https://github.com/ngneat/hot-toast/commit/b52a8c641219d279f1f20943df3e82e98303cc8a))
* 🎸 position and reverseorder done with animation ([f4a62ac](https://github.com/ngneat/hot-toast/commit/f4a62ac1b417d6260953dbfe1bb8c19e1242f3bf))
* 🎸 promise toaster ([4633c0f](https://github.com/ngneat/hot-toast/commit/4633c0fe5c4a57877a2b21de908e57085e72a9e5))
* 🎸 provide context to ng-template ([016038d](https://github.com/ngneat/hot-toast/commit/016038db63249225959b7458dad7485e2a0dbced))
* 🎸 redcue motion support ([c95cf0e](https://github.com/ngneat/hot-toast/commit/c95cf0ede38c36e70efe0f6b10e6fddc9799283c)), closes [#4](https://github.com/ngneat/hot-toast/issues/4)
* 🎸 schematics ([8cc9b27](https://github.com/ngneat/hot-toast/commit/8cc9b2732aa9ce848e23efa258597ab4425ef852))
* 🎸 snackbar theme ([67a0955](https://github.com/ngneat/hot-toast/commit/67a0955aac72d9742fc7a17aca47891aff84137a))
* 🎸 toast for observable ([5a3f763](https://github.com/ngneat/hot-toast/commit/5a3f7635d9eb9eabdc6daa782488a64eef725173))
* 🎸 toastref ([e9b87d7](https://github.com/ngneat/hot-toast/commit/e9b87d79bf31161e96b048519911ad8a34048ce6))
* 🎸 toastref with events ([abfe66c](https://github.com/ngneat/hot-toast/commit/abfe66c2fd0f938227385db2f8beabc039d6735b))
* 🎸 warn toast, doc improvements ([3c2cf6f](https://github.com/ngneat/hot-toast/commit/3c2cf6fdb3487c8ae31d76d9f2ae7b2dd8aab2a7))


### Performance Improvements

* ⚡️ change detection strategy ([168b429](https://github.com/ngneat/hot-toast/commit/168b42955e81525a4b8fed4001b20b346dc238e4))
