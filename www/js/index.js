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
		// function, we must explicitly call 'app.receivedEvent(...);'
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

				var paramsObj = {request:true};
				// alert("Initialize : " + JSON.stringify(paramsObj));
				bluetoothle.initialize(initializeSuccess, initializeError, paramsObj);

				var paramsObj = {serviceUuids:[]};
				// alert("Start Scan : " + JSON.stringify(paramsObj));
				// bluetoothle.startScan(startScanSuccess, startScanError, null);

				alert("about to connect!");
				bluetoothle.connect(connectSuccess, connectError, {address: "3D51BC44-0ABE-CE75-9035-8D47AFCA1CED"})
				// bluetoothle.read(readSuccess, readError, {address: "3D51BC44-0ABE-CE75-9035-8D47AFCA1CED", serviceUuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961', characteristicUuids: '08590F7E-DB05-467E-8757-72F6FAEB13D4'})

		}
};

function initializeSuccess(obj)
{
	console.log("Initialize Success : " + JSON.stringify(obj));

	if (obj.status == "enabled")
	{
		console.log("Enabled");
	}
	else
	{
		console.log("Unexpected Initialize Status");
	}
}

function initializeError(obj)
{
	console.log("Initialize Error : " + JSON.stringify(obj));
}

function startScanSuccess(obj)
{
	console.log("Start Scan Success : " + JSON.stringify(obj));

	if (obj.status == "scanResult")
	{
		console.log("Scan Result");
		console.log("address: " + obj.address + "; name: " + obj.name);
	}
	else if (obj.status == "scanStarted")
	{
		console.log("Scan Started");
	}
	else
	{
		console.log("Unexpected Start Scan Status");
	}
}

function startScanError(obj)
{
	console.log("Start Scan Error : " + JSON.stringify(obj));
}

function connectSuccess(obj)
{
	// alert("Connected" + JSON.stringify(obj));
	if (obj.status == 'connected') {
		var servicesObj = {address: "3D51BC44-0ABE-CE75-9035-8D47AFCA1CED"};
		bluetoothle.services(function(obj) {
			// alert("services success!" + JSON.stringify(obj));

			var charObj = {address: "3D51BC44-0ABE-CE75-9035-8D47AFCA1CED", serviceUuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'};
			bluetoothle.characteristics(function(obj) {
					// alert("characteristics success!" + JSON.stringify(obj));
					var paramsObj = {address: "3D51BC44-0ABE-CE75-9035-8D47AFCA1CED", serviceUuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961', characteristicUuid: '08590F7E-DB05-467E-8757-72F6FAEB13D4'};
					bluetoothle.read(function(obj) { alert("read success!" + JSON.stringify(obj));}, function(obj) { alert("read error!" + JSON.stringify(obj));}, paramsObj);
				}, function(obj) {
					alert("characteristics error!" + JSON.stringify(obj));
				}, charObj);
		}, function(obj) {
			alert("services error!" + JSON.stringify(obj));
		}, servicesObj);
	}
}

function connectError(obj)
{
	alert("Error connecting" + JSON.stringify(obj));
}

app.initialize();
