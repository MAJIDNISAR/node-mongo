const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017/conFusion'
MongoClient.connect(url, (err, db) => {
  console.log('trying for connection')
  assert.equal(err, null)
  console.log('Connected correctly to mongo server')
  // console.log(db)
  // db.close();
  const collection = db.collection('dishes')
  collection.insertOne({ 'name': 'Uttappizza', 'description': 'test' },
    (err, result) => {
      assert.equal(err, null)
      console.log('After Insert:\n')
      console.log(result.ops)
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null)
        console.log('Found:\n ')
        console.log(docs)
        db.dropCollection('dishes', (err, result) => {
          assert.equal(err, null)
          db.close()
        })
      })
    })
})
