app.main = function() {

	$('.calendar').calendar({
		type: 'date',
		monthFirst: false,
		formatter: {
			date: function (date, settings) {
				if (!date) return '';
				var day = date.getDate();
				var month = date.getMonth() + 1;
				var year = date.getFullYear();
				return day + '/' + month + '/' + year;
			}
		},
		minDate: new Date(),
		text: {
			days: ['S', 'M', 'Ti', 'O', 'To', 'F', 'L'],
			months: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
			monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
			today: 'I dag',
			now: 'Nu',
			am: 'AM',
			pm: 'PM'
		},
	});

	$('table.ui.celled.center.aligned.unstackable.table.seven.column.day').css('display', 'none');

};


$(function() {
	app.main();
});
