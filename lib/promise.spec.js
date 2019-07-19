const { expect } = require('chai')
const MyPromise = require('./promise')


describe("MyPromise", () => {
  it("should be able to execute fulfilled path", () => {
    const a = new MyPromise((res, rej) => {
      return res('Hello')
    })

    a.then((fulfilledResult) => {
      expect(fulfilledResult).is.equal('Hello')
    })
    .then((fulfilledResult) => {
      expect(fulfilledResult).is.equal('Hello')
      return 'World!'
    })
    .then((fulfilledResult) => {
      expect(fulfilledResult).is.equal('World!')
    })
  })
  it("should be able to execute rejected path", () => {
    const a = new MyPromise((res, rej) => {
      return rej(new Error('Haha'))
    })

    a.then(null, err => {
      expect(err).is.a('Error')
      expect(err.message).is.equal('Haha')
    })
    .catch(err => {
      expect(err).is.a('Error')
      expect(err.message).is.equal('Haha')
    })
  })
})