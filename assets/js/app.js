
app.initDatePicker = function() {
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

app.main = function() {
	app.initDatePicker();

	app.vue.index = new Vue({
		el: "#vue-app",
		data: {
			groceryList: [
				{ id: 0, pname: 'gulerod', number: 1 }
			],
			name: "",
			number: 1,
			date: new Date()
		},

		components: {
			'grocery-item': {
				props: ['gitem'],
				template: '<tr><td>{{ gitem.pname }}</td><td>{{ gitem.number }}</td></tr>'
			}
		},

		methods: {

			addToList: function() {
				var me = this;
				function getNewKey() {
					if (me.groceryList.length == 0) {
						return 0;
					} else {
						return me.groceryList[me.groceryList.length - 1].id + 1
					}
				}

				me.groceryList.push({id: getNewKey(), pname: me.name, number: me.number})
				console.log(me.groceryList)
			}
		}
	})

};


$(function() {
	app.main();
});
