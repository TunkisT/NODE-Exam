Sukurti sistemą, kuri leistų jungtis į grupes ir dalintis sąskaitomis.

DB:
++users (id, full_name, email, password, reg_timestamp);
++groups (id, name);
++bills (id, group_id, amount, description);
++accounts (id, group_id, user_id) <- ši lentelė skirta žinoti kokioms grupėms priklauso kiekvienas vartotojas.

Back-end:
++Auth: Register/Login su POST.
++POST: /accounts/ - vartotojas paduoda account ID ir savo token. Į accounts lentelę įsirašo duomenys.
++GET: /accounts/ - paduoda visas vartotojo grupes (JOIN su groups). ID pasiima iš token.
++GET: /bills/:id - paduoda vartotojui visas sąskaitas tos grupės.
POST /bills/ - įrašo naują sąskaitą specifinei grupei (front'as paduoda: group_id, amount, description)

Front-end:
++Register: vartotojas įrašo vardą, emailą ir slaptažodį du kartus (jei nesutampa - front'as nepraleidžia).
++Login: vartotojas įrašo emailą, slaptažodį; gauna token; nukreipia į groups pasirinkimą.
Groups: vartotojas mato visas savo grupes (pagal accounts lentelę iš DB). Paspaudus - nuveda į tos grupės bills. Apačioje forma pridėti grupę prie paskyros (t.y. į accounts lentelę).
Bills: mato sąskaitas specifinės grupės ir gali pridėti naujas.
Užduoties įkėlimo instrukcijos

Instrukcijas, kaip valdyti GitHub repozitorijas rasite - https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories arba step-by-step žemiau.

1. Sukurti GitHub repozitoriją.

Instrukcijas, kaip susikurti GitHub repozitoriją rasite - https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

2. Pakeitimus daryti atskiroje šakoje (pvz. dev), kad būtų galima sukurti Pull Request.

Kaip galima sukurti Pull Request galite sužinoti čia - https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

Naują šaką galima susikurti įvykdžius `git checkout -b dev` komandą terminale.

3. Kuriant sistemą pakeitimus nuolatos saugoti su pakeitimus su prasmingomis "commit" žinutėmis.

4. Pabaigus projektą patikrinti ar visi pakeitimai yra nusiųsti į GitHub, sukurti Pull Request per GitHub puslapį į pagrindinę šaką (`main` arba `master`) ir pateikti nuorodą šiame "assignment".

Jeigu to padaryti nepavyks galite tiesiog įkelti archyvuotus failus.

Sėkmės!
