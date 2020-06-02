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
      body: ''
    };
  },
  async beforeMount() {
    const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/tags/${this.tag}`);
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