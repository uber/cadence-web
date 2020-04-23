// modal configuration
module.exports = {
  title: '',
  description: '',
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
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
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: false,
    summaryLength: 1000,
  },
}
