const { expect } = require('chai')
const sumUntil = require('./sumUntil')


describe("sumUntil", () => {
  it("should be able to return expected results", () => {
    expect(sumUntil(1)).to.deep.equal([1])
    expect(sumUntil(22)).to.deep.equal([22, 4])
    expect(sumUntil(444444)).to.deep.equal([444444, 24, 6])
  })
})