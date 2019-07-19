export const RSS_FETCHING = 'RSS_FETCHING'
export const RSS_FETCHED = 'RSS_FETCHED'
export const RSS_URL_CHANGE = 'RSS_URL_CHANGE'

export const ERROR_RESET = 'ERROR_RESET'
export const ERROR_HIT = 'ERROR_HIT'

export const SORT_ASC = 'SORT_ASC'
export const SORT_DESC = 'SORT_DESC'

export const loadFeed = (url: string) => (dispatch) => {
  dispatch(updateFeed(url))
}

export const updateFeed = (url: string) => ({
  url, type: RSS_URL_CHANGE
})

export const sortAsc = (sort) => ({
  type: sort === 'asc' ? SORT_DESC : SORT_ASC
})