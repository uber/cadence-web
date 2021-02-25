<template>
  <p>Please read the complete release notes <a :href="githubLink" target="_blank" rel="noopener noreferrer">here</a>.</p>
</template>

<script>
import { getGithubLink } from '../helpers';

export default {
  name: 'release-notes-link',
  props: ['owner', 'repo', 'tag'],
  computed: {
    githubLink() {
      const { owner, repo, tag } = this;
      return getGithubLink({ owner, repo, tag });
    },
  },
};
</script>
