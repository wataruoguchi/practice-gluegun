module.exports = async toolbox => {
  toolbox.hello = () => {
    toolbox.print.info('Hello from an extension!')
  }
}
