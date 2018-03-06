export default {
  bind(el, binding) {
    el.addEventListener('scroll', function(e) {
      el.scrolledToBottom = el.scrollHeight - el.scrollTop - el.offsetHeight < 10
    })
  },
  update: function(el) {
    if (el.scrolledToBottom) {
      setImmediate(() => el.scrollTop = el.scrollHeight - el.offsetHeight)
    }
  }
}