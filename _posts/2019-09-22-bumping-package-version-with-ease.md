---
layout: post
title: Bumping Package Version with Ease
date: 2019-09-22 15:26 +0800
category: tech
tags: npm javascript
---

Every time I need to do a hotfix for a JavaScript repository, I would
perform these steps:

1. Start the flow with `git flow hotfix start <version>`
2. Bump the version number on `package.json` and `package-lock.json`
3. Commit the bump with a message like `Bump version to <version>`
4. Commit the actual fix
5. Finish the flow with `git flow hotfix finish <version>`

By the way, if you're not familiar with `git flow`, I highly recommend
you read up about it [here][git-flow]. Anyway, my annoyance comes
from the second step, where I need to manually update the version on
`package.json` and `package-lock.json`.

It turns out there there's an easy way to bump the version: `npm
version`. Now, we can run `npm version <version>` to update
`package.json` and `package-lock.json` accordingly. You can also play
around with commands like:

- `npm version major`
- `npm version minor`
- `npm version patch`

There's one problem though. The command will also automatically
commit and tag it as well. In most cases, that is an undesirable
behaviour. The [documentation][npm-version] doesn't actually explain
how to circumvent this problem. The answer came from this [GitHub
Issue][github-issue] instead.

Long story short, we can explicitly run `npm version
--no-git-tag-version <version>`. Preferably, we can also do `npm config
set git-tag-version=false`. This should update your `.npmrc` to include
the option. Regardless, running `npm version <version>` now should no
longer automatically generate a commit or tag.

### TLDR

- Use `npm version <version>` to update the version on `package.json`
  and `package-lock.json`
- Run `npm config set git-tag-version=false` to not automatically generate
  a commit and tag

[git-flow]: https://nvie.com/posts/a-successful-git-branching-model
[npm-version]: https://docs.npmjs.com/cli/version
[github-issue]: https://github.com/npm/npm/issues/7186
