const components = {
  "status-bar": Statusbar,
  'search-bar': Search,
  'config-tab': ConfigTab,
  "current-time": Clock,
  "weather-forecast": Weather,
  "tabs-list": Tabs,
};

Object.keys(components).forEach(componentName => {
  if (!CONFIG.disabled.includes(componentName))
    customElements.define(componentName, components[componentName]);
});
