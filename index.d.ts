import { PluginWithOptions } from 'markdown-it'

declare const plugin: PluginWithOptions<
  Record<string, (text: string) => string>
>

export default plugin
