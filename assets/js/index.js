

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
            type   : 'empty',
            prompt : 'Feltet "{name}" kan ikke være tomt'
          }
        ]
      },
      date: {
        identifier: 'date',
        rules: [
          {
            type  : 'empty',
            prompt  : 'Feltet "{name}" skal indeholde en dato'
          },
          {
            type  : 'date[DD/MM/YYYY]',
            prompt  : 'Feltet "{name}" skal indeholde en gyldig dato med formattet Dag/Måned/År'
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
      var input = $(me.$el).datepicker({ 
        language: "da",
        onSelect: function(formatted) {
          me.$emit('input', formatted)
        }
      })        
    },

    beforeDestroy: function() {
      var me = this;
      var picker = $(me.$el).datepicker().data('datepicker')
      picker.hide();
      picker.destroy();
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
        template: '<tr>' +
          '<td>{{ name }}</td><td>{{ amount }}</td>' +
          '<td><div class="ui input"><date-picker v-model="last_good"></date-picker></div></td>' +
          '<td><div class="ui checkbox"><input name="shared" v-model="shared" type="checkbox"><label></label></div></td>' +
          '<td><button v-on:click="deleteMe" class="ui red icon vertical animated button delete"><div class="hidden content">slet</div><div class="visible content"><i style="text-align: center;" class="remove icon"></i></div></button></td>' +
          '</tr>',

        data: function() {
          return {
            id: this.item.id,
            shared: this.item.is_shared,
            name: this.item.product_name,
            amount: this.item.amount,
            last_good: this.item.last_good
          }
        },

        methods: {
          deleteMe: function() {
            this.$emit('delete-row', this.id)
          }
        }
      }
    },

    mounted: function() {
      this.loadList()
    },

    methods: {

      getNewKey: function() {
        if (me.groceryList.length == 0) {
          return 0;
        } else {
          return me.groceryList[me.groceryList.length - 1].id + 1
        }
      },

      addToList: function() {
        var me = this;

        var formEl = app.addFormValidation();

        if ( formEl.form('is valid') ) {
          me.groceryList.push({
            id: me.getNewKey(), 
            product_name: me.name, 
            amount: me.amount,
            shared: false,
            last_good: null
          });

          me.date = me.amount = me.name = '';
          me.upload(me.grocerylist);
        }
      },

      removeFromList: function(id) {
        var me = this;
        for (var i = 0; i < me.groceryList.length; ++i) {
          var curr = me.groceryList[i];
          if ( curr.id === id ) {
            me.groceryList.splice(i, 1)
          }
        }
      },

      loadList: function() {
        var me = this;
        $.ajax({
          url: 'grocerylist',
          method: 'GET'
        }).done(function(response) {

          if ( response.success ) {
            for ( var i = 0; i < response.data.length; ++i ) {
              var row = response.data[i];
              me.groceryList.push({
                "id": row.id,
                "product_name": row.product_name,
                "amount": row.amount,
                "shared": row.shared == 0 ? false : true,
                "last_good": row.last_good
              });
            }  
          }
        
        }).fail(function() {
          console.log("NO DATA")
        })
      },

      upload: function(rows) {
        var data = [];

        for (var i = 0; i < rows.length; ++i) {

          data.push({  
            "product_name": rows[i].product_name,
            "amount": rows[i].amount,
            "shared": rows[i].shared,
            "last_good": rows[i].last_good
          });
        }

        $.ajax({
          url: 'grocerylist',
          dataType: 'json',
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(data)
        }).done(function(resp) {
          if ( resp.success ) {
            console.log("OK")
          } else {
            console.log("server side err")
          }
        }).fail(function() {
          console.log("NO NO")
        })
      }
    }
  })

};


$(function() {
  app.main();
});
