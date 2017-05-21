# algolia-firebase-cloud-functions
This is an example of keeping a Firebase Database in-sync with an Algolia index using Google Cloud Functions

How to use:

1) Install firebase cli (requires npm and node.js, more instructions here: https://firebase.google.com/docs/functions/get-started)

$ npm install -g firebase-tools

2) add your algolia credentials to your firebase function.  This will save the credentials as environment variables that can be used in the function

$ firebase functions:config:set algolia.app_id="APPID" algolia.api_key="API_KEY"

3) edit index.js with the Algolia index name you would like to publish to and also the url in firebase you would like to monitor (line 7 and 9)

4) Deploy the firebase functions 

$ firebase deploy --only functions


Backfill your data:
In some cases you might already have existing data in firebase that you would like to sync to algolia or would like to re-sync your database.  In this case I provided a backfill.js file that will transfer all the current data to algolia.

How to use:
1) Open backfill.js
2) Fill in the following values:
- ALGOLIA_APP_ID
- ALGOLIA_API_KEY
- ALGOLIA_INDEX_NAME
- path/to/service/account.json (these are your credntials to your firebase database.  You can generate a private key by going to Project Settings -> Service Accounts -> Firebase Admin SDK) on the firebase webpage
- FIREBASE_URL
- FIREBASE_ITEM_NAME
3) run the script by doing
$ node backfill.js