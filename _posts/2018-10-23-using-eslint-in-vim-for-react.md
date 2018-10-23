---
layout: post
title: Using ESLint in Vim for React
date: 2018-10-23 21:53 +0800
category: tech
tags: react eslint vim ale
---

Recently, I started learning [React](https://reactjs.org/). The initial setup for my first React application was done using [Create React App](https://github.com/facebook/create-react-app), a tool that spares developers, especially beginners, from the pain of configuring the environment. All reasonable dependencies such as [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/) and [ESLint](https://eslint.org/) have been properly included and configured out of the box. There is a nice Medium article on [Learning React with Create React App](https://medium.com/in-the-weeds/learning-react-with-create-react-app-part-1-a12e1833fdc) if you are interested.

A code linter is indispensable during development. Even though Create React App comes with ESLint, it only runs when the application is served. That means you can view the errors and warnings from ESLint from the terminal or browser console upon running the application.

{% include picture.html
    img='eslint-terminal.png'
    default='760'
    media='max-width'
    sources='600px:564,900px:712'
    alt= 'eslint from terminal' %}

{% include picture.html
    img='eslint-console.png'
    default='760'
    media='max-width'
    sources='600px:564,900px:712'
    alt= 'ESLint from Browser Console' %}

To make full use of ESLint, we need the linting to be done in [Vim](https://www.vim.org/) as well. That way, any problem will be displayed immediately as you code.

### Test ESLint

Let us start by creating a new React application with Create React App.

```
$ npx create-react-app hello-world
npx: installed 63 in 4.951s

Creating a new React app in /Users/marcus/Workspace/react/hello-world.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts...

...

Success! Created hello-world at /Users/marcus/Workspace/react/hello-world

...
```

After that, we go into the project root and edit one of the source files.

```
$ cd hello-world
$ echo 'apple' >> src/App.js
```

Then, we run ESLint on the edited file to ensure it is working properly.

```
$ npx eslint src/App.js

/Users/marcus/Workspace/react/hello-world/src/App.js
  29:1  error  Expected an assignment or function call and ...  no-unused-expressions
  29:1  error  'apple' is not defined                           no-undef

✖ 2 problems (2 errors, 0 warnings)
```

#### Caveat

Note the `npx` command that was used. Running `npx eslint` ensures the local version of ESLint is used. Running `eslint` directly may invoke the global version of ESLint. Since Create React App has its own ESLint rules dependencies, running the global ESLint will most probably give you errors.

```
$ eslint src/App.js
Error: Cannot find module 'eslint-config-react-app'
Referenced from: /Users/marcus/Workspace/react/hello-world/package.json
...
```

Feel free to read more about [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

### Install ALE

Now, we need to install a syntax-checker plugin for Vim. Previously, I used [Syntastic](https://github.com/vim-syntastic/syntastic) which has been quite fantastic (pun intended). However, since Vim 8 supports asynchronous operations, you should use [ALE](https://github.com/w0rp/ale) instead. Unlike Syntastic, ALE allows code to be linted in a non-blocking fashion. That means linting can be done in real time while you type.

Refer to the official documentation for [installation methods](https://github.com/w0rp/ale#installation).

### Configure ALE

Next, we need to configure ALE in `.vimrc`.

```vim
let g:ale_sign_error='●'
let g:ale_sign_warning='.'
```

This changes the symbol used to indicate errors and warnings, making them less aggressive than the default.

```vim
let g:ale_lint_on_enter=0
let g:ale_lint_on_text_changed='never'
```

Setting `ale_lint_on_enter` to `0` prevents ALE from running when a file is first opened. Meanwhile, setting `ale_lint_on_text_changed` to `never` means the linter is only invoked whenever the file is saved. If you prefer your code to be linted as you type, you can remove this line.

```vim
let g:ale_linters = {
    \ 'javascript': ['eslint']
    \ }
let g:ale_javascript_eslint_executable='npx eslint'
```

Last but not least, we specify the linter to be used. The most important thing to note is `ale_javascript_eslint_executable`, which is the command ALE executes to invoke ESLint. The default value for that is just `eslint`. As explained above, we must run `npx eslint` to make sure we are executing the correct version of ESLint.

### Run Vim

We can try running Vim now to see ESLint in action.

```
$ vim src/App.js
```

{% include picture.html
    img='eslint-vim.png'
    default='760'
    media='max-width'
    sources='600px:564,900px:712'
    alt= 'eslint from terminal' %}
