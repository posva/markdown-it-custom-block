const embedRE = /@\[([\w-]+)\]\(([\s\S]+)\)/im

export default function plugin(md, options) {
  md.renderer.rules.custom = function tokenizeBlock(tokens, idx) {
    const { tag, arg } = tokens[idx].info
    if (!tag) return ''
    return options[tag](arg) + '\n'
  }

  md.block.ruler.before(
    'fence',
    'custom',
    function customEmbed(state, startLine, endLine, silent) {
      let startPos = state.bMarks[startLine] + state.tShift[startLine]
      let maxPos = state.eMarks[startLine]
      const block = state.src.slice(startPos, maxPos)
      let pointer = { line: startLine, pos: startPos }

      // XXX wtf
      if (startLine !== 0) {
        let prevLineStartPos = state.bMarks[startLine - 1] + state.tShift[startLine - 1]
        let prevLineMaxPos = state.eMarks[startLine - 1]
        if (prevLineMaxPos > prevLineStartPos) return false
      }

      // Check if it's @[tag](arg)
      if (
        state.src.charCodeAt(pointer.pos) !== 0x40 /* @ */ ||
        state.src.charCodeAt(pointer.pos + 1) !== 0x5b /* [ */
      ) {
        return false
      }

      const match = embedRE.exec(block)

      if (!match || match.length < 3) {
        return false
      }

      const [all, tag, arg] = match

      pointer.pos += all.length

      // Block embed must be at end of input or the next line must be blank.
      // TODO something can be done here to make it work without blank lines
      if (endLine !== pointer.line + 1) {
        let nextLineStartPos = state.bMarks[pointer.line + 1] + state.tShift[pointer.line + 1]
        let nextLineMaxPos = state.eMarks[pointer.line + 1]
        if (nextLineMaxPos > nextLineStartPos) return false
      }

      if (pointer.line >= endLine) return false

      if (!silent) {
        let token = state.push('custom', 'div', 0)
        token.markup = state.src.slice(startPos, pointer.pos)
        token.info = { arg, tag }
        token.block = true
        token.map = [startLine, pointer.line + 1]
        state.line = pointer.line + 1
      }

      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] },
  )
}
