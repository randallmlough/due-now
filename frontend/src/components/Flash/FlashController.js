export default class FlashController {
  constructor() {
    this.flashes = []
    this.subscribers = []
  }

  // add a flash
  addFlash({
    type = 'danger',
    title = 'Uh oh!',
    body = 'An error occurred',
    time = 4000,
  } = {}) {
    // debugger
    const id = this._generateFlashID()
    this.flashes.push({ id, type, time, title, body })
    this._updateSubscribers()
  }

  flashes() {
    return this.flashes
  }
  // remove a flash
  removeFlash(id) {
    // debugger
    this.flashes = this.flashes.filter(flash => flash.id !== id)
    this._updateSubscribers()
  }

  subscribe(callback) {
    this.subscribers.push(callback)
  }

  unsubscribe() {
    this.subscribers = []
  }

  _updateSubscribers() {
    this.subscribers.forEach(callback => callback())
  }

  _generateFlashID() {
    let first = (Math.random() * 46656) | 0
    let second = (Math.random() * 46656) | 0
    first = ('000' + first.toString(36)).slice(-3)
    second = ('000' + second.toString(36)).slice(-3)

    return first + second
  }
}
