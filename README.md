# OnlyVote

 [Enregistrer un nouvel utilisateur](#register) 

 [Recuperer les villes d'un départment](#department) 

 [Récuperer les candidats de l'élection](#candidat) 

 [Récuperer le code Insee d'une commune](#insee) 

 [Envoyer le code de vérification a l'utilisateur](#code) 

 [Verifier le code de l'utilisateur et enregistrer son vote](#check) 

## <span style="background:green">POST</span> ```/register```  <a id="register"></a> 

### Enregistrer un nouvel utilisateur

### Body 

```json
{
  "gender": "homme"/"femme",
  "phoneNumber": "",
  "email": "",
  "birthDate": UNIX Timestamp,
  "lastname": "",
  "firstname": "",
  "birthTown": "",
  "socialNumber": "",
  "birthDepartment": department
}
```
### Result

```json
{
    "result": boolean, 
    "message": "Message relié au résultat"
}
```

## <span style="background:green">POST</span> ```/department``` <a id="department"></a> 

### Recuperer les villes d'un départment

### Body 

```json
{
  "department": number
}
```
### Result

```json
[
	{
		"id": 35023,
		"dep": 85,
		"nccenr": "Aiguillon-sur-Mer"
	},
	{
		"id": 35024,
		"dep": 85,
		"nccenr": "Aiguillon-sur-Vie"
	},
	{
		"id": 35025,
		"dep": 85,
		"nccenr": "Aizenay"
	},...
]
```






## <span style="background:blue">GET</span> ```/candidat``` <a id="candidat"></a> 

### Récuperer les candidats de l'élection

### Result

```json
[
	{
		"id": 1,
		"firstname": "",
		"lastname": "",
		"party": "",
		"program": "",
		"profilePicture": "url"
	},
]
```

## <span style="background:green">POST</span> ```/insee``` <a id="insee"></a> 

### Renvoie le code Insee d'une commune

> Attention l'attribut com doit etre le nccenr de la requete department

### Body 

```json
{
	"com" : "Roche-sur-Yon",
	"dep" : 85
}
```
### Result

```json
{
	"COM": 85191
}
```

## <span style="background:blue">GET</span> ```/code``` <a id="code"></a> 

### Envoyer le code de vérification a l'utilisateur

### Header

```
phone : phoneNumber (0XXXXXXXXX)
```

### Result

```json
{
	"result": true or false,
	"message": "response message"
}
```

## <span style="background:blue">GET</span> ```/check``` <a id="check"></a> 

### Verifier le code de l'utilisateur et enregistrer son vote

### Header

```
phone : phoneNumber (0XXXXXXXXX)
code : XXXXXX
idCandidat : X
```

### Result

```json
{
	"result": true or false,
	"message": "response message"
}
```



