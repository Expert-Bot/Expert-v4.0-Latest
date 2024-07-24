const { model, Schema } = require ("mongoose");

let Backup = new Schema({
  Guild: String,
  User: String,
  BackupSlots: Array,
  TemplateCode: String,
  Template: Array
});

module.exports = model("serverBackup", Backup);
