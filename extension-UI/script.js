
function getActiveTabUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentUrl = tabs[0].url;
      document.getElementById("url").innerHTML = "The full URL of the active tab is:<br>" + currentUrl;
  });
}


document.getElementById("summarizeButton").addEventListener("click", getActiveTabUrl);
