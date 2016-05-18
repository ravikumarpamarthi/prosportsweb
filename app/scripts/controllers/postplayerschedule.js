'use strict';

/**
 * @ngdoc function
 * @name proSportsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the proSportsApp
 */
angular.module('proSportsApp')
    .controller('PostPlayerScheduleCtrl', function($scope, global, metadataService, tournamentsService, $stateParams, ngTableParams, $mdDialog, $mdMedia) {
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });

        $scope.vm = { eventDocId: $stateParams.eventdocid, tournamentDocId: $stateParams.tournamentDocId };
        $scope.drawData = { type: 'MANUAL' }
        metadataService.getMetadata('MEANS_OF_ENTRY').then(function(res) {
            $scope.MEANS_OF_ENTRIES = res.data.masterData.options;
        });
        metadataService.getMetadata('DRAW').then(function(res) {
            $scope.drawList = res.data.masterData.options;
        });
        $scope.models = [
            { listName: "A", items: [], dragging: false },
            { listName: "B", items: [], dragging: false }
        ];
        $scope.getDrawPlayers = function(draw) {
            $scope.loadingDraw = true;
            tournamentsService.getDrawMatchResult($stateParams.eventdocid, draw).then(function(res) {
                    var teams = angular.fromJson(JSON.stringify(eval("(" + res.data.teams + ")")));
                    var results = angular.fromJson(JSON.stringify(eval("(" + res.data.results + ")")));
                if (res.status == global.SUCCESS && results.length > 0) {
                    $scope.tournamentBracket=true;
                    
                    var bigData = { teams: teams, results: results };
                    angular.element('#tournamentBracket').bracket({
                        skipConsolationRound: true,
                        init: bigData
                    });
                    $scope.loadingDraw = false;
                } else {
                    $scope.tournamentBracket=false;
                    tournamentsService.getDrawPlayers($stateParams.eventdocid, draw).then(function(res) {
                        $scope.loadingDraw = false;
                        if (res.status == global.SUCCESS) {
                            $scope.drawPlayers = res.data.entries;
                            $scope.drawSize = res.data.drawSize;
                            $scope.setDraw();
                            $scope.setSeededPlayers();
                            if ($scope.drawPlayers.length == 0) {
                                global.showErrorMessage("No Records Found");
                            }
                        } else {
                            global.showErrorMessage(res.error.message);
                        }
                    })
                }
            })




        }

        function parseMatches() {
            var matchesRounds = [];

        }


        var indexedTeams = [];

        $scope.playersToFilter = function() {
            indexedTeams = [];
            return $scope.matches;
        }

        $scope.filterTeams = function(player) {
            var teamIsNew = indexedTeams.indexOf(player.roundNo) == -1;
            if (teamIsNew) {
                indexedTeams.push(player.roundNo);
            }
            return teamIsNew;
        }

        $scope.getMatches = function(draw) {
            $scope.loading = true;
            tournamentsService.getMatches($stateParams.eventdocid, draw).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    var matches = res.data.matches || [];
                    $scope.matches = matches;
                    parseMatches();
                    if (matches.length == 0) {
                        global.showErrorMessage(res.data.message);
                    }
                } else {
                    global.showErrorMessage(res.error.message);
                }
            })

        }
        $scope.setDraw = function() {

            $scope.models[1].items = $scope.drawPlayers || [];
        }
        $scope.resetDraw = function() {
            $scope.loading = true;
            $scope.disable = true;
            $scope.models[1].items = $scope.drawPlayers || [];
            $scope.models[0].items = [];
            $scope.loading = false;
            $scope.disable = false;
        }


        $scope.publishDraw = function(draw) {
            $scope.loading = true;
            $scope.disable = true;
            var data = { eventDocId: $stateParams.eventdocid, draw: draw, type: $scope.drawData.type, teams: [] };
            var players = $scope.models[0].items,
                teams = [];
            for (var i = 0; i <= players.length - 1; i++) {
                var team = players[i];
                var obj = {
                    status: team.status,
                    points: team.points,
                    entryMode: team.mainEntryMode,
                    name: team.teamName,
                    players: team.players
                }
                data.teams.push(obj);

            }

            tournamentsService.publishDraw(data).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    global.showSuccessMessage(res.data.message);
                    $scope.disable = false;
                } else {
                    $scope.disable = false;
                    global.showErrorMessage(res.error.message);
                }
            })
        }
        $scope.getEntries = function() {
            $scope.loadingEntries = true;
            tournamentsService.getEntries($stateParams.eventdocid).then(function(res) {
                $scope.loadingEntries = false;
                if (res.status == global.SUCCESS) {
                    $scope.entries = res.data.entries;
                } else {
                    global.showErrorMessage(res.error.message);
                }
            })
        }

        $scope.getEntries();



        $scope.addPlayerModel = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            var teamSize = $stateParams.teamsize;
            if (teamSize == 1) {
                $mdDialog.show({

                        controller: "PlayerPreparationAddPlayerModalCtrl",
                        templateUrl: 'views/player-preparation-add-player-modal.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: useFullScreen,
                        locals: {
                            eventDocId: $scope.vm.eventDocId
                        }
                    })
                    .then(function() {
                        $scope.getEntries();
                    }, function() {

                    });
            } else {
                $mdDialog.show({

                        controller: "PlayerPreparationAddPlayerDoublesCtrl",
                        templateUrl: 'views/player-preparation-add-player-doubles.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: useFullScreen,
                        locals: {
                            eventDocId: $scope.vm.eventDocId,
                            teamSize: teamSize
                        }
                    })
                    .then(function() {
                        $scope.getEntries();
                    }, function() {

                    });
            }

        };

        $scope.updateEntries = function() {
            $scope.loading = true;
            $scope.disable = true;
            var entries = $scope.entries;
            var data = { eventDocId: $stateParams.eventdocid, entries: [] };

            for (var i = entries.length - 1; i >= 0; i--) {
                var entry = entries[i];
                var obj = {
                    entryDocId: entry.docId,
                    players: entry.players,
                    signin: entry.signin,
                    mainEntryMode: entry.mainEntryMode,
                    meansOfEntry: entry.meansOfEntry,
                    status: entry.status,
                    draw: entry.draw
                }
                data.entries.push(obj);

            }



            tournamentsService.updateEntries(data, $stateParams.eventdocid).then(function(res) {
                $scope.loading = false;
                $scope.disable = false;
                if (res.status == global.SUCCESS) {
                    global.showSuccessMessage(res.data.message);
                    $scope.getEntries();
                } else {
                    $scope.disable = false;
                    global.showErrorMessage(res.error.message);
                }
            })
        }


        /**
         * dnd-dragging determines what data gets serialized and send to the receiver
         * of the drop. While we usually just send a single object, we send the array
         * of all selected items here.
         */
        $scope.getSelectedItemsIncluding = function(list, item) {
            item.selected = true;
            return list.items.filter(function(item) {
                return item.selected;
            });
        };

        /**
         * We set the list into dragging state, meaning the items that are being
         * dragged are hidden. We also use the HTML5 API directly to set a custom
         * image, since otherwise only the one item that the user actually dragged
         * would be shown as drag image.
         */
        $scope.onDragstart = function(list, event) {
            list.dragging = true;
            if (event.dataTransfer.setDragImage) {
                var img = new Image();
                img.src = 'images/ic_content_copy_black_24dp_2x.png';
                event.dataTransfer.setDragImage(img, 0, 0);
            }
        };

        /**
         * In the dnd-drop callback, we now have to handle the data array that we
         * sent above. We handle the insertion into the list ourselves. By returning
         * true, the dnd-list directive won't do the insertion itself.
         */
        $scope.onDrop = function(list, items, index) {
            angular.forEach(items, function(item) { item.selected = false; });
            list.items = list.items.slice(0, index)
                .concat(items)
                .concat(list.items.slice(index));
            return true;
        }

        /**
         * Last but not least, we have to remove the previously dragged items in the
         * dnd-moved callback.
         */
        $scope.onMoved = function(list) {
            list.items = list.items.filter(function(item) {
                return !item.selected;
            });
        };

        // Generate the initial model
        /*angular.forEach($scope.models, function(list) {
            for (var i = 1; i <= 4; ++i) {
                list.items.push({ label: "Item " + list.listName + i });
            }
        });*/

        // Model to JSON for demo purpose
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);
        $scope.getScores = function(teams) {
            var score = [];
            for (var i = 0; i <= teams[0].scores.length - 1; i++) {
                score.push(teams[0].scores[i] + '-' + teams[1].scores[i]);
            }
            return score.join(',');
        }
        $scope.matchScheduleModal = function(ev, match) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({

                    controller: "MatchScheduleCtrl",
                    templateUrl: 'views/matchScheduleModal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        vm: $scope.vm,
                        match: match
                    }
                })
                .then(function() {
                    $scope.getMatches($scope.scheduleDraw);
                }, function() {

                });
        }
        $scope.matchResultModal = function(ev, match) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({

                    controller: "MatchResultCtrl",
                    templateUrl: 'views/match-result-modal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        vm: $scope.vm,
                        match: match
                    }
                })
                .then(function() {
                    $scope.getMatches($scope.scheduleDraw);
                }, function() {

                });
        }

        $scope.setSeededPlayers = function() {
            var lists = []
            var drawSize = $scope.drawSize;
            var drawPlayers = angular.copy($scope.drawPlayers);
            for (var i = 0; i < drawPlayers.length; i++) {
                drawPlayers[i].type = "player";
            }
            for (var i = 0; i < drawSize; i++) {
                var player = {
                    label: "Player" + i,
                    position: i + 1,
                    allowedTypes: ['player'],
                    max: 1,
                    people: []
                };
                lists.push(player);
            }
            var players = {
                label: "Players",
                allowedTypes: ['player'],
                max: $scope.drawPlayers.length,
                people: drawPlayers,
            }
            lists.push(players);
            console.log(lists);
            $scope.lists = lists;
        }

        $scope.$watch('lists', function(lists) {
            $scope.modelAsJson = angular.toJson(lists, true);
        }, true);

        $scope.publishSeededDraw = function(draw) {



            $scope.loading = true;
            $scope.disable = true;
            var data = { eventDocId: $stateParams.eventdocid, draw: draw, type: $scope.drawData.type, teams: [] };
            var players = $scope.lists,
                teams = [];
            for (var i = 0; i < players.length - 1; i++) {
                var team = players[i].people;
                if (team.length == 0) {
                    var obj = {
                        name: "BYE",
                        players: []
                    }
                } else {
                    var team = team[0];
                    var obj = {
                        status: team.status,
                        points: team.points,
                        entryMode: team.mainEntryMode,
                        name: team.teamName,
                        players: team.players
                    }
                }
                data.teams.push(obj);
            }
            tournamentsService.publishDraw(data).then(function(res) {
                $scope.loading = false;
                if (res.status == global.SUCCESS) {
                    global.showSuccessMessage(res.data.message);
                    $scope.disable = false;
                } else {
                    $scope.disable = false;
                    global.showErrorMessage(res.error.message);
                }
            })
        }

        $scope.shuffle = function(ev) {
            var lists = angular.copy($scope.lists);
            var items = { positions: [] };
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].people.length == 0 && lists[i].bye != true) {
                    var obj = { position: lists[i].position }
                    items.positions.push(obj);
                }
            }
            items.teams = lists[lists.length - 1].people;
            var useFullScreen = true;
            $mdDialog.show({
                    templateUrl: 'views/player-shuffle-modal.html',
                    controller: function($scope, $mdDialog, items, $filter) {
                        $scope.items = items;
                        $scope.hide = function() {
                            $mdDialog.cancel();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.isChecked = function() {
                            var positions = $filter('filter')($scope.items.positions, { selectedPosition: true });

                            return positions.length === $scope.items.positions.length
                        }
                        $scope.isCheckedPlayers = function() {
                            var teams = $filter('filter')($scope.items.teams, { selectedTeam: true });
                            return teams.length === $scope.items.teams.length
                        }
                        $scope.isSelectedPosition = function(item) {
                            if (item.selectedPosition) {
                                return true
                            } else {
                                return false;
                            }
                        }
                        $scope.isSelectedPlayer = function(item) {
                            if (item.selectedTeam) {
                                return true
                            } else {
                                return false;
                            }
                        }
                        $scope.toggleAllPlayers = function() {
                            var teams = $filter('filter')($scope.items.teams, { selectedTeam: true });
                            if (teams.length === $scope.items.teams.length) {
                                setAllPlayers(false);
                            } else {
                                setAllPlayers(true);
                            }
                        }
                        $scope.toggleAll = function() {
                            var positions = $filter('filter')($scope.items.positions, { selectedPosition: true });
                            if (positions.length === $scope.items.positions.length) {
                                setAllPositions(false);
                            } else {
                                setAllPositions(true);
                            }
                        }

                        function setAllPlayers(val) {
                            for (var i = $scope.items.teams.length - 1; i >= 0; i--) {
                                $scope.items.teams[i].selectedTeam = val;
                            }
                        }

                        function setAllPositions(val) {
                            for (var i = $scope.items.positions.length - 1; i >= 0; i--) {
                                $scope.items.positions[i].selectedPosition = val;
                            }
                        }
                        $scope.togglePosition = function(item, index) {
                            if ($scope.items.positions[index].selectedPosition) {
                                $scope.items.positions[index].selectedPosition = false;
                            } else {
                                $scope.items.positions[index].selectedPosition = true;
                            }
                        }
                        $scope.togglePlayers = function(item, index) {
                            if ($scope.items.teams[index].selectedTeam) {
                                $scope.items.teams[index].selectedTeam = false;
                            } else {
                                $scope.items.teams[index].selectedTeam = true;
                            }
                        }

                        $scope.shuffle = function() {
                            var positions = $filter('filter')($scope.items.positions, { selectedPosition: true });
                            var teams = $filter('filter')($scope.items.teams, { selectedTeam: true });

                            var remainingPositions = $scope.items.positions.length - positions.length;
                            var remainingTeams = $scope.items.teams.length - teams.length;


                            if (remainingPositions < remainingTeams) {
                                global.showErrorMessage("Invalid Selection-remainig teams exceeds remaining positions");
                                return false;
                            }
                            if (positions.length < teams.length) {
                                global.showErrorMessage("Selected positions should be more than selected teams");
                                return false;
                            }
                            if (positions.length == 0 || teams.length == 0) {
                                global.showErrorMessage("Invalid Selection");
                                return false;
                            }
                            positions = shuffle(positions);
                            var obj = { positions: positions, teams: teams };
                            $mdDialog.hide(obj);
                        }

                        function shuffle(sourceArray) {
                            for (var i = 0; i < sourceArray.length - 1; i++) {
                                var j = i + Math.floor(Math.random() * (sourceArray.length - i));

                                var temp = sourceArray[j];
                                sourceArray[j] = sourceArray[i];
                                sourceArray[i] = temp;
                            }
                            return sourceArray;
                        }
                    },
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                        items: items
                    }
                })
                .then(function(data) {
                    if (typeof data != undefined) {
                        var teams = data.teams;
                        var positions = data.positions;
                        for (var i = 0; i < positions.length; i++) {
                            var position = positions[i].position - 1;
                            var team = teams[i];
                            if (team == undefined) {
                                $scope.lists[position].bye = true;
                            } else {
                                delete team.selectedTeam;
                                var teamIndex = $scope.lists[$scope.lists.length - 1].people.map(function(e) {
                                    return e.docId;
                                }).indexOf(team.docId);
                                $scope.lists[$scope.lists.length - 1].people.splice(teamIndex, 1);
                                $scope.lists[position].people.push(team);
                            }

                        }
                    }
                }, function() {

                });
        }














    });
