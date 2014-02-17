/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

							function getUOM(uom){
									if(uom == "HLT"){
											return "HL";
									}
									if(uom == "LTR"){
											return "L";
									}
									return "ML";
								}

								function getData(){
						
                  
                                OData.defaultHttpClient.enableJsonpCallback = false;
                                var myurl="http://hana.sat-infotech.com:8001/sap/opu/odata/sap/ZCUSTOMER_SERVICE/";
                                var storage = localStorage;
                                var strUsername=storage.getItem("username");
                                var strPassword=storage.getItem("password");
                                var sUrl = myurl+"CUSTOMERCollection";
                                var oHeaders = {};
                                oHeaders['Authorization'] = "Basic " + btoa(strUsername + ":" + strPassword);
                                oHeaders['X-Requested-With'] ="XMLHttpRequest";
                                oHeaders['Content-Type'] ="application/atom+xml";
										  oHeaders['X-CSRF-Token'] ="Fetch";
                                                                
                              
                                var request = {
                                        headers : oHeaders, // object that contains HTTP headers as name value pairs
                                        requestUri : sUrl, // OData endpoint URI
                                        method : "GET"
                                };
                                
                                OData.read(request,
                                function (data,response) {
                                			sessionStorage.setItem("CSRF", response.headers['x-csrf-token']);
                                			var j=0;
                                			//alert(JSON.stringify(data));
                                			$('#select-customer').empty();
													var result=null;                                			
                                			                                			
                                        for (var i=0;i<data.results.length;i++){
													                            	
                                        	if(data.results[i].TRANSPORTATIONZONE == $('input:text[name=route]').val()){
                                        	j++;
                                        	if(j==1){
                                        		result = data.results[i].CustomerNumber;
                                        	}                                         	
                                        	$('#select-customer').append($('<option>', {
    														value: data.results[i].CustomerNumber,
    														text: data.results[i].name,
   
														}));
														
													}
													}
													if(j==0){
														alert("No Customers in Transport Zone");													
													}										                      
     												$("#select-customer").val(result).selectmenu('refresh', true);
     												                  
                                  }
					
                               , function (err) {
                                        alert(JSON.stringify(err));

                                });
                        }
								function zeroPad(num, numZeros) {
									var n = Math.abs(num);
									var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
									var zeroString = Math.pow(10,zeros).toString().substr(1);
									if( num < 0 ) {
										zeroString = '-' + zeroString;
									}
									return zeroString+n;
								}

