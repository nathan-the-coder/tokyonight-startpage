class Search extends Component {
  refs = {
    search: '#search',
    input: '#search input[type="text"]',
    engines: '.search-engines',
    close: '.close'
  };

  constructor() {
    super();
    this.engines = CONFIG.search.engines;
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

  handleSearch(event) {
    const { target, key } = event;
  
    let args = target.value.split(' ');
    let prefix = args[0];
    let defaultEngine = this.engines['g'][0];
    let engine = defaultEngine;
  
    this.refs.engines.childNodes.forEach(engine => {
      if (prefix === engine.firstChild.innerHTML)
        engine.classList.add('active');
      else
        engine.classList.remove('active');
    });
  
    if (event instanceof KeyboardEvent && key === 'Enter') {
      if (prefix.indexOf('!') === 0) {
        engine = this.engines[prefix.substr(1)][0];
        args = args.slice(1);
      }
  
      window.location = engine + encodeURI(args.join(' '));
    }
  
    if (event instanceof KeyboardEvent && key === 'Escape')
      this.deactivate();
  }

  setEvents() {
    this.refs.input.oninput = (e) => this.handleSearch(e);
    this.refs.input.onkeydown = (e) => this.handleSearch(e);
    this.refs.close.onclick = () => this.deactivate();
  }

  connectedCallback() {
    this.render().then(() => {
      this.loadEngines();
      this.setEvents();
    });
  }
}