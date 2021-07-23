let planning = [
    [14, "Juillet", "Armistice"]
]

a2021 = new Annee(2021);
a2021.addEvent(28, "Juillet", "Super Event");
a2021.addTache(30, "Juillet", "Faire tâche");
a2021.addJourney("0107","0209","Vacances");
a2021.chargePlanning(planning);
a2021.affiche("Juillet", "Novembre");