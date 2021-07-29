/** @type {Array} */
var ms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

/** @type {number} */
var cpt_corps = 0;

/** @type {number} */
var actual = 0;

/**
 * Classe Jour
 */
class Jour {
    /** 
     * @static
     * @type {Character}
     */
    static separator = '%';

    /**
     * Constructeur de la classe
     * @param {number} num Numéro du mois
     */
    constructor(num) {
        /**
         * Instance property
         * @type {number}
         */
        this.numero = num;

        /**
         * Instance property
         * @type {string}
         */
        this.events = "";

        /**
         * Instance property
         * @type {string}
         */
        this.taches = "";
    }

    /**
     * Ajoute un événement sur un jour
     * @param {string} event Evénement
     */
    addEvent(event) {
        if (this.events != "") this.events += Jour.separator + event;
        else this.events = event;
    }

    /**
     * Ajoute une tâche sur un jour
     * @param {string} t Tâche à effectuer
     */
    addTache(t) {
        if (this.taches != "") this.taches += Jour.separator + t;
        else this.taches = t;
    }
}


/**
 * Classe Mois
 */
class Mois {
    /**
     * Constructeur de la classe
     * @param {string} nom Nom du mois
     * @param {number} nbJours Nombre de jours dans le mois
     */
    constructor(nom, nbJours) {
        /** 
         * Nom du mois  
         * @type {string}
         */
        this.nom = nom;

        /** 
         * Nombre de jours dans le mois
         * @type {number}
         */
        this.nbJours = nbJours;

        /**
         * Jours du mois
         * @type {Array}
         */
        this.days = [];

        for (let i = 0; i < this.nbJours; i++) {
            this.days.push(new Jour(i + 1));
        }
    }
}

/**
 * Classe Annee
 */
