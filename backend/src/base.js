const http = require('http');
const nombre= "LUCIANO EL MARCIANO";
const servidor = http.createServer((req,res)=>
    { //puedo usar SWITCH???  pasar variables???
if (req.url ==='/login') {
    res.writeHead(200,{'content-type':'text/html'});
    res.end ('pagina login alcanzada <B>HOLA</B>'); //quiero que la variable "nombre" pase ahi.
}
    });

const PORT=3000;
servidor.listen(PORT,()=>
{
    console.log(`SERVIDOR EJECUTANDOSE EN ${PORT}`);
})
