let saved_config = JSON.parse(localStorage.getItem("CONFIG"));

const default_config = {
  overrideStorage: true,
  temperature: {
    location: "London",
    scale: "C",
  },
  clock: {
    format: "h:i p",
    iconColor: "#bb9af7", // Updated to a soft purple
  },
  disabled: [],
  fastlink: "https://app.raindrop.io",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "Anubhav",
      background_url: "src/img/banners/bg-3.gif",
      categories: [
        {
          name: "bookmarks",
          links: [
            {
              name: "chatgpt",
              url: "https://chatgpt.com",
              icon: "droplet-bolt",
              icon_color: "#7aa2f7", // Updated to a bright blue
            },
            {
              name: "claude",
              url: "https://claude.ai/new",
              icon: "binary-tree",
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
              name: "sheets",
              url: "https://docs.google.com/spreadsheets",
              icon: "table",
              icon_color: "#f7768e", // Updated to a soft pink
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
          name: "media",
          links: [
            {
              name: "ArchWiki",
              url: "https://wiki.archlinux.org",
              icon: "news",
              icon_color: "#73daca", // Updated to a teal
            },
            {
              name: "mil.in.ua",
              url: "https://mil.in.ua",
              icon: "badge-filled",
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
      background_url: "src/img/banners/girl.gif",
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
      background_url: "src/img/banners/chill.gif",
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
          name: "video",
          links: [
            {
              name: "anime",
              url: "https://hianime.to/home",
              icon: "brand-funimation",
              icon_color: "#bb9af7", // Updated to a soft purple
            },
            {
              name: "youtube",
              url: "https://www.youtube.com",
              icon: "brand-youtube",
              icon_color: "#f7768e", // Updated to a soft pink
            },
            {
              name: "patreon",
              url: "https://www.patreon.com",
              icon: "brand-patreon",
              icon_color: "#e0af68", // Updated to a gold
            },
            {
              name: "kyivstar",
              url: "https://tv.kyivstar.ua",
              icon: "star-filled",
              icon_color: "#7dcfff", // Updated to a light blue
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(default_config);