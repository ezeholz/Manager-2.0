module.exports = {
  
  trigger: "streams",
  enabled: true,
  start: true,
  
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
  start(Manager, intervals){
    clearInterval(intervals.streams)
  }
}