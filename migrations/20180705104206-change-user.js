'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.addColumn("user", "cellphone", {
    type: "string"
  }, function(err) {
    if (err) {
      // Do something...
      return callback(err);
    }

    return db.removeColumn("user", "full_name", callback);
  });
};

exports.down = function(db, callback) {

  db.addColumn("user", "full_name", {
    type: "string",
    length: 200
  }, function(err) {
    if (err) return callback(err);

    db.removeColumn("user", "cellphone", callback);
  });
};

exports._meta = {
  "version": 1
};
