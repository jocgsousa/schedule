module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'agenda',
  define: {
    timestamps: true,
    underscored: true,
    underscoredeAll: true,
  },
};
