

export class HearthstoneApi {

    defaultHeader = {};
    defaultQuery = {};

    constructor(defaultHeader = {}, defaultQuery = {}) {
        this.defaultHeader = defaultHeader;
        this.defaultQuery = defaultQuery;
    }

    get endpoint() {
        return 'https://omgvamp-hearthstone-v1.p.rapidapi.com/';
    }
    
    
    get headers() {
        return {
            ...this.defaultHeader,
            'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
            'x-rapidapi-key': 'd99e92cde6mshffcf37544a876bep14eb15jsn1c1928e0dec3'
        };
    }

    info(query) {
        return this._get('info', query).then(this._parseResult.bind(this));
    }

    cards() {
        return this._get('cards', query).then(this._parseResult.bind(this));
    }

    set(name, query) {
        return this._get(`cards/sets/${name}`, query).then(this._parseResult.bind(this));
    }

    classes(name, query) {
        return this._get(`cards/classes/${name}`, query).then(this._parseResult.bind(this));
    }
    
    
    _get(path, query = {}) {
        let url = `${this.endpoint}${path}`;
        const queryString = this._objectToQueryString(query);
        if(queryString) {
            url += `?${queryString}`;
        }
        return fetch(url, {
            'method': 'GET',
            'headers': this.headers,
        });
    }

    _parseResult(response) {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(response);
      }
    }

    _objectToQueryString(obj) {
        return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    }
}
