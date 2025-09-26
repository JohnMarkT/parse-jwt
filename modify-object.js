export function modifyObject(item, modifier, deep = true) {
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
