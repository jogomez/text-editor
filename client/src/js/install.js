const installBtn = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    installBtn.classList.toggle('hidden', false);
});

// Click event handler for the `butInstall` element
installBtn.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt(); // Shows prompt
    window.deferredPrompt = null; // Resets deferred prompt value since it can only be used once.
    installBtn.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null; // Clears prompt
});
