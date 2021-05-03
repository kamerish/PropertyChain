/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { LandRecordContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('LandRecordContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new LandRecordContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"land record 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"land record 1002 value"}'));
    });

    describe('#landRecordExists', () => {

        it('should return true for a land record', async () => {
            await contract.landRecordExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a land record that does not exist', async () => {
            await contract.landRecordExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createLandRecord', () => {

        it('should create a land record', async () => {
            await contract.createLandRecord(ctx, '1003', 'land record 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"land record 1003 value"}'));
        });

        it('should throw an error for a land record that already exists', async () => {
            await contract.createLandRecord(ctx, '1001', 'myvalue').should.be.rejectedWith(/The land record 1001 already exists/);
        });

    });

    describe('#readLandRecord', () => {

        it('should return a land record', async () => {
            await contract.readLandRecord(ctx, '1001').should.eventually.deep.equal({ value: 'land record 1001 value' });
        });

        it('should throw an error for a land record that does not exist', async () => {
            await contract.readLandRecord(ctx, '1003').should.be.rejectedWith(/The land record 1003 does not exist/);
        });

    });

    describe('#updateLandRecord', () => {

        it('should update a land record', async () => {
            await contract.updateLandRecord(ctx, '1001', 'land record 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"land record 1001 new value"}'));
        });

        it('should throw an error for a land record that does not exist', async () => {
            await contract.updateLandRecord(ctx, '1003', 'land record 1003 new value').should.be.rejectedWith(/The land record 1003 does not exist/);
        });

    });

    describe('#deleteLandRecord', () => {

        it('should delete a land record', async () => {
            await contract.deleteLandRecord(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a land record that does not exist', async () => {
            await contract.deleteLandRecord(ctx, '1003').should.be.rejectedWith(/The land record 1003 does not exist/);
        });

    });

});
