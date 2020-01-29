export default {
  bind(el) {
    el.addEventListener('scroll', () => {
      // eslint-disable-next-line no-param-reassign
      el.scrolledToBottom =
        el.scrollHeight - el.scrollTop - el.offsetHeight < 10;
    });
  },
  update(el) {
    if (el.scrolledToBottom) {
      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        el.scrollTop = el.scrollHeight - el.offsetHeight;
      });
    }
  },
};
