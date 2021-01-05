export class RemoveCommand {
  public _id: string
  public fields: Array<string>
  public query: object

  constructor(res) {
    this._id = res._id

    this.fields = Object.keys(res).filter((_f) => _f !== '_id')
    this.query = res
  }
}
