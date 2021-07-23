var ms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
class Jour {
    static separator = '%';
    constructor(num) {
        this.numero = num;
        this.events = ""
        this.taches = ""
    }

    addEvent(event) {
        if (this.events != "") this.events += Jour.separator + event;
        else this.events = event;
    }

    addTache(t) {
        if (this.taches != "") this.taches += Jour.separator + t;
        else this.taches = t;
    }
}

class Mois {
    constructor(nom, nbJours) {
        this.nom = nom;
        this.nbJours = nbJours;
        this.days = [];
        for (let i = 0; i < this.nbJours; i++) {
            this.days.push(new Jour(i + 1));
        }
    }
}

class Annee {
    constructor(annee) {
        this.month = [];
        this.annee = annee;
        this.month.push(new Mois(ms[0], 31));
        this.month.push(new Mois(ms[1], (this.isBissextile() ? 29 : 28)));
        this.month.push(new Mois(ms[2], 31));
        this.month.push(new Mois(ms[3], 30));
        this.month.push(new Mois(ms[4], 31));
        this.month.push(new Mois(ms[5], 30));
        this.month.push(new Mois(ms[6], 31));
        this.month.push(new Mois(ms[7], 31));
        this.month.push(new Mois(ms[8], 30));
        this.month.push(new Mois(ms[9], 31));
        this.month.push(new Mois(ms[10], 30));
        this.month.push(new Mois(ms[11], 31));
    }

    isBissextile() {
        return (this.annee % 400 == 0) || (this.annee % 4 == 0 && this.annee % 100 != 0) ? true : false;
    }

    nbJours() {
        let res = 0;
        let cpt = 0;
        while (cpt < this.month.length) {
            res += this.month[cpt].nbJours;
            cpt++;
        }
        return "Il y a " + res + " jours en " + this.annee;
    }

    afficheMois(mois) {
        for (let i in this.month) {
            if (mois == this.month[i]["nom"]) {
                document.writeln("<div class='corps'>");
                document.writeln("<div class='plan'>");
                document.writeln("<table>");
                document.writeln("<caption>" + mois + " " + this.annee + "</caption>");
                let cpt = 0;
                for (let j in this.month[i]["days"]) {
                    if (cpt == 0) {
                        document.writeln("<tr>");
                    } else if (cpt % 7 == 0) {
                        document.writeln("</tr>");
                        cpt = 0;
                    }
                    let elt = this.month[i]["days"][j];
                    cpt++;
                    if (elt.events.length + elt.taches.length > 0) {
                        let clr =(elt.taches.length > 0)?"red":"lightblue"; 
                        document.writeln("<td style='background-color:"+clr+"'\
                        class='jour evt' id='day_"+this.annee+"_"+mois+"_"+elt.numero+"' \
                        onclick='reveal(\"" + elt.events + "\",\"" + elt.taches + "\",\"" + elt.numero + "\",\"" + this.annee + "\",\"" + mois + "\")'> \
                        <span class='num'><div>" + Annee.getJour(this.annee, mois, elt.numero) + "</div><div>" + elt.numero + "</div></span> \
                        </td>");
                    }
                        else
                        document.writeln("<td  \
                    class='jour normal'> \
                    <span class='num'>" + Annee.getJour(this.annee, mois, elt.numero) + "</span> \
                    <span class='num'>" + elt.numero + "</span> \
                    </td>");
                }
                document.writeln("</table>");
                document.writeln("</div>");
                document.writeln("<div class='events' id='events_" + this.annee + "_" + mois + "'></div>");
                document.writeln("</div>");
            }
        }

    }

    afficheAnnee() {
        for (let m in this.month) {
            this.afficheMois(this.month[m]["nom"]);
        }
    }

    addEvent(jour, mois, events) {
        for (let i in this.month) {
            if (mois == this.month[i]["nom"]) {
                this.month[i]["days"][jour - 1].addEvent(events);
            }
        }
    }

    addTache(jour, mois, tache) {
        for (let i in this.month) {
            if (mois == this.month[i]["nom"]) {
                this.month[i]["days"][jour - 1].addTache(tache);
            }
        }
    }

    static getFormat(format) {
        // format = "jjmm"
        var jfm = format;
        let jr = jfm[0] + '' + jfm[1];
        let ms = jfm[2] + '' + jfm[3];
        return [jr, ms];
    }

    static getDiff(date1, date2) {
        let d1 = date1;
        let d2 = date2;
        let res = [];
        if (d1[1] == d2[1]) {
            // meme mois
            for (let i = d1[0] - '0'; i <= d2[0]; i++) {
                res.push([i, ms[(d1[1] - 1) - '0']]);
            }
            return res;
        } else {
            let tmp = new Annee(d1[2]);
            let i1 = d1[1] - 1;
            let i2 = d2[1] - 1;
            let m1 = tmp.month[i1];
            let diff = i2 - i1;
            if (diff > 1) {
                for (let i = i1 + 2; i <= i2; i++) {
                    let mthBtwn = Annee.getDiff([1, i], [tmp.month[i - 1].nbJours, i]);
                    for (let i in mthBtwn) {
                        res.push(mthBtwn[i]);
                    }
                }
            }
            let minit = Annee.getDiff([d1[0], d1[1]], [m1.nbJours, d1[1]]);
            for (let i in minit) {
                res.push(minit[i]);
            }


            let mfinal = Annee.getDiff([1, d2[1]], [d2[0], d2[1]]);
            for (let j in mfinal) {
                res.push(mfinal[j]);
            }
            return res;
        }
    }

    addJourney(format1, format2, evnt) {
        // format = "jjmm"
        let f1 = Annee.getFormat(format1);
        let f2 = Annee.getFormat(format2);
        let res = Annee.getDiff(f1, f2);
        for (let i in res) {
            this.addEvent(res[i][0], res[i][1], evnt);
        }
    }

    affiche(mois1, mois2) {
        let i1 = ms.indexOf(mois1);
        let i2 = ms.indexOf(mois2) + 1;
        for (let i = i1; i < i2; i++) {
            this.afficheMois(ms[i]);
        }
    }

    static getJour(annee, mois, jour) {
        mois = ms.indexOf(mois);
        var d = new Date(annee, mois, jour);
        let n = d.getDay();
        let tab = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        return tab[n];
    }
}

function reveal(evt, task, nm, an, ms) {
    let infosE = evt.split(Jour.separator);
    let infosT = task.split(Jour.separator);
    if (evt.length+task.length > 0) {
        let j = document.getElementById("events_" + an + "_" + ms);
        while (j.firstChild) j.removeChild(j.lastChild);
        let ev = document.createElement("span");
        let dte = Annee.getJour(an, ms, nm);
        ev.textContent = "Evénements du " + dte + " " + nm + " " + ms + " :";
        j.appendChild(ev);
        if (infosE != "") {
            for (let i in infosE) {
                let sp = document.createElement("span");
                sp.classList.add("event");
                sp.textContent = infosE[i];
                j.appendChild(sp);
            }
        }
        if (infosT != "") {
            for (let i in infosT) {
                let sp = document.createElement("span");
                sp.classList.add("task");
                sp.textContent = infosT[i];
                j.appendChild(sp);
            }
        }

    }
}