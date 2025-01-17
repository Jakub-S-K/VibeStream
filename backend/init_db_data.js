// module.exports.test_users = "INSERT INTO `user` (`id`, `nickname`, `email`, `password`, `creation_date`, `bio`) VALUES\
// (1, 'MusicLover', 'musiclover@example.com', 'password123', '2024-12-19 10:43:44', 'Passionate about discovering new indie tracks.'),\
// (2, 'BeatMaker99', 'beatmaker99@example.com', 'securePass99', '2024-12-19 10:43:44', 'Aspiring producer sharing my beats with the world.'),\
// (3, 'SoundHunter', 'soundhunter@example.com', 'hunterPass456', '2024-12-19 10:43:44', 'Exploring the depths of new and unique sounds.'),\
// (4, 'VibeMaster', 'vibemaster@example.com', 'vibe2024!', '2024-12-19 10:43:44', 'Sharing vibes and playlists for every mood.'),\
// (5, 'MelodySeeker', 'melodyseeker@example.com', 'melodyPass789', '2024-12-19 10:43:44', 'On a journey to find the perfect melody.'),\
// (6, 'PodwojnaLipa', 'podwojnalipa@gmail.com', 'P@ssw0rd2024', '2024-12-19 10:51:47', 'Lubię relaksować się przy dobrej muzyce i odkrywać nowe brzmienia.'),\
// (7, 'DJKaprysnaDrukarkaHP', 'djkaprysna@outlook.com', 'Druk@rka123', '2024-12-19 10:51:47', 'Tworzę muzykę inspirowaną dźwiękami codziennego życia.'),\
// (8, 'patrycjaaaaaa', 'patrycja123@yahoo.com', 'P@trycja2024!', '2024-12-19 10:51:47', 'Fanka akustycznych brzmień i chilloutowych playlist.'),\
// (9, 'kierowcaSolarisa', 'kierowca.solaris@interia.pl', 'S0laris2024!', '2024-12-19 10:51:47', 'Muzyka to moja codzienna towarzyszka podczas długich tras.'),\
// (10, 'DJPaprykarzSzczecinski', 'djpaprykarz@gmail.com', 'P@pryk@rz1!', '2024-12-19 10:51:47', 'DJ z pasją do miksowania nieoczywistych gatunków.'),\
// (11, 'LeoLoud', 'leoloud@protonmail.com', 'L3oL0ud!2024', '2024-12-19 10:51:47', 'Eksperymentuję z dźwiękiem i szukam nowych muzycznych wyzwań.'),\
// (12, 'JakeJam', 'jakejam@icloud.com', 'J@k3J@ms2024', '2024-12-19 10:51:47', 'Producent muzyczny z zamiłowaniem do groovy bitów.'),\
// (13, 'babanarowerze', 'babanarowerze@gmail.com', 'Bab@N@2024', '2024-12-19 10:54:36', 'Muzyka to mój najlepszy towarzysz podczas rowerowych przejażdżek!'),\
// (14, 'soundwave42', 'soundwave42@gmail.com', 'S0undW@v3!2024', '2024-12-19 10:55:55', 'Pasjonat nowych brzmień i eksperymentów w muzyce elektronicznej.'),\
// (15, 'beatmasterx', 'beatmasterx@yahoo.com', 'B3@tM@st3rX', '2024-12-19 10:55:55', 'Tworzę hip-hopowe bity, zawsze w poszukiwaniu idealnego flow.');\
// "

