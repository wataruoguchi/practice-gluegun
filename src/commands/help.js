module.exports = {
  name: 'help',
  alias: ['h'],
  description: 'HELP!',
  run: async toolbox => {
    toolbox.print.info('HELP!')
  }
}
