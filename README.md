# markdown-it-custom-block

> Handle custom blocks transformations

## Usage

```js
const customBlock = require('markdown-it-custom-block')

const md = markdownit()
md.use(customBlock, {
  example (arg) {
    return `<example-${md.utils.escapeHtml(arg)}/>`
  },
  video (url) {
    return `<video controls>
      <source src="${md.utils.escapeHtml(url)}" type="video/mp4">
    </video>`
  }
})
```

```md
@[example](hello)

@[video](video.mp4)
```

becomes

```html
<example-hello/>
<video controls>
  <source src="video.mp4" type="video/mp4">
</video>
```

## License

[MIT](http://opensource.org/licenses/MIT)
