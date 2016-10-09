conn = new Mongo();
db = conn.getDB('cache_test');

for(i=0; i<2000; i++) {
    // random content
    r = Math.random();
    cid = r;
    trunk = r;

    // insert it
    now = new ISODate();
    db.cache.insert({cid: cid, trunk: trunk, ttl: 0, created_at: now, modified_at: now});

    // remove old ones
    toRemoveArray = db.cache.find({}, {_id : 1})
                      .limit(500)
                      .sort({created_at:-1})
                      .toArray()
                      .map(function(doc) { return doc._id; });
    db.cache.remove({_id: {$in: toRemoveArray}});
}

