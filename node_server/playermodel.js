/*jshint esversion: 6 */

class player{
    constructor(playerName) {
        this.id ='',
        this.name = playerName,
        this.playerSocketID = ''
    }

    setPlayerSocketID(playerSocketID){
        this.playerSocketID = playerSocketID
    }
    setID(id){
        this.id = id;
    }
    setPlayerSocketID(socketID){
        this.playerSocketID = socketID;
    }
    getName(){
        return this.name;
    }

}

module.exports = player;
