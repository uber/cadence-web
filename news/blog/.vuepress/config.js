// modal configuration
module.exports = {
  title: '',
  description: '',
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    directories: [
      {
        dirname: '_posts',
        id: 'post',
        itemPermalink: '/_news/:year/:month/:day/:slug',
        path: '/_news/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [],
    feed: {
      canonical_base: '/',
      count: 5,
      json: true,
      sort: entries => entries.sort((entryA, entryB) => new Date(entryB.frontmatter.date).getTime() - new Date(entryA.frontmatter.date).getTime()),
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: false,
    summaryLength: 1000,
  },
}
