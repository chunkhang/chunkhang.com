---
layout: post
title: How I Fixed Content Jumping Caused by Icons
date: 2018-10-07 02:37 +0800
category: tech
tags: html css jumping icons
published: false
---

After a while of working on my website, I realised just how annoying the [content jumping](https://css-tricks.com/content-jumping-avoid/) on my [home](https://www.chunkhang.com) page was. The culprits were the icons and images. Both these elements need significantly more time to load than the rest of the page. While loading, they occupy no space at all on the page layout. However, once loaded, they force the page layout to shift to accommodate them.

### Icons

{% asset icons-before-fixing.gif class="post-img" %}

I am using [Font Awesome](https://fontawesome.com/) for the icons on my website, more specifically the [SVG + JS](https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=svg-with-js) version. This allows me to load the icons asynchronously. The important thing to note is that [SVG asynchronous loading](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-asynchronous-loading) adds some classes to the `<html>` tag. The one I am interested in is `.fontawesome-i2svg-complete`. This class is only present when all icons on the page have completely loaded.

```html
<span class="navigation-toggler">
  <i class="fas fa-bars"></i>
</span>
```

```css
.navigation-toggler {
  font-size: 2.4rem;
}

html:not(.fontawesome-i2svg-complete) i:after {
  content: "\00a0";
}
```

### Images

<style>
  .post-img {
    padding: 0 20rem;
  }
</style>
