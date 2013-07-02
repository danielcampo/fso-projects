// Daniel Campo | FSO | AVF1306
$(function() {

    $('#browser').on('click', inAppBrowser);

    function inAppBrowser(e) {
		e.preventDefault();
		var ref = window.open('http://bkpetitionpros.com/', '_blank', 'location=no');

		ref.addEventListener('loadstart',function() {
			setTimeout(function() {
				ref.close();
			}, 2000);
		});

	} // end inAppBrowser();

}); // end script