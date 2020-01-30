import deepmerge from 'deepmerge';

export default function(vue) {
  return deepmerge(
    {
      computed: {
        showTable() {
          return !this.error && (this.loading || this.results.length);
        },
        showNoResults() {
          return !this.error && !this.loading && this.results.length === 0;
        },
        disableInfiniteScroll() {
          return this.loading || !this.npt;
        },
      },
      methods: {
        nextPage() {
          this.nextPageToken = this.npt;
        },
      },
    },
    vue
  );
}
