chrome.storage.sync.get(["numStar"], ({numStar}) => {
    document.getElementById(`star-${numStar || 5}`).checked = true;
});
document.querySelectorAll("input[name=star]").forEach(el => el.onclick = () => updateNumStar(el.id.split("-")[1]));
executeStar();
function updateNumStar(numStar) {
    chrome.storage.sync.set({numStar: numStar});
    executeStar();
}
function executeStar() {
    chrome.tabs.query(
        {active: true, windowType: "normal", currentWindow: true},
        function (tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: async function () {
                    let activeModal = document.querySelector("[aria-modal=true]");
                    if (!activeModal) {
                        activeModal = document.getElementById("review-team-member");
                        document.getElementById("get-evaluate-inside-group").click();
                        await new Promise((resolve) => setTimeout(resolve, 500));
                    }
                    chrome.storage.sync.get(["numStar"], ({numStar}) => {
                        for (const star of activeModal.querySelectorAll(`i.point-vote:not(.active)[data-point='${numStar || 5}']`)) {
                            star.click();
                        }
                    });
                },
            });
        }
    );
}