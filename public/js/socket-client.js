
//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socketClient = io();

socketClient.on('connect', () => {
    console.log('Conectado');

    lblOnline.style.display = '';
    lblOffline.style.display = 'none';
});

socketClient.on('disconnect', ()=>{
    console.log('Desconectado del servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socketClient.on('enviar-mensaje', (payload) => {
    console.log(payload)
});

btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socketClient.emit('enviar-mensaje', payload, ( id )=> {
        console.log('Desde el servidor', id);
    });
});