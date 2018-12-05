'use strict';

function numeroBinarioAEntero(binario){
    var resulEntero= parseInt(binario, 2);
    return resulEntero;
    
}
function numeroEnteroABinario(valor){
    var resulBinario = [];
    var numentero = valor;
    while(numentero >= 1 ){
        resulBinario.unshift(Math.floor(numentero%2));
        numentero = numentero/2;
    }
    return resulBinario.join("");
}

function numeroDecimalABinario(valor){
    var resultBinario="";
    var numdecimal = valor;
    var contador = 23;
    while(numdecimal > 0 && contador>0){
        numdecimal = numdecimal * 2;
        resultBinario += Math.trunc(numdecimal).toString();
        numdecimal = (numdecimal>=1)?numdecimal - 1:numdecimal;
        contador--;
    }
    return resultBinario;
}

function completarCeros(valor, size, delante){
    var resulCompletar;
    if(delante){
        valor = "0000000000000000000000" + valor.toString();
        resulCompletar = valor.substring(valor.length-size,valor.length);
   }else{
        valor += "000000000000000000000000000000000000000000000000000000000000000000";
        resulCompletar = valor.substring(0,size);
   }
    return resulCompletar;
}

function ieee754aBinario(numero) {
  numero = numero.toString();
  var entero, decimal, mantisa, exponente;
  var pos1;
  var signo = 0; 
  if(numero.substring(0,1)==="-"){
      numero = numero.substring(1,numero.length);
      signo = 1;
  }
  var pos_punto= numero.indexOf(".");
  if(pos_punto === -1){ 
    entero = numeroEnteroABinario(numero);
    decimal= "";
    pos1 = entero.length - 1;
    mantisa = entero.substring(1,entero.length);
    exponente = completarCeros((entero.length>0)?numeroEnteroABinario(127 + pos1).toString():0,8,true);
  }else{
    entero = numeroEnteroABinario(numero.substring(0,pos_punto));
    decimal= numeroDecimalABinario("0." + numero.substring(pos_punto+1, numero.length));
    mantisa = entero + decimal;
    pos1 = entero.indexOf("1");
    if(pos1 === -1){
        pos1 = decimal.indexOf("1")+1;
        exponente = completarCeros(numeroEnteroABinario(127 - pos1),8,true);
        mantisa = mantisa.substring(pos1,mantisa.length);
    }else{
        pos1 = entero.length - 1;
        exponente = completarCeros(numeroEnteroABinario(127 + pos1),8,true);
        mantisa = mantisa.substring(1,mantisa.length);
    }
  }
  exponente = exponente.substring(exponente.length-12,8);
  return "" + signo + exponente + completarCeros(mantisa,23,false);
}
