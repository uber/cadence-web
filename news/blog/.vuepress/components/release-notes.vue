<template>
  <div>
    <div v-html="body"></div>
    <release-notes-link
      :owner="owner"
      :repo="repo"
      :tag="tag"
    />
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import ReleaseNotesLink from './release-notes-link';
import { getGithubApi } from '../helpers';

export default {
  name: 'release-notes',
  props: ['owner', 'repo', 'tag'],
  data() {
    return {
      body: '',
    };
  },
  components: {
    'release-notes-link': ReleaseNotesLink,
  },
  computed: {
    githubApi() {
      const { owner, repo, tag } = this;
      return getGithubApi({ owner, repo, tag });
    },
  },
  async beforeMount() {
    const response = await fetch(this.githubApi);
    const releaseData = await response.json();
    const md = new MarkdownIt();
    const rawBody = md.render(releaseData.body);
    this.body = rawBody
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
  }
};
</script>
