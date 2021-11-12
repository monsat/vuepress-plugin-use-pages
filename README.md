# VuePress Plugin usePages

You can use array of all PagesData in your doc.

> This plugin is for VuePress 2

You can create articles list links easily.


## Install

```
$ npm install -D vuepress-plugin-use-pages

# or

$ yarn add -D vuepress-plugin-use-pages
```

## Usage

Add `vuepress-plugin-use-pages` in your config file.

```ts:docs/.vuepress/config.ts
  plugins: [
    ['vuepress-plugin-use-pages'],
  ],
```

in your doc file or component.

```html:some-component.vue
<script>
import { defineComponent } from 'vue'
import { usePages } from '@temp/pages'  // pages.js is default filename

export default defineComponent({
  setup() {
    const pages = usePages()
    console.log(pages)
    return { pages }
  },
})
</script>

<template>
  <ul>
    <li
      v-for="page in pages"
      :key="page.key"
    >
      <a :href="page.path">{{ page.title }}</a>
      <span v-if="page.frontmatter.date">
        [ {{ (new Date(page.frontmatter.date)).toLocaleString() }} ]
      </span>
    </li>
  </ul>
</template>
```

## Options

```ts:docs/.vuepress/config.ts
  plugins: [
    ['vuepress-plugin-use-pages', {
      startsWith: '/posts/',                  // fetch only matched paths
      filter: (page) => page.lang === 'ja',   // fetch only filtered pages
      limit: 30,                              // maximum cached size
      file: 'articles.js',                    // temp file name
    }],
  ],
```

### startsWith

If your docs are in `docs/posts/**/*.md`, set `startsWith: '/posts/'`.

default: `/articles/`

### filter

Additional filter function.

### limit

maximum cached size.

default: `false` (all files)

### file

temp file name

default: `pages.js`

## Reference

- [VuePress](https://v2.vuepress.vuejs.org/)

## License

MIT
