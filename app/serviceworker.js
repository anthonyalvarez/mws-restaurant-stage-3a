if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then(function(registration) {
      console.log('[Service Worker Registation]', registration.scope);
    })
    .catch(function(error) {
      console.log('[Service Worker Registation] Failed to Register', error);
    })

}
