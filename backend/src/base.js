const http = require('http');
const servidor = http.createServer((req,res)=>
    {
if (req.url ==='/') {
    res.writeHead(200,{'content-type':'text/plain'});
    res.end ('pagina alcanzada');
}
    });

const PORT=3000;
servidor.listen(PORT,()=>
{
    console.log(`SERVIDOR EJECUTANDOSE EN ${PORT}`);
})
