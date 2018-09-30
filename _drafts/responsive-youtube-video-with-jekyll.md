---
layout: post
title: Responsive YouTube Video with Jekyll
---

At some point, we need to embed a YouTube video onto our blog post. Using Jekyll as our static site generator, the most straightforward way to do that is to grab the embed code from YouTube. For the purpose of this article, let us use this [video](https://www.youtube.com/watch?v=QH2-TGUlwu4) of Nyan Cat.

The embed code would look something like this:

```html
<iframe width="560"
        height="315"
        src="https://www.youtube.com/embed/QH2-TGUlwu4"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
```

