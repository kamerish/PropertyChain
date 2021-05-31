/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class LandRecordContract extends Contract {

    async landRecordExists(ctx, landRecordId) {
        const buffer = await ctx.stub.getState(landRecordId);
        return (!!buffer && buffer.length > 0);
    }

    async createLandRecord(ctx, landRecordId, value) {
        const exists = await this.landRecordExists(ctx, landRecordId);
        if (exists) {
            throw new Error(`The land record ${landRecordId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(landRecordId, buffer);
    }

    async readLandRecord(ctx, landRecordId) {
        const exists = await this.landRecordExists(ctx, landRecordId);
        if (!exists) {
            throw new Error(`The land record ${landRecordId} does not exist`);
        }
        const buffer = await ctx.stub.getState(landRecordId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateLandRecord(ctx, landRecordId, newValue) {
        const exists = await this.landRecordExists(ctx, landRecordId);
        if (!exists) {
            throw new Error(`The land record ${landRecordId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(landRecordId, buffer);
    }

    async deleteLandRecord(ctx, landRecordId) {
        const exists = await this.landRecordExists(ctx, landRecordId);
        if (!exists) {
            throw new Error(`The land record ${landRecordId} does not exist`);
        }
        await ctx.stub.deleteState(landRecordId);
    }

    async getHistoryOfLand(ctx, landRecordId) {
        const promiseOfIterator = ctx.stub.getHistoryForKey(landRecordId);
        console.log(promiseOfIterator)
        const results = [];
        for await (const keyMod of promiseOfIterator) {
            const resp = {
                txid: keyMod.tx_id
            }
            if (keyMod.is_delete) {
                resp.data = 'KEY DELETED';
            } else {
                resp.data = keyMod.value.toString('utf8');
            }
            results.push(resp);
        }
        return results;
    }
}

module.exports = LandRecordContract;
