Ext.define('myApp.model.Section', {
    extend: 'Ext.data.Model',
    alias: 'model.section',
 
    uses: [
        'myApp.model.Article'
    ],
 
    config: {
        fields: [
            {
                name: 'SectionId'
            },
            {
                name: 'SectionName'
            }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                rootProperty: 'Sections',
                record: 'Section'
            }
        },
        hasMany: {
            associationKey: 'Articles',
            model: 'myApp.model.Article',
            name: 'articles'
        }
    }
});