<div align="center">
    <img src="https://github.com/user-attachments/assets/5fc76570-c832-4eb7-b646-6d9d65218e41" width="400" height="400">
    <br><br>
    <a href="https://github.com/Terminal127/tokyonight-startpage/commits">
        <img src="https://img.shields.io/github/last-commit/Terminal127/tokyonight-startpage?&style=for-the-badge&color=7aa2f7&logoColor=c0caf5&labelColor=1a1b26" alt="Last Commit">
    </a>
    <a href="https://github.com/Terminal127/tokyonight-startpage/stargazers">
        <img src="https://img.shields.io/github/stars/Terminal127/tokyonight-startpage?style=for-the-badge&logo=starship&color=bb9af7&logoColor=c0caf5&labelColor=1a1b26" alt="Stars">
    </a>
    <a href="https://github.com/Terminal127/tokyonight-startpage">
        <img src="https://img.shields.io/github/repo-size/Terminal127/tokyonight-startpage?color=7dcfff&label=SIZE&logo=codesandbox&style=for-the-badge&logoColor=c0caf5&labelColor=1a1b26" alt="Repo Size">
    </a>
    <a href="https://github.com/Terminal127/tokyonight-startpage/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/Terminal127/tokyonight-startpage?style=for-the-badge&logo=starship&color=9ece6a&logoColor=c0caf5&labelColor=1a1b26" alt="License">
    </a>
    <a href="https://github.com/Terminal127/tokyonight-startpage/issues">
        <img src="https://img.shields.io/github/issues/Terminal127/tokyonight-startpage?style=for-the-badge&logo=bilibili&color=f7768e&logoColor=c0caf5&labelColor=1a1b26" alt="Issues">
    </a>
</div>

# Tokyonight Startup Page

