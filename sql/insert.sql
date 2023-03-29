-- *CONTENT_TYPES INSERT
INSERT INTO peliculasdb.contenttypes (description) VALUES ('MOVIE')
INSERT INTO peliculasdb.contenttypes (description) VALUES ('SERIE')

-- *SELECT DE UN CAMPO
SELECT * FROM peliculasdb.movies WHERE genderTypeId = 1;

-- *SENTECIA DELETE
DELETE FROM peliculasdb.contenttypes WHERE id = 1;

-- *SENTECIA UPDATE
UPDATE peliculasdb.gendertypes
SET description = 'ADVENTURE'
WHERE id = 1;

-- *GENDER_TYPES INSERT
INSERT INTO peliculasdb.gendertypes (description) VALUES ('ADVENTURE');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('COMEDY');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('ACTION');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('SCIENCE_FICTION');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('FANTASY');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('TERROR');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('DRAMA');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('MUSICAL');
INSERT INTO peliculasdb.gendertypes (description) VALUES ('SUSPENSE');

