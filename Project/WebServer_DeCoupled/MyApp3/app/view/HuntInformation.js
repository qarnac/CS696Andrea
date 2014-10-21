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
                                id: 'fieldMq',

                                defaults: {
                                    flex: '1',

                                    listeners : {
                                        element: 'label',
                                        tap : function(){
                                            console.log(this);
                                            Ext.Msg.alert('Correct Answer!');
                                            if(this._value === "false")
                                                Ext.Msg.alert('Sorry wrong answer!', 'Please pick another one');
                                            else
                                                Ext.Msg.alert('Correct!', "You've got it right!");

                                        }
                                    }
                                },

                                items: [{
                                    xtype: 'radiofield',
                                    name : 'color',
                                    value: 'a',
                                    checked: false,
                                    label: 'a)',
                                    labelWidth: '80%',
                                    labelAlign: 'right',
                                    id: 'answera1'

                                },
                                {
                                    xtype: 'radiofield',
                                    name : 'color',
                                    value: 'b',
                                    checked: false,
                                    label: 'b)',
                                    labelWidth: '80%',
                                    labelAlign: 'right',
                                    id: 'answerb2'

                                },
                                {
                                    xtype: 'radiofield',
                                    name : 'color',
                                    value: 'c',
                                    checked: false,
                                    label: 'c)',
                                    labelWidth: '80%',
                                    labelAlign: 'right',
                                    id: 'answerc3'
                                },
                                {
                                    xtype: 'radiofield',
                                    name : 'color',
                                    value: 'd',
                                    checked: false,
                                    label: 'd)',
                                    labelWidth: '80%',
                                    labelAlign: 'right',
                                    id: 'answerd4'
                                },
                                {
                                    xtype: 'radiofield',
                                    name : 'color',
                                    value: 'e',
                                    checked: false,
                                    label: 'e)',
                                    labelWidth: '80%',
                                    labelAlign: 'right',
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