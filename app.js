const boton_on = document.getElementById("boton_on");
const boton_off = document.getElementById("boton_off");
const texto = document.getElementById("texto");

//document.getElementById.getElementById('boton_on').addEventListener('click', botonOnPres);
//texto.innerHTML = "nuevo valor";
//document.getElementById('myDiv').style.color = '#FF0000';

function messageReceived(topic, message) {
    console.log('The topic is ' + topic + ' and msg is ' + message.toString())
    texto.innerHTML = message.toString();
}

function connected() {
    console.log('Connect success')
    client.subscribe('testtopic2', function(err) {
        if (!err) {
            console.log('SUBSCRIBE - SUCCESS');
        } else {
            console.log('SUBSCRIBE - ERROR');
        }

    })
    client.publish('testtopic', 'hola_', optionsPublish)
    console.log('mensaje enviado');
}

const options = {
    connectTimeout: 5000,
    clientId: 'emqx',
    username: 'ariel',
    //password: 12345,
    keepaLive: 60,
    clean: true
}

const optionsPublish = {
    'qos': 0,
    retain: false
}
const WebSocket_URL = 'wss.iotmaster.tech:8084/mqtt'
const client = mqtt.connect(WebSocket_URL, options)

client.on('connect', connected);


client.on('recconect', (error) => {
    console.log('Reconnecting Error:', error);
})
client.on('error', (error) => {
    console.log('Connect Error:', error);
})

client.on('message', messageReceived);

boton_on.addEventListener('click', botonOnPres);
boton_off.addEventListener('click', botonOffPres);

function botonOnPres(evento) {
    client.publish('testtopic', 'on', optionsPublish);
}

function botonOffPres(evento) {
    client.publish('testtopic', 'off', optionsPublish);
}

// modificar atributos
//boton_on.getAttribute('href');