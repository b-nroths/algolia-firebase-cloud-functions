var functions = require('firebase-functions');

const algoliasearch = require('algoliasearch');
const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);

// Name fo the algolia index for Blog posts content.
const ALGOLIA_POSTS_INDEX_NAME = 'items';

exports.algoliaTest = functions.database.ref('/item/{itemId}/')
    .onWrite(event => {

      // remove item for delete event in firebase
      if (!event.data.exists()) {
        console.log('item deleted', event.params.itemId);
        return index.deleteObject(event.params.itemId);
      }

      // create algolia object to insert/update
      const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
      const firebaseObject = {
        text: event.data.val(),
        objectID: event.params.itemId
      };

      console.log('item inserted or updated', event.params.itemId)
      return index.saveObject(firebaseObject);
    });
