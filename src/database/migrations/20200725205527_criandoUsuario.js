exports.up = function(knex) {
    return knex.schema.createTable('user',(table) => {
        table.increments();
        table.string('name');
        table.string('accessToken').notNullable();
        table.string('refreshToken').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
