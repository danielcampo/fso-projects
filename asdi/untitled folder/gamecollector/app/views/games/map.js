function (doc) {
	if (doc._id.substr(0,5) === "game_") {
		emit(doc._id.substr(5), {
			"title": doc.title,
			"platform" : doc.platform,
			"genre": doc.genre,
			"publisher": doc.publisher,
			"developer": doc.developer,
			"completed": doc.completed,
			"purchased": doc.purchased,
			"purchased_amount": doc.purchased_amount,
			"sold": doc.sold,
			"sold_amount": doc.sold_amount,
			"notes": doc.notes,
			"favorite": doc.favorite
		});
	}
};