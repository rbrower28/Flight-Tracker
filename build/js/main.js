"use strict";var r=(a,l,e)=>new Promise((o,t)=>{var i=d=>{try{s(e.next(d))}catch(m){t(m)}},n=d=>{try{s(e.throw(d))}catch(m){t(m)}},s=d=>d.done?o(d.value):Promise.resolve(d.value).then(i,n);s((e=e.apply(a,l)).next())});import{MapRenderer as u,BulkJet as f,Jet as c}from"./mapData.js";import{getFlightDataByModeSCode as h,getRandomListOfFlights as S}from"./externalServices.js";let g=new u("map",-114.742,44.0682,5);function p(){let a=[];localStorage.getItem("flightsList")!==null&&(a=JSON.parse(localStorage.getItem("flightsList")),a.forEach(l=>r(this,null,function*(){let e=yield h(l),o=new c(e,!1);g.addJet(o);let t=document.createElement("li");t.appendChild(document.createTextNode("Callsign: "+o.callsign+" Mode S Code: "+o.modeSCode)),document.querySelector("#user-flights-list").appendChild(t)})))}document.getElementById("searchForm").addEventListener("submit",a=>r(this,null,function*(){a.preventDefault();let l=[];localStorage.getItem("flightsList")!==null&&(l=JSON.parse(localStorage.getItem("flightsList")));let e=document.getElementById("modeSCode").value,o=yield h(e),t=new c(o,!1);g.addJet(t);let i=document.createElement("li");i.appendChild(document.createTextNode("Callsign: "+t.callsign+" Mode S Code: "+t.modeSCode)),document.querySelector("#user-flights-list").appendChild(i),l.push(e),localStorage.setItem("flightsList",JSON.stringify(l))})),p(),window.addEventListener("load",function(){return r(this,null,function*(){const a=document.querySelector("#loader");let l=[];localStorage.getItem("randomFlights")!==null&&this.localStorage.removeItem("randomFlights"),a.style.display="block";let e=yield S();a.style.display="none";let o=e.states.length;for(let t=0;t<15;t++){let i=Math.floor(Math.random()*o),n=new f(e.states[i],!0);g.addJet(n);let s=document.createElement("li");s.appendChild(document.createTextNode("Callsign: "+n.callsign+" Mode S Code: "+n.modeSCode)),document.querySelector("#random-flights-list").appendChild(s),l.push(n.modeSCode)}localStorage.setItem("randomFlights",JSON.stringify(l))})});
