import debounce from 'lodash-es/debounce'
import deepmerge from 'deepmerge'

export default function(vue) {
  return deepmerge({
    asyncComputed: {
      results() {
        return this.fetch(true)
      }
    },
    computed: {
      showTable() {
        return !this.error && (this.loading || (this.results && this.results.length))
      },
      showNoResults() {
        return !this.error && !this.loading && this.results && this.results.length === 0
      },
      disableInfiniteScroll() {
        return this.loading || !this.npt
      }
    },
    methods: {
      debouncedSetQuery: debounce(function(e) {
          var target = e.target || e.testTarget // test hook since Event.target is readOnly and unsettable
          this.$router.replaceQueryParam(target.getAttribute('name'), target.value)
        }, typeof Mocha === 'undefined' ? 300 : 1, { maxWait: 3000 }),
      nextPage() {
        this.nextPageToken = this.npt
      }
    }
  }, vue)
}