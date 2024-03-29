import {URLBuilder} from './url-builder';
import {expect} from 'chai';
import 'mocha';

describe('URL Builder Test', () => {

    it('should give the correct hostname', () => {
        const urlBuilder = new URLBuilder('https://example.com/?foo=bar');

        expect(urlBuilder.getHostname()).to.equal('example.com');
    });

    it('clearQueryParams should work fine', () => {
        const urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');

        urlBuilder.clearQueryParams();
        expect(urlBuilder.toString()).to.equal('https://example.com/try');
    });

    it('setQueryParam should work fine', () => {
        const urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');

        urlBuilder.setQueryParam('foo', 'bar-new');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?foo=bar-new&age=20');

        urlBuilder.setQueryParam('name', 'Jon');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?foo=bar-new&age=20&name=Jon');
    });

    it('setQueryString should work fine', () => {
        const urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');

        urlBuilder.setQueryString('bar=foo&name=Jon');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?bar=foo&name=Jon');

        urlBuilder.setQueryString('?age=20');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?age=20');
    });

    it('getQueryString should work fine', () => {
        let urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');
        expect(urlBuilder.getQueryString()).to.equal('foo=bar&age=20');

        urlBuilder = new URLBuilder('https://example.com/try?');
        expect(urlBuilder.getQueryString()).to.equal('');

        urlBuilder = new URLBuilder('https://example.com/try');
        expect(urlBuilder.getQueryString()).to.equal('');
    });

    it('getPath should work fine', () => {
        let urlBuilder = new URLBuilder('https://example.com/try-this?foo=bar&age=20');
        expect(urlBuilder.getPath()).to.equal('/try-this');

        urlBuilder = new URLBuilder('https://example.com?foo=bar&age=20');
        expect(urlBuilder.getPath()).to.equal('/');

        urlBuilder = new URLBuilder('https://example.com/?foo=bar&age=20');
        expect(urlBuilder.getPath()).to.equal('/');

        urlBuilder = new URLBuilder('https://example.com');
        expect(urlBuilder.getPath()).to.equal('/');
    });

    it('setPath should work fine', () => {
        const urlBuilder = new URLBuilder('https://example.com/try-this?foo=bar&age=20');
        urlBuilder.setPath('try-that');

        expect(urlBuilder.toString()).to.equal('https://example.com/try-that?foo=bar&age=20');
    });

    it('appendQueryParam should work fine', () => {
        const urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');

        urlBuilder.appendQueryParam('name', 'Jon');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?foo=bar&age=20&name=Jon');

        urlBuilder.appendQueryParam('foo', 'bar1');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?foo=bar&age=20&name=Jon&foo=bar1');
    });

    it('deleteQueryParam should work fine', () => {
        const urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');

        urlBuilder.deleteQueryParam('age');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?foo=bar');

        // Again removing the same parameter
        urlBuilder.deleteQueryParam('age');
        expect(urlBuilder.toString()).to.equal('https://example.com/try?foo=bar');

        urlBuilder.deleteQueryParam('foo');
        expect(urlBuilder.toString()).to.equal('https://example.com/try');
    });

    it('should properly parse the query params', () => {
        const urlBuilder = new URLBuilder('https://example.com/?foo=bar&name=undefined&age=20');

        expect(urlBuilder.getQueryParam('foo')).to.equal('bar');
        expect(urlBuilder.getQueryParam('name')).to.equal(undefined);
        expect(urlBuilder.getQueryParam('age')).to.equal('20');
    });

    it('should build the shopify url properly', () => {
        const urlBuilder = new URLBuilder('https://example.myshopify.com');
        urlBuilder.setPath('/admin/oauth/authorize');
        urlBuilder.appendQueryParam('client_id', '12345');
        urlBuilder.setQueryParam('scope', 'foo,bar');
        urlBuilder.setQueryParam('scope', 'foo,bar1');
        urlBuilder.setQueryParam('redirect_uri', 'https://www.letscooee.com');
        urlBuilder.appendQueryParam('grant_options[]', 'xyz');

        const expectedURL = 'https://example.myshopify.com/admin/oauth/authorize?client_id=12345&scope=foo%2Cbar1' +
            '&redirect_uri=https%3A%2F%2Fwww.letscooee.com&grant_options%5B%5D=xyz';

        expect(urlBuilder.toString()).to.equal(expectedURL);
    });

});