class Annee {
    /**
     * Constructeur de la classe
     * @param {number} annee Année sur laquelle effectuer un planning 
     */
    constructor(annee) {
        /**
         * Liste des mois de l'année
         * @type {Array}
         */
        this.month = [];

        /**
         * Année
         * @type {number}
         */
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

    /**
     * Détermine si l'année saisie est bissextile ou non
     * @returns {boolean} true si l'année est bissextile, false sinon
     */
    isBissextile() {
        return (this.annee % 400 == 0) || (this.annee % 4 == 0 && this.annee % 100 != 0) ? true : false;
    }

    /**
     * Retourne la somme des jours calculés par mois dans une année
     * @returns {number} Nombre de jours dans l'année'
     */
    nbJours() {
        let res = 0;
        let cpt = 0;
        while (cpt < this.month.length) {
            res += this.month[cpt].nbJours;
            cpt++;
        }
        return res;
    }

    /**
     * Affiche un mois
     * @param {string} mois Mois d'une année  
     */
    afficheMois(mois) {
        for (let i in this.month) {
            if (mois == this.month[i]["nom"]) {
                document.writeln("<div class='corps' id='corps_" + cpt_corps + "'>");
                cpt_corps++;
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
                        let clr = (elt.taches.length > 0) ? "red" : "lightblue";
                        document.writeln("<td style='background-color:" + clr + "'\
                        class='jour evt' id='day_" + this.annee + "_" + mois + "_" + elt.numero + "' \
                        onclick='reveal(\"" + elt.events + "\",\"" + elt.taches + "\",\"" + elt.numero + "\",\"" + this.annee + "\",\"" + mois + "\")'> \
                        <span class='num'><div>" + Annee.getJour(this.annee, mois, elt.numero) + "</div><div>" + elt.numero + "</div></span> \
                        </td>");
                    } else
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

    /**
     * Affiche l'année, c'est-à-dire tous les mois
     * @see Annee.afficheMois() 
     */
    afficheAnnee() {
        for (let m in this.month) {
            this.afficheMois(this.month[m]["nom"]);
        }
    }

    /**
     * Ajoute un événement sur un mois
     * @param {number} jour Numéro du jour 
     * @param {string} mois Nom du mois
     * @param {string} events Nom de l'événement
     * @see Jour.addEvent()
     */
    addEvent(jour, mois, events) {
        for (let i in this.month) {
            if (mois == this.month[i]["nom"]) {
                this.month[i]["days"][jour - 1].addEvent(events);
            }
        }
    }

    /**
     * Ajoute une tâche sur un mois
     * @param {number} jour Numéro du jour 
     * @param {string} mois Nom du mois
     * @param {string} events Nom de la tâche
     * @see Jour.addTache()
     */
    addTache(jour, mois, tache) {
        for (let i in this.month) {
            if (mois == this.month[i]["nom"]) {
                this.month[i]["days"][jour - 1].addTache(tache);
            }
        }
    }

    /**
     * Permet de récupérer le format d'une année donnée sous forme jjmm
     * @param {string} format Format jjmm 
     * @returns {Array} Tableau de jours [jj,mm]
     * @static
     */
    static getFormat(format) {
        var jfm = format;
        let jr = jfm[0] + '' + jfm[1];
        let ms = jfm[2] + '' + jfm[3];
        return [jr, ms];
    }

    /**
     * Récupère la liste de tous les jours compris entre deux dates
     * @param {Array} date1 Date initiale
     * @param {Array} date2 Date finale
     * @returns {Array} Liste des jours sous le format [jj,mm]
     * @static 
     */
    static getDiff(date1, date2) {
        let d1 = date1;
        let d2 = date2;
        let res = [];
        if (d1[1] == d2[1]) {
            var debut = d1[0] - '0';
            for (let i = debut; i <= d2[0]; i++) {
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

    /**
     * Ajoute un événement sur une période donnée
     * @param {string} format1 Format sous forme jjmm de la date initiale
     * @param {string} format2 Format sous forme jjmm de la date finale
     * @param {string} evnt Evénement 
     */
    addJourney(format1, format2, evnt) {
        let f1 = Annee.getFormat(format1);
        let f2 = Annee.getFormat(format2);
        let res = Annee.getDiff(f1, f2);
        for (let i in res) {
            this.addEvent(res[i][0], res[i][1], evnt);
        }
    }

    /**
     * Affiche le planning d'une année entre deux mois
     * @param {string} mois1 Mois initial 
     * @param {string} mois2 Mois final
     */
    affiche(mois1, mois2) {
        let i1 = ms.indexOf(mois1);
        let i2 = ms.indexOf(mois2) + 1;
        for (let i = i1; i < i2; i++) {
            this.afficheMois(ms[i]);
        }
    }

    /**
     * Récupère le nom du jour d'une date
     * @param {number} annee Numéro de l'année
     * @param {string} mois Nom du mois 
     * @param {number} jour Numéro du jour
     * @returns {string} Nom du jour
     * @static
     */
    static getJour(annee, mois, jour) {
        mois = ms.indexOf(mois);
        var d = new Date(annee, mois, jour);
        let n = d.getDay();
        let tab = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        return tab[n];
    }

    /**
     * Charge un planning événementiel
     * @param {Array} plan Liste d'événements réguliers
     */
    chargePlanning(plan) {
        for (let i in plan) {
            let elt = plan[i];
            this.addEvent(elt[0], elt[1], elt[2]);
        }
    }
}

/**
 * Permet d'afficher les informations du jour cliqué
 * @param {string} evt Liste des événements 
 * @param {string} task Liste des tâches 
 * @param {string} nm Numéro du jour
 * @param {string} an Numéro de l'année
 * @param {string} ms Nom du mois
 * @see Annee.afficheMois()
 */
function reveal(evt, task, nm, an, ms) {
    let infosE = evt.split(Jour.separator);
    let infosT = task.split(Jour.separator);
    if (evt.length + task.length > 0) {
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

function getCorps() {
    let debut = 0;
    let fin = cpt_corps;
    res = [];
    for (let i = debut; i < fin; i++) {
        res.push("corps_" + i);
    }
    return res;
}

function show(id) {
    let cps = getCorps();
    actual = (id == '-') ? (actual - 1 >= 0 ? actual - 1 : actual) : (actual + 1 < cpt_corps ? actual + 1 : actual);
    for (let i in cps) {
        let elt = document.getElementById(cps[i]);
        elt.style.position = "fixed"
        elt.style.width = "95%"
        elt.style.display = "none";
    }
    let elt = document.getElementById(cps[actual]);
    elt.style.display = "flex";
}
window.onkeydown = function (e) {
    var key = e.keyCode || e.which;
    switch (key) {
        case 37:
            show('-');
            break;
        case 39:
            show('+');
            break;
        case 38:
            show('-');
            break;
        case 40:
            show('+');
            break;
        default:
            break;
    }
};

window.onload = function () {
    let cps = getCorps();
    for (let i in cps) {
        let elt = document.getElementById(cps[i]);
        elt.style.position = "fixed"
        elt.style.width = "95%"
        elt.style.display = "none";
    }
    let elt = document.getElementById(cps[0]);
    elt.style.display = "flex";
}