import router from '@js/Helper/router';
import SettingsService from '@js/Services/SettingsService';
import {subscribe} from '@nextcloud/event-bus';

class SearchManager {

    get status() {
        return this._status;
    }

    constructor() {
        this._db = {};
        this._status = {active: false, available: false, query: '', ids: [], total: 0, passwords: 0, folders: 0, tags: 0, time: 0};
        this._index = null;
        this._indexFields = {
            passwords: ['website', 'username', 'url', 'type', 'password', 'notes', 'label', 'id', 'revision', 'edited', 'status', 'statusCode', 'favorite', 'sseType', 'cseType', 'hash'],
            folders  : ['label', 'type', 'id', 'revision', 'edited', 'sseType', 'cseType'],
            tags     : ['label', 'type', 'id', 'revision', 'edited', 'sseType', 'cseType']
        };
        this._exactMatchFields = ['status', 'favorite'];
        this._aliasFields =
            {
                name      : 'label',
                title     : 'label',
                colour    : 'color',
                favourite : 'favorite',
                user      : 'username',
                sha       : 'hash',
                cse       : 'cseType',
                sse       : 'sseType',
                csetype   : 'cseType',
                ssetype   : 'sseType',
                statuscode: 'statusCode',
                all       : ['website', 'username', 'url', 'notes', 'label']
            };
    }

    init() {
        subscribe('nextcloud:unified-search.search', ({query}) => {
            if(query) {
                this.search(query);
            } else {
                this.search();
            }
        });

        subscribe('nextcloud:unified-search.reset', () => {
            this.search();
        });
        this._status.available = false;
        this._initializeSearchFeatures();
    }

    search(query) {
        if(query === undefined || query.trim().length === 0) {
            this._resetSearch();
            return;
        }

        let stats        = {passwords: 0, folders: 0, tags: 0, ids: [], start: new Date().getTime()},
            searchParams = this._processQuery(query),
            index        = this._getSearchIndex();
        for(let key in index) {
            if(!index.hasOwnProperty(key)) continue;
            let section = index[key];

            for(let i = 0; i < section.length; i++) {
                let object = section[i];

                if(this._checkIfObjectMatchesQuery(object, searchParams)) {
                    stats.ids.push(object.id);
                    stats[key]++;
                }
            }
        }
        this._updateStatus(query, stats);
    }

    /**
     *
     * @param query
     * @param stats
     * @private
     */
    _updateStatus(query, stats) {
        this._status.active = true;
        this._status.query = query;
        this._status.total = stats.passwords + stats.folders + stats.tags;
        this._status.passwords = stats.passwords;
        this._status.folders = stats.folders;
        this._status.tags = stats.tags;
        this._status.ids = stats.ids;
        this._status.time = new Date().getTime() - stats.start;
    }

    /**
     *
     * @param entry
     * @param query
     * @returns {boolean}
     * @private
     */
    _checkIfObjectMatchesQuery(entry, query) {
        queryLoop: for(let j = 0; j < query.length; j++) {
            let fields = query[j].fields,
                search = query[j].value;

            for(let k = 0; k < fields.length; k++) {
                let field = fields[k];
                if(!entry.hasOwnProperty(field)) continue;

                if(this._exactMatchFields.indexOf(search) !== -1 && entry[field] === search) {
                    continue queryLoop;
                }

                if(entry[field].indexOf(search) !== -1) continue queryLoop;
            }
            return false;
        }
        return true;
    }

    /**
     * Clears the search database
     */
    clearDatabase() {
        this._db = {};
        this._index = null;
        this._status.query = '';
        this._resetSearch();
    }

    /**
     * Update the search database
     *
     * @param database
     */
    setDatabase(database) {
        this._db = database;
        this._index = null;

        if(database.passwords.length || database.folders.length || database.tags.length) {
            this._status.available = true;

            if(this._status.active) {
                setTimeout(() => {this.search(this._status.query);}, 1);
            } else {
                this._resetSearch();
            }
        } else {
            this._resetSearch();
        }
    }

    /**
     *
     * @private
     */
    _resetSearch() {
        this._status.active = false;
    }

