Ext.define('myApp.view.StudentView', {
    extend: 'Ext.navigation.View',

    requires: [
        'Ext.data.proxy.*',
        'Ext.dataview.List',
        'Ext.data.reader.Reader',
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
        'Ext.Img'
    ],

    xtype: 'studentview',

    config:{
        title:'Student View',
        iconCls: 'star',
        scrollable: true,
        styleHtmlContent:true, //gives better default content

        items: [{
            xtype: 'fieldset',
            title: 'Questions',
            instructions:'Please fill all the questions',

            items: [{
                xtype: 'image',
                src: 'http://static6.businessinsider.com/image/51c3212a6bb3f79c2000000f/this-space-picture-changes-our-understanding-of-how-black-holes-form.jpg'
            }],
        }]

        // we have edit activity button
        // we have new activity button
        // pictures fetched from database
        // questions fetched from database
    }
});
