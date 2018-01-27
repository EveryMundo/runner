'require strict';

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const
  sinon = require('sinon'),
  { expect } = require('chai');

describe('runner.js', () => {
  const noop = () => { };

  let sandbox;
  beforeEach(() => {
    // creates sinon sandbox
    sandbox = sinon.sandbox.create();
  });

  // retores the sandbox
  afterEach(() => { sandbox.restore(); });

  context('#run()', () => {
    context('when filename is NOT the second arg', () => {
      beforeEach(() => {
        sandbox.stub(process, 'argv').value([null, 'this is not a file name']);
      });

      it('should not run the function', () => {
        const { run } = require('../');
        const callback = sinon.spy(noop);
        run(__filename, callback);

        expect(callback.called).to.be.false;
      });
    });

    context('when filename is the second arg', () => {
      beforeEach(() => {
        sandbox.stub(process, 'argv').value([null, __filename]);
      });

      it('should not run the function', () => {
        const { run } = require('../');
        const callback = sinon.spy(noop);
        run(__filename, callback);

        expect(callback.calledOnce).to.be.true;
      });
    });
  });
});
