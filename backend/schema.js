const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_conn.js').conn;
const uuid = require('uuid')

const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING(512)
      },
      creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      bio: {
        type: DataTypes.STRING(4096),
        allowNull: false
      }
    },
    {
        freezeTableName: true,
    }
  );

const album = sequelize.define(
  'album',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },
  {
      freezeTableName: true,
  }
);
  

const album_like = sequelize.define(
  'album_like',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },
  {
      freezeTableName: true,
  }
);

const album_tags = sequelize.define(
  'album_tags',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },
  {
      freezeTableName: true,
  }
);

const comment = sequelize.define(
  'comment',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE(6)
    },
    content: {
      type: DataTypes.STRING(4096),
      allowNull: false
    }
  },
  {
      freezeTableName: true,
  }
);

const image = sequelize.define(
  'image',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    external_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB('medium') //medium = max 16MiB
    }
  },
  {
      freezeTableName: true,
  }
);

const song = sequelize.define(
  'song',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    length: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    play_counter: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
      defaultValue: 0
    },
    file: {
      type: DataTypes.BLOB('long') //long = max 2GiB
    }
  },
  {
      freezeTableName: true,
  }
);


const tag = sequelize.define(
  'tag',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    tag_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    }
  },
  {
      freezeTableName: true,
  }
);

const genre = sequelize.define(
    'genre',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
    }
);

const user_follower = sequelize.define(
  'user_follower',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id_follower: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id_followed: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
  }
);


module.exports.User = user;
module.exports.Album = album;
module.exports.Album_like = album_like;
module.exports.Album_tags = album_tags;
module.exports.Comment = comment;
module.exports.Image = image;
module.exports.Song = song;
module.exports.Tag = tag;
module.exports.User_follower = user_follower;
module.exports.Genre = genre;

module.exports.Init_relations = function() {
  user.hasOne(image, {foreignKey: 'id'});
  user.hasMany(comment, {foreignKey: 'user_id'});
  user.hasMany(album_like, {foreignKey: 'user_id'});
  user.hasMany(album, {foreignKey: 'user_id'});
  user.belongsToMany(user, {as: 'other', through: user_follower, foreignKey: 'user_id_follower', otherKey: 'user_id_followed'}); //needs testing

  comment.hasOne(user, {foreignKey: 'id'});

  album.belongsTo(image, {foreignKey: 'avatar_id'});
  album.hasMany(song, {foreignKey: 'album_id'});
  album.hasMany(album_tags, {foreignKey: 'album_id'});
  album.hasMany(album_like, {foreignKey: 'album_id'});
  album.belongsTo(user, {foreignKey: 'user_id'});
  
  song.belongsTo(album, {foreignKey: 'album_id'});

  album_tags.belongsTo(tag, {foreignKey: 'tag_id'});
  
  tag.hasMany(album_tags, {foreignKey: 'tag_id'});

  album_like.belongsTo(user, {foreignKey: 'user_id'});
  album_like.belongsTo(album, {foreignKey: 'album_id'});
  
  console.log('Relations initialized!');
}

module.exports.Init_db_entities = async function () {
  const _user = await user.create({
    id: '37692021-37ea-41f1-b95f-3e8a2750c072',
    nickname: 'Andrzej',
    email: 'andrzej@gmail.com',
    password: 'andrzej1234',
    bio: 'Andrzej lorem ipsum dolor sit amet'
  })
  if (!_user) {
    console.error('Could not create base user');
  }
  console.log(_user.id);
}