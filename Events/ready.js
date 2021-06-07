module.exports = async(client) => { 
    client.user.setPresence({
    activity: {
      name: "dev by klei - prefix: *",
      type: "STREAMING",
      url: "https://www.twitch.tv/itsklei_", 
    },
    status: "dnd"
  })}; 
