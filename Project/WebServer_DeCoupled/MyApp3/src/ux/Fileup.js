/**
 * @filename Fileup.js
 * 
 * @name File uploading component
 * @fileOverview File uploading component based on Ext.Button
 *
 * @author Constantine V. Smirnov kostysh(at)gmail.com
 * @Modified
 * @date 20130716
 * @version 2.0.1
 * @license GNU GPL v3.0
 *
 * @requires Sencha Touch 2.2.1
 * 
 * This component can works in two modes (switched by loadAsDataUrl config):
 * 1) Load local files as dataUrl. 
 * Will be useful if you want to load a local file. For example you can load
 * image and display it inside dom or store it into localStorage.
 * 2) Upload files to server (you should also setup a server part)
 * Current PHP version of server part located in src/php folder (getfile.php)
 * 
 * Server response format (JSON):
 * {
 *     success: true,// or false
 *     message: ''// error message if success === false
 * }
 * 
 * Component has three states:
 * 1) Browse: Initial state, you can browse and select file
 * 2) Ready: File selected and ready for load or upload
 * 3) Uploading: File loading or uploading in process
 * 
 * You can configure these states (add custom text and styles).
 * Default configuration below:
 *

items: [

    //Fileup configuration for "Load local file" mode
    {
        xtype: 'fileupload',
        autoUpload: true,
        loadAsDataUrl: true,
        states: {
            browse: {
                text: 'Browse and load'
            },
            ready: {
                text: 'Load'
            },

            uploading: {
                text: 'Loading',
                loading: true// Enable loading spinner on button
            }
        }
    },
    
    //Fileup configuration for "Upload file" mode
    {
        itemId: 'fileBtn',
        xtype: 'fileupload',
        autoUpload: false,
        url: 'src/php/getfile.php'
    }
]

 
 * 
 */

/**
 * @event success
 * Fired when file uploaded successfully
 * @param {Object} response Response object obtained from server
 * @param {Object} xhr Link to XMLHttpRequest object
 * @param {Object} e Success event
 */

/**
 * @event failure
 * Fired when file not uploaded or server just returns error message
 * @param {String} message Parsed error message obtained from server
 * @param {Object} response Response object obtained from server
 * @param {Object} xhr Link to XMLHttpRequest object
 * @param {Object} e Uploading error event
 */

/**
 * @event loadsuccess
 * Fired when file uploaded successfully
 * @param {Object} dataUrl DataUrl source of readed file
 * @param {Object} reader Link to FileReader object
 * @param {Object} e Load event
 */

/**
 * @event loadfailure
 * Fired when file not uploaded or server just returns error message
 * @param {String} message Parsed error message obtained from server
 * @param {Object} reader Link to FileReader object
 * @param {Object} e Loading error event
 */

