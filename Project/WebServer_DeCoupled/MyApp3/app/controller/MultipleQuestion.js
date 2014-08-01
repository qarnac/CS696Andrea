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

    onMainPush: function(view, item) {
        console.log(item.xtype);

        var editButton = this.getEditButton();

        if (item.xtype == "multiplequestion") {
            this.showEditButton();
        }
        else
        {
            this.hideEditButton();
        }

    },


    onMainPop: function(view, item) {
        console.log('at pop');
        console.log(item.xtype);

        if(item.xtype != "multiplequestion")
            this.showEditButton();
        else
            this.hideEditButton();

    },

    onContactEdit: function(view) {
        if (!this.questionForm) {
            this.multipleQuestion = Ext.create('myApp.view.MultipleQuestion');
        }

        var frmItems = this.getQForm().getItems();

        this.getLoginView().push(this.multipleQuestion);
    },

    showEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton.isHidden()) {
            return;
        }


        editButton.show();
    },

    hideEditButton: function() {
        var editButton = this.getEditButton();

        if (editButton.isHidden()) {
            return;
        }

        editButton.hide();
    },


});