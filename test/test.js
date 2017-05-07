const markdownit = require('markdown-it')
const generate = require('markdown-it-testgen')
const assert = require('power-assert')
const { join } = require('path')

const customBlock = require('..')

describe('Custom Blocks', function () {
  const md = markdownit().use(customBlock, {
    example (arg) {
      return `<example-${arg}/>\n`
    }
  })

  generate(join(__dirname, 'fixtures/element.md'), { header: true }, md)
})
