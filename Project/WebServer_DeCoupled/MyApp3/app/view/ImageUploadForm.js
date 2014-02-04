/**
 * Created by andrea on 2/2/14.
 */


Ext.define('myApp.view.ImageUploadForm', {
    extend: 'Ext.navigation.View',
    xtype: 'ImageUploadForm',

    requires: [
        'Ext.field.File',
    ],

    config: {
        title:'Blog',

        items: [
            {
                xtype: 'textfield',
                label: 'Name'
            },

            {
                xtype: 'filefield',
                id: 'form-file',
                emptyText: 'Select an image',
                label: 'Photo',
                name: 'photo-path',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'upload-icon'
                }
            }],


        buttons: [{
            text: 'Save',
            handler: function(){
               // var form = this.up('form').getForm();
                //if(form.isValid()){
                //    form.submit({
                        //url: 'file-upload.php',
                        //waitMsg: 'Uploading your photo...',
                        //success: function(fp, o) {
                        //    msg('Success', 'Processed file "' + o.result.file + '" on the server');
                        //}
                 //   });
                //}
            }
        },{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]



    }


});