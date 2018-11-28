const glob = require('glob')
const path = require('path')
const admin = require('firebase-admin')
const functions = require('firebase-functions')

// Initialize Firebase so it is available within functions
try {
  admin.initializeApp(functions.config().firebase)
} catch (e) {
  /* istanbul ignore next: not called in tests */
  console.error(
    'Caught error initializing app with functions.config():',
    e.message || e
  )
}

// Set Firestore timestamp settings
// NOTE: Skipped when running tests tests so it does not have to be mocked
if (process.env.NODE_ENV !== 'test') {
  admin.firestore().settings({ timestampsInSnapshots: true })
}

const codeFolder = process.env.NODE_ENV === 'test' ? './src' : './dist'

// Load all folders within dist directory (mirrors layout of src)
const files = glob.sync(codeFolder + '/**/index.js', {
  cwd: __dirname,
  ignore: [
    './node_modules/**',
    codeFolder + '/utils/**',
    codeFolder + '/constants'
  ]
})

// Loop over all folders found within dist loading only the relevant function
files.forEach(functionFile => {
  // Get folder name from file name (removing any dashes)
  const folderName = path
    .basename(path.dirname(functionFile))
    .replace(/[-]/g, '')

  // Load single function from default
  !process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === folderName // eslint-disable-line no-unused-expressions
    ? (exports[folderName] = require(functionFile).default) // eslint-disable-line global-require
    : () => {}
})

const request = require('request');
const url='.balena-devices.com/';

exports.hourly_job = functions.pubsub
  .topic('hourly-tick')
  .onPublish((message) => {
      
    console.log("This job is run every hour!");
  
    var db = admin.firestore();

    var project = db.collection('projects');
    var getDoc = project.get()

    .then(snapshot => {
      snapshot.forEach(doc => {
        
        url_long = 'http://' + doc.data().box + url + 'status'
        var req = request.get(url_long, function (error, response, body) {
        console.log('error:', error, 'statusCode:', response && response.statusCode); // Print the error if one occurred 
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        data = JSON.parse(body)
        console.log('body:', body); //Prints the response of the request. 
        
        var data = {
          humidity: data.humidity,
          temperature: data.temperature,
          timestamp: Date.now(),
          box: doc.id,
          user: doc.data().createdBy
        };

        var collection = db.collection('/measurements');
        collection.add(data);
        });
        
        // console.log('request:', req); //Prints the response of the request. 
        // // console.log('r:', req); //Prints the response of the request. 
        
        
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

    

    return true;
  });
