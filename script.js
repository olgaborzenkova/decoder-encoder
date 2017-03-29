var Core =  Core || {};
Core.Abstract = Core.Abstract || {};
Core.Instances = Core.Instances || {};
   
Core.Abstract.Device = function(name, serialNumber, location) {
    this.name = name;
    this.serialNumber = serialNumber;
    this.location = location;      
}


Core.Abstract.Device.prototype = {
    getName: function getName() {
        return this.name;
    },
    
    setName: function setName(name) {
        this.name = name;
    },
    
    getSerialNumber: function getSerialNumber() {
        return this.serialNumber;
    },
    
    setSerialNumber: function setSerialNumber(serialNumber) {
        this.serialNumber = serialNumber;
    },
    
    getLocation: function getLocation() {
        return this.location;
    },
    
    setLocation: function setLocation(location) {
        this.location = location;
    }
}

Core.Instances.Encoder = function(name, serialNumber, location) {
    Core.Abstract.Device.call(this, name, serialNumber, location);    
    this.deviceType = "Encoder";
}

Core.Instances.Decoder = function(name, serialNumber, location) {
    Core.Abstract.Device.call(this, name, serialNumber, location);
    this.deviceType = "Decoder";
}

Core.Instances.Encoder.prototype = new Core.Abstract.Device;
Core.Instances.Decoder.prototype = new Core.Abstract.Device;

function info() {
    var device = this.parentElement.deviceInfo;
    var output = '';
    
    for (var property in device) {
        if(typeof device[property] == 'string' || typeof device[property] == 'number'){
            output += property + ': ' + device[property]+'; ' + "\n";
        }
    }
    
    alert(output);
}

function addElement(tag_type, target, parameters, text) {
    var newElement = document.createElement(tag_type);

    if (typeof parameters != 'undefined') {
        for (parameter_name in parameters) {
            newElement.setAttribute(parameter_name, parameters[parameter_name]);
        }
    }
    
    if (typeof text != 'undefined') {
        newElement.innerHTML=text;
    }

    document.getElementById(target).appendChild(newElement);
}

function createForm() {
    
    addElement('form', 'setDeviceWrapper', {
        id:'setDeviceForm',
        name:'setDeviceForm',
        metod:'post'
    });
    
    addElement('label', 'setDeviceForm', '', 'Add Your Device Using Form Below:');
    
    addElement('input', 'setDeviceForm', {
        id:'deviceName',
        name:'deviceName',
        type:'text',
        size:'20',
        placeholder: 'Type Device Name Here'
    });
    
    addElement('input', 'setDeviceForm', {
        id:'deviceSerialNumber',
        name:'deviceSerialNumber',
        type:'text',
        size:'13',
        placeholder: 'Serial Number'
    });
    
    addElement('input', 'setDeviceForm', {
        id:'deviceLocation',
        name:'deviceLocation',
        type:'text',
        size:'13',
        placeholder: 'Location'
    });
    
    addElement('select', 'setDeviceForm', {
        id:'deviceType',
        name:'deviceType'
    });
    
    addElement('option', 'deviceType', {
        value: 'Encoder'
    }, 'Encoder');
    
    addElement('option', 'deviceType', {
        value: 'Decoder'
    }, 'Decoder');
    
    addElement('input', 'setDeviceForm', {
        id: 'submitDevice',
        type: 'button',
        value: 'Submit Device'
    });
    
}

function addDevice() {
    
    var deviceName = document.getElementById("deviceName");
    var deviceSerialNumber = document.getElementById("deviceSerialNumber");
    var deviceLocation = document.getElementById("deviceLocation");
    var deviceType = document.getElementById("deviceType");
    
    var deviceNameValue = deviceName.value;
    var deviceSerialNumberValue = deviceSerialNumber.value;
    var deviceLocationValue = deviceLocation.value;
    var deviceTypeValue = deviceType.value;    
    
    var device = new Core.Instances[deviceTypeValue](deviceNameValue, deviceSerialNumberValue, deviceLocationValue);
        
    var deviceShort = 'Name: <strong>' + deviceNameValue + '</strong>, Type: <strong>' + deviceTypeValue + '</strong>';
    var ul = document.getElementById("deviceList");

    var li = document.createElement('li');
    li.deviceInfo = device;
    var infoButton = document.createElement('input');
    infoButton.setAttribute('type', 'button');
    infoButton.setAttribute('id', 'deviceInfo');
    infoButton.setAttribute('class', 'device-info');
    infoButton.setAttribute('value', 'Info');
    
    if(deviceNameValue != "") {
        li.innerHTML = deviceShort;
        li.appendChild(infoButton);
        ul.appendChild(li);
        deviceName.setAttribute('style', 'border: solid 1px #ccc');
        deviceName.value = "";
        deviceSerialNumber.setAttribute('style', 'border: solid 1px #ccc');
        deviceSerialNumber.value = "";
        deviceLocation.setAttribute('style', 'border: solid 1px #ccc');
        deviceLocation.value = "";
    } else {
        deviceName.setAttribute('style', 'border: solid 1px red');
        deviceSerialNumber.setAttribute('style', 'border: solid 1px red');
        deviceLocation.setAttribute('style', 'border: solid 1px red');
    }
    
    attach(infoButton, 'click', info);
}

function attach(obj, event, fn) {
    if(typeof window.addEventListener === 'function') {
        attach = function(obj, event, fn) {
            obj.addEventListener(event, fn, false);
        }
    } else if(typeof document.attachEvent === 'function') {
        attach = function(obj, event, fn) {
            obj.attachEvent('on' + event, fn);
        }
    } else {
        attach = function(obj, event, fn) {
            obj['on' + event] = fn;
        }     
    }
    attach(obj, event, fn);
}

window.onload=function() {
    
    createForm();
    
    attach(document.getElementById('submitDevice'), 'click', addDevice);
    
}