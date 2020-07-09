module.exports = {
  
  trigger: "streams",
  enabled: true,
  onStart: true,
  interval: null,
  
  category: "Streams",
  description: "Streaming on Twitch",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      streams: {},
      streamChat: null,
    }).write()
    
  },
  
  execute(Manager, msg, args) {
    
  },
  start(Manager){
    if (this.enabled && Manager.client.commands['stream'].enabled) {
      this.interval = setInterval(() => {
        Manager.client.commands['stream'].check(Manager)
      },10*1000)
    } else {
      if(this.interval) clearInterval(this.interval)
      this.interval = null
    }
  }
}