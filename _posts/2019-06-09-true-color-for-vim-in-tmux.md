---
layout: post
title: True Color for Vim in Tmux
date: 2019-06-09 00:27 +0800
category: tech
tags: vim tmux color
---

Everyone should be familiar with [termguicolors][termguicolors], the
option that allows terminal Vim to employ [24-bit color][24-bit-color]
or true color. We use `set termguicolors` for vim to display RGB colors
in our color scheme correctly.

However, true color may break if you are using Vim in [tmux][tmux]. If
you have set up the tmux terminal properly, and Vim did not complain
about not recognising your `$TERM`, you can try adding the following to
your `.vimrc`:

```vim
let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
set termguicolors
```

See [xterm-true-color][xterm-true-color] for explanation.

[termguicolors]: https://vimhelp.org/options.txt.html#%27termguicolors%27
[24-bit-color]: https://en.wikipedia.org/wiki/Color_depth#True_color_(24-bit)
[tmux]: https://github.com/tmux/tmux
[xterm-true-color]: https://vimhelp.org/term.txt.html#xterm-true-color