    /**
     *
     * @param query
     * @returns {array}
     * @private
     */
    _processQuery(query) {
        let isQuoted  = false,
            value     = '',
            substring = '',
            field     = 'all',
            params    = [];

        query = query.toLowerCase();
        for(let i = 0; i < query.length; i++) {
            let char = query[i];

            if(!isQuoted && char === ':' && substring.length !== 0) {
                this._addFieldToSearchParams(params, field, value);

                field = substring;
                substring = '';
                value = '';
            } else if(char === ' ') {
                value += `${substring} `;
                substring = '';
            } else if(char === '"') {
                if(value.length !== 0 || substring.length !== 0) {
                    this._addFieldToSearchParams(params, field, value + substring);
                    substring = '';
                    field = 'all';
                    value = '';
                }
                isQuoted = !isQuoted;
            } else if(isQuoted && char === '\\' && query[i + 1] === '"') {
                substring += '"';
                i++;
            } else {
                substring += char;
            }
        }
        if(substring.length !== 0) value += substring;
        if(value.length !== 0) this._addFieldToSearchParams(params, field, value);

        return params;
    }

    /**
     *
     * @param params
     * @param field
     * @param rawValue
     * @private
     */
    _addFieldToSearchParams(params, field, rawValue) {
        if(this._aliasFields.hasOwnProperty(field)) field = this._aliasFields[field];

        let fields = Array.isArray(field) ? field:[field],
            value  = rawValue.trim();

        if(value.length !== 0) params.push({fields, value});
    }

    /**
     *
     * @returns {null|{}}
     * @private
     */
    _getSearchIndex() {
        if(this._index !== null) return this._index;

        this._index = {};
        for(let key in this._db) {
            if(!this._db.hasOwnProperty(key)) continue;
            let section = this._db[key],
                fields  = this._indexFields[key];

            this._index[key] = [];
            for(let i = 0; i < section.length; i++) {
                let object        = section[i],
                    indexedObject = {};

                for(let j = 0; j < fields.length; j++) {
                    let field = fields[j];

                    if(object.hasOwnProperty(field)) {
                        let type = typeof object[field];
                        if(object[field] instanceof Date) {
                            indexedObject[field] = Math.floor(object[field].getTime() / 1000);
                        } else if(type === 'boolean') {
                            indexedObject[field] = object[field] ? '1':'0';
                        } else {
                            indexedObject[field] = object[field].toString().toLowerCase();
                        }
                    } else {
                        indexedObject[field] = '';
                    }
                }
                this._index[key].push(indexedObject);
            }
        }

        return this._index;
    }

    /**
     * Initialize optional search features
     *
     * @private
     */
    _initializeSearchFeatures() {
        this._globalSearch();
        this._initLiveSearch();
    }

    /**
     * Search globally when the user presses Enter
     *
     * @private
     */
    _globalSearch() {
        let searchbox = document.getElementById('unified-search__input');
        searchbox.addEventListener('keyup', (e) => {
            if(e.key === 'Enter' && router.history.current.name !== 'Search' && SettingsService.get('client.search.global')) {
                router.push({name: 'Search', params: {query: btoa(searchbox.value)}});
            }
        });
    }

    /**
     * Search when the user presses a key
     *
     * @private
     */
    _initLiveSearch() {
        let searchbox = document.getElementById('unified-search__input');

        document.addEventListener('keypress', (e) => {
            if(!this._status.available) return;
            if(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || e.repeat) return;
            if(['INPUT', 'TEXTAREA'].indexOf(e.target.nodeName) !== -1) return;
            if(['true', '1', 'on'].indexOf(e.target.contentEditable) !== -1) return;
            if(!SettingsService.get('client.search.live')) return;

            if(/^[a-zA-Z0-9-_ ]{1}$/.test(e.key)) {
                let searchIcon = document.getElementById('unified-search');
                if(searchIcon && !searchIcon.classList.contains('header-menu--opened')) {
                    searchIcon.querySelector('.header-menu__trigger').click();
                }

                e.preventDefault();
                this.search(this.status.query + e.key);
                setTimeout(() => {
                    searchbox.focus();
                    setTimeout(() => {
                        searchbox.value = this.status.query;
                        searchbox.selectionStart = searchbox.selectionEnd = 10000;
                    }, 50);
                }, 50);
            }
        });
        document.addEventListener('keyup', (e) => {
            if(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || e.repeat) return;
            if(e.key !== 'Escape' || e.target.id !== 'unified-search__input') return;
            if(!SettingsService.get('client.search.live')) return;
            e.preventDefault();
            searchbox.value = '';
            this.search('');
        });
    }
}

export default new SearchManager();