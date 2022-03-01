import discoverables from '../data/discoverables.json'

type Discoverable = {
  title: string,
  additionalText?: string,
  sources?: string[]
}

export function getDiscoverable(name: string) {
  return discoverables.find((item) => item.title.toLowerCase() === name.toLowerCase())
}

export function getDiscoverableText(item: Discoverable) {
  if (!item.sources) {
    return 'I\'m not sure where this item can be found'
  }
  const locations = item.sources.join(', ')
  if (item.additionalText) {
    return item.additionalText.replace(/([0-9]+)/, '$1 Zen').concat(` ${locations}`)
  }
  return `${item.title} can be found in the following locations: ${locations}`
}
