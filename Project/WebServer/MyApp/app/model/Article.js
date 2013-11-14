Ext.define('myApp.model.Article', {
    extend: 'Ext.data.Model',
    alias: 'model.article',
 
    config: {
        fields: [
            {
               name: 'ArticleId'
            },
            {
                name: 'ArticleHeadLine'
            }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                rootProperty: 'Articles',
                record: 'Article'
            }
        }
    }
});