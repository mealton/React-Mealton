export let required = value => {
    return value && value.length
        ? undefined
        : "Данное поле обязательно для заполнения";
};

export let maxLengthCreator = maxLength => value => {
    return value && value.length > maxLength
        ? `Превышена максимальная длина в ${maxLength} символов`
        : undefined;
};