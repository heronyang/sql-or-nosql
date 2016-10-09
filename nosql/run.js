conn = new Mongo();
db = conn.getDB('cache_test');

limit = 500;

for(i=0; i<2000; i++) {
    // random content
    r = Math.random();
    cid = r;
    trunk = r;

    // insert it
    now = new ISODate();
    db.cache.insert({cid: cid, trunk: trunk, ttl: 0, created_at: now, modified_at: now});

    // remove old ones
    if(db.cache.count() > limit) {
        toRemoveArray = db.cache.find({}, {_id : 1})
                          .limit(limit)
                          .sort({created_at:-1})
                          .toArray()
                          .map(function(doc) { return doc._id; });
        db.cache.remove({_id: {$in: toRemoveArray}});
    }
}

