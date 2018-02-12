import { expect } from 'chai';

import buildBaseUrl from './buildBaseUrl';

describe('buildBaseUrl', function() {
    it('should be relative to the used protocol', function() {
        const options = { pathPrefix: '', host: '', isBehindProxy: false };

        expect(buildBaseUrl(options)).to.startsWith('//');
    });

    it('should always end with a trailing slash', function() {
        const options = { pathPrefix: 'any', host: 'thing', isBehindProxy: false };

        expect(buildBaseUrl(options)).to.endsWith('/');
    });

    it('should combine the given pathPrefix with the given host', function() {
        const options = { pathPrefix: 'any-path', host: 'any-host', isBehindProxy: false };

        expect(buildBaseUrl(options)).to.contain('any-hostany-path');
    });

    it('should build a base url using the passed in host and path prefix', function() {
        const options = { pathPrefix: 'any-path', host: 'any-host', isBehindProxy: false };

        expect(buildBaseUrl(options)).to.equal('//any-hostany-path/');
    });

    it('should not contain the pathPrefix if the request is proxied', function() {
        const options = { pathPrefix: 'any-path', host: 'any-host', isBehindProxy: true };

        expect(buildBaseUrl(options)).to.equal('//any-host/');
    });
});
