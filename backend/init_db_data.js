module.exports.test_users = "INSERT INTO `user` (`id`, `nickname`, `email`, `password`, `creation_date`, `bio`) VALUES\
(1, 'MusicLover', 'musiclover@example.com', 'password123', '2024-12-19 10:43:44', 'Passionate about discovering new indie tracks.'),\
(2, 'BeatMaker99', 'beatmaker99@example.com', 'securePass99', '2024-12-19 10:43:44', 'Aspiring producer sharing my beats with the world.'),\
(3, 'SoundHunter', 'soundhunter@example.com', 'hunterPass456', '2024-12-19 10:43:44', 'Exploring the depths of new and unique sounds.'),\
(4, 'VibeMaster', 'vibemaster@example.com', 'vibe2024!', '2024-12-19 10:43:44', 'Sharing vibes and playlists for every mood.'),\
(5, 'MelodySeeker', 'melodyseeker@example.com', 'melodyPass789', '2024-12-19 10:43:44', 'On a journey to find the perfect melody.'),\
(6, 'PodwojnaLipa', 'podwojnalipa@gmail.com', 'P@ssw0rd2024', '2024-12-19 10:51:47', 'Lubię relaksować się przy dobrej muzyce i odkrywać nowe brzmienia.'),\
(7, 'DJKaprysnaDrukarkaHP', 'djkaprysna@outlook.com', 'Druk@rka123', '2024-12-19 10:51:47', 'Tworzę muzykę inspirowaną dźwiękami codziennego życia.'),\
(8, 'patrycjaaaaaa', 'patrycja123@yahoo.com', 'P@trycja2024!', '2024-12-19 10:51:47', 'Fanka akustycznych brzmień i chilloutowych playlist.'),\
(9, 'kierowcaSolarisa', 'kierowca.solaris@interia.pl', 'S0laris2024!', '2024-12-19 10:51:47', 'Muzyka to moja codzienna towarzyszka podczas długich tras.'),\
(10, 'DJPaprykarzSzczecinski', 'djpaprykarz@gmail.com', 'P@pryk@rz1!', '2024-12-19 10:51:47', 'DJ z pasją do miksowania nieoczywistych gatunków.'),\
(11, 'LeoLoud', 'leoloud@protonmail.com', 'L3oL0ud!2024', '2024-12-19 10:51:47', 'Eksperymentuję z dźwiękiem i szukam nowych muzycznych wyzwań.'),\
(12, 'JakeJam', 'jakejam@icloud.com', 'J@k3J@ms2024', '2024-12-19 10:51:47', 'Producent muzyczny z zamiłowaniem do groovy bitów.'),\
(13, 'babanarowerze', 'babanarowerze@gmail.com', 'Bab@N@2024', '2024-12-19 10:54:36', 'Muzyka to mój najlepszy towarzysz podczas rowerowych przejażdżek!'),\
(14, 'soundwave42', 'soundwave42@gmail.com', 'S0undW@v3!2024', '2024-12-19 10:55:55', 'Pasjonat nowych brzmień i eksperymentów w muzyce elektronicznej.'),\
(15, 'beatmasterx', 'beatmasterx@yahoo.com', 'B3@tM@st3rX', '2024-12-19 10:55:55', 'Tworzę hip-hopowe bity, zawsze w poszukiwaniu idealnego flow.');\
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