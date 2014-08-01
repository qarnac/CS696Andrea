Ext.define('myApp.controller.MultipleQuestion', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            multipleView: 'multipleview',
            questionForm: 'questionsform',
            qForm: '#questionsform',
            imageUpload: 'imageuploadform'
        },
        control: {
            multipleView: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },

            editButton: {
                tap: 'onContactEdit'
            },

        }
    },

    launch: function(app) {
        // var controllerTest = this.getApplication().getController('GoogleMap');
    },



    onContactEdit: function(view) {
        console.log("IM IN HERE");
    },


});