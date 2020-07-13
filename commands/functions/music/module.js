const ytdl = require('ytdl-core');

module.exports = {
  
  trigger: "music",
  enabled: true,
  onStart: true,
  
  category: "Music",
  description: "Music Bot",
  
  setup(Manager, db, googleKey) {
    // db.defaults({
    //   channelLook: null, // Canal donde se fija para crear
    //   voiceCategory: null, // Categoría para crear los de voz
    //   textCategory: null, // Categoría para crear los de texto
    //   createdRooms: {}, // Salas activas ex: {'DoTPr0': [audio,texto,date]}
    // }).write()
    
    db.defaults({
      lofi: [], // Canal de Youtube de Música
      //loop: false, // Si loopea
      lobby: null, // Voice de AFK (Para la musiquita)
    }).write()
    
    if(!googleKey) {
      this.enabled = false
    }
    
  },
  
  execute(Manager, msg, args) {
    
  },
  start(Manager) {
    if(this.enabled){
      const lofi = Manager.database.get('lofi')
      const lobby = Manager.database.get('lobby').value()

      let r = Math.floor(Math.random()*lofi.size().value())
      let song = lofi.get(r).value()
      
      if (lofi.size().value() && lobby && ytdl.validateURL(song)) {
        Manager.client.channels.fetch(lobby).then(channel => {
          channel.join().then(dispatcher => {
            Manager.client.dispatcher = dispatcher
            dispatcher.voice.setMute(false)
            dispatcher.play(ytdl(song, {
              filter: 'audioonly',
              quality: 'highestaudio',
              highWaterMark: 31 << 26
            }),{bitrate:'auto'})
            .on('start', () => {
              console.log('Music started!');
              setTimeout(()=>{
                this.start(Manager)
              },60*60*1000)
              //dispatcher.resume();
            })
            .on('end', () => {
              console.log('Music ended!');
              this.start(Manager)
            })
          })
        })
      } else {
        console.log('No se pudo reproducir' + lofi.size().value() + lobby + ytdl.validateURL(song))
      }
    } else {
      const lobby = Manager.database.get('lobby').value()
      Manager.client.channels.fetch(lobby).then(channel => {channel.leave()})
    }
  }
}