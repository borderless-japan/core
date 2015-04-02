/**
 * Creates one object in the dictionary collection
 * The dictionary is one object saved in the database
 */
if (orion.dictionary.collection.find().count() === 0) {

	orion.dictionary.collection.insert({}, function(){
		console.log("Dictionary initialized.")
	});

}

/**
 * i18n dictionary (tap:i18n-db doesn't support null publications)
 */
TAPi18n.publish('dictionary', function(options) {
	ret = orion.dictionary.collection.find();
	console.log(ret.fetch());
	return ret;
});

TAPi18n.publish('dictionary.i18n', function(options) {
	ret = orion.dictionary.collection.i18nFind();
	console.log(ret.fetch());
	return ret;
});
