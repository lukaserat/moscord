const lo = require('lodash')

class MyPromise {
  static get STATE_PENDING() { return 'PENDNG' }
  static get STATE_FULFILLED() { return 'FULFILLED' }
  static get STATE_REJECTED() { return 'REJECTED' }

  constructor(executeFn) {
    if (!lo.isFunction(executeFn)) {
      throw new Error('Expecting a function to execute.')
    }

    this._state = MyPromise.STATE_PENDING
    this._resolveValue = null
    this._rejectionValue = null
    this._chainOfThen = []

    try {
      executeFn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (resolveVal) {
    if (this._state !== MyPromise.STATE_PENDING) {
      return
    }

    this._state = MyPromise.STATE_FULFILLED
    this._resolveValue = resolveVal

    // for calling then
    for ({ onResolveFn } in this._chainOfThen) {
      this.exectResolve(onResolveFn)
    }
  }

  reject (rejectionVal) {
    if (this._state !== MyPromise.STATE_PENDING) {
      return
    }

    this._state = MyPromise.STATE_REJECTED
    this._rejectionValue = rejectionVal

    // for calling then
    for ({ onRejectFn } in this._chainOfThen) {
      this.exectReject(onRejectFn)
    }
  }

  then (onResolveFn = lo.noop, onRejectFn = lo.noop) {
    const nextResolveVal = null
    const nextRejectionVal = null

    if (this._state === MyPromise.STATE_FULFILLED) {
      this.exectResolve(onResolveFn)
    }
    else if (this._state === MyPromise.STATE_REJECTED) {
      this.exectReject(onRejectFn)
    }
    else {
      this._chainOfThen.push({ onResolveFn, onRejectFn })
    }

    return this
  }

  catch (onRejectFn = lo.noop) {
    if (this._state === MyPromise.STATE_REJECTED) {
      this.exectReject(onRejectFn)
    }
  }

  exectReject(fn) {
    const nextRejectionValue = fn(this._rejectionValue)
    if (nextRejectionValue !== undefined) {
      this._rejectionValue = nextRejectionValue
    }
  }

  exectResolve(fn) {
    const nextResolveValue = fn(this._resolveValue)
    if (nextResolveValue !== undefined) {
      this._resolveValue = nextResolveValue
    }
  }
}

module.exports = MyPromise