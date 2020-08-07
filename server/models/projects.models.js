module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define('projects', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    project_title: {
      type: Sequelize.STRING,
    },
    project_description: {
      type: Sequelize.STRING,
    },
    project_image: {
      type: Sequelize.STRING,
    },
    project_date: {
      type: Sequelize.STRING,
    },
  })

  return Projects
}
