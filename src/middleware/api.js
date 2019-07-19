import lo from 'lodash'
import { callApi } from '../rss'
import * as ActionTypes from '../actions'

// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  if (action.type === ActionTypes.RSS_URL_CHANGE) {
    next(action)
    store.dispatch({ type: ActionTypes.RSS_FETCHING })
    callApi(store.getState().rss.url, (error, result) => {
      if (error) {
        store.dispatch({ type: ActionTypes.ERROR_HIT, error })
      } else {
        store.dispatch({ type: ActionTypes.RSS_FETCHED, result })
        store.dispatch({ type: ActionTypes.ERROR_RESET })
      }
    })
  }
  if (action.type === ActionTypes.SORT_ASC) {
    action.data = lo.orderBy(store.getState().rss.data, 'title', 'asc')
  }
  if (action.type === ActionTypes.SORT_DESC) {
    action.data = lo.orderBy(store.getState().rss.data, 'title', 'desc')
  }
  return next(action)
}
