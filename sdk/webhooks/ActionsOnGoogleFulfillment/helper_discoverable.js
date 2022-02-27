const discoverables = require('./data_discoverables')

exports.getDiscoverable = (name) => {
  return discoverables.find(item => item.title.toLowerCase() === name.toLowerCase())
}

exports.getDiscoverableText = (item) => {
  const locations = item.sources.join(', ')
  if (item.additionalText) {
    return item.additionalText.replace(/([0-9]+)/, '$1 Zen').concat(` ${locations}`)
  }
  return `${item.title} can be found in the following locations: ${locations}`
}