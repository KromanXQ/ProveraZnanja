const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('query-string');
const PATH = "www/";
let artikli = [
    {
        "id": 1,
        "naziv": "Kaseta",
        "cena": 50,
        "kompanija": "VHS",
        "adresa": "Balkanska 10"
    },
    {
        "id": 2,
        "naziv": "Sok",
        "cena": 100,
        "kompanija": "Nectar",
        "adresa": "Ibarska Magistrala 23"
    },

];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-artikli"){ 
            fs.readFile(PATH + "svi-artikli.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/api/svi-artikli"){ 
            res.writeHead(200);
            data = JSON.stringify(sveOsobe());
            res.end(data);
        }
        
        if (urlObj.pathname == "/dodaj-artikal"){
            fs.readFile(PATH + "dodaj-artikal.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }
    else if(req.method == "POST") {
        
        if (urlObj.pathname == "/dodaj-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,
                           querystring.parse(body).datum,querystring.parse(body).kompanija, querystring.parse(body).email);
                res.writeHead(302, {
                    'Location': '/dodaj-artikal'
                });
                res.end();
            });
        }
    }
}).listen(5000);

function sviArtikli(){
    return artikli;
}

function dodajArtikal(id,naziv,datum,kompanija,email){
    let artikal = {
        'id': id,
        'naziv': naziv,
        'datum': datum,
        'kompanija': kompanija,
        'email': email
    };
    artikal.push(artikal);
}