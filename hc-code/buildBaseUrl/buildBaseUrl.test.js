import { expect } from 'chai';

import buildBaseUrl from './buildBaseUrl';

describe.only('buildBaseUrl', function() {
    describe('creates a URL that', () => {
        const defaultOptions = { pathPrefix: '', host: '', isBehindProxy: false };

        it('should be relative to the used protocol', function() {
            expect(buildBaseUrl(defaultOptions)).to.startsWith('//');
        });

        it('should always end with a trailing slash', function() {
            expect(buildBaseUrl(defaultOptions)).to.endsWith('/');
        });

        it('should concatenate the passed in host and path prefix', function() {
            const options = { pathPrefix: '/any-path', host: 'example.com', isBehindProxy: false };

            expect(buildBaseUrl(options)).to.equal('//example.com/any-path/');
        });

        it('should not contain the pathPrefix if the request is proxied', function() {
            const options = { pathPrefix: 'any-path', host: 'example.com', isBehindProxy: true };

            expect(buildBaseUrl(options)).to.equal('//example.com/');
        });
    });
});
