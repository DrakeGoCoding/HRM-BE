INSERT INTO users
VALUES (0, '', '', 'staff', null, null, now());
INSERT INTO profiles
VALUES (
		0,
		'',
		'',
		'',
		null,
		'',
		'',
		null,
		0,
		'',
		null,
		'',
		null,
		null,
		now()
	);
INSERT INTO departments
VALUES (0, '', '', null, 0, null, null, now());
INSERT INTO positions
VALUES (0, '', '', '', 0, null, null, now());
INSERT INTO profile_positions
VALUES (0, 0, 0, null, null, now());