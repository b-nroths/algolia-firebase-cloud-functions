// algolia set up
const algoliasearch = require('algoliasearch');
const client = algoliasearch('APP_ID', 'API_KEY');
const ALGOLIA_POSTS_INDEX_NAME = 'ALGOLIA_INDEX NAME';

// firebase setup
var admin = require("firebase-admin");
var serviceAccount = require("/path/to/service/account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "FIREBAE_URL"
});

var db = admin.database();
var ref = db.ref("FIREBASE_ITEM_NAME");
ref.orderByChild("id").on("child_added", function(snapshot) {
  const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
  const firebaseObject = {
        text: snapshot.val(),
        objectID: snapshot.val().key
      };
  console.log(snapshot.val().key);
  index.saveObject(firebaseObject); 

});
