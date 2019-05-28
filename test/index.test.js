'require strict'

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const
  sinon = require('sinon')

const { expect } = require('chai')

describe('runner.js', () => {
  const noop = () => { }

  let sandbox
  beforeEach(() => {
    // creates sinon sandbox
    sandbox = sinon.sandbox.create()
  })

  // retores the sandbox
  afterEach(() => { sandbox.restore() })

  context('#run()', () => {
    context('when filename is NOT the second arg', () => {
      beforeEach(() => {
        sandbox.stub(process, 'argv').value([null, 'this is not a file name'])
      })

      it('should NOT call the function', () => {
        const { run } = require('../')
        const callback = sinon.spy(noop)
        run(__filename, callback)

        expect(callback.called).to.be.false
      })
    })

    context('when filename is the second arg', () => {
      beforeEach(() => {
        sandbox.stub(process, 'argv').value([null, __filename])
      })

      it('should call the function', () => {
        const { run } = require('../')
        const callback = sinon.spy(noop)
        run(__filename, callback)

        expect(callback.calledOnce).to.be.true
      })

      it('should call the function with the expected 3 arguments', () => {
        const { run } = require('../')
        const callback = sinon.spy(noop)
        run(__filename, callback, 2, 4, 6)

        expect(callback.calledOnce).to.be.true
        expect(callback.calledWithExactly(2, 4, 6)).to.be.true
      })

      it('should call the function with the expected N arguments', () => {
        const { run } = require('../')
        const callback = sinon.spy(noop)
        const length = ~~(Math.random() * 10)
        const nArgs = Array.from({ length }, (v, i) => i)
        run(__filename, callback, ...nArgs)

        expect(callback.calledOnce).to.be.true
        expect(callback.calledWithExactly(...nArgs)).to.be.true
      })
    })
  })
})
