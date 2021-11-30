export const getParamsFromUrl = () => {
    return Object.fromEntries(new URLSearchParams(window.location.search));
};

export const setQueryParams = (queryParams) => {
    const currentParams = new URLSearchParams(window.location.search);

    Object.keys(queryParams).forEach(key => {
        currentParams.set(key, queryParams[key]);
    });

    window.history.pushState(null, null, '?' + currentParams.toString());
}