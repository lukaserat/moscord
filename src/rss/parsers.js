import lo from 'lodash'

const googleParser = data => {
  try {
    const { rss: { channel } } = data
    return (channel[0].item || []).map(item => {
      return {
        title: item.title[0],
        pubDate: item.pubDate[0],
        link: item.link[0]
      }
    })
  } catch (error) {
    return []
  }
}


const reditParser = data => {
  try {
    const { feed: { entry } } = data
    return (entry || []).map(item => {
      return {
        title: item.title[0],
        pubDate: item.updated[0],
        link: item.link[0].$.href
      }
    })
  } catch (error) {
    return []
  }
}

export const mapping = {
  'https://news.google.com/rss': googleParser,
  'https://www.reddit.com/r/worldnews': reditParser,
  'http://feeds.bbci.co.uk/news/world/rss.xml': googleParser
}



export default function parser(url, data = []) {
  let parsedData = []
  lo.mapKeys(mapping, (fn, key) => {
    if (url.indexOf(key) === 0) {
      parsedData = fn(data)
    }
  })

  return parsedData
}