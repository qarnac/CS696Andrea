Ext.define('myApp.model.QuestionForm',{
    extend: 'Ext.data.Model',
    alias: 'model.QuestionForm',

    config: {
        fields: [
            {
                name: 'q1'
            },
            {
                name: 'q2'
            },
            {
                name: 'q3'
            },
            {
                name: 'q4'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'q1'
            },
            {
                type: 'presence',
                field: 'q2'
            },
            {
                type: 'presence',
                field: 'q3'
            },
            {
                type: 'presence',
                field: 'q4'
            }]
    }
});