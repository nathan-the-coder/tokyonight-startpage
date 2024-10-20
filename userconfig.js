let saved_config = JSON.parse(localStorage.getItem("CONFIG"));

const default_config = {
  overrideStorage: true,
  // tabsBackground: {
  //   type: "image", // Can be "color" or "image"
  //   value: "url(src/img/test.jpg)", // Default background image
  //   size: "cover", // Optional: control background-size
  //   repeat: "no-repeat", // Optional: control background-repeat
  //   position: "center", // Optional: control background-position
  // },
  
    tabsBackground: {
    type: "color", // Can be "color" or "image"
    value: "#181825", // Default background image
  },


  temperature: {
    location: "Kolkata",
    scale: "C",
  },
  clock: {
    format: "h:i p",
    iconColor: "#bb9af7", // Updated to a soft purple
  },
  search: {
    engines: {
      g: ["https://google.com/search?q=", "Google"],
      d: ["https://duckduckgo.com/html?q=", "DuckDuckGo"],
      y: ["https://youtube.com/results?search_query=", "Youtube"],
      r: ["https://www.reddit.com/search/?q=", "Reddit"],
      p: ["https://www.pinterest.com/search/pins/?q=", "Pinterest"],
      w: ["https://en.wikipedia.org/wiki/Special:Search?search=", "Wikipedia"],
    },
  },
  keybindings: {
    "s": "search-bar",
    "q": "config-tab",
  },
  disabled: [],
  fastlink: "https://wallpapers-clan.com",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "Anubhav",
      background_url: "src/img/banners/bg-3.gif",
      categories: [
        {
          name: "AI Tools",
          links: [
            {
              name: "chatgpt",
              url: "https://chatgpt.com",
              icon: "message-circle",
              icon_color: "#7aa2f7", // Updated to a bright blue
            },
            {
              name: "claude",
              url: "https://claude.ai/new",
              icon: "brain",
              icon_color: "#ff9e64", // Updated to a soft orange
            },
          ],
        },
        {
          name: "workspace",
          links: [
            {
              name: "gmail",
              url: "https://mail.google.com",
              icon: "brand-gmail",
              icon_color: "#9ece6a", // Updated to a muted green
            },
            {
              name: "calendar",
              url: "https://calendar.google.com",
              icon: "calendar-filled",
              icon_color: "#e0af68", // Updated to a gold
            },
            {
              name: "Flatpak",
              url: "https://flathub.org",
              icon: "apps",
              icon_color: "#f7768e",
            },
            {
              name: "drive",
              url: "https://drive.google.com/drive/home",
              icon: "brand-google-drive",
              icon_color: "#7dcfff", // Updated to a light blue
            },
          ],
        },
        {
          name: "Info",
          links: [
            {
              name: "ArchWiki",
              url: "https://wiki.archlinux.org",
              icon: "news",
              icon_color: "#73daca", // Updated to a teal
            },
            {
              name: "Coursera",
              url: "https://www.coursera.org",
              icon: "school",
              icon_color: "#ff9e64", // Updated to a soft orange
            },
            {
              name: "monkeytype",
              url: "https://monkeytype.com",
              icon: "keyboard",
              icon_color: "#bb9af7", // Updated to a soft purple
            },
          ],
        },
      ],
    },
    {
      name: "dev",
      background_url: "src/img/banners/bg-2.gif",
      categories: [
        {
          name: "resources",
          links: [
            {
              name: "github",
              url: "https://github.com",
              icon: "brand-github",
              icon_color: "#7aa2f7", // Updated to a bright blue
            },
            {
              name: "huggingface",
              url: "https://huggingface.co",
              icon: "robot",
              icon_color: "#ff9e64", // Updated to a soft orange
            },
            {
              name: "flow",
              url: "https://universe.roboflow.com",
              icon: "hierarchy-3",
              icon_color: "#f7768e", // Updated to a soft pink
            },
            {
              name: "ai-studio",
              url: "https://aistudio.google.com/",
              icon: "playstation-circle",
              icon_color: "#bb9af7", // Updated to a soft purple
            },
          ],
        },
        {
          name: "challenges",
          links: [
            {
              name: "kaggle",
              url: "https://www.kaggle.com/volodymyrpivoshenko",
              icon: "brain",
              icon_color: "#9ece6a", // Updated to a muted green
            },
            {
              name: "leetcode",
              url: "https://leetcode.com",
              icon: "code-plus",
              icon_color: "#e0af68", // Updated to a gold
            },
            {
              name: "stackoverflow",
              url: "https://stackoverflow.com",
              icon: "brand-stackoverflow",
              icon_color: "#f7768e", // Updated to a soft pink
            },
          ],
        },
        {
          name: "blogs",
          links: [
            {
              name: "dou",
              url: "https://dou.ua",
              icon: "brand-prisma",
              icon_color: "#73daca", // Updated to a teal
            },
            {
              name: "hackernews",
              url: "https://news.ycombinator.com",
              icon: "brand-redhat",
              icon_color: "#ff9e64", // Updated to a soft orange
            },
            {
              name: "uber research",
              url: "https://eng.uber.com/category/articles",
              icon: "brand-uber",
              icon_color: "#f7768e", // Updated to a soft pink
            },
            {
              name: "google research",
              url: "https://blog.research.google",
              icon: "hexagon-letter-g",
              icon_color: "#7dcfff", // Updated to a light blue
            },
          ],
        },
      ],
    },
    {
      name: "chi ll",
      background_url: "src/img/banners/bg-7.gif",
      background_size: "150%",
      categories: [
        {
          name: "social medias",
          links: [
            {
              name: "telegram",
              url: "https://web.telegram.org",
              icon: "brand-telegram",
              icon_color: "#7aa2f7", // Updated to a bright blue
            },
            {
              name: "facebook",
              url: "https://www.facebook.com",
              icon: "brand-facebook",
              icon_color: "#7dcfff", // Updated to a light blue
            },
            {
              name: "reddit",
              url: "https://www.reddit.com/r/unixporn",
              icon: "brand-reddit",
              icon_color: "#ff9e64", // Updated to a soft orange
            },
          ],
        },
        {
          name: "games",
          links: [
            {
              name: "GG",
              url: "https://ggapp.io/pivoshenko",
              icon: "device-gamepad",
              icon_color: "#9ece6a", // Updated to a muted green
            },
            {
              name: "steam",
              url: "https://store.steampowered.com",
              icon: "brand-steam",
              icon_color: "#7aa2f7", // Updated to a bright blue
            },
            {
              name: "epicgames",
              url: "https://store.epicgames.com",
              icon: "brand-fortnite",
              icon_color: "#e0af68", // Updated to a gold
            },
            {
              name: "nintendo",
              url: "https://store.nintendo.co.uk",
              icon: "device-nintendo",
              icon_color: "#f7768e", // Updated to a soft pink
            },
          ],
        },
      {
        name: "Video",
        links: [
          {
            name: "Anime",
            url: "https://www.crunchyroll.com",
            icon: "brand-funimation",
            icon_color: "#bb9af7", // Soft purple
          },
          {
            name: "YouTube",
            url: "https://www.youtube.com",
            icon: "brand-youtube",
            icon_color: "#f7768e", // Soft pink
          },
          {
            name: "Patreon",
            url: "https://www.patreon.com",
            icon: "brand-patreon",
            icon_color: "#e0af68", // Gold
          },
        ],
      },
      ],
    },
  ],
};

const CONFIG = new Config(saved_config ?? default_config);
// const CONFIG = new Config(default_config);

(function() {
  var css = document.createElement('link');
  css.href = 'src/css/tabler-icons.min.css';
  css.rel = 'stylesheet';
  css.type = 'text/css';
  if (!CONFIG.config.localIcons)
    document.getElementsByTagName('head')[0].appendChild(css);
})();

CONFIG.setBackground(CONFIG.config.tabsBackground);


// // Merge saved config with default config, preferring saved values
// const CONFIG = new Config(Object.assign({}, default_config, saved_config));

// // Load Tabler icons CSS
// (function() {
//   if (!CONFIG.config.localIcons) {
//     const css = document.createElement('link');
//     css.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/iconfont/tabler-icons.min.css';
//     css.rel = 'stylesheet';
//     css.type = 'text/css';
//     document.head.appendChild(css);
//   }
// })();

// // Save config to localStorage whenever it changes
// CONFIG.onChange = function(newConfig) {
//   localStorage.setItem("CONFIG", JSON.stringify(newConfig));
// };