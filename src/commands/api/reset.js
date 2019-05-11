const CONFIRM_MESSAGE = 'Are you sure you want to reset the IMDB API key?'
module.exports = {
  name: 'reset',
  description: 'reset the API key',
  run: async toolbox => {
    // Retrieve the tools from the toolbox that we will need
    const { prompt, print, imdb} = toolbox

    // Confirmation, because it's destructive
    if (await prompt.confirm(CONFIRM_MESSAGE)) {
      // Delete the API key
      await imdb.resetApiKey()
      print.info('Successfully deleted IMDB API key.')
    }
  }
}
