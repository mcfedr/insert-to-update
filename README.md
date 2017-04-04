# Insert to update converter

Quick tool for converting `INSERT` sql statements to `UPDATE`.

Usage:

    yarn run convert -- -k "\`productIdentifier\`" < ~/Desktop/changes.sql

So it turns statements like this

    INSERT INTO `User` (`id`, `account_id`, `firstName`, `email`, `password`, `resetCode`, `salt`, `roles`, `enabled`, `passCode`, `lastName`) VALUES (7, 7, 'Qwerty', 'email@email.com', '$2y$12$qSMZ6SCewioPqJY2QiMZz.FWl/R5MQQ/soQiVlfZMAT8yeWAJrQJO', NULL, NULL, '[\"ROLE_USER\"]', 1, NULL, 'Last');

Into this

    UPDATE `User` SET  `account_id` =  7,  `firstName` =  'Qwerty',  `email` =  'email@email.com',  `password` =  '$2y$12$qSMZ6SCewioPqJY2QiMZz.FWl/R5MQQ/soQiVlfZMAT8yeWAJrQJO',  `resetCode` =  NULL,  `salt` =  NULL,  `roles` =  '[\"ROLE_USER\"]',  `enabled` =  1,  `passCode` =  NULL,  `lastName` =  'Last' WHERE `id` = 7;

## Limitations

 - Only supports single row per INSERT
 - Will not handle `,` in the data correctly
