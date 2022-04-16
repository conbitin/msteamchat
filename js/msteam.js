ko.applyBindings(new AppViewModel())
function AppViewModel() {
    var self = this;
    const domain = ["vingroup.net", "vinfast", "vinsmart", "vinfast", "vinhomes", "vinbigdata", "vin3s"];
    self.input = ko.observable("");
    self.ids = ko.observableArray([]);

    self.makeIds = ko.computed(function() {
      strInput = self.input().toLowerCase();        
      var arrayOfStr = strInput.split(/[^a-z0-9_-]/);
      self.ids.removeAll();
      for (i = 0; i < arrayOfStr.length; i++) {
        if (arrayOfStr[i].length >=4 && arrayOfStr[i].length <= 49 && 
            !domain.includes(arrayOfStr[i]) && self.ids.indexOf(arrayOfStr[i]) == -1) {
            self.ids.push(arrayOfStr[i]);
        }
      }
    });

    self.email = ko.computed(function() {
      if (self.ids().length == 0)
        return "";
      strInput = self.ids().toString();
      result = strInput.replace(/,/g, "@vingroup.net,");
      result += "@vingroup.net";
      return result;
    });

    self.numberMem = ko.computed(function() {
      if (self.ids().length == 0)
        return "Chat";
      arrayOfMem = self.ids().toString().split(",");
      return "Chat(" + arrayOfMem.length + ")";
    });

    self.numberMemCall = ko.computed(function() {
      if (self.ids().length == 0)
        return "Call";
      arrayOfMem = self.ids().toString().split(",");
      return "Call(" + arrayOfMem.length + ")";
    });

    self.showAlert = function() {
      if (self.ids().length == 0) {
        alert("There is no Id. Please input at least one. ^^");
        return false;
      }
      return true;
    };

    self.chatGroupLink = ko.computed(function() {
      if (self.email().length == 0)
        return "";
      arrayOfMem = self.email().toString().split(", ");
      result = "https://teams.microsoft.com/l/chat/0/0?users=";
      for (i = 0; i < arrayOfMem.length; i++) {
          result += arrayOfMem[i];
          if (i < arrayOfMem.length - 1)
            result += ",";
      }
      result += "&topicName=" + "TORENAME_" + Math.floor(Math.random() * 100); 
      return result;
    });

    self.callGroupLink = ko.computed(function() {
      if (self.email().length == 0)
        return "";
      arrayOfMem = self.email().toString().split(", ");
      result = "https://teams.microsoft.com/l/call/0/0?users=";
      for (i = 0; i < arrayOfMem.length; i++) {
          result += arrayOfMem[i];
          if (i < arrayOfMem.length - 1)
            result += ",";
      }
      return result;
    });

}