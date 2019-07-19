import { parseString } from 'xml2js'
import request from 'request-promise'

import parser from './parsers'

export const callApi = (url, cb) => {
  request.get(`${process.env.REACT_APP_BACKEND_URL}${url}`)
    .then(data => {
      parseString(data, function (err, result) {
        if (err) {
          cb(err.message)
        } else {
          cb(null, parser(url, result))
        }
      });
    })
    .catch(err => {
      cb(err.response.body)
    })
}