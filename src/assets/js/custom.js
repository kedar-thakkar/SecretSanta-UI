$(function () {
	$('.open_popup').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		removalDelay: 500,
		modal: true,
		callbacks: {
		beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		}
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
});	








