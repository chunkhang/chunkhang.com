---
layout: post
title: Jekyll Assets and Working Directory
date: 2018-10-16 14:47 +0800
category: tech
tags: jekyll assets sprockets directory
---

Today, I was in the mood of making a new blog post. I started running the server with `jekyll serve` as usual. That was when [Jekyll](https://jekyllrb.com/) spat a huge chunk of error message at me. It took me by surprise because I did not remember changing anything in the past week or so.

```
$ jekyll serve
Configuration file: /Users/marcus/Workspace/web/chunkhang.com/_config.yml
            Source: /Users/marcus/Workspace/web/chunkhang.com
       Destination: /Users/marcus/Workspace/web/chunkhang.com/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
         AutoPages: Disabled/Not configured in site.config.
        Pagination: Complete, processed 1 pagination page(s)
       Jekyll Feed: Generating feed for posts
  Liquid Exception: couldn't find file ...
jekyll 3.8.4 | Error:  couldn't find file
  '/Users/marcus/workspace/web/chunkhang.com/.jekyll-cache/assets/proxied/4df4af.png' in
  `_posts/2018-09-25-enter-the-abyss.md'

Checked in these paths:
  /Users/marcus/Workspace/web/chunkhang.com/_assets/css/inlines
  /Users/marcus/Workspace/web/chunkhang.com/assets/css
  /Users/marcus/Workspace/web/chunkhang.com/assets/fonts
  /Users/marcus/Workspace/web/chunkhang.com/assets/images
...
```

### The Problem

I examined the error closely. It seemed like Jekyll could not find the asset `4df4af.png`. Looking at the paths, I noticed that the asset path was different from the paths Jekyll checked in. The `workspace` folder in the asset path was in lower case. In the checked paths, however, `Workspace` was in upper case.

**The asset path:**

```
/Users/marcus/workspace/web/chunkhang.com/.jekyll-cache/assets/proxied/4df4af.png
```

**One of the checked paths:**

```
/Users/marcus/Workspace/web/chunkhang.com/_assets/css/inlines
```

### The Cause

Then, I remembered that I recently capitalised the name of my `Workspace` folder. This was done to ensure all my folders in the home directory are spelt the same way.

```
$ ls ~
Desktop   Downloads Library   Music     Public    Workspace
Documents Dropbox   Movies    Pictures  Scripts
```

I ran `jekyll serve --trace` to get more information regarding the error. Something that caught my attention was `(Sprockets::FileNotFound)`. [Sprockets](https://github.com/rails/sprockets) is a dependency for [Jekyll Assets](https://github.com/envygeeks/jekyll-assets), the gem I use for my asset pipeline. It meant that, somehow, Jekyll Assets was still using the old working directory.

I tried running `jekyll clean` to no avail. Reinstalling the gem by removing it from `Gemfile` and adding it again also failed  However, renaming the `Workspace` folder back to the original `workspace` did solve the problem immediately.

### The Solution

Finally, I looked at the `.jekyll-cache` folder in the working directory. Aside from the proxied assets, the cache folder also contained data for Sprockets.

```
$ tree .jekyll-cache -L 3
.jekyll-cache
└── assets
    ├── proxied
    │   ├── 044946.jpg
    │   ├── 1c5c5d.png
    │   ├── 4c30c0.jpg
    │   ├── 4df4af.png
    │   ├── 64b1a8.png
    │   ├── 855225.png
    │   ├── 8ebdd7.jpg
    │   ├── c5e9fd.png
    │   ├── ddb80c.jpg
    │   ├── e0c18b.jpg
    │   ├── e4c09e.jpg
    │   └── f12acb.png
    └── sprockets
        └── v3.0

4 directories, 12 files
```

I had a hunch that Sprockets must have been initialised with the wrong working directory. It had remained cached after all this time. Removing the cache folder should force it to regenerate the cache, reinitialising with the correct working directory.

```
$ rm -rf .jekyll-cache
```

Thus, all was well again with Jekyll.

```
$ jekyll serve
Configuration file: /Users/marcus/Workspace/web/chunkhang.com/_config.yml
            Source: /Users/marcus/Workspace/web/chunkhang.com
       Destination: /Users/marcus/Workspace/web/chunkhang.com/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
         AutoPages: Disabled/Not configured in site.config.
        Pagination: Complete, processed 1 pagination page(s)
       Jekyll Feed: Generating feed for posts
                    done in 1.31 seconds.
 Auto-regeneration: enabled for '/Users/marcus/Workspace/web/chunkhang.com'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```
