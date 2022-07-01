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

let theme_dark = {
  colors: {
    tab_background_text: "#fbfbfe",
    tab_selected: "rgb(66,65,77)",
    tab_text: "rgb(251,251,254)",
    icons: "rgb(251,251,254)",
    frame: "#1c1b22",
    popup: "rgb(66,65,77)",
    popup_text: "rgb(251,251,254)",
    popup_border: "rgb(82,82,94)",
    popup_highlight: "rgb(43,42,51)",
    tab_line: "transparent",
    toolbar: "rgb(43,42,51)",
    toolbar_top_separator: "transparent",
    toolbar_bottom_separator: "hsl(240, 5%, 5%)",
    toolbar_field: "rgb(28,27,34)",
    toolbar_field_border: "transparent",
    toolbar_field_text: "rgb(251,251,254)",
    toolbar_field_focus: "rgb(66,65,77)",
    toolbar_text: "rgb(251, 251, 254)",
    ntp_background: "rgb(43, 42, 51)",
    ntp_card_background: "rgb(66,65,77)",
    ntp_text: "rgb(251, 251, 254)",
    sidebar: "#38383D",
    sidebar_text: "rgb(249, 249, 250)",
    sidebar_border: "rgba(255, 255, 255, 0.1)",
    button: "rgb(43,42,51)",
    button_hover: "rgb(82,82,94)",
    button_active: "rgb(91,91,102)",
    button_primary: "rgb(0, 221, 255)",
    button_primary_hover: "rgb(128, 235, 255)",
    button_primary_active: "rgb(170, 242, 255)",
    button_primary_color: "rgb(43, 42, 51)",
    error_text_color: "rgb(255, 154, 162)",
    input_background: "#42414D",
    input_color: "rgb(251,251,254)",
    input_border: "#8f8f9d",
    autocomplete_popup_separator: "rgb(82,82,94)",
    appmenu_update_icon_color: "#54FFBD",
    appmenu_info_icon_color: "#80EBFF",
    tab_icon_overlay_stroke: "rgb(66,65,77)",
    tab_icon_overlay_fill: "rgb(251,251,254)"
  }
};

async function handleTabActivated(activeInfo) {
  let containerId = await getContainerId(activeInfo.tabId);

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

  if (containerId == "firefox-default") {
    browser.theme.update(theme_dark);
  } else {
    browser.theme.update(containerTheme);
  }
}

browser.tabs.onActivated.addListener(handleTabActivated);