A personalized, visually appealing start page inspired by [Dawn](https://github.com/b-coimbra/dawn), and [Taurus](https://github.com/AllJavi/tartarus-startpage) tailored by me for my [DreamDots](https://github.com/Terminal127/Hyprland-dotss)(private) rice. This customizable start page offers quick access to frequently used links, organized by tabs, along with integrated search functionality and a dynamic, animated background.

## Demo
https://github.com/user-attachments/assets/00f3fe0b-5e81-4e99-a0c6-a7060627a725

## Features

* **Customizable Tabs:** Design your start page with custom tabs, each housing categorized links. Every tab can be personalized with a unique background image, color scheme, and icon. This allows for a highly organized and visually appealing structure.

* **Integrated Search:** Search the web effortlessly directly from the start page using your favorite search engines.  The search bar supports prefixes (e.g., `!g`) to specify which engine to use, streamlining your workflow.

* **Dynamic Backgrounds:** Set animated GIF backgrounds or static images for each tab to create a captivating and personalized experience. This brings life and personality to your start page.

* **Easy Configuration:**  Personalize your start page with ease through the `userconfig.js` file. Here, you can modify links, tabs, search engines, and various other settings.  A convenient in-browser editor, accessible through the `ConfigTab` component, allows for real-time configuration updates.  Just press 'q' to bring up the configurator, edit the JSON, and Ctrl+Enter to save and reload.

* **Keybindings:** Streamline your navigation by defining keybindings for quick access to core functionalities. The default configuration provides shortcuts for activating the search bar (`s`) and configurator (`q`).  These can be customized in `userconfig.js`.

* **Local Storage:** Your personalized configuration is automatically saved to your browser's local storage, ensuring your settings are preserved across sessions.

* **Built with Web Components:**  Tokyonight utilizes a modern web component architecture, promoting modularity and extensibility.  This makes it easy to update and maintain individual components without affecting others.



## Installation and Setup

This project is designed for ease of use. Simply download and open in a browser. No server-side setup is required.

1. **Clone or Download:**
   - **Clone the Repository (Recommended for Developers):**
     ```bash
     git clone https://github.com/your-username/Tokyonight-startup-page.git
     ```
   - **Download as ZIP (Simpler for Users):**  Download the project as a ZIP file from the repository and extract it to a local folder.

2. **Open `index.html`:**  Navigate to the project folder and open the `index.html` file in your preferred web browser.  This will load the start page.



## Detailed Configuration (`userconfig.js`)

The `userconfig.js` file acts as the control center for customizing your start page.  It's structured using JSON, making modifications easy to understand and implement.

```javascript
const default_config = {
  overrideStorage: true, // Overwrite local storage with this config on load
  // ... (rest of the configuration)
};

const CONFIG = new Config(saved_config ?? default_config); 
```

**Configuration Options Explained:**

* **`overrideStorage`:** (Boolean)  If set to `true`, the settings in `userconfig.js` will override any previously saved configurations in your local storage. Useful for initial setup or if you want to reset your configuration.  Set it to `false` once you've personalized your setup.

* **`temperature`:** (Object)  Configures weather information display (requires weather API integration).
    * `location`: (String)  Specifies the location for which weather data will be retrieved (e.g., "London", "New York").
    * `scale`: (String) Sets the temperature scale to Celsius ("C") or Fahrenheit ("F").

* **`clock`:** (Object)  Customizes the clock display.
    * `format`: (String) Defines the time format using [strftime](https://github.com/samsonjs/strftime) syntax (e.g., "%H:%M", "%I:%M %p").
    * `iconColor`: (String)  Sets the color of the clock icon using a hexadecimal color code (e.g., "#f38ba8").

* **`search`:** (Object)  Manages the integrated search functionality.
    * `engines`: (Object) A dictionary where keys represent search engine prefixes and values are arrays containing the search URL and the engine's name.
      ```javascript
      engines: {
        g: ['https://google.com/search?q=', 'Google'],
        y: ['https://youtube.com/results?search_query=', 'Youtube'],
        // Add more search engines here...
      }
      ```

* **`keybindings`:** (Object) Maps keyboard keys to component actions.
      ```javascript
       keybindings: {
         "s": "search-bar",  // Activate search bar with 's' key
         "q": "config-tab"  // Open the config tab with 'q' key
       }
      ```

* **`disabled`:** (Array) A list of components to disable (currently unused in the provided code, but retained for potential future use).

* **`fastlink`:** (String) A URL that can be opened using the fastlink component (this component isn't implemented in the provided code, but the configuration option is there if you want to add it).

* **`openLastVisitedTab`:** (Boolean) If `true`, the start page will automatically open the last tab you were viewing in the previous session.

* **`tabs`:** (Array) This is the core of your start page configuration. Each element in this array defines a tab.
    * `name`: (String) The name of the tab, displayed on the tab selector.
    * `background_url`: (String) The URL of the background image for the tab.  Can be a GIF or static image.
    * `background_size`: (String - Optional) How the background image should be sized. Defaults to 'cover', but can be things like "150%" if you want it larger.
    * `categories`: (Array) An array of category objects within the tab.
        * `name`: (String) The category name, displayed above the links.
        * `links`: (Array) An array of link objects.
            * `name`: (String)  The link's display text.
            * `url`: (String) The URL the link points to.
            * `icon`: (String - Optional) The name of a Tabler icon to display next to the link (e.g., "brand-github").  See [Tabler Icons](https://tabler-icons.io/) for available icons.
            * `icon_color`: (String - Optional) The color of the icon, specified as a hexadecimal color code (e.g., "#7aa2f7").


## Understanding the Code Structure

The project uses a modular structure with web components:

* **`index.html`:** The main HTML file, entry point for the application.  Includes the custom elements and JavaScript files.
* **`src/components`:** This directory houses the JavaScript files for each web component:
    * **`clock/clock.component.js`:** Handles the clock display.
    * **`config/config.component.js`:** Manages the in-browser configuration editor.
    * **`search/search.component.js`:**  Implements the search bar functionality.
    * **`statusbar/statusbar.component.js`:** (Placeholder in provided code) For adding a status bar.
    * **`tabs/tabs.component.js`:** The core component responsible for displaying and managing the tabs.
    * **`weather/weather.component.js` and `weather/weather.api.js`:** (Requires external weather API integration) Handles weather display.
* **`src/common`:** Contains core modules and utilities:
    * **`actions.js`:** Manages actions triggered by keybindings.
    * **`component.js`:**  The base class for creating web components.
    * **`config.js`:** Handles loading and saving configuration settings.
    * **`module.js`:** (Not used in the provided code) For future module loading.
    * **`storage.js`:** Interacts with the browser's local storage.
    * **`strftime.js`:**  Provides time formatting functions.
    * **`utils.js`:**  (Empty in provided code) For general utility functions.

## Banners Used

<div align="center">


| page-1 | page-2 | page-3 |
|--------|--------|--------|
| <img src="src/img/banners/bg-3.gif" width="175"> | <img src="src/img/banners/girl.gif" width="175"> | <img src="src/img/banners/chill.gif" width="175"> |


</div>


## Contributing

If you'd like to contribute to the Tokyonight Startup Page, feel free to fork the repository and submit pull requests. Bug reports and feature suggestions are also welcome!

We appreciate any contributions that can help improve the project. Here are some ways you can contribute:

1. **Bug Reports:** If you encounter any issues while using the startup page, please open an issue on GitHub with a detailed description of the problem.

2. **Feature Requests:** Have an idea for a new feature? Open an issue to discuss it with the community and maintainers.

3. **Code Contributions:** If you'd like to add a new feature or fix a bug:
   - Fork the repository
   - Create a new branch for your feature or bugfix
   - Make your changes
   - Submit a pull request with a clear description of your changes

4. **Documentation:** Help improve the README or add inline code comments to make the project more accessible to others.

5. **Design:** If you have ideas for improving the user interface or user experience, we'd love to hear them!

Please ensure that your contributions adhere to the project's coding standards and practices. When in doubt, don't hesitate to open an issue to discuss your ideas before making significant changes.

Thank you for considering contributing to the Tokyonight Startup Page!
