 /** checks if Push notification and service workers are supported by your browser */
function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}
/* asks  consent to receive push notifications and returns the response of the user, one of granted, default, denied */
function initializePushNotifications() {
  // request user grant to show notification
  return Notification.requestPermission(function(result) {
    return result;
  });
}


function sendNotification(pushTitle, pushBody, pushActionsIcon, pushImage, pushActionUrl) {
  const title = pushTitle;
  const text = pushBody;

  //CHROME ENSENA TODO FIREFOX PONE icon COMO IMAGEN
  const options = {
    body: text,
    icon: pushActionsIcon.sourceUrl,
    vibrate: [200, 100, 200],
    image: pushImage.sourceUrl,
    badge: pushActionsIcon.sourceUrl,
    click_action : pushActionsIcon.pushActionUrl,
    actions: [{ action: "open_url", title: "Open Here", icon: pushActionsIcon.sourceUrl }]
  };
  navigator.serviceWorker.ready.then(function(serviceWorker) {
    serviceWorker.showNotification(title, options);
  });

 

  Notification.onClick = (e) => {
    console.log('notification CLICKEEEE');
    window.location.href = 'https://google.com'
  }
  
}


function registerServiceWorker() {
  navigator.serviceWorker.register("/sw.js").then(function(swRegistration) {
    //you can do something with the service wrker registration (swRegistration)
  });
}



export {
  isPushNotificationSupported,
  initializePushNotifications,
  registerServiceWorker,
  sendNotification
};
