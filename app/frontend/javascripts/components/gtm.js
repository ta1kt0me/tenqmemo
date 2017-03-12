$(document).on('ready page:load', () => {
  dataLayer.push({ event: 'pageview', virtualUrl: window.location.pathname });
});
