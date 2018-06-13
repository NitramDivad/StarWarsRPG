var newGame = true,
    idxPlayer = 0,
    idxDefender = 0,
    rpg = {
        arrPlayersDB: [],
        arrWhosePlaying: [],
        SelectPlayer: function() {

        },

        SelectDefender: function() {

        },

        Attack: function() {

        },

        Health: function() {

        },

        AttackPower: function() {

        },

        IsLoser: function() {

        }, 

        IsWinner: function() {

        },

        GameOver: function() {

        },

        SetGameCity: function() {

        },

        ChooseLetter: function(ltr) {

        }
    };


    /***************************************************************/
    function PopulatePlayerArray() {
    /***************************************************************/

        rpg.arrPlayersDB.push({id:1,player:'Luke Skywalker',health:100,attackPower:15,counterAttack:5});
        rpg.arrPlayersDB.push({id:2,player:'Darth Vader',health:120,attackPower:8,counterAttack:15});
        rpg.arrPlayersDB.push({id:3,player:'Yoda',health:150,attackPower:5,counterAttack:20});
        rpg.arrPlayersDB.push({id:4,player:'Kylo Ren',health:180,attackPower:3,counterAttack:25});
    }


    /***************************************************************/    
    function GameRoutine(x) {
    /***************************************************************/


    }


    /***************************************************************/
    document.onkeyup = function(x) {
    /***************************************************************/

        GameRoutine(x.key);
    }


    /***************************************************************/
    document.addEventListener('DOMContentLoaded', function() {          //ON LOAD
    /***************************************************************/


    }, false);


    /***************************************************************/
    function BtnClicked(whichElem) {
    /***************************************************************/

        GameRoutine(whichElem.value);
    }


    /***************************************************************/
    document.documentElement.addEventListener('keydown', function (e) {     //stops spacebar from causing scroll
    /***************************************************************/

    if ( ( e.keycode || e.which ) == 32)
        e.preventDefault();
    }, false);