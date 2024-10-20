class ConfigTab extends Component {
  refs = {
    config: '#config',
    textarea: '#config textarea[type="text"]',
    save: '.save',
    close: '.close',
    reset: '.reset',
    search: '#config-search',
    matchCount: '#match-count',
    searchButton: '#search-button',
    prevButton: '#prev-match',
    nextButton: '#next-match'
  };

  constructor() {
    super();
    this.config = JSON.parse(localStorage.getItem("config")).config;
    this.currentMatchIndex = -1;
    this.matches = [];
  }

  style() {
    return `
      #config .save,
      #config .reset,
      #config .close {
        background: 0;
        border: 0;
        outline: 0;
        color: #7aa2f7;
        position: absolute;
        cursor: pointer;
        top: 15px;
        font-size: 18px;
        font-family: 'Roboto';
        transition: all .2s ease-in-out;
      }

      #config .save {
        right: 120px;
        padding: 6px 10px;
        background: #3b4261;
        border-radius: 4px;
      }

      #config .reset {
        right: 40px;
        padding: 5px 10px;
        background: #f7768e;
        color: #1a1b26;
        border-radius: 4px;
      }

      #config .close {
        right: 10px;
      }

      #config .save:hover,
      #config .reset:hover,
      #config .close:hover {
        filter: brightness(1.2);
      }

      #config {
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
        transition: all .3s ease-in-out;
      }

      #config.active {
        top: 0;
        visibility: visible;
      }

      #config div {
        position: relative;
        width: 80%;
        max-width: 800px;
        background: #1f2335;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .search-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }

      #config-search {
        background: #3b4261;
        border: none;
        outline: none;
        color: #c0caf5;
        padding: 5px 10px;
        border-radius: 4px;
        font-family: 'Roboto';
        width: 200px;
        height: 30px;
      }

      #search-button,
      #prev-match,
      #next-match {
        background: #3b4261;
        border: none;
        outline: none;
        color: #7aa2f7;
        padding: 5px 10px;
        border-radius: 4px;
        font-family: 'Roboto';
        cursor: pointer;
        height: 30px;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      #search-button:hover,
      #prev-match:hover,
      #next-match:hover {
        background: #454f7a;
      }

      #prev-match,
      #next-match {
        padding: 5px;
        min-width: 30px;
        justify-content: center;
      }

      #prev-match:disabled,
      #next-match:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      #match-count {
        color: #7aa2f7;
        font-family: 'Roboto';
        font-size: 14px;
        min-width: 80px;
      }

      #config-search:focus {
        box-shadow: 0 0 0 2px #7aa2f7;
      }

      #config textarea {
        border: 0;
        outline: 0;
        width: 100%;
        box-shadow: inset 0 -2px #3b4261;
        padding: .5em 0;
        background: none;
        font: 300 16px 'Roboto', sans-serif;
        letter-spacing: 1px;
        color: #c0caf5;
        resize: none;
        height: 300px;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      #config textarea:focus {
        box-shadow: inset 0 -2px #7aa2f7;
      }

      #config textarea::selection {
        background: #bb9af7;
        color: #1a1b26;
      }

      #config textarea::-webkit-scrollbar {
        display: none;
      }

      .highlight {
        background-color: rgba(122, 162, 247, 0.3);
      }

      .highlight.current {
        background-color: rgba(122, 162, 247, 0.6);
        border-radius: 2px;
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
      <div id="config">
        <div>
          <div class="search-container">
            <input type="text" id="config-search" placeholder="Type search term..." spellcheck="false">
            <button id="search-button">
              <i class="material-icons">search</i>
              Search
            </button>
            <button id="prev-match" disabled>
              <i class="material-icons">arrow_upward</i>
            </button>
            <button id="next-match" disabled>
              <i class="material-icons">arrow_downward</i>
            </button>
            <span id="match-count"></span>
          </div>
          <textarea type="text" spellcheck="false"></textarea>
          <button class="save">Save</button>
          <button class="reset">Reset</button>
          <button class="close"><i class="material-icons">&#xE5CD;</i></button>
        </div>
      </div>
    `;
  }

  resetConfig() {
    try {
      localStorage.removeItem("CONFIG");
      localStorage.removeItem("config");
      
      const defaultConfig = new Config(default_config);
      
      this.refs.textarea.value = JSON.stringify(defaultConfig, null, 2);
      
      this.showNotification('Configuration reset to defaults. Click Save to apply changes.', 'info');
    } catch (error) {
      this.showNotification('Error resetting configuration: ' + error.message, 'error');
    }
  }

  confirmReset() {
    const confirmed = window.confirm(
      'Are you sure you want to reset all settings to default? This action cannot be undone.'
    );
    
    if (confirmed) {
      this.resetConfig();
    }
  }

  findMatches(searchTerm) {
    const text = this.refs.textarea.value;
    const matches = [];
    const searchRegex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let match;
    
    while ((match = searchRegex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0]
      });
    }
    
    return matches;
  }

  selectTextRange(start, end) {
    const textarea = this.refs.textarea;
    textarea.focus();
    textarea.setSelectionRange(start, end);
    
    const text = textarea.value.substring(0, start);
    const lineHeight = 20;
    const lineNumber = text.split('\n').length;
    const scrollPosition = lineNumber * lineHeight - textarea.clientHeight / 2;
    
    textarea.scrollTop = Math.max(0, scrollPosition);
  }

  updateMatchCount() {
    const count = this.matches.length;
    const current = this.currentMatchIndex + 1;
    this.refs.matchCount.textContent = count > 0 ? 
      `${current} of ${count} matches` : 
      'No matches';
    
    this.refs.prevButton.disabled = count === 0;
    this.refs.nextButton.disabled = count === 0;
  }

  executeSearch() {
    const searchTerm = this.refs.search.value.trim();
    if (searchTerm) {
      this.matches = this.findMatches(searchTerm);
      this.currentMatchIndex = this.matches.length > 0 ? 0 : -1;
      this.updateMatchCount();

      if (this.currentMatchIndex >= 0) {
        const match = this.matches[this.currentMatchIndex];
        this.selectTextRange(match.start, match.end);
      }
    } else {
      this.matches = [];
      this.currentMatchIndex = -1;
      this.updateMatchCount();
    }
  }

  navigateToNextMatch() {
    if (this.matches.length === 0) return;
    
    this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matches.length;
    const match = this.matches[this.currentMatchIndex];
    this.selectTextRange(match.start, match.end);
    this.updateMatchCount();
  }

  navigateToPreviousMatch() {
    if (this.matches.length === 0) return;
    
    this.currentMatchIndex = (this.currentMatchIndex - 1 + this.matches.length) % this.matches.length;
    const match = this.matches[this.currentMatchIndex];
    this.selectTextRange(match.start, match.end);
    this.updateMatchCount();
  }

  handleKeyPress(event) {
    const { key } = event;
    
    if (key === 'Escape') {
      this.deactivate();
      return;
    }
    
    if (key === 'Enter') {
      if (event.ctrlKey) {
        this.saveConfig();
      } else if (this.matches.length > 0) {
        if (event.shiftKey) {
          this.navigateToPreviousMatch();
        } else {
          this.navigateToNextMatch();
        }
      } else {
        this.executeSearch();
      }
      event.preventDefault();
    }
  }

  activate() {
    this.refs.config.classList.add('active');
    this.refs.search.focus();
  }

  deactivate() {
    this.refs.config.classList.remove('active');
    this.refs.search.value = '';
    this.matches = [];
    this.currentMatchIndex = -1;
    this.updateMatchCount();
  }

  saveConfig() {
    try {
      const newConfig = JSON.parse(this.refs.textarea.value);
      localStorage.setItem("CONFIG", JSON.stringify(newConfig));
      this.showNotification('Configuration saved successfully!', 'success');
      this.deactivate();
      location.reload();
    } catch (error) {
      this.showNotification('Invalid JSON format. Please check your configuration.', 'error');
    }
  }

  setEvents() {
    this.refs.search.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };
    this.refs.search.onkeyup = (e) => this.handleKeyPress(e);
    this.refs.searchButton.onclick = () => this.executeSearch();
    this.refs.prevButton.onclick = () => this.navigateToPreviousMatch();
    this.refs.nextButton.onclick = () => this.navigateToNextMatch();
    this.refs.close.onclick = () => this.deactivate();
    this.refs.save.onclick = () => this.saveConfig();
    this.refs.reset.onclick = () => this.confirmReset();
  }

  setConfig() {
    this.refs.textarea.value = JSON.stringify(this.config, null, 2);
  }

  showNotification(message, type) {
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
      this.setConfig();
    });
  }
}