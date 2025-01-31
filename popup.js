document.getElementById('save').addEventListener('click', () => {
    const probability = parseFloat(document.getElementById('probability').value);
    chrome.storage.local.set({linkprank_probability: probability}, () => {
        alert('Randomness set to ' + probability);
    });
});