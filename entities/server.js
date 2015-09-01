/**
 * Publication of the entitites
 *
 * @param  string name The name of the entity
 * @param  object options Passed to the find() method
 */
Meteor.publish('entity', function(name, query, options) {
	check(name, String)
	check(query, Match.Optional(Object))
	check(options, Match.Optional(Object))
	query = query ? query : {};
	return orion.entities[name].collection.find(query, options);
});

TAPi18n.publish('entity.i18n', function(name, query, options) {
	check(name, String)
	check(query, Match.Optional(Object))
	check(options, Match.Optional(Object))
	query = query ? query : {};
	return orion.entities[name].collection.i18nFind(query, options);
});

/**
 * Publication for the table on the admin.
 */
Meteor.publish('entityTabular', function(tableName, ids, fields) {
	check(tableName, String);
	check(ids, [String]);
	check(fields, Match.Optional(Object));
	var entity = tableName.replace('entities.', '');

	if (!this.userId) {
		return [];
	}

	var user = Meteor.users.findOne(this.userId);

	if (user.hasPermission('entity.' + entity + '.all')) {
		return orion.entities[entity].collection.find({_id: {$in: ids}}, {fields: fields});
	}

	if (user.hasPermission('entity.' + entity + '.personal')) {
		return orion.entities[entity].collection.find({ _id: {$in: ids}, createdBy: this.userId }, {fields: fields});
	}

	for (var i = 0; i < orion.entities[entity].customPermissions.length; i++) {
		var permission = orion.entities[entity].customPermissions[i];
		if (user.hasPermission('entity.' + entity + '.' + permission.name)) {
			var filter = permission.indexFilter(this.userId);
			filter._id = { $in: ids };
			return orion.entities[entity].collection.find(filter, {fields: fields});
		}
	}

	return [];
});
