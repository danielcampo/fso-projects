function (doc) {
	if (doc._id.substr(0,9) === "platform_") {
		emit(doc._id.substr(9), {
			"name": doc.name
		});
	}
};