const API_MESSAGE = `
Before using the movie CLI, you'll need an API key from OMDB.
Go here: http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct
Once you have your API key, enter it below.
API KEY>`
module.exports = {
  name: 'search',
  alias: ['s'],
  description: 'Searches for and displays information about a movie',
  run: async toolbox => {
    // Retrieve the tools from the toolbox that we will need
    const { parameters, print, prompt, imdb } = toolbox

    // Check if there's a name provided on the command line first
    let name = parameters.first
    if (!name) {
      const result = await prompt.ask({
        type: 'input',
        name: 'name',
        message: 'What movie?',
      })
      if (result && result.name) name = result.name
    }

    // If they didn't provide one, we error out
    if (!name) {
      print.error('No movie name specified!')
      return
    }

    // Check if we have an IMDB API Key
    if ((await imdb.getApiKey()) === false) {
      // Didn't find an API key. Let's ask the user for one
      const result = await prompt.ask({
        type: 'input',
        name: 'key',
        message: API_MESSAGE,
      })

      // If we receive one, save it
      if (result && result.key) {
        imdb.saveApiKey(result.key)
      } else {
        return
      }
    }

    // Now retrieve the info from IMDB
    const movie = await imdb.getMovie(name)
    if (!movie) {
      print.error('Couldn\'t find that movie, sorry!')
      return
    }

    // Success! We have movie info. Print it out on the screen
    print.debug(movie)
  }
}
