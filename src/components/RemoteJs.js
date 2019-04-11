const RemoteJs = {
  name: 'remote-js',
  props: {
    src: {
      type: String,
      required: true,
    },
    fn: {
      type: Function,
    },
  },
  render (createElement) {
    return createElement(
      'div',
      {},
      [
        createElement(
          'script',
          {
            attrs: {
              src: this.src,
            },
          },
        ),
      ],
    )
  },
  methods: {
    init () {
      this.fn()
    },
  },
  mounted () {
    this.init()
  }
}
export default RemoteJs
