

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

	Vue.use(VeeValidate);

	$.fn.form.settings.rules.date = function(dateString, dateFormat) {
		return moment(dateString, dateFormat, true).isValid();
	}

	Vue.component('date-picker', {
		template: '<input/>',

		mounted: function() {
			var me = this;
			var input = $(this.$el).datepicker({ 
				language: "da",
				onSelect: function(formatted) {
					me.$emit('input', formatted)
				}
			})				
		}

	});

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
				template: '<tr><td>{{ name }}</td><td>{{ amount }}</td>' +
					'<td><div class="ui input"><date-picker v-model="lastgood"></date-picker></div></td>' +
					'<td><div class="ui checkbox"><input name="shared" v-model="is_shared" type="checkbox"><label></label></div></td>' +
					'<td><button class="ui red icon vertical animated button"><div class="hidden content">slet</div><div class="visible content"><i style="text-align: center;" class="remove icon"></i></div></button></td>' +
					'</tr>',

				data: function() {
					return {
						is_shared: this.item.is_shared,
						name: this.item.pname,
						amount: this.item.amount,
						lastgood: this.item.lastgood
					}
				},

				methods: {
					updateDate: function(date) {
						this.row.lastgood = date;
					}
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

				if ( formEl.form('is valid') ) {
					me.groceryList.push({
						id: getNewKey(), 
						pname: me.name, 
						amount: me.amount,
						is_shared: false,
						lastgood: null
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
