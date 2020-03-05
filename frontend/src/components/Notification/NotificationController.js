export default class NotificationController {
  constructor() {
    this.notifications = []
    this.subscribers = []
  }

  // add a flash
  addNotification({ type = 'default', icon, title, body, time = 5000 } = {}) {
    // debugger
    const id = this._generateNotificationID()
    this.notifications.push({ id, type, time, icon, title, body })
    this._updateSubscribers()
  }

  notifications() {
    return this.notifications
  }
  // remove a flash
  removeNotification(id) {
    this.notifications = this.notifications.filter(flash => flash.id !== id)
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

  _generateNotificationID() {
    let first = (Math.random() * 46656) | 0
    let second = (Math.random() * 46656) | 0
    first = ('000' + first.toString(36)).slice(-3)
    second = ('000' + second.toString(36)).slice(-3)

    return first + second
  }
}
