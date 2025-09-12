#! /usr/bin/env node

import { inspect } from 'node:util';

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

console.log('payload:', payloadStrPretty);
console.log('expires in:', getExpiresIn(payload));

function parseDates(item) {
    const modifier = (key, value) => {
        if (Number(value) && new Date(value * 1000) instanceof Date) {
            const date = new Date(value * 1000);
            return [
                key,
                {
                    originalValue: value,
                    date: date.toISOString()
                }
            ];
        }

        return [ key, value ];
    };

    return modifyObject(item, modifier, true);
}

function modifyObject(item, modifier, deep = true) {
    if (Array.isArray(item)) {
        return item.map(i => modifyObject(i, modifier, deep));
    }
    if (typeof item === 'object' && item !== null) {
        return Object.fromEntries(
            Object.entries(item).map(([ originalKey, originalValue ]) => {
                let [ modifiedKey, modifiedValue ] = modifier(originalKey, originalValue);
                if (
                    !modifiedValue.originalValue &&
                    typeof modifiedValue === 'object' &&
                    modifiedValue !== null &&
                    deep
                ) {
                    modifiedValue = modifyObject(modifiedValue, modifier, deep);
                }

                return [ modifiedKey, modifiedValue ];
            })
        );
    }

    return item;
}

function getExpiresIn(payload) {
    const { exp } = payload;
    if (!exp) return null;

    const now = Math.floor(Date.now() / 1000);
    const expiresSec = exp - now;
    const hours = Math.floor(expiresSec / 3600);
    const minutes = Math.floor((expiresSec % 3600) / 60);
    const seconds = expiresSec % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}
