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

                items: [
                    {
                        layout: {
                            align: 'center'
                        },

                        itemId: 'imageStuffId',
                        id : 'imageStuffId',
                        xtype: 'image',
                        height: '200px',
                        //style: 'margin-top:15px;'

                    },
                    {
                        xtype: 'fieldset',
                        flex: 10,
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Who are the partners in this group?',
                                labelAlign: 'top',
                                id : 'partnersinfo',
                                name: 'partnersinfo',
                                readOnly: true,
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'Do you have an interesting link related to this article?',
                                name: 'urlinfo',
                                id : 'urlinfo',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'test1',
                                name: 'q1info',
                                id : 'q1info',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'test2',
                                name: 'q2info',
                                id : 'q2info',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            },
                            {
                                xtype: 'textfield',
                                label: 'test3',
                                name: 'q3info',
                                id : 'q3info',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            },
                            {
                                xtype: 'textfield',
                                label: 'Multiple choice question',
                                id: 'multiplechoicequestion',
                                maxRows: 4,
                                labelAlign: 'top',
                                name: 'multiplechoicequestion',
                                readOnly: true,
                                labelWrap : true
                            },
                            {
                                xtype: 'fieldset',
                                //fieldLabel: 'test',

                                defaultType: 'radiofield',
                                defaults: {
                                    flex: '1'
                                },
                                //layout: 'hbox',
                                items: [{
                                    name: 'color',
                                    label: 'a)',
                                    id: 'answera1'
                                },
                                {
                                    name: 'color',
                                    label: 'b)',
                                    id: 'answerb2'

                                },
                                {
                                    name: 'color',
                                    label: 'c)',
                                    id: 'answerc3'
                                },
                                {
                                    name: 'color',
                                    label: 'd)',
                                    id: 'answerd4'
                                },
                                {
                                    name: 'color',
                                    label: 'e)',
                                    id: 'answere5'
                                }
                                ]
                            }

                        ]

                    }
                ]

            },
        ]
    },

});