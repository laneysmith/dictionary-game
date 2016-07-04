exports.up = function(knex, Promise) {
	return knex.schema.createTable('player', function(table) {
		table.increments();
		table.string('name');
		table.integer('points');
	}).then(function() {
		return knex.schema.createTable('word', function(table) {
      table.increments();
      table.string('word');
			table.integer('player').references('id').inTable('player').onDelete('cascade');
    });
	}).then(function() {
		return knex.schema.createTable('definitions', function(table) {
      table.increments();
      table.integer('definition');
      table.integer('player').references('id').inTable('player').onDelete('cascade');
    });
	}).then(function() {
    return knex.schema.createTable('pick', function(table) {
      table.increments();
      table.integer('word').references('id').inTable('word').onDelete('cascade');
      table.integer('player').references('id').inTable('player').onDelete('cascade');
    });
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pick')
  .then(function() {
    return knex.schema.dropTableIfExists('definition');
  }).then(function() {
    return knex.schema.dropTableIfExists('word');
  }).then(function() {
    return knex.schema.dropTableIfExists('player');
  });
};
