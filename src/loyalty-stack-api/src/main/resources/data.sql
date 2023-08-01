INSERT INTO product_hierarchy (level, description) VALUES (1, 'System');
INSERT INTO product_hierarchy (level, description) VALUES (2, 'Genre');

INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (1, 1, '2600', 'Atari 2600');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (2, 1, '5200', 'Atari 5200');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (3, 1, '7800', 'Atari 7800');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (4, 2, 'ACTION', 'Action/Adventure');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (5, 2, 'MAZE', 'Maze Games');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (6, 2, 'PUZL', 'Puzzle Games');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (7, 2, 'SPORT', 'Sports');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (8, 2, 'SPACE', 'Space Shooter');
INSERT INTO product_level (id, hierarchy_level, level_code, description) VALUES (9, 2, 'RACE', 'Racing');

INSERT INTO brand (code_brand, description) VALUES ('ATARI', 'Atari');
INSERT INTO brand (code_brand, description) VALUES ('ACTI', 'Activision');
INSERT INTO brand (code_brand, description) VALUES ('IMAG', 'Imagic');
INSERT INTO brand (code_brand, description) VALUES ('MNET', 'M-Network');
INSERT INTO brand (code_brand, description) VALUES ('PBRO', 'Parker Brothers');
INSERT INTO brand (code_brand, description) VALUES ('SEGA', 'Sega');
INSERT INTO brand (code_brand, description) VALUES ('TAITO', 'Taito');


-- 2600 Titles
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX2646', 'Pac-Man', 'Pac-Man', 5.99, 'b_PacMan_Color_front.jpg', 's_PacMan_1.png', 's_PacMan_2.png', '2600', 'MAZE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX2675', 'Ms. Pac-Man', 'Ms. Pac-Man', 49.99, 'b_MsPacMan_Silver_front.jpg', 's_MsPacMan_1.png', 's_MsPacMan_2.png', '2600', 'MAZE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX2638', 'Missile Command', 'Missile Command', 4.99, 'b_MissileCommand_Color_front.jpg', 's_MissileCommand_1.png', 's_MissileCommand_3.png', '2600', 'SPACE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('PB5050', 'Star Wars: The Empire Strikes Back', 'Star Wars: The Empire Strikes Back', 11.99, 'b_StarWarsEmpireStrikesBack_front.jpg', 
's_StarWarsEmpireStrikesBack_1.png', 's_StarWarsEmpireStrikesBack_2.png', '2600', 'SPACE', 'PBRO');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX2613', 'Adventure', 'Adventure', 7.99, 'b_Adventure_Color_front.jpg', 's_Adventure_2.png', 's_Adventure_4.png', '2600', 'MAZE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX2628', 'Bowling', 'Bowling', 6.99, 'b_Bowling_Color_front.jpg', 's_Bowling_1.png', 's_Bowling_2.png', '2600', 'SPORT', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('PB5300', 'Frogger', 'Frogger', 3.99, 'b_Frogger_front.jpg', 's_Frogger_1.png', 's_Frogger_2.png', '2600', 'ACTION', 'PBRO');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX2632', 'Space Invaders', 'Space Invaders', 2.99, 'b_SpaceInvaders_Color_front.jpg', 's_SpaceInvaders_1.png', 's_SpaceInvaders_3.png', '2600', 'SPACE', 'PBRO');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('IA3203', 'Atlantis', 'Atlantis', 8.99, 'b_Atlantis_front.jpg', 's_Atlantis_1.png', 's_Atlantis_2.png', '2600', 'SPACE', 'IMAG');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('IA3204', 'Cosmic Ark', 'Cosmic Ark', 8.99, 'b_CosmicArk_front.jpg', 's_CosmicArk_2.png', 's_CosmicArk_3.png', '2600', 'SPACE', 'IMAG');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('MT4518', 'Burger Time', 'Burger Time', 19.99, 'b_BurgerTime_front.jpg', 's_BurgerTime_1.png', 's_BurgerTime_2.png', '2600', 'ACTION', 'MNET');

-- 5200 Titles
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX5213', 'Qix', 'Qix', 3.99, 'b_Qix_front.jpg', 's_Qix_1.png', 's_Qix_2.png', '5200', 'PUZL', 'TAITO');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX5221', 'Berzerk', 'Berzerk', 4.99, 'b_Berzerk_front.jpg', 's_Berzerk_1.png', 's_Berzerk_3.png', '5200', 'MAZE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX5253', 'Choplifter!', 'Choplifter!', 11.99, 'b_Choplifter_front.jpg', 's_Choplifter_2.png', 's_Choplifter_3.png', '5200', 'SPACE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('006-02', 'Congo Bongo', 'Congo Bongo', 12.99, 'b_CongoBongo_front.jpg', 's_CongoBongo_1.png', 's_CongoBongo_2.png', '5200', 'ACTION', 'SEGA');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('FZ-009', 'Beamrider', 'Beamrider', 34.99, 'b_Beamrider_front.jpg', 's_Beamrider_1.png', 's_Beamrider_3.png', '5200', 'SPACE', 'ACTI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX5217', 'Pole Position', 'Pole Position', 4.99, 'b_PolePosition_front.jpg', 's_PolePosition_1.png', 's_PolePosition_3.png', '5200', 'RACE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX5247', 'Mario Bros.', 'Mario Bros.', 9.99, 'b_MarioBros_front.jpg', 's_MsPacMan_1.png', 's_MsPacMan_2.png', '5200', 'ACTION', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX5257', 'Gremlins', 'Gremlins', 44.99, 'b_Gremlins_front.jpg', 's_Gremlins_2.png', 's_Gremlins_3.png', '5200', 'ACTION', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('FZ-007', 'H.E.R.O.', 'H.E.R.O.', 19.99, 'b_Hero_front.jpg', 's_Hero_1.png', 's_Hero_2.png', '5200', 'ACTION', 'ATARI');

-- 7800 Titles
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7803', 'Dig Dug', 'Dig Dug', 2.99, 'b_DigDug_front.jpg', 's_DigDug_1.png', 's_DigDug_3.png', '7800', 'MAZE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7848', 'Donkey Kong', 'Donkey Kong', 3.99, 'b_DonkeyKong_front.jpg', 's_DonkeyKong_2.png', 's_DonkeyKong_3.png', '7800', 'ACTION', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7870', 'Ninja Golf', 'Ninja Golf', 49.99, 'b_NinjaGolf_front.jpg', 's_NinjaGolf_2.png', 's_NinjaGolf_4.png', '7800', 'ACTION', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7805', 'Galaga', 'Galaga', 4.99, 'b_Galaga_front.jpg', 's_Galaga_1.png', 's_Galaga_4.png', '7800', 'SPACE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7804', 'Food Fight', 'Food Fight', 8.99, 'b_FoodFight_front.jpg', 's_FoodFight_1.png', 's_FoodFight_3.png', '7800', 'ACTION', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7806', 'Joust', 'Joust', 3.99, 'b_Joust_front.jpg', 's_Joust_1.png', 's_Joust_3.png', '7800', 'ACTION', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7880', 'Basketbrawl', 'Basketbrawl', 74.99, 'b_Basketbrawl_front.jpg', 's_Basketbrawl_1.png', 's_Basketbrawl_5.png', '7800', 'SPORT', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7888', 'Klax', 'Klax', 14.99, 'Klax_Atari_7800_Game_Case_Cover_Art.jpg', 's_Klax_2.png', 's_Klax_7.png', '7800', 'SPORT', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7854', 'Fatal Run', 'Fatal Run', 64.99, 'b_FatalRun_front.jpg', 's_FatalRun_1.png', 's_FatalRun_3.png', '7800', 'RACE', 'ATARI');
INSERT INTO product (code, name, description, unit_price, image_url, screenshot1, screenshot2, level1, level2, code_brand)
VALUES ('CX7808', 'Pole Position II', 'Pole Position II', 4.99, 'b_PolePosition_ii_front.jpg', 's_PolePosition_2.png', 's_PolePosition_4.png', '7800', 'RACE', 'ATARI');
