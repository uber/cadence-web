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
        itemPermalink: '/news/:year/:month/:day/:slug',
        path: '/news/',
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
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: false,
    path: '/news/',
    summaryLength: 1000,
  },
}
