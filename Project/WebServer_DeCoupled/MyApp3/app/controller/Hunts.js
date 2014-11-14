Ext.define('myApp.controller.Hunts', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            // We're going to lookup views by xtype
            blog: 'huntspanel'
        },
        control: {
            // The commands fired by the hunt list
            'huntspanel list':{
                itemtap: 'showPost'
            }
        }

    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
       // var controllerTest = this.getApplication().getController('GoogleMap');
       console.log("in launch");
    },

    showPost: function(list,index,element,record){

        var me = this.getBlog();

        console.log(me);

        me.push({
            xtype: 'map',
            title: record.get('title'),
            fullscreen: true,
            layout:'fit',

            useCurrentLocation: false,

            listeners: {
                'maprender' : function(comp, map){
                    window['myApp'].app.getController('GoogleMap').map_render(comp, map, record);
                }
            }
        });
    }

});