// All users have the default password '123456'
module.exports.test_users = "\
INSERT INTO `user` (`id`, `nickname`, `email`, `password`, `creation_date`, `bio`) VALUES\
('04983039-5421-4c66-9f63-3fac8f43e78d', 'DJKaprysnaDrukarkaHP', 'djkaprysna@drukarkahp.pl', '$2a$10$xbrrHoZQLHmTvvLP5hrJPOwoMACEjaJUcAdQDuAvbnA3lp4APEtCy', '2025-01-17 20:15:21', 'HP Smart lover'),\
('210c5b29-1d7d-452f-a8e4-549bc5b7650b', 'President Duda', 'president@duda.pl', '$2a$10$OeHGl1ZCEVSyDaQx8B3A0ezFUGrQWnV2D5x/rJ.lz7radKRUQlqKS', '2025-01-17 21:33:19', 'Serek President i pasztet Duda'),\
('22a4812f-dcda-4360-a7f3-9bcff6a7b389', 'MelodySeeker', 'melodyseeker@gmail.com', '$2a$10$SPmLBREv7bZnsOt.ooYHRuHO7xqwdMpLO2iAi6rbnBgtWTnBXITom', '2025-01-17 21:15:22', 'A passionate seeker of sounds, always on the hunt for new musical journeys.'),\
('37daf514-8122-4d53-b72d-3ec2a4018117', 'patrycjaaaaa', 'patrycja123@yahoo.com', '$2a$10$hAIVBrRd7TU.eYmB9zPE.u.TVQfldn4QgfUPQJ//i96SxLWVjODlO', '2025-01-17 20:17:26', 'Hej tu Patrycja'),\
('4a0b05eb-3d8a-4182-bfa2-5ddae7c4990a', 'meegas', 'meegas@gmail.com', '$2a$10$cJQmNIzWMCDLGhZcTIlOaeStNJlC0SMYIDh5HQ2lMUG3JxhmWYTVG', '2025-01-17 20:19:48', 'Szukam dźwięków tak głośnych, jak praca młotów w hucie.'),\
('545c6907-1ca2-4a26-a530-33501714e6ab', 'kierowcaSolarisa', 'kierowca.solarisa@interia.pl', '$2a$10$cYA3Shm51LcDjv0Gb/D90O/zfhy1jnShgwuZWzgDa4NisgcaOmxo2', '2025-01-17 21:12:48', 'Proszę się trzymać, bo zaraz wjeżdżam z dropem!'),\
('632316eb-ae56-417e-a931-9382015d4c70', 'NightGroover', 'nightgroover@yahoo.com', '$2a$10$RAlqyh8MFTbFK9jbCXitMOtkNXVIvi.DezfX63QQlrWSt.qVGNdZ.', '2025-01-17 21:25:15', 'Lost in the lights, moving to the night’s rhythm.'),\
('6436f3b8-eb42-48e2-b0ce-fe9fdbeb0861', 'babanarowerze', 'babanarowerze@gmail.com', '$2a$10$X6F9mjqPfmtMN8OpkKaBVuHg64zhLyHy6R4TrVTstZaawv5ArjvTm', '2025-01-17 20:14:33', 'baba na rowerze to poważna sprawa'),\
('7e31eba6-0095-4770-b11f-89e29a5c7813', 'DJPaprykarzSzczecinski', 'djpaprykarz@szczecinski.pl', '$2a$10$uB4MvAsrPMAz1U/rfs4HBOnCF7jKrWWIwiVtlpxyWCwGgiU6JZLDa', '2025-01-17 20:16:07', 'Bity dobre jak świeży paprykarz prosto z puszki.'),\
('91ab6db4-9b0f-4a70-930b-283bbc1b79a7', 'PodwojnaLipa', 'podwojnalipa@gmail.com', '$2a$10$JNDWSfWTohMwhQdxY2hIq.iZhVGFjwacmFzbYa832p.uj7aHI8fuS', '2025-01-17 20:16:43', 'aka podwójny przypał aka dwojaka padaka'),\
('c2b8ba43-be57-4671-9ddf-d762ed69c5aa', 'beatmasterx', 'beatmasterx@yahoo.com', '$2a$10$HaJpMjjEXUM6m/.pUUWTHuy4EEcnOH93hoj0prh0Hyx1HdaqVs3sC', '2025-01-17 20:20:23', NULL),\
('d263b2c9-edc9-411e-a28c-a955902615a3', 'LeoLoud', 'leoloud@protonmail.com', '$2a$10$1hA0JL05.rclO44bdewN.ONU/Zmb0lBv6h2LAYmXeixJfltNhd5ze', '2025-01-17 21:19:44', 'Bold vibes, loud beats, endless energy.'),\
('d42f6716-304b-44db-b4bf-f77d3e6d0220', 'VibeMaster', 'vibemaster@yahoo.com', '$2a$10$bVTxfNmPzkPqpY3Qw3RkXe3TbpJrdNV8lmMZz4jEcaREC3tW.5fym', '2025-01-17 20:21:02', NULL),\
('e12906df-cfdb-472c-b93b-ce34a20d0e8d', 'SoundHunter', 'soundhunter@gmail.com', '$2a$10$LTBuoHn8zHADMqsEGgpO..QQsBlYpaf/b6U0UmDLAHICA2cERvxgC', '2025-01-17 20:19:14', 'Exploring the depths of new and unique sounds.'),\
('f9ec03e5-9bce-4a29-8f9d-4f15a45b7c60', 'pralkosuszarka', 'pralko@suszarka.pl', '$2a$10$hw5VDsDsJAN/gUpgYkCiteUs.NrbnhwWoCVIcxYKH1juLwIFZsij.', '2025-01-17 21:35:28', 'Słucham dźwięków przypominających cegłę wirującą w pralce – absurdalne, ale intrygujące.');\
"

module.exports.test_tags = "\
INSERT INTO `tag` (`id`, `name`) VALUES\
(1, 'Joyful'),\
(2, 'Hopeful'),\
(3, 'Nostalgic'),\
(4, 'Calm'),\
(5, 'Angry'),\
(6, 'Mysterious'),\
(7, 'Minimalist'),\
(8, 'Dreamy'),\
(9, 'Heavy'),\
(10, 'Catchy'),\
(11, 'Cinematic'),\
(12, 'Tribal'),\
(13, 'Wedding'),\
(14, 'Birthday'),\
(15, 'Meditation'),\
(16, 'Gaming'),\
(17, 'Adventure'),\
(18, 'Road Trip'),\
(19, 'Caribbean'),\
(20, 'Celtic'),\
(21, 'Nordic'),\
(22, 'Indian'),\
(23, 'Indigenous'),\
(24, 'Autumn'),\
(25, 'Spring'),\
(26, 'Valentine’s Day'),\
(27, 'New Year'),\
(28, 'Thanksgiving'),\
(29, 'Lo-fi Beats'),\
(30, 'Psychedelic'),\
(31, 'Pop Punk'),\
(32, 'Synth Pop'),\
(33, 'Post Rock'),\
(34, 'Death Metal'),\
(35, 'Guitar'),\
(36, 'Piano'),\
(37, 'Strings'),\
(38, 'Drums'),\
(39, 'Vocals'),\
(40, 'Synthesizer'),\
(41, 'Beatboxing'),\
(42, 'Morning'),\
(43, 'Night'),\
(44, 'Sunset'),\
(45, 'Urban'),\
(46, 'Forest'),\
(47, 'Ocean'),\
(48, 'Happy'),\
(49, 'Sad'),\
(50, 'Chill'),\
(51, 'Energetic'),\
(52, 'Romantic'),\
(53, 'Dark'),\
(54, 'Upbeat'),\
(55, 'Acoustic'),\
(56, 'Experimental'),\
(57, 'Groovy'),\
(58, 'Melodic'),\
(59, 'Party'),\
(60, 'Relax'),\
(61, 'Workout'),\
(62, 'Travel'),\
(63, 'Study'),\
(64, 'Latin'),\
(65, 'Asian'),\
(66, 'African'),\
(67, 'Middle Eastern'),\
(68, 'European'),\
(69, 'Summer'),\
(70, 'Winter'),\
(71, 'Christmas'),\
(72, 'Halloween');\
"

module.exports.test_genre = "\
INSERT INTO `genre` (`id`, `name`) VALUES\
(1, 'Pop'),\
(2, 'Rock'),\
(3, 'Hip Hop'),\
(4, 'Jazz'),\
(5, 'Classical'),\
(6, 'Electronic'),\
(7, 'Reggae'),\
(8, 'Country'),\
(9, 'Blues'),\
(10, 'R&B'),\
(11, 'Soul'),\
(12, 'Funk'),\
(13, 'Metal'),\
(14, 'Punk'),\
(15, 'Folk'),\
(16, 'Indie'),\
(17, 'Disco'),\
(18, 'Gospel'),\
(19, 'Latin'),\
(20, 'K-Pop'),\
(21, 'World'),\
(22, 'Ambient'),\
(23, 'House'),\
(24, 'Techno'),\
(25, 'Trance'),\
(26, 'Dubstep'),\
(27, 'Drum and Bass'),\
(28, 'Soundtrack'),\
(29, 'Experimental'),\
(30, 'Lo-fi'),\
(31, 'Trap'),\
(32, 'Grunge'),\
(33, 'Ska'),\
(34, 'Synthwave'),\
(35, 'Chillout'),\
(36, 'Hardcore'),\
(37, 'Progressive Rock'),\
(38, 'Garage'),\
(39, 'Shoegaze'),\
(40, 'New Wave'),\
(41, 'Opera'),\
(42, 'Avant-garde'),\
(43, 'Acoustic'),\
(44, 'Celtic'),\
(45, 'Swing');\
"