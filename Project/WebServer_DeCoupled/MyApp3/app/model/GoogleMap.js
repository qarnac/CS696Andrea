Ext.define('myApp.model.GoogleMap',{
    extend: 'Ext.data.Model',

    uses:[
        'myApp.model.Section'
    ],

    config: {
        fields: [
            'id',
            'lat',
            'lng',
            'media_id',
            'additionalAnswers',
            'partner_names',
            'interesting_url',
            'multiple_question',
            'choices'
        ]
    }

});