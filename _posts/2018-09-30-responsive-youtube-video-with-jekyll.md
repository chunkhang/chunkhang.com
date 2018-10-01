---
layout: post
title: Responsive YouTube Video with Jekyll
date: 2018-09-30 20:46 +0800
category: tech
tags: jekyll responsive youtube
---

At some point, we need to embed a YouTube video onto our blog post. Using [Jekyll](https://jekyllrb.com/) as our static site generator, the most straightforward way to do that is to grab the embed code from YouTube. For the purpose of this article, let us use this [video](https://www.youtube.com/watch?v=QH2-TGUlwu4) of Nyan Cat.

### Embed Code

The embed code would look something like this:

```html
<iframe width="560"
        height="315"
        src="https://www.youtube.com/embed/QH2-TGUlwu4"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
```

### Markdown File

Assuming we are planning to publish `_posts/nyan-cat.md`, we just need to simply paste that code snippet into our markdown file. After doing that, the file would now contain:

```html
---
layout: post
title: Nyan Cat
---

<iframe width="560"
        height="315"
        src="https://www.youtube.com/embed/QH2-TGUlwu4"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
```

### Non-Responsive Video

Unfortunately, the video turns out in a fixed width and height. It does not follow the full width of its parent container. On a desktop, it still looks fine, albeit not the as wide as it should be. On mobile, however, it looks absolutely horrendous. The video's width overflows that of its container. Below is the example of the non-responsive embedded video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/QH2-TGUlwu4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

To make the embedded video responsive, we need to put in some extra work. The following approach also makes it easier to embed YouTube videos in future posts.

### Partial File

First of all, create a partial HTML file called `_includes/youtube.html`:

```html
<div class="youtube-wrapper">
  <iframe src="https://www.youtube.com/embed/{{ "{{ include.id " }}}}" allowfullscreen></iframe>
</div>
```

Take note of the `div` that wraps the `iframe` . The `div` should have a wrapper class called `youtube-wrapper`. The `include.id` is a parameter that will be passed in later.

### Stylesheet

Then, add the rules below to any CSS file like `assets/css/styles.css`. Make sure you do the necessary [linking](https://teamtreehouse.com/community/htmlcss-linking).

```css
.youtube-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.youtube-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
```

The detailed explanation for how the CSS works can found [here](https://alistapart.com/article/creating-intrinsic-ratios-for-video).

### Markdown File

Now, update `_posts/nyan-cat.md` to use the partial HTML from above:

```liquid
---
layout: post
title: Nyan Cat
---

{{ "{% include youtube.html id='QH2-TGUlwu4' " }}%}
```

In this case, we pass in `QH2-TGUlwu4` as the `id` for the partial. This `id` can easily be substituted for a different YouTube video.

### Responsive Video

Finally, we get a responsive embedded YouTube video on our blog post. This time, the video is fluid in width, but retains its aspect ratio perfectly. We can even resize the browser window to witness it in action. Below is the example of the responsive video.

{% include youtube.html id='QH2-TGUlwu4' %}
