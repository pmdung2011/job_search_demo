const Database = require('../util/database')

module.exports = class Job {
  constructor(companyName, title, location, description) {
    this.companyName = companyName
    this.title = title
    this.location = location
    this.description = description
  }

  save() {
    return Database.execute(
      `
      INSERT INTO jobs (id, title, location, description, company_name)
      VALUES (NULL, ?, ?, ?, ?)
    `,
      [this.title, this.location, this.description, this.companyName]
    )
  }

  static getJobs() {
    return Database.execute(`
      SELECT * FROM jobs
    `)
  }

  static getJobById(id) {
    return Database.execute(
      `
      SELECT * FROM jobs
      WHERE id = ?
      LIMIT 1
    `,
      [id]
    )
  }

  static checkIsApply(userId, jobId) {
    return Database.execute(
      `
      SELECT * FROM applied_job
      WHERE id_job = ?
      AND id_user = ?
    `,
      [jobId, userId]
    )
  }

  static putJobById(id, putData /* object*/) {
    return Database.execute(
      `
      UPDATE jobs SET 
        title = ?, 
        location = ?, 
        description = ?, 
        company_name = ? 
      WHERE jobs.id = ?
      `,
      [
        putData.title,
        putData.location,
        putData.description,
        putData.companyName,
        id,
      ]
    )
  }

  static deleteJobById(id) {
    return Database.execute(
      `
      DELETE FROM jobs 
      WHERE jobs.id = ?
    `,
      [id]
    )
  }

  static searchJob(searchValue, category) {
    return Database.execute(
      `SELECT * FROM jobs
      WHERE ${category} LIKE CONCAT("%", ? , "%")`,
      [searchValue]
    )
  }

  static applyJob(idUser, idJob) {
    return Database.execute(
      `
      INSERT INTO applied_job 
      (id, id_user, id_job) 
      VALUES 
      (NULL, ?, ?)
    `,
      [idUser, idJob]
    )
  }

  static getAppliedJobByUserId(userId) {
    return Database.execute(
      `
			SELECT jobs.*, AJ.id_user FROM 
			(SELECT * FROM applied_job WHERE id_user = ?) AS AJ
			JOIN jobs
			ON AJ.id_job = jobs.id
			`,
      [userId]
    )
  }

  static getUserAppliedById(idJob) {
    return Database.execute(
      `
			SELECT applied_job.*, users.username FROM applied_job
			JOIN users
			ON users.id = applied_job.id_user
			WHERE applied_job.id_job = ?
			`,
      [idJob]
    )
  }
}
