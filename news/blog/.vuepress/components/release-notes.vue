<template>
  <div v-html="body"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'release-notes',
  props: ['owner', 'repo', 'tag'],
  data() {
    return {
      body: '',
    };
  },
  computed: {
    githubLink() {
      return `https://github.com/${this.owner}/${this.repo}/releases/tag/${this.tag}`;
    },
    githubApi() {
      return `https://api.github.com/repos/${this.owner}/${this.repo}/releases/tags/${this.tag}`;
    },
  },
  async beforeMount() {
    try {
      const response = await fetch(this.githubApi);
      const releaseData = await response.json();
      const md = new MarkdownIt();
      const rawBody = md.render(releaseData.body);
      this.body = rawBody
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
    } catch {
      this.body = `<p>Please see release notes <a href="${this.githubLink}" target="_blank" rel="noopener noreferrer">here</a></p>`;
    }
  }
};
</script>