// @flow

import ensureStringEndsWith from 'ensure-string-endswith';

type OptionsType = {
    host: string,
    pathPrefix: string,
    isBehindProxy: boolean
};

export default ({ pathPrefix, host, isBehindProxy }: OptionsType) => {
    const url = isBehindProxy ? `//${host}` : `//${host}${pathPrefix}`;
    return ensureStringEndsWith('/')(url);
};
