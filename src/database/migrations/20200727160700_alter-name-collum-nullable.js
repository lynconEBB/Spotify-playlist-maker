
exports.up = function(knex) {
    return knex.schema.alterTable('user',table => {
        table.string('name').nullable().alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('user',table => {
        table.string('name').notNullable().alter();
    });
};
