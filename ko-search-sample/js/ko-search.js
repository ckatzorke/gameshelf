var SearchResult = function(giantbombResponseResult){
	var self = this;
	self.name = giantbombResponseResult.name;
	self.platforms = ko.computed(function(){
		var platformString = "";
		for (var i = giantbombResponseResult.platforms.length - 1; i >= 0; i--) {
			platformString += giantbombResponseResult.platforms[i].abbreviation + (i>0?", ":"");
		}
		return platformString == "" ? "None": platformString;
	});
}

var GiantBombSearch = function(){
	var self = this;
	self.searchtext = ko.observable("");
	self.searchresults = ko.observableArray();

	/*self.store = function(){
		localStorage.apikey = self.apikey();
	}*/

	self.search  = function(){
		self.searchresults.removeAll();
		var searchtxt = self.searchtext();
		console.log("Searching for '" + searchtxt + "'");
		$.getJSON("http://www.giantbomb.com/api/games/?api_key=&format=json&field_list=name,id", 
				{
					"filter"  	: "name:" + searchtxt,
					"api_key"	: "",
					"format"	: "json",
					/*"limit"		: 10,*/
					"field_list": "id,name,original_release_date,platforms,api_detail_url"

				}, function(resultData){
					if(resultData.status_code == 1){
						console.log("Found " + resultData.number_of_total_results + " results");
						for (var i = resultData.results.length - 1; i >= 0; i--) {
							var singleResult = resultData.results[i];
							self.searchresults.push(new SearchResult(singleResult));
						};
					} else {
						console.log("Error: " + resultData.status_code + " [" + resultData.error + "]")
					}
				}
		);
	}



	self.showDetails = function(searchResult){
		console.log("Showing details for " + searchResult.name);
	}
}

ko.applyBindings(new GiantBombSearch());
