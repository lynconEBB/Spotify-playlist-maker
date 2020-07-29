
exports.up = function(knex) {
  return knex.schema.table('user',(table) =>{
    table.string('spotifyId').notNullable;
  });
};

exports.down = function(knex) {
    return knex.schema.table('user',(table) =>{
        table.dropColumn('spotifyId');
    });
};
