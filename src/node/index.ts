import type { Plugin, PluginObject, Page } from '@vuepress/core'

export interface UsePagesPluginOptions {
  startsWith?: string
  filter?: (page: Page) => boolean
  limit?: number | false
  file?: string
}

const usePagesPlugin: Plugin = (options, app): PluginObject => {
  const name = 'vuepress-plugin-use-pages'
  const multiple = true

  const onInitialized = () => {
    const {
      startsWith = '/articles/',
      filter,
      limit = false,
      file = 'pages.js',
    }: UsePagesPluginOptions = options || {}

    const docs = app.pages.filter(p => p.data.path.startsWith(startsWith))
    const filtered = filter ? docs.filter(filter) : docs
    const limited = limit ? filtered.slice(0, limit) : filtered
    const pageData = limited.map(p => p.data)
    const content = `export const usePages = () => ${JSON.stringify(pageData)}`
    app.writeTemp(file, content)
  }

  return {
    name,
    multiple,
    onInitialized,
  }
}

export default usePagesPlugin
