class Search extends Component {
  refs = {
    search: '#search',
    input: '#search input[type="text"]',
    engines: '.search-engines',
    close: '.close',
    autocomplete: '.autocomplete-suggestions'
  };

  constructor() {
    super();
    this.engines = CONFIG.search.engines;
    this.suggestions = [];
    this.selectedIndex = -1;
    this.previousSearches = JSON.parse(localStorage.getItem('previousSearches') || '[]');
  }

  style() {
    return `
      #search {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 2px);
        height: 100%;
        background: rgba(26, 27, 38, 0.8);
        z-index: 99;
        visibility: hidden;
        top: -100%;
        backdrop-filter: blur(5px);
        transition: all .2s ease-in-out;
      }

      #search.active {
        top: 0;
        visibility: visible;
      }

      #search div {
        position: relative;
        width: 80%;
      }

      #search input {
        border: 0;
        outline: 0;
        width: 100%;
        box-shadow: inset 0 -2px #3b4261;
        padding: .5em 0;
        background: none;
        font: 500 22px 'Roboto', sans-serif;
        letter-spacing: 1px;
        color: #c0caf5;
      }

      #search input:focus {
        box-shadow: inset 0 -2px #7aa2f7;
      }

      #search input::selection {
        background: #ff9e64;
        color: #1a1b26;
      }

      #search .close {
        background: 0;
        border: 0;
        outline: 0;
        color: #c0caf5;
        position: absolute;
        right: 0;
        cursor: pointer;
        top: 15px;
      }

      #search .close:hover {
        color: #7dcfff;
      }

      .search-engines {
        list-style: none;
        color: rgba(192, 202, 245, 0.5);
        display: flex;
        padding: 0;
        top: 50px;
        left: 0;
        margin: 1em 0 0 0;
      }

      .search-engines li p {
        cursor: default;
        transition: all .2s;
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
      }

      .search-engines li {
        margin: 0 1em 0 0;
      }

      .search-engines li.active {
        color: #7aa2f7;
        font-weight: 700;
      }

      .autocomplete-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        max-height: 300px;
        overflow-y: auto;
        background: rgba(26, 27, 38, 0.95);
        border-radius: 4px;
        margin-top: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: none;
      }

      .autocomplete-suggestions.active {
        display: block;
      }

      .suggestion-item {
        padding: 10px 15px;
        cursor: pointer;
        color: #c0caf5;
        font-family: 'Roboto', sans-serif;
        display: flex;
        align-items: center;
        transition: all 0.2s ease;
      }

      .suggestion-item i {
        margin-right: 10px;
        color: #7aa2f7;
        font-size: 16px;
      }

      .suggestion-item.selected,
      .suggestion-item:hover {
        background: rgba(122, 162, 247, 0.1);
      }
    `;
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material
    ];
  }

  template() {
    return `
      <div id="search">
        <div>
          <input type="text" spellcheck="false" placeholder="search">
          <button class="close"><i class="material-icons">&#xE5CD;</i></button>
          <ul class="search-engines"></ul>
          <div class="autocomplete-suggestions"></div>
        </div>
      </div>
    `;
  }

  loadEngines() {
    for (var key in this.engines)
      this.refs.engines.innerHTML += `<li><p title="${this.engines[key][1]}">!${key}</p></li>`;
  }

  activate() {
    this.refs.search.classList.add('active');
    this.refs.input.scrollIntoView();
    setTimeout(() => this.refs.input.focus(), 100);
  }

  deactivate() {
    this.refs.search.classList.remove('active');
  }

  updateSuggestions(query) {
    if (!query) {
      this.suggestions = this.previousSearches.slice(0, 5);
    } else {
      const historySuggestions = this.previousSearches
        .filter(search => search.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);

      const dynamicSuggestions = [
        `${query} tutorial`,
        `${query} guide`,
        `${query} examples`
      ].filter(s => s !== query);

      this.suggestions = [...new Set([...historySuggestions, ...dynamicSuggestions])].slice(0, 5);
    }

    this.renderSuggestions();
  }

  renderSuggestions() {
    const container = this.refs.autocomplete;
    
    if (this.suggestions.length === 0) {
      container.classList.remove('active');
      return;
    }

    container.classList.add('active');
    container.innerHTML = this.suggestions
      .map((suggestion, index) => `
        <div class="suggestion-item ${index === this.selectedIndex ? 'selected' : ''}" 
             data-index="${index}">
          <i class="material-icons">${this.previousSearches.includes(suggestion) ? 'history' : 'search'}</i>
          ${suggestion}
        </div>
      `)
      .join('');

    container.querySelectorAll('.suggestion-item').forEach(item => {
      item.onclick = () => this.selectSuggestion(parseInt(item.dataset.index));
    });
  }

  selectSuggestion(index) {
    const suggestion = this.suggestions[index];
    if (suggestion) {
      this.refs.input.value = suggestion;
      this.refs.autocomplete.classList.remove('active');
      this.handleSearch({ target: this.refs.input, key: 'Enter' });
    }
  }

  saveToPreviousSearches(query) {
    if (query && !this.previousSearches.includes(query)) {
      this.previousSearches.unshift(query);
      this.previousSearches = this.previousSearches.slice(0, 20);
      localStorage.setItem('previousSearches', JSON.stringify(this.previousSearches));
    }
  }

  handleSearch(event) {
    const { target, key } = event;
    
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      const direction = key === 'ArrowDown' ? 1 : -1;
      this.selectedIndex = Math.max(-1, Math.min(
        this.suggestions.length - 1,
        this.selectedIndex + direction
      ));
      this.renderSuggestions();
      return;
    }

    if (key === 'Enter') {
      if (this.selectedIndex >= 0) {
        this.selectSuggestion(this.selectedIndex);
        return;
      }

      let args = target.value.split(' ');
      let prefix = args[0];
      let defaultEngine = this.engines['g'][0];
      let engine = defaultEngine;

      if (prefix.indexOf('!') === 0) {
        engine = this.engines[prefix.substr(1)][0];
        args = args.slice(1);
      }

      const searchQuery = args.join(' ');
      this.saveToPreviousSearches(searchQuery);

      const link = document.createElement('a');
      link.href = engine + encodeURI(searchQuery);
      link.target = "_blank";
      link.click();

      this.deactivate();
      return;
    }

    if (key === 'Escape') {
      this.deactivate();
      return;
    }

    let args = target.value.split(' ');
    let prefix = args[0];
    
    this.refs.engines.childNodes.forEach(engine => {
      engine.classList.toggle('active', prefix === engine.firstChild.innerHTML);
    });

    this.selectedIndex = -1;
    this.updateSuggestions(target.value);
  }

  setEvents() {
    this.refs.input.oninput = (e) => this.handleSearch(e);
    this.refs.input.onkeydown = (e) => this.handleSearch(e);
    this.refs.close.onclick = () => this.deactivate();
    
    document.addEventListener('click', (e) => {
      if (!this.refs.search.contains(e.target)) {
        this.refs.autocomplete.classList.remove('active');
      }
    });
  }

  connectedCallback() {
    this.render().then(() => {
      this.loadEngines();
      this.setEvents();
    });
  }
}