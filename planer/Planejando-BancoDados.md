PLANEJAMENTO DE BANCO DE DADOS

- EVENTOS
- GRUPOS
- PESSOAS


events
- id INT PK AUTO_INCREMENT
- status BOOLEAN default=false
- title VARCHAR
- description VARCHAR
- grouped BOOLEAN default=false

eventGroups
- id INT PK AUTO_INCREMENT
- id_event INT (RELACIONADO A events.id)
- name VARCHAR

eventPeople
- id INT PK AUTO_INCREMENT
- id_event INT (RELACIONADO A events.id)
- id_group INT (RELACIONADO A eventGroups.id)
- name VARCHAR
- cpf VARCHAR
- matched VARCHAR default=""



