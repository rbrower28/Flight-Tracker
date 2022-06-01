"use strict";
var g = (c, r, d) =>
  new Promise((a, n) => {
    var e = (l) => {
        try {
          t(d.next(l));
        } catch (i) {
          n(i);
        }
      },
      o = (l) => {
        try {
          t(d.throw(l));
        } catch (i) {
          n(i);
        }
      },
      t = (l) => (l.done ? a(l.value) : Promise.resolve(l.value).then(e, o));
    t((d = d.apply(c, r)).next());
  });
import { MapRenderer as S, BulkJet as y, Jet as f } from "./mapData.js";
import {
  getFlightDataByModeSCode as C,
  getRandomListOfFlights as E,
} from "./externalServices.js";
let h = new S("map", -114.742, 44.0682, 5);
function x() {
  let c = [];
  function r(d) {
    let a = d.target.parentElement,
      n = a.children[2].children[0].textContent,
      e = JSON.parse(localStorage.getItem("flightsList"));
    e.splice(c.indexOf(n), 1),
      localStorage.setItem("flightsList", JSON.stringify(e)),
      a.remove();
  }
  localStorage.getItem("flightsList") !== null &&
    ((c = JSON.parse(localStorage.getItem("flightsList"))),
    c.forEach((d) =>
      g(this, null, function* () {
        let a = yield C(d),
          n = new f(a, !1);
        h.addJet(n);
        let e = document.createElement("li"),
          o = document.createElement("h4");
        o.textContent = n.country;
        let t = document.createElement("p");
        t.textContent = "Callsign: " + n.callsign;
        let l = document.createElement("p"),
          i = document.createElement("span");
        (i.textContent = n.modeSCode),
          (l.textContent = "Mode S Code: "),
          l.appendChild(i);
        let m = document.createElement("button");
        (m.textContent = "Remove"),
          m.addEventListener("click", r),
          n.country && e.appendChild(o),
          n.callsign && e.appendChild(t),
          n.modeSCode && e.appendChild(l),
          n.modeSCode && e.appendChild(m),
          document.querySelector("#user-flights-list").appendChild(e);
      })
    ));
}
document.getElementById("searchForm").addEventListener("submit", (c) =>
  g(this, null, function* () {
    c.preventDefault();
    let r = [];
    function d(n) {
      let e = n.target.parentElement,
        o = e.children[2].children[0].textContent,
        t = JSON.parse(localStorage.getItem("flightsList"));
      t.splice(r.indexOf(o), 1),
        localStorage.setItem("flightsList", JSON.stringify(t)),
        e.remove();
    }
    localStorage.getItem("flightsList") !== null &&
      (r = JSON.parse(localStorage.getItem("flightsList")));
    let a = document.getElementById("modeSCode").value;
    if (a === "") alert("You can't track a flight without a number!");
    else if (r.includes(a)) alert("This flight is already being tracked!");
    else {
      let n = yield C(a),
        e = new f(n, !1);
      h.addJet(e);
      let o = document.createElement("li"),
        t = document.createElement("h4");
      t.textContent = e.country;
      let l = document.createElement("p");
      l.textContent = "Callsign: " + e.callsign;
      let i = document.createElement("p"),
        m = document.createElement("span");
      (m.textContent = e.modeSCode),
        (i.textContent = "Mode S Code: "),
        i.appendChild(m);
      let s = document.createElement("button");
      (s.textContent = "Remove"),
        s.addEventListener("click", d),
        e.country && o.appendChild(t),
        e.callsign && o.appendChild(l),
        e.modeSCode && o.appendChild(i),
        e.modeSCode && o.appendChild(s),
        document.querySelector("#user-flights-list").appendChild(o),
        r.push(a),
        localStorage.setItem("flightsList", JSON.stringify(r));
    }
  })
),
  x(),
  window.addEventListener("load", function () {
    return g(this, null, function* () {
      const c = document.querySelector("#loader");
      let r = [];
      localStorage.getItem("randomFlights") !== null &&
        this.localStorage.removeItem("randomFlights"),
        (c.style.display = "block");
      let d = yield E();
      c.style.display = "none";
      let a = d.states.length;
      function n(e) {
        let t = e.target.parentElement.children[2].children[0].textContent;
        navigator.clipboard
          .writeText(t)
          .then(() => {
            alert("Successfully Copied.");
          })
          .catch((l) => {
            alert("error: try again.");
          });
      }
      for (let e = 0; e < 15; e++) {
        let o = Math.floor(Math.random() * a),
          t = new y(d.states[o], !0);
        h.addJet(t);
        let l = document.createElement("li"),
          i = document.createElement("h4");
        i.textContent = t.country;
        let m = document.createElement("p");
        m.textContent = "Callsign: " + t.callsign;
        let s = document.createElement("p"),
          u = document.createElement("span");
        (u.textContent = t.modeSCode),
          (s.textContent = "Mode S Code: "),
          s.appendChild(u);
        let p = document.createElement("button");
        (p.textContent = "Copy to clipboard"),
          p.addEventListener("click", n),
          t.country && l.appendChild(i),
          t.callsign && l.appendChild(m),
          t.modeSCode && l.appendChild(s),
          t.modeSCode && l.appendChild(p),
          document.querySelector("#random-flights-list").appendChild(l),
          r.push(t.modeSCode);
      }
      localStorage.setItem("randomFlights", JSON.stringify(r));
    });
  });