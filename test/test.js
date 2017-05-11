const markdownit = require('markdown-it')
const generate = require('markdown-it-testgen')
const { join } = require('path')

const customBlock = require('..')

describe('Custom Blocks', function () {
  const md = markdownit().use(customBlock, {
    example (arg) {
      return `<example-${arg}/>`
    }
  })

  generate(join(__dirname, 'fixtures/element.md'), { header: true }, md)
  generate(join(__dirname, 'fixtures/multiple-adjacent.md'), { header: true }, md)
  // generate(join(__dirname, 'fixtures/inline-blocks.md'), { header: true }, md)
})
