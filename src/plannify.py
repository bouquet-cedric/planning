# -*- coding: utf-8 -*-
# coding: utf-8

from datetime import datetime

def replaceByApos(chaine):
    res = ""
    for i in chaine:
        if i == "'":
            res += "&apos;"
        else:
            res += i
    return res

def readFile(flnm):
    f = open(flnm,'r',encoding="utf-8")
    l = f.readlines()
    res = []
    for i in l:
        elt=i[:-1]
        elt = replaceByApos(elt)
        tmp = elt.split(" : ")
        jour = tmp[0]
        evt = tmp[1]
        res.append(jourToJour(jour,evt))
    f.close()
    f = open("planningToLoad.js",'w',encoding="utf-8")
    f.writelines("let planning = [\n")
    nb_lines_done = 0
    for i in res:
        if nb_lines_done == len(res)-1:
            f.writelines(f"\t[{i[0]}, \"{i[1]}\", \"{i[2]}\"]\n")
        else:
            f.writelines(f"\t[{i[0]}, \"{i[1]}\", \"{i[2]}\"],\n")
        nb_lines_done += 1
    f.writelines("]\n")
    date = datetime.now()
    year = str(date).split("-")[0]
    f.writelines(f"var plan = new Annee({int(year)});\nplan.chargePlanning(planning);\n")
    f.close()
    return res

def jourToJour(jour,evt):
    ms = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    jr = jour.split("/")
    jour = jr[0]
    mois = ms[int(jr[1])-1]
    return [jour,str(mois),str(evt)]


import sys
readFile(sys.argv[1])
