export const getParamsFromUrl = () => {
    const queryString = window.location.search;
    const queryParams = {};

    const keyValues = queryString.slice(1).split(/[&=]/);
    for (let i = 1; i < keyValues.length; i += 2) {
        queryParams[keyValues[i - 1]] = decodeURIComponent(keyValues[i]).replace(/\+/g, ' ').trim();
    }

    return queryParams;
};

export const setQueryParams = (queryParams) => {
    const currentParams = getParamsFromUrl();
    console.log(currentParams);
    // eslint-disable-next-line no-unused-vars
    for (let key in queryParams) {
        currentParams[key] = queryParams[key];
    }
    const queryStringParams = [];
    // eslint-disable-next-line no-unused-vars
    for (let key in currentParams) {
        queryStringParams.push(`${key}=${currentParams[key]}`);
    }

    window.history.pushState(currentParams, "Search", '?' + queryStringParams.join('&'));
}