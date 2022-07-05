let theme_light = {
  colors: {
    tab_background_text: "rgb(21,20,26)",
    tab_selected: "#fff",
    tab_text: "rgb(21,20,26)",
    icons: "rgb(91,91,102)",
    frame: "#f0f0f4",
    popup: "#fff",
    popup_text: "rgb(21,20,26)",
    popup_border: "rgb(240,240,244)",
    popup_highlight: "#e0e0e6",
    popup_highlight_text: "#15141a",
    tab_line: "transparent",
    toolbar: "#f9f9fb",
    toolbar_top_separator: "transparent",
    toolbar_bottom_separator: "#ccc",
    toolbar_field: "#f0f0f4",
    toolbar_field_text: "rgb(21,20,26)",
    toolbar_field_border: "transparent",
    toolbar_field_focus: "white",
    toolbar_text: "rgb(21,20,26)",
    ntp_background: "#F9F9FB",
    ntp_text: "rgb(21, 20, 26)",
    popup_action_color: "rgb(91,91,102)",
    button: "rgba(207,207,216,.33)",
    button_hover: "rgba(207,207,216,.66)",
    button_active: "rgb(207,207,216)",
    button_primary: "rgb(0, 97, 224)",
    button_primary_hover: "rgb(2, 80, 187)",
    button_primary_active: "rgb(5, 62, 148)",
    button_primary_color: "rgb(251, 251, 254)",
    error_text_color: "rgb(197,0,66)",
    input_color: "rgb(21,20,26)",
    input_background: "rgb(255,255,255)",
    autocomplete_popup_hover: "rgb(240,240,244)",
    autocomplete_popup_separator: "rgb(240,240,244)",
    appmenu_update_icon_color: "#2AC3A2",
    appmenu_info_icon_color: "#0090ED",
    tab_icon_overlay_stroke: "rgb(255,255,255)",
    tab_icon_overlay_fill: "rgb(91,91,102)"
  }
};

let firstTab = true;
let defaultTheme;

async function handleTabActivated(activeInfo) {
  let containerId = await getContainerId(activeInfo.tabId);

  if (firstTab) {
    defaultTheme = await browser.theme.getCurrent();
    firstTab = false;
  }

  setTheme(containerId);
}

async function getContainerId(tabId) {
  let currentTabInfo = await browser.tabs.get(tabId);
  let containerId = currentTabInfo.cookieStoreId;

  return containerId;
}

async function getContainerInfo(containerId) {
  let containerInfo;

  if (containerId != "firefox-default") {
    containerInfo = await browser.contextualIdentities.get(containerId);
    return containerInfo;
  }
}

async function setTheme(containerId) {
  let containerInfo = await getContainerInfo(containerId);
  let containerTheme = {
    colors: {
      frame: containerInfo ? containerInfo.colorCode : "#000000"
    }
  };

  if (defaultTheme.colors !== "null") {
    defaultTheme = theme_light;
  }

  if (containerId == "firefox-default") {
    browser.theme.update(defaultTheme);
  } else {
    browser.theme.update(containerTheme);
  }
}

browser.tabs.onActivated.addListener(handleTabActivated);
