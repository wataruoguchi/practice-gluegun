module.exports = {
  run: async toolbox => {
    // https://infinitered.github.io/gluegun/#/getting-started

    // Creating your first command
    toolbox.print.info('Hello, world!')

    // Creating your first extension
    const { hello } = toolbox
    hello()
  }
}
