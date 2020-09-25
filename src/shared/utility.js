export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    const trimedValue = value.trim();

    if (rules.required) {
        isValid = trimedValue !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = trimedValue.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = trimedValue.length >= rules.maxLength && isValid;
    }

    return isValid;
}