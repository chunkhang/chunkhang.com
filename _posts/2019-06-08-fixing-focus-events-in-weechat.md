---
layout: post
title: Fixing Focus Events in WeeChat
date: 2019-06-08 20:39 +0800
category: tech
tags: weechat iterm2 xterm focus
---

{% include post_image.html
    img='weechat.jpg'
    alt='weechat' %}

I have been using [WeeChat][weechat] with [iTerm2][iterm2] for quite
a while now. So far, it has been a fairly pleasant experience. On top
of joining the [freenode][freenode] server, I also managed to setup
[wee-slack][wee-slack] for work. WeeChat has become an essential part of
my work life.

However, I was getting a lot of beeps from WeeChat messages, especially
from wee-slack. I decided to look into conditionally enabling and
disabling the beeps. It turns out that it was possible to execute
commands in WeeChat when the terminal gets or loses focus, as documented
[here][weechat-focus]. So, I did the following in WeeChat:

```
/set weechat.startup.command_after_plugins "/print -stdout \033[?1004h\n"
/key bind meta2-I /mute set trigger.trigger.beep.enabled off
/key bind meta2-O /mute set trigger.trigger.beep.enabled on
```

It works! When WeeChat remains in focus, the beep trigger is disabled.
On the other hand, when I move away from WeeChat onto another desktop,
the terminal will beep to notify me of new mentions or private messages,
if any.

### The Problem

However, I soon found myself plagued by an annoying, little problem.
After quitting WeeChat, I would get a beep whenever I move my focus away
from the terminal. For a while, my only solution was to quit the iTerm2
window, and open a new one.

Not long after, I learnt by accident that opening and quitting Vim
would also solve the problem. That was when I realised that there was
something Vim was doing right. I did some research to really understand
what I had done with WeeChat in the first place.

It appeared that the problem stemmed from focus events. The key is
`/print -stdout \033[?1004h\n`. We have been asking WeeChat to print
`\033[?1004h` to the standard output, followed by a newline character,
every time it starts. It turns out that `esc[?1004h` is a control
sequence that tells the terminal to enable `FocusIn/FocusOut` events.
You can read more about [xterm control sequences][xterm] if you are
interested.

When focus events are enabled, the terminal will send `esc[I` and
`esc[O` whenever it gains and loses focus respectively. That is why
we bind `meta2-I` to run disable the beep, and `meta2-O` to enable
the beep. However, we also need to tell the terminal to disable
`FocusIn/FocusOut` events after we are done. Without doing that, iTerm2
would respond to the focus events with beeps for some reason.

It seemed like Vim disables focus reporting on exit, thanks to one of
the plugins I was using: [vitality.vim][vitality]. Indeed, I found the
following snippets from the plugin's source code:

```vim
" iTerm2 allows you to turn "focus reporting" on and off with these
" sequences.
"
" When reporting is on, iTerm2 will send <Esc>[O when the window loses focus
" and <Esc>[I when it gains focus.
"
" TODO: Look into how this works with iTerm tabs.  Seems a bit wonky.
let enable_focus_reporting  = "\<Esc>[?1004h"
let disable_focus_reporting = "\<Esc>[?1004l"
```

```vim
" When starting Vim, enable focus reporting and save the screen.
" When exiting Vim, disable focus reporting and save the screen.
"
" The "focus/save" and "nofocus/restore" each have to be in this order.
" Trust me, you don't want to go down this rabbit hole.  Just keep them in
" this order and no one gets hurt.
if g:vitality_fix_focus
  let &t_ti = cursor_to_normal . enable_focus_reporting . save_screen . &t_ti
  let &t_te = disable_focus_reporting . restore_screen
endif
```

### The Solution

So, to solve the problem, I just needed to disable focus
reporting when WeeChat quits. Since there is no option similar to
`weechat.startup.command_after_plugins` for executing commands on
quitting, I needed to use a [trigger][trigger] instead.

For this, we can rely on the `quit` [signal][signal] that is fired when
the `/quit` command is issued. The trigger will prompt WeeChat to print
`esc[?1004l` to disable focus reporting when quitting. It can be added
with the `/trigger add` command:

```
/trigger add fix_focus signal "quit" "" "" "/print -stdout \033[?1004l\n"
```

The syntax of `/trigger add` can be understood as:

```
/trigger add <name> <hook> <arguments> <conditions> <regex> <command> <return code> <post action>
```

In essence, we add a trigger named `fix_focus`. We use a `signal` hook
for the trigger, but we are only interested in the `quit` signal in
particular. We leave `<conditions>` and `<regex>` as empty, while the
`<command>` is to print out the control sequence. We can ignore `<return
code>` and `<post action>` because anything after `<hook>` is optional.
They will be set to their default values.

Now, I can quit WeeChat without it leaving phantom beeps.

[weechat]: https://weechat.org/
[iterm2]: https://www.iterm2.com/
[freenode]: https://freenode.net/
[wee-slack]: https://github.com/wee-slack/wee-slack
[weechat-focus]: https://weechat.org/files/doc/devel/weechat_faq.en.html#terminal_focus
[xterm]: https://invisible-island.net/xterm/ctlseqs/ctlseqs.html
[vitality]: https://github.com/sjl/vitality.vim
[trigger]: https://github.com/weechat/weechat/wiki/Triggers
[signal]: https://weechat.org/files/doc/stable/weechat_plugin_api.en.html#_hook_signal
