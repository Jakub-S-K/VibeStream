const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_conn.js').conn;

const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.DATE(6)
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    album_id: {
      type: DataTypes.BIGINT(11),
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    album_id: {
      type: DataTypes.BIGINT(11),
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    album_id: {
      type: DataTypes.BIGINT(11),
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT(11),
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    external_id: {
      type: DataTypes.BIGINT(11),
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    length: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    play_counter: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    file: {
      type: DataTypes.BLOB('medium') //medium = max 16MiB
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
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
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

const user_follower = sequelize.define(
  'user_follower',
  {
    id: {
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id_follower: {
      type: DataTypes.BIGINT(11),
      allowNull: false,
    },
    user_id_followed: {
      type: DataTypes.BIGINT(11),
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