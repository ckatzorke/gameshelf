var Games = new Array(); //Meteor.Collection("games");
if (Meteor.isClient) {
  Template.gamecollection.games = function () {
     return Games; //Games.find({}, {sort: {name: 1}});
  };

  Template.gamecollection.events({
    'click' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("Add to "+ Games);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Starting Gameshelf....");
    Games.push({name: "God of War", platforn: "PS3"});
    Games.push({name: "God of War 2", platforn: "PS3"});
    //Games.insert({ name: 'God of War Ascension', platform: 'PS3'});
  });
}
