const lo = require('lodash')
const MyPromise = require('./promise')

module.exports = (num) => {
  let xNum = num
  const history = [xNum]

  while(xNum.toString().length > 1) {
    // console.dir(xNum)
    const a = new MyPromise((res, rej) => {
      res(lo.sum(xNum.toString().split('').map(Number)))
    })

    a.then(sum => {
      history.push(sum)
      xNum = sum
    })
  }

  return history
}