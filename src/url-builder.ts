/**
 * A class for parsing or building a URL.
 *
 * @author Shashank Agrawal
 */
export class URLBuilder {

    private readonly base: URL;
    private params: URLSearchParams;

    constructor(rawURL: string) {
        try {
            this.base = new URL(rawURL);
            this.params = new URLSearchParams(this.base.search.slice(1));
        } catch (e) {
            console.error('Un-parsable URL', e);
        }
    }

    appendQueryParam(name: string, value: any) {
        this.params.append(name, value ? value.toString() : '');
    }

    /**
     * Remove or clear the query part from the URL.
     */
    clearQueryParams(): URLBuilder {
        this.params = new URLSearchParams();
        return this;
    }

    deleteQueryParam(name: string) {
        this.params.delete(name);
    }

    getBase(): URL {
        return this.base;
    }

    getPath(): string {
        return this.base.pathname;
    }

    getHostname(): string {
        return this.base.hostname;
    }

    getParams() {
        return this.params;
    }

    /**
     * Method to get the value from the search params. Also handle if parameters have string format of "undefined" or "null".
     *
     * @param name The parameter name to get the value
     * @return The parameter value. Return empty string if not available.
     */
    getQueryParam(name: string): string | undefined {
        if (!this.params) {
            return '';
        }

        const value = this.params.get(name);
        return (!value || value === 'undefined' || value === 'null') ? undefined : value;
    }

    getQueryString(): string {
        return this.params.toString();
    }

    setPath(path: string): URLBuilder {
        this.base.pathname = path;
        return this;
    }

    setQueryParam(name: string, value: any): URLBuilder {
        this.params.set(name, value ? value.toString() : '');
        return this;
    }

    /**
     * Set the query string with a given new string. For example, <code>foo=bar&x=y&name=Jon</code>
     * @param value
     */
    setQueryString(value: string): URLBuilder {
        if (!value) {
            return;
        }

        if (value[0] === '?') {
            value = value.slice(1);
        }

        this.params = new URLSearchParams(value);
        return this;
    }

    toString(): string {
        const queryString = this.params.toString();

        if (queryString === '') {
            this.base.search = '';
        } else {
            this.base.search = '?' + queryString;
        }

        return this.base.toString();
    }
}
