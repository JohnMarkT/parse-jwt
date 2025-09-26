import { modifyObject } from "./modify-object.js";

export function parseDates(item) {
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
