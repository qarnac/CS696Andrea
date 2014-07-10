Ext.define('myApp.model.Markers',{
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'markers', mapping:  function (node) {
                return (node.firstChild ? node.firstChild.nodeValue : null);
            }}
        ],
        proxy : {
            reader: {type: 'xml', record: 'marker'}
        },

        belongsTo: 'myApp.model.Hunt'
    }

});