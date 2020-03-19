<template>
  <section class="help">
    <section>
      <h1>Welcome to Cadence!</h1>
      <h3>Getting started</h3>
      <p>
        If you are new to Cadence, here's some resources to get you started!
      </p>
      <div class="video-outer-container">
        <div class="video-inner-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-BuIkhlc-RM?start=3"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/aLyRyNe5Ls0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/5mBLspVKOAI"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
      <div>
        <a
          href="https://cadenceworkflow.io/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
      </div>
      <div>
        <a
          href="https://github.com/samarabbas/cadence-samples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code Samples
        </a>
      </div>
      <div>
        <a
          href="https://github.com/uber/cadence"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code on GitHub
        </a>
      </div>
      <slot name="getting-started" />
    </section>
    <section>
      <h3>Latest release notes</h3>
      <div>
        <a
          href="https://github.com/uber/cadence/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cadence
        </a>
      </div>
      <div>
        <a
          href="https://github.com/uber/cadence-web/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cadence UI
        </a>
      </div>
      <slot name="release-notes" />
    </section>
    <slot name="other" />
    <section>
      <h3>Contact us</h3>
      <p>Our office hours are 9am - 5pm PDT</p>
      <div>
        <a
          href="https://stackoverflow.com/questions/tagged/cadence-workflow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask a question on Stack Overflow
        </a>
      </div>
      <div>
        <a
          href="https://groups.google.com/d/forum/cadence-discussion"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our discussion group
        </a>
      </div>
      <div>
        <a
          href="https://join.slack.com/t/uber-cadence/shared_invite/enQtNDczNTgxMjYxNDEzLTQyYjcxZDM2YTIxMTZkMzQ0NjgxYmI3OWY5ODhiOTliM2I5MzA4NTM4MjU4YzgzZDkwNGEzOTUzNTBlNDk3Yjc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our slack channel
        </a>
      </div>
      <slot name="contact-us" />
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
@require "../styles/definitions"

iframe-height = 315px;
iframe-scrollbar-height = 15px;
iframe-margin = 20px;
iframe-width = 560px;
iframe-count = 3;
max-iframe-width = iframe-count * (iframe-width + iframe-margin) - iframe-margin;

section.help {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: layout-spacing-large;

  @media (min-width max-iframe-width) {
    width: max-iframe-width;
    margin: layout-spacing-large auto;
  }

  .video-outer-container {
    height: iframe-height + iframe-scrollbar-height;
    margin: 20px 0;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;

    .video-inner-container {
      width: max-iframe-width;
    }

    iframe {
      float: left;
      margin-right: iframe-margin;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  h1 {
    margin-bottom: base-font-size*2;
  }

  p, h3 {
    margin: 1em 0 0.5em;
  }

  a {
    line-height: 2em;

    &:nth-child(2n) {
      background: none;
    }
  }
}

</style>
