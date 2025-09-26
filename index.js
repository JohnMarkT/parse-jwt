#! /usr/bin/env node

import { inspect } from 'node:util';
import { colorize } from './log-codes.js';
import { parseDates } from './parse-dates.js';

const [ _exec, _path, jwt = '' ] = process.argv;

if (!jwt) {
    console.log('No JWT provided');
    process.exit(1);
}

const [ _header, encPayload = '', _signature ] = jwt.split('.');

let payloadStr, payload;
try {
    payloadStr = Buffer.from(encPayload, 'base64').toString('utf8');
    payload = JSON.parse(payloadStr);
} catch (error) {
    console.warn('Invalid JWT');
    process.exit(1);
}
const modifiedPayload = parseDates(payload);
const payloadStrPretty = inspect(modifiedPayload, { showHidden: false, depth: null, colors: true });

console.log(colorize('payload:', 'green'), payloadStrPretty);
console.log(getExpiresInfo(payload));

function getExpiresInfo(payload) {
    const { exp } = payload;
    if (!exp) return null;

    const now = Math.floor(Date.now() / 1000);
    const expiresSec = exp - now;
    const isExpired = expiresSec < 0;
    const label = isExpired ? 'expired: ' : 'expires in: ';
    const logColor = isExpired ? 'red' : 'green';
    const diff = Math.abs(expiresSec);
    const hours = Math.floor(diff / 3600);
    const daysAndHours = hours > 24 ? `${Math.floor(hours / 24)}d ${hours % 24}h` : `${hours}h`;
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    return colorize(label, logColor) + `${daysAndHours} ${minutes}m ${seconds}s`;
}
