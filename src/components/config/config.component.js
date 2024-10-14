class ConfigTab extends Component {
  refs = {
    config: '#config',
    textarea: '#config textarea[type="text"]',
    save: '.save',
    close: '.close'
  };

  constructor() {
    super();
    this.config = JSON.parse(localStorage.getItem("config")).config;
  }

  style() {
    return `
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

      #config .save,
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
        right: 40px;
        padding: 5px 10px;
        background: #3b4261;
        border-radius: 4px;
      }

      #config .close {
        right: 10px;
      }

      #config .save:hover,
      #config .close:hover {
        filter: brightness(1.2);
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
          <textarea type="text" spellcheck="false"></textarea>
          <button class="save">Save</button>
          <button class="close"><i class="material-icons">&#xE5CD;</i></button>
        </div>
      </div>
    `;
  }

  activate() {
    this.refs.config.classList.add('active');
    this.refs.textarea.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => this.refs.textarea.focus(), 300);
  }

  deactivate() {
    this.refs.config.classList.remove('active');
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

  handleSearch(event) {
    const { key } = event;
    if (key === 'Escape') this.deactivate();
    if (key === 'Enter' && event.ctrlKey) this.saveConfig();
  }

  setEvents() {
    this.refs.config.onkeyup = (e) => this.handleSearch(e);
    this.refs.close.onclick = () => this.deactivate();
    this.refs.save.onclick = () => this.saveConfig();
  }

  setConfig() {
    this.refs.textarea.value = JSON.stringify(this.config, null, 2);
  }

  showNotification(message, type) {
    // Implementation of notification system goes here
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
      this.setConfig();
    });
  }
}