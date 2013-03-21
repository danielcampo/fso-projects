function (doc) {
	if (doc._id.substr(0,5) === "game_") {
		emit(doc._id);
	}
};