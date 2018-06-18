var idxPlayer = 0,
    idxEnemy = 0,
    rpg = {
        arrPlayersDB: [],
        arrFighters: [],
        arrEnemies: [],
        playerSelected: false,
        enemySelected: false,

        Player: function(whichOne) {
            var numValue;

            idxPlayer = whichOne;

            $.each(rpg.arrPlayersDB, function (idx, playerInfo) {
                if (playerInfo.id === idxPlayer) {
                    rpg.arrFighters.push({id: playerInfo.id,
                                          player: playerInfo.player,
                                          health: playerInfo.health,
                                          attackPower: playerInfo.attackPower,
                                          counterAttack: playerInfo.counterAttack,
                                          photo: playerInfo.photo});
                }
                else {
                    rpg.arrEnemies.push({id: playerInfo.id,         //Player will always have "index" of 0
                                         player: playerInfo.player,
                                         health: playerInfo.health,
                                         attackPower: playerInfo.attackPower,
                                         counterAttack: playerInfo.counterAttack,
                                         photo: playerInfo.photo});
                }
            })

            rpg.playerSelected = true;
            
            UpdatePlayerComponents();
        },

        Enemy: function(whichOne) {
            var idxChosen;

            idxEnemy = whichOne;

            $.each(rpg.arrEnemies, function (idx, playerInfo) {

                if (playerInfo.id === idxEnemy) {
                    idxChosen = idx;

                    rpg.arrFighters.push({id: playerInfo.id,        //Enemy will always have "index" of 1
                                          player: playerInfo.player,
                                          health: playerInfo.health,
                                          attackPower: playerInfo.attackPower,
                                          counterAttack: playerInfo.counterAttack,
                                          photo: playerInfo.photo});
                    return false;
                }
            })
            rpg.arrEnemies.splice(idxChosen,1);

            rpg.enemySelected = true;

            UpdateEnemyComponents();
        },

        Attack: function() {
            if (rpg.arrFighters.length === 0)
                $("#messageArea").text("You must make a Character Selection to begin!");
            else if (rpg.arrFighters.length === 1)
                $("#messageArea").text("No Enemy here.  Please Choose an Enemy!");
            else {
                rpg.DuelTime();
                rpg.AttackPower();
            }
        },

        ReducePlayerHealth: function() {
            rpg.arrFighters[0].health -= rpg.arrFighters[1].counterAttack;
            if (rpg.arrFighters[0].health < 0)
                rpg.arrFighters[0].health = 0;
        },

        ReduceEnemyHealth: function () {
            rpg.arrFighters[1].health -= rpg.arrFighters[0].attackPower;
            if (rpg.arrFighters[1].health < 0)
                rpg.arrFighters[1].health = 0;
        },

        DuelTime: function() {
            rpg.ReduceEnemyHealth();
            UpdateEnemyStats();

            if ( !rpg.HasEnemyLost() ) {
                rpg.ReducePlayerHealth();
                UpdatePlayerStats();
                
                if ( rpg.HasCharLost() ) {
                    $("#btn-attack").prop("disabled",true);
                    rpg.GameOver();
                }
            }
            else {
                if (rpg.arrEnemies.length > 0)
                    $("#messageArea").text("You have defeated " + rpg.arrFighters[1].player + ". You can choose to fight another enemy.");
                else
                    rpg.GameOver();

                rpg.enemySelected = false;
                rpg.arrFighters.splice(1,1);
            }
        },

        AttackPower: function() {
            var ap = rpg.arrPlayersDB[rpg.arrFighters[0].id].attackPower;

            rpg.arrFighters[0].attackPower += ap;
            $("#playerAttack").text("Attack Power: " + rpg.arrFighters[0].attackPower);
        },

        HasEnemyLost: function() {
            if (rpg.arrFighters[1].health <= 0)
                return true;
            else
                return false;
        }, 

        HasCharLost: function() {
            if (rpg.arrFighters[0].health <= 0)
                return true;
            else
                return false;
        },

        GameOver: function() {
            if ( rpg.HasEnemyLost() )
                $("#messageArea").text("You have defeated " + rpg.arrFighters[1].player + ". You Won!!!  Restart the Game to play again.");
            else
                $("#messageArea").text("You have been defeated by " + rpg.arrFighters[1].player + ". Game Over.  Restart the Game to play again.");
        },

        StartGame: function() {
            PopulatePlayerArray();
        },

        RestartGame: function() {
            rpg.arrFighters = [];
            rpg.arrEnemies = [];
            rpg.playerSelected = false;
            rpg.enemySelected = false;
            idxPlayer = -1;
            idxEnemy= -1;

            $('.characters').each(function(idx, value) {
                $("#character"+idx.toString()).removeClass("d-none");
            });

            $("#sub-title").removeClass("invisible");
            $("#restart").addClass("invisible");
            $("#playerStatus").addClass("invisible");
            $("#enemyStatus").addClass("invisible");
            $("#player-img").addClass("d-none");
            $("#enemy-img").addClass("d-none");
            $("#playerLabel").addClass("invisible");
            $("#enemyLabel").addClass("invisible");
            $("#characterRow").text("Select Your Character");
            $(".characters").css("background-color", "green");
            $("#player").css("background-color", "");
            $("#enemy").css("background-color", "");
            $("#messageArea").text("");
            $("#btn-attack").prop("disabled",false);
        }
    };


    /***************************************************************/
    function PopulatePlayerArray() {
    /***************************************************************/

        rpg.arrPlayersDB.push({ id:0,
                                player:'Luke Skywalker',
                                health:100,
                                attackPower:15,
                                counterAttack:5,
                                photo:"assets/images/luke.jpg"});
        rpg.arrPlayersDB.push({ id:1,
                                player:'Yoda',
                                health:120,
                                attackPower:8,
                                counterAttack:15,
                                photo:"assets/images/yoda.jpg"});
        rpg.arrPlayersDB.push({ id:2,
                                player:'Darth Vader',
                                health:150,
                                attackPower:5,
                                counterAttack:20,
                                photo:"assets/images/darth.jpeg"});
        rpg.arrPlayersDB.push({ id:3,
                                player:'Kylo Ren',
                                health:180,
                                attackPower:3,
                                counterAttack:25,
                                photo:"assets/images/kylo.jpg"});
    };


    //***************************************************************/
    function UpdatePlayerStats() {
    /***************************************************************/
    
        var numValue;
            numPercent;
        
        numValue = rpg.arrFighters[0].health;
        numPercent = Math.round(numValue / rpg.arrPlayersDB[idxPlayer].health * 100);
        $("#playerHealth").text("Health: " + numValue.toString());
        $("#progPlayerHealth").text(numPercent.toString() + "%");
        $('#progPlayerHealth').attr('aria-valuenow', numValue.toString()).css('width', numPercent.toString() + "%");
        $("#playerHealth").text("Health: " + rpg.arrFighters[0].health);
    }


    /***************************************************************/
    function UpdateEnemyStats() {
    /***************************************************************/
    
        var numValue;
            numPercent;

        numValue = rpg.arrFighters[1].health;
        numPercent = Math.round(numValue / rpg.arrPlayersDB[idxEnemy].health * 100);
        $("#enemyHealth").text("Health: " + numValue.toString());
        $("#progEnemyHealth").text(numPercent.toString() + "%");
        $("#progEnemyHealth").attr("aria-valuenow", numValue.toString()).css("width", numPercent.toString() + "%");
        $("#enemyHealth").text("Health: " + rpg.arrFighters[1].health);
    }


    /***************************************************************/
    function UpdatePlayerComponents() {
    /***************************************************************/

        var numValue;

        $("#characterRow").text("Enemies Available To Attack");
        $("#character"+idxPlayer.toString()).addClass("d-none");
        $(".characters".toString()).css("background-color", "red");
        $("#player-img").removeClass("d-none");
        $("#player-img").attr("src",rpg.arrFighters[0].photo);
        $("#player").css("background-color", "green");
        $("#playerStatus").removeClass("invisible");
        $("#playerLabel").removeClass("invisible");
        $("#restart").removeClass("invisible");
        $("#playerName").text(rpg.arrFighters[0].player);

        numValue = rpg.arrFighters[0].attackPower.toString();
        $("#playerAttack").text("Attack Power: " + numValue);

        numValue = rpg.arrFighters[0].health.toString();
        numPercent = Math.round(numValue / rpg.arrPlayersDB[idxPlayer].health * 100); 
        $("#playerHealth").text("Health: " + numValue);
        $("#progPlayerHealth").text(numPercent.toString() + "%");
        $('#progPlayerHealth').attr('aria-valuenow', numValue.toString()).css('width', numPercent.toString() + "%");

        $("#messageArea").text("");
    }


    /***************************************************************/
    function UpdateEnemyComponents() {
    /***************************************************************/
        
        var numValue;

        if (rpg.arrEnemies.length === 0) 
            $("#sub-title").addClass("invisible");

        $("#character"+idxEnemy.toString()).addClass("d-none");
        $("#enemy-img").removeClass("d-none");
        $("#enemy-img").attr("src",rpg.arrFighters[1].photo);
        $("#enemy").css("background-color", "black");
        $("#enemyStatus").removeClass("invisible");
        $("#enemyLabel").removeClass("invisible");
        $("#enemyName").text(rpg.arrFighters[1].player);

        numValue = rpg.arrFighters[1].counterAttack;
        $("#enemyCntrAttack").text("Counter Attack: " + numValue);

        numValue = rpg.arrFighters[1].health.toString();
        numPercent = Math.round(numValue / rpg.arrPlayersDB[idxEnemy].health * 100); 
        $("#enemyHealth").text("Health: " + numValue);
        $("#progEnemyHealth").text(numPercent.toString() + "%");
        $('#progEnemyHealth').attr('aria-valuenow', numValue.toString()).css('width', numPercent.toString() + "%");
        
        $("#messageArea").text("");
    }


    /***************************************************************/    
    function ChooseCharacter(whichChar) {
    /***************************************************************/
    
        if (!rpg.playerSelected)
            rpg.Player(whichChar);
        else if (!rpg.enemySelected)
            rpg.Enemy(whichChar);
    };


    /***************************************************************/
    $(document).ready(function() {
    /***************************************************************/
    
        rpg.StartGame();

        $("#btn-attack").on("click", rpg.Attack);
        $("#btn-restart").on("click", rpg.RestartGame);

        $("#char0").bind("click", function() {ChooseCharacter(0)});
        $("#char1").bind("click", function() {ChooseCharacter(1)});
        $("#char2").bind("click", function() {ChooseCharacter(2)});
        $("#char3").bind("click", function() {ChooseCharacter(3)});  
    }, false);