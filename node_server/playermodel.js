/*jshint esversion: 6 */
//!!!!!!!!!!!! nao sie porque o construtor a receber o nome nao o preenche!!
class player{
    constructor() {
        this.id ='',
        this.name = "",
        this.playerSocketID = '',
        //1 pair = 1 point
        this.points = 0,
        this.moves =0,
        this.movesPlusPoints = 0
    }
 
    setID(id){
        this.id = id;
    }
    setName(name){
        this.name = name;
    }
    setPlayerSocketID(socketID){
        this.playerSocketID = socketID;
    }
    getName(){
        return this.name;
    }
 
}
 
module.exports = player;