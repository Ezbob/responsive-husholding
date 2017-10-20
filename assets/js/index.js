
app.initDatePicker = function() {
	$('.field.ui.calendar').calendar({
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


	//$('table.ui.celled.center.aligned.unstackable.table.seven.column.day').css('display', 'none');
};

app.addFormValidation = function() {
	var formEl = $('.form.ui');
	formEl.form({
		on: 'blur',
		fields: {
			name: {
				identifier: 'name',
				rules: [
					{
						type   : 'empty',
						prompt : 'Indtast venligst et vare navn'
					}
				]
			},
			amount: {
				identifier: 'amount',
				rules: [
					{
						type   : 'integer',
						prompt : 'Feltet "{name}" skal indeholde et heltal'
					},
					{
						type	 : 'empty',
						prompt : 'Feltet "{name}" kan ikke være tomt'
					}
				]
			},
			date: {
				identifier: 'date',
				rules: [
					{
						type	: 'empty',
						prompt	: 'Feltet "{name}" skal indeholde en dato'
					},
					{
						type	: 'date[DD/MM/YYYY]',
						prompt	: 'Feltet "{name}" skal indeholde en gyldig dato med formattet Dag/Måned/År'
					},
				]
			}
		}
	});
	return formEl;
};

app.main = function() {

	$.fn.form.settings.rules.date = function(dateString, dateFormat) {
		return moment(dateString, dateFormat, true).isValid();
	}

	app.vue.index = new Vue({
		el: "#vue-app",
		data: function() {
			return {
				groceryList: [],
				name: '', 
				amount: '', 
				date: ''
			};
		},

		components: {
			'grocery-item': {
				props: ['item'],
				template: '<tr><td>{{ item.pname }}</td><td>{{ item.amount }}</td>' +
					'<td><div class="ui input">' +
					'<input name="date" v-model="item.date" type="text"></div></td></tr>',


				mounted: function() {
					this.picker = $(this.$el).find("input").datepicker({ 
						language: "da"
					}).data('datepicker')
				}
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

				var formEl = app.addFormValidation();

				if (formEl.form('is valid')) {
					me.groceryList.push({
						id: getNewKey(), 
						pname: me.name, 
						amount: me.amount,
						date: me.date
					});

					me.date = me.amount = me.name = '';
					
				}
			}
		}
	})

};


$(function() {
	app.main();
});
