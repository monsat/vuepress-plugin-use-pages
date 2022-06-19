import type { Page, PluginObject } from '@vuepress/core'

export interface UsePagesPluginOptions {
  startsWith?: string
  filter?: (page: Page) => boolean
  sort?: (a: Page, b: Page) => number
  limit?: number | false
  file?: string
}

export const usePagesPlugin = (options?: UsePagesPluginOptions): PluginObject => {
  const name = 'vuepress-plugin-use-pages'
  const multiple = true

  const onPrepared: PluginObject['onPrepared'] = (app) => {
    const defaultSort = (a: Page, b: Page) => {
      if (!a.data.frontmatter.date || !b.data.frontmatter.date) {
        return 0
      }
      return (new Date(b.data.frontmatter.date).getTime()) - (new Date(a.data.frontmatter.date).getTime())
    }
    const {
      startsWith = '/articles/',
      filter,
      sort = defaultSort,
      limit = false,
      file = 'pages.js',
    }: UsePagesPluginOptions = options || {}

    const docs = app.pages.filter(p => p.data.path.startsWith(startsWith))
    const filtered = filter ? docs.filter(filter) : docs
    filtered.sort(sort)   // Sorted in place
    const limited = limit ? filtered.slice(0, limit) : filtered
    const pageData = limited.map(p => p.data)
    const content = `export const usePages = () => ${JSON.stringify(pageData)}`
    app.writeTemp(file, content)
  }

  return {
    name,
    multiple,
    onPrepared,
  }
}
