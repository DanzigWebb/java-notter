INSERT INTO tag_color (type)
SELECT 'primary' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'primary');

INSERT INTO tag_color (type)
SELECT 'secondary' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'secondary');

INSERT INTO tag_color (type)
SELECT 'accent' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'accent');

INSERT INTO tag_color (type)
SELECT 'neutral' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'neutral');

INSERT INTO tag_color (type)
SELECT 'info' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'info');

INSERT INTO tag_color (type)
SELECT 'success' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'success');

INSERT INTO tag_color (type)
SELECT 'warning' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'warning');

INSERT INTO tag_color (type)
SELECT 'error' FROM DUAL
WHERE NOT EXISTS (SELECT * FROM tag_color WHERE type = 'error');
