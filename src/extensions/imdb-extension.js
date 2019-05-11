const imdb = require('imdb-api')
module.exports = toolbox => {
  const { filesystem } = toolbox

  // Location of the movie config file
  const MOVIE_CONFIG = `${filesystem.homedir()}/.movie`

  // Memorize the API key once we retrieve it
  let imdbKey = false

  // Get the API key
  async function getApiKey () {
    // If we've already retrieved it, return that
    if (imdbKey) return imdbKey

    // Get it from the config file?
    imdbKey = await readApiKey()
    return imdbKey
  }

  // Read an existing API key from the `MOVIE_CONFIG` file
  async function readApiKey () {
    return filesystem.exists(MOVIE_CONFIG) && filesystem.readAsync(MOVIE_CONFIG)
  }

  // Save a new API key to the `MOVIE_CONFIG` file
  async function saveApiKey (key) {
    return filesystem.writeAsync(MOVIE_CONFIG, key)
  }

  // Get a movie
  async function getMovie (name) {
    const key = await getApiKey()
    if (key) return imdb.get({ name }, { apiKey: key, timeout: 30000 })
  }

  // Reset the API key
  async function resetApiKey () {
    await filesystem.removeAsync(MOVIE_CONFIG)
  }

  // Attach our tools to the toolbox
  toolbox.imdb = { getApiKey, saveApiKey, getMovie, resetApiKey }
}
