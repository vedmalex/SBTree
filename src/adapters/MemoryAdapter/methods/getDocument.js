module.exports = async function getDocument(identifier){
  return JSON.parse(JSON.stringify(this.documents[identifier]));
}