Ext.define('Ext.ux.Fileup', {
    extend: 'Ext.Button',
    xtype: 'fileupload',
    
    requires: [
        'Ext.MessageBox',
        'Ext.device.Notification',
        'Ext.Array'
    ],
    
    template: [
        
        // Default button elements (do not change!)
        {
            tag: 'span',
            reference: 'badgeElement',
            hidden: true
        },
        {
            tag: 'span',
            className: Ext.baseCSSPrefix + 'button-icon',
            reference: 'iconElement',
            hidden: true
        },
        {
            tag: 'span',
            reference: 'textElement',
            hidden: true
        },
        
        // Loading spinner
        {
            tag: 'div',
            className: Ext.baseCSSPrefix + 'loading-spinner',
            reference: 'loadingElement',
            hidden: true,
            
            children: [
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-top'
                },
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-right'
                },
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-bottom'
                },
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-left'
                }
            ]
        },
                
        // Hidden file element
        {
            tag: 'form',
            reference: 'formElement',
            hidden: false,            
            
            children: [
                {
                    tag: 'input',
                    reference: 'fileElement',
                    type: 'file',
                    name: 'userfile',
                    tabindex: -1,
                    hidden: false,
                    style: 'opacity:0;position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;z-index:16777270;'
                }
            ]
        }
    ],
    
    // Default button states config
    defaultStates: {
        browse: {
            text: 'Browse',
            cls: Ext.baseCSSPrefix + 'fileup',
            ui: 'filebrowse'
        },
		
		load: {
            text: 'Load',
            cls: Ext.baseCSSPrefix + 'fileup-load',
            ui: 'fileload'
        },

        ready: {
            text: 'Upload',
            cls: Ext.baseCSSPrefix + 'fileup-ready',
            ui: 'fileready'
        },

        uploading: {
            text: 'Uploading',
            cls: Ext.baseCSSPrefix + 'fileup-uploading',
            ui: 'fileupload',
            loading: true
        }
    },
    
    // Current button state
    currentState: null,
    blogImage: null,
    
    config: {
        cls: Ext.baseCSSPrefix + 'fileup',
        
        /**
         * @cfg {String} name Input element name, check on server for $_FILES['userfile']
         */        
        name: 'userfile',
        
        /**
         * @cfg {Boolean} autoUpload 
         * If true then "uploading" state will start after "ready" event automatically
         */
        autoUpload: false,
        
        /**
         * @cfg {Object} states 
         */
        states: true,
        
        /**
         * @cfg {Boolean} loadAsDataUrl
         */
        loadAsDataUrl: false,
        
        /**
         * @cfg {String} url URL to uploading handler script on server
         */
        url: '',
        
        /**
         * @cfg {Boolean} signRequestEnabled Enable or disable request signing feature
         */
        signRequestEnabled: false,
        
        /**
         * @cfg {String} signHeader Signing token header name
         */
        signHeader: '',
        
        /**
         * @cfg {Array} defaultSuccessCodes Http response success codes
         */
        defaultSuccessCodes: [200, 201],

        /**
         * @cfg {Float} Latitude contain the location or no location
         */
        latitude: 0.0,

        /**
         * @cfg {Float} Longitude contain the location or no location
         */
        longitude: 0.0
    },
    
    // @private
    applyStates: function(states) {
        var me = this;

        console.log('in apply states');
        console.log("");

        if (states) {
            
            if (Ext.isObject(states)) {
                
                // Merge custom config with default
                return Ext.merge({}, me.defaultStates, states);
            } else {
                return me.defaultStates;
            }
        } else {
            return me.defaultStates;
        }
    },
    
    // @private
    initialize: function() {
        var me = this;

        me.callParent();
        
        me.fileElement.dom.onchange = function() {
            me.onChanged.apply(me, arguments);
        };
        
        me.on({
            scope: me,
            buffer: 250,// Avoid multiple tap 
            tap: me.onButtonTap
        });

        if(me._itemId == "uploadBtn" )
        {
            me.changeState('ready');
        }
        else
            // Setup initial button state
            me.changeState('browse');
    },
    
    // @private
    onButtonTap: function() {
        var me = this;
        
        switch (me.currentState) {
		
            // Currently we handle tap event while button in ready state
            // because in all other states button is not accessible
			case 'load':

				console.log('at ready state going to invoke doload()');
				file = me.fileElement.dom.files[0];
                me.doLoad(file);
                me.compressFile(file);
                console.log(me);
                me.changeState('browse');
				break;

            case 'ready':
                console.log("on ready state");
                me.changeState('uploading');
                console.log(myApp.app.apiToken.dataBlob);

                if (!me.getLoadAsDataUrl()) {
                    console.log("get load As Data Url");
                    me.fireEvent('uploadstart', myApp.app.apiToken.dataBlob);
                    me.doUpload( myApp.app.apiToken.dataBlob);
                }

                break;
        }
    },
    
    // @private
    onChanged: function(e) {
        var me = this;
        
        if (e.target.files.length > 0) {
            me.changeState('load');
        } 
		else if( me.currentState('load')){
		    me.fireAction('ready', [e.target.files[0]], function() {
                console.log('on changed to ready state');
                me.changeState('ready');
            }, me);
		}
		else {
            Ext.device.Notification.show({
                title: 'Error',
                message: 'File selected but not accessible',
                buttons: Ext.MessageBox.OK,
                callback: function() {
                    me.changeState('browse');
                }
            });
        }
    },
    
    // @private
    changeState: function(state) {
        var me = this;
        var states = me.getStates();
        
        if (Ext.isDefined(states[state])) {
            
            // Common tasks for all states
            if (states[state].text) {
                me.setText(states[state].text);
            } else {
                me.setText('');
            }
            
            if (states[state].cls) {
                me.setCls(states[state].cls);
            } else {
                me.setCls('');
            }
            
            if (states[state].ui) {
                me.setUi(states[state].ui);
            } else {
                me.setUi('normal');
            }
            
            if (states[state].loading) {
                me.loadingElement.show();
            } else {
                me.loadingElement.hide();
            }
            
            // State specific tasks
            switch (state) {
                case 'browse':
                    console.log('state browse');
                    me.currentState = 'browse';
                    me.reset();                    
                    break;
				
				case 'load':
                    console.log('state load');
					me.currentState = 'load';
					me.onButtonTap();
					break;
                    
                case 'ready':
                    console.log('state ready');
                    me.currentState = 'ready';
                    me.fileElement.hide();
                    
                    if (me.getAutoUpload()) {
                        me.onButtonTap();
                    }

                    break;
                    
                case 'uploading':
                    console.log('state uploading');
                    me.currentState = 'uploading';
                    break;
            }
        } else {
            // <debug>
            Ext.Logger.warn('Config for FileUp state "'+ state +'" not found!');
            // </debug>
        }
    },

    // src: http://stackoverflow.com/questions/15328191/shrink-image-before-uploading-with-javascript
    // src: http://stackoverflow.com/questions/961913/image-resize-before-upload
    // src: https://github.com/qarnac/CyberScavenger/blob/master/js/geocompress.js //modified

    compressFile: function (file) {
        console.log('in compress');
        var me = this;
        var image = new Image();
        var x;
        var ready = false;

        var reader = new FileReader();

        reader.onload = function(e) {
            console.log('in reader on load compress()');
            image.src = e.target.result;

            image.onload = function() {
                console.log("at image onload");

                var maxWidth = 450,
                    maxHeight = 280,
                    imageWidth = image.width,
                    imageHeight = image.height;

                if (imageWidth > imageHeight) {
                    if (imageWidth > maxWidth) {
                        imageHeight *= maxWidth / imageWidth;
                        imageWidth = maxWidth;
                    }
                }
                else {
                    if (imageHeight > maxHeight) {
                        imageWidth *= maxHeight / imageHeight;
                        imageHeight = maxHeight;
                    }
                }

                var canvas = document.createElement('canvas');
                canvas.width = imageWidth;
                canvas.height = imageHeight;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

                // The resize file ready for upload
                var blob = canvas.toDataURL(file.type, 0.8);
                blob = me.dataURItoBlob(blob);

                me.blogImage = blob;

                myApp.app.apiToken.dataBlob = blob;

                console.log(myApp.app.apiToken.dataBlob);

                //me.extractGPS(file);
            }
        }

        reader.readAsDataURL(file);

    },

    // src: https://github.com/qarnac/CyberHawk-Adventure/blob/master/quest/js/geocompress.js modified
    extractGPS: function (file){
        var loc = new Object();

        var reader = new FileReader();

        reader.onload = function(e) {
            console.log('gps on load')

            //console.log(e.target.result);
            var jpeg = new JpegMeta.JpegFile(e.target.result, file.name);


            if (jpeg.gps && jpeg.gps.longitude) {
                console.log(jpeg.gps.latitude.value);
                console.log(jpeg.gps.longitude.value);
            }
            else {
                //alert("The image you've selected is not geo tagged.\nPlease click on the location where you have taken the picture.\nOnce you have selected the right spot, please click 'Submit'");
                //instantiateGoogleMap();
                var geocoder = new google.maps.Geocoder();
                if(google.loader.ClientLocation) {
                    loc.lat = google.loader.ClientLocation.latitude;
                    loc.lng = google.loader.ClientLocation.longitude;

                    var latlng = new google.maps.LatLng(loc.lat, loc.lng);
                    geocoder.geocode({'latLng': latlng}, function(results, status) {
                        if(status == google.maps.GeocoderStatus.OK) {
                            console.log(loc.lat);
                            console.log(loc.lng);
                            console.log(results[0]['formatted_address']);
                            //alert(results[0]['formatted_address']);
                        };
                    });
                }

            }

        };

        reader.readAsBinaryString(file);

        console.log('return gps location');
        return loc;
    },

     /**
     * @private
     * @method doLoad
     * Read selected file as dataUrl value.
     * If you wish to get dataUrl content 
     * then you should listen for "loadsuccess" event
     * @param {Object} file Link to loaded file element
     */
    doLoad: function(file) {
        console.log(file);
        var me = this;
        var reader = new FileReader();

        reader.onerror = function(e) {
            var message;
            switch (e.target.error.code) {
                case e.target.error.NOT_FOUND_ERR:
                    message = 'File Not Found';
                    break;

                case e.target.error.NOT_READABLE_ERR:
                    message = 'File is not readable';
                    break;

                case e.target.error.ABORT_ERR:
                    break;

                default:
                    message = 'Can not read file';
            };

            me.fireEvent('loadfailure', message, this, e);
        };

        reader.onload = function(e) {
            console.log("reader on load for doLoad");
            var dataURL = reader.result;
            me.fireEvent('loadsuccess', this.result, this, e);
            //me.changeState('ready');
        };

        console.log("read image file");
        // Read image file
        reader.readAsDataURL(file);
    },


    // src: https://gist.github.com/kosso/4246840
    dataURItoBlob: function(dataURI) {

        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    },
    
    /**
     * @private
     * @method doUpload
     * Upload selected file using XMLHttpRequest.
     * @param {Object} file Link to loaded file element
     */
    doUpload: function(file) {
        var me = this;
        var http = new XMLHttpRequest();

        console.log("in doUpload");
        //console.log(file.name);

        if (http.upload && http.upload.addEventListener) {

            // Uploading progress handler
            http.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                   // var percentComplete = (e.loaded / e.total) * 100;
                   // me.setBadgeText(percentComplete.toFixed(0) + '%');
                }
            };

            // Response handler
            http.onreadystatechange = function (e) {
                if (this.readyState === 4) {

                    if(Ext.Array.indexOf(me.getDefaultSuccessCodes(), parseInt(this.status)) !== -1 ) {

                        var response = me.decodeResponse(this);


                        if (response && response.success) {
                            // Success
                            me.fireEvent('success', response, this, e, file);
                        } else if (response && response.message) {
                            // Failure
                            me.fireEvent('failure', response.message, response, this, e);
                        } else {
                            // Failure
                            me.fireEvent('failure', 'Unknown error', response, this, e);
                        }

                    } else {

                        // Failure
                        me.fireEvent('failure', this.status + ' ' + this.statusText, response, this, e);
                    }

                    me.changeState('ready');
                }
            };

            // Error handler
            http.upload.onerror = function(e) {
                me.fireEvent('failure', this.status + ' ' + this.statusText, {}, this, e);
            };
        }

        // Send form with file using XMLHttpRequest POST request
        http.open('POST', me.getUrl());

        console.log('me.getUrl');
        console.log(me.getUrl());

        if (me.getSignRequestEnabled())
        {
            // Sign the request and then send.
            me.signRequest(http, function(http)
            {
                // Send the form.
                http.send(me.getForm(file));

            });

        }
        else
        {
            http.send(me.getForm(file));
            console.log('in sending ')
        }
        
    },
    
    /**
     * @method getForm
     * Returns the form to send to the browser.
     *
     * @param {Object} file Link to loaded file element
     */
    getForm: function(file) {
        // Create FormData object
        var form = new FormData();
        console.log(myApp.app.apiToken);

        form.append("username", "Groucho");
        form.append("accountnum", 123456); // number 123456 is immediately converted to string "123456"

        // Add selected file to form
        form.append(this.getName(), file);

        console.log(myApp.app.apiToken.qMultiple);
        console.log(myApp.app.apiToken);

        var result = {
                'huntID' : myApp.app.apiToken.huntName,
                "partners" : myApp.app.apiToken.partners,
                "url" : myApp.app.apiToken.url,
                'lat' : myApp.app.apiToken.gpsLat,
                'lng' : myApp.app.apiToken.gpsLng,
                "answerQuestion1"  : myApp.app.apiToken.answerQuestion1,
                "answerQuestion2" : myApp.app.apiToken.answerQuestion2,
                "answerQuestion3" : myApp.app.apiToken.answerQuestion3,
                "multipleQ" : myApp.app.apiToken.qMultiple,
                "multipleChoiceAnswerA" : myApp.app.apiToken.answerA,
                "multipleChoiceAnswerB" : myApp.app.apiToken.answerB,
                "multipleChoiceAnswerC"  : myApp.app.apiToken.answerC,
                "multipleChoiceAnswerD" : myApp.app.apiToken.answerD,
                "multipleChoiceAnswerE" : myApp.app.apiToken.answerE,
                "multipleChoiceCorrectAnswer" : myApp.app.apiToken.correctAnswer

        }; // End Employees

        result = JSON.stringify(result);

        form.append("info", result);

        // Return the form.
        return form;
    },

    /**
     * @method reset
     * Component reset
     */
    reset: function() {
        var me = this;
        
        me.setBadgeText(null);
        me.formElement.dom.reset();
        me.fileElement.show();
    },
    
    /**
     * @private
     * @method decodeResponse
     * Decodes a server response.
     *
     * @param {Object} response The response from the server to decode
     * @return {Object} The response to provide to the library
     */
    decodeResponse: function(response) {
        return Ext.decode(response.responseText, true);
    },
    
    /**
     * @private
     * @method signRequest
     * Sign the request before sending it.
     *
     * @param {Object} http The XHR request object.
     * @param {Function} callback Called when the request has been signed.
     */
    signRequest: function(http, callback) {
        var me = this;
        var header = me.getSignHeader(); 
        
        if (!header) {
            me.fireEvent('failure', 'Request signing header is not defined');
        }
        
        me.signProvider( 
            function(token) {
                http.setRequestHeader(header, token);
                callback(http);
            },
            function(failureText) {
                me.fireEvent('failure', 'Request signing is failed! ' + 
                                        failureText, {}, this);
            });
    },
    
    /**
     * @private
     * @method signProvider
     * Default token provider (should be redefined)
     *
     * @param {Function} success Signing success callback
     * @param {Function} failure Signing failure callback
     */
    signProvider: function(success, failure) {
        success('default-token');// Default behaviour
    }
});
