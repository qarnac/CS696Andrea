Ext.define('myApp.view.HuntInformation', {
    extend: 'Ext.Panel',

    xtype: 'huntinfopanel',
    alias: 'widget.huntinfopanel',

    config: {

        title:'Hunt Information',
        scrollable: true,
        autoDestroy: false,

        items: [
            {
                styleHtmlContent: true,

                layout: {
                    align: 'center'
                },

                items: [
                    {
                        itemId: 'imageStuffId',
                        id : 'imageStuffId',
                        xtype: 'image',
                        height: '200px',
                        //style: 'margin-top:15px;'

                    },
                    {
                        xtype: 'fieldset',

                        items: [
                            {
                                xtype: 'textareafield',
                                label: 'Who are the partners in this group?',
                                labelAlign: 'top',
                                maxRows: 4,
                                id : 'partnersinfo',
                                name: 'partnersinfo',
                                labelWrap : true
                            }, {
                                xtype: 'textareafield',
                                label: 'Do you have an interesting link related to this article?',
                                maxRows: 4,
                                name: 'urlinfo',
                                id : 'urlinfo',
                                labelAlign: 'top',
                                labelWrap : true
                            }, {
                                xtype: 'textareafield',
                                label: 'test1',
                                maxRows: 4,
                                name: 'q1info',
                                id : 'q1info',
                                labelAlign: 'top',
                                labelWrap : true
                            }, {
                                xtype: 'textareafield',
                                label: 'test2',
                                maxRows: 4,
                                name: 'q2info',
                                id : 'q2info',
                                labelAlign: 'top',
                                labelWrap : true
                            },
                            {
                                xtype: 'textareafield',
                                label: 'test3',
                                maxRows: 4,
                                name: 'q3info',
                                id : 'q3info',
                                labelAlign: 'top',
                                labelWrap : true
                            },
                            {
                                xtype: 'textareafield',
                                label: 'Multiple choice question',
                                id: 'multiplechoicequestion',
                                maxRows: 4,
                                labelAlign: 'top',
                                name: 'multiplechoicequestion',
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'correct answer :',
                                id: 'correctanswer',
                                labelWidth: '30%',
                                name: 'correctanswer',
                                labelWrap : true
                            }
                        ]

                    }
                ]

            },
        ]
    },

});