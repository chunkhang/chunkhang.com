---
layout: post
title: Slow Syntax Highlighting in Vim
date: 2019-05-17 22:01 +0800
category: tech
tags: vim syntax regex
---

I was happily refactoring my messy [vimrc][my-vimrc], trying to emulate
how the legendary [junegunn][junegunn] does [his][junegunn-vimrc].
However, I realised that Vim was becoming less and less responsive
the more I type. It appeared that the issue only plagued me when I
was editing my vimrc, but not any other files. Needless to say, I
was extremely annoyed. I was determined to identify the cause of the
problem, and solve it.

### The Problem

During my investigation, I read up quite a bit on debugging Vim. Some
of the noteworthy things I discovered include this helpful guide for
[troubleshooting][troubleshoot-vim] Vim. I also found this great plugin
called [Bisectly][bisectly] that automates the plugin bisection process.
By the way, if you are unfamiliar with the concept of bisection, you can
read up more about it [here][bisection]. After much effort, I found that
the issue could be attributed to these following three factors.

#### Factor #1: File Length

It turns out that my vimrc file was getting longer and longer. Writing
more comments and functions made my code much more readable and
understandable, but it also increased the file length. By right,
going from 500 lines to 700 lines should not drastically impact the
performance of Vim. Yet, it did. This served as an insight to the second
factor in this problem. When a file gets longer, the syntax highlighting
takes significantly more effort to work properly.

#### Factor #2: Regex Engine

Vim's syntax highlighting relies on the regex engine. Typing `:syntax`
will show you all the syntax items that are active for the current
buffer. All that pattern matching requires a fast and reliable regex
engine for the syntax highlighting to feel seamless. Every time you
scroll the page, it takes a toll on the regex engine. If it is not
performant enough, the screen will start to lag as Vim furiously tries
to redraw the screen with new highlights. Vim 7.4 introduced a shiny,
[new regex engine](new-regex-engine), but many people beg to differ.

#### Factor #3: Relative Number

The last thing that caught me by surprise was `relativenumber`. It
seems like people have reported performance issues with relative number
when syntax highlighting is enabled. You can read more about the
[issue][relative-number-issue] on GitHub.

### The Solution

Funnily enough, relative number was actually the biggest issue.
Disabling it with `set norelativenumber` in my vimrc immediately
solved the problem. Unfortunately, I really cannot live without a
life-changing feature like [relative number][relative-number]. The Vim
team did release a [patch][relative-number-patch] to address the bug,
but applying means rebuilding Vim from its source with the patch applied
manually. To me, it was just too much work.

On the other hand, many people suggest [reverting](revert-regex-engine)
to the old regex engine with `set re=1`, especially for Ruby
development. So, I decided to give it a shot. It was a godsend. Vim felt
so much faster and responsive with that one extra line in my vimrc.
Since I dislike short forms, I went with this:

```vim
set regexengine=1
```

You can read the entry about the option with `:help regexengine`.

[my-vimrc]: https://github.com/chunkhang/dotfiles/blob/master/vimrc
[junegunn]: https://github.com/junegunn
[junegunn-vimrc]: https://github.com/junegunn/dotfiles/blob/master/vimrc
[troubleshoot-vim]: https://vim.fandom.com/wiki/Troubleshooting
[bisectly]: https://github.com/dahu/bisectly
[bisection]: https://vim.fandom.com/wiki/Bisecting
[new-regex-engine]: https://www.infoq.com/news/2013/08/vim-7-4
[relative-number-issue]: https://github.com/vim/vim/issues/1735
[relative-number]: https://jeffkreeftmeijer.com/vim-number/
[relative-number-patch]: https://github.com/vim/vim/commit/bd9a53c06c8869ad811cb3dd01a309c9be7d7a63
[revert-regex-engine]: https://stackoverflow.com/a/16920294
