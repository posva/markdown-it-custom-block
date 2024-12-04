import markdownit from 'markdown-it'
import generate from 'markdown-it-testgen'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import customBlock from '../index.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('Custom Blocks', function () {
  const md = markdownit().use(customBlock, {
    example(arg) {
      return `<example-${arg}/>`
    },
  })

  generate(join(__dirname, 'fixtures/element.md'), { header: true }, md)
  generate(join(__dirname, 'fixtures/multiple-adjacent.md'), { header: true }, md)
  generate(join(__dirname, 'fixtures/multiline.md'), { header: true }, md)
  // generate(join(__dirname, 'fixtures/inline-blocks.md'), { header: true }, md);
})
