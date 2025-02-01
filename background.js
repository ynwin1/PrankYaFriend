chrome.runtime.onInstalled.addListener(function (object) {
    let externalUrl = "https://prankyafriend.onrender.com/home.html";

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: externalUrl }, function (tab) {
            console.log("Home page opened on install");
        });
    }
});