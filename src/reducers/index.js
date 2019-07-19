import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

const DEFAULT_RSS = 'https://news.google.com/rss?hl=en-PH&gl=PH&ceid=PH:en'

const rssInitialState = {
  url: DEFAULT_RSS,
  fetching: false,
  data: [],
  supportedRss: [
    'http://feeds.bbci.co.uk/news/world/rss.xml',
    'https://www.reddit.com/r/worldnews/.rss',
    DEFAULT_RSS
  ],
  sort: 'asc'
}

const rss = (state = rssInitialState, action) => {
  switch(action.type) {
    case ActionTypes.RSS_FETCHING:
      return { ...state, fetching: true, data: [] }
    case ActionTypes.RSS_FETCHED:
      return { ...state, fetching: false, data: action.result }
    case ActionTypes.RSS_URL_CHANGE:
      return { ...state, fetching: false, data: [], url: action.url }
    case ActionTypes.ERROR_HIT:
      return { ...state, fetching: false, data: [] }
    case ActionTypes.SORT_ASC:
      return { ...state, sort: 'asc', data: action.data }
      case ActionTypes.SORT_DESC:
          return { ...state, sort: 'desc', data: action.data }
    default:
      return state
  }
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.ERROR_RESET) {
    return null
  } else if (error) {
    return error
  }

  return state
}

const rootReducer = combineReducers({
  rss,
  errorMessage,
})

export default rootReducer
