const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();


const vapidKeys = {
  publicKey: "BOpZxqxxQfbbn5Bi9myXKWeroX3X0rWaD3aAwBieOU9WlRwkYtp8KucY_qj__86oNslAybSQJbEHDOhHBOwfBo4",
  privateKey: "BNK7OMUo5tmY5dQi38FKGFwsZZ9EzltqYU9Lbj72_d4"
}

// Prints 2 URL Safe Base64 Encoded Strings
console.log(vapidKeys.publicKey, vapidKeys.privateKey);



// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:mlafuente@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// // This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/fvX8d370xDU:APA91bFRnmgIW6WTcyGAKUA8fx30z-kOLJxIuzvpSLaO6bvC1FU6E6KjMkYxA2yrwCwi8K-Q94saLo93W79JWjWFudSKzwGzGFo1zBHdQwkd_Yut0yxQvhq5DIlTxyaiY2EM7kb9s3rf',
  keys: {
    auth: 'BJ_ZB-2CICfaMVOnoFwCcENveUmb6h5nqcGHHY2X9507fMgSU-gmuEdIGPiEI2nBL4kqRVaZLRnXhx8nWlG2lcI',
    p256dh: 'w4EWrPzq5bsYw6JhxDz1uA'
  }
};

webpush.sendNotification(pushSubscription, 'Your Push Payload Text');
