INSERT INTO member (public_id, username, password, created_at)
VALUES ('d4f8915a-599d-4dd3-a8c3-034f7fa946c4', 'admin', 'admin', '2000-01-01');

INSERT INTO role (member_id, roles)
SELECT member.database_id, 'ROLE_ADMIN'
FROM member
WHERE public_id = 'd4f8915a-599d-4dd3-a8c3-034f7fa946c4';

INSERT INTO role (member_id, roles)
SELECT member.database_id, 'ROLE_USER'
FROM member
WHERE public_id = 'd4f8915a-599d-4dd3-a8c3-034f7fa946c4';