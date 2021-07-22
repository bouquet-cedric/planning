var ms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
class Jour {
    static separator = '%';
    constructor(num) {
        this.numero = num;
        this.events = ""
    }

    addEvent(event) {
        if (this.events != "") this.events += Jour.separator + event;
        else this.events = event;
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
                    if (elt.events.length > 0)
                        document.writeln("<td \
                    class='jour evt' \
                    onclick='reveal(\"" + elt.events + "\",\"" + elt.numero + "\",\"" + this.annee + "\",\"" + mois + "\")'> \
                    <span class='num'><div>" + Annee.getJour(this.annee, mois, elt.numero) + "</div><div>" + elt.numero + "</div></span> \
                    </td>");
                    else
                        document.writeln("<td  \
                    class='jour'> \
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

function reveal(evt, nm, an, ms) {
    let infos = evt.split(Jour.separator);
    if (evt.length > 0) {
        let j = document.getElementById("events_" + an + "_" + ms);
        while (j.firstChild) j.removeChild(j.lastChild);
        let ev = document.createElement("span");
        let dte = Annee.getJour(an, ms, nm);
        ev.textContent = "Evénements du " + dte + " " + nm + " " + ms + " :";
        j.appendChild(ev);
        for (let i in infos) {
            let sp = document.createElement("span");
            sp.classList.add("event");
            sp.textContent = infos[i];
            j.appendChild(sp);
        }

    }
}