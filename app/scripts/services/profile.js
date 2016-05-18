'use strict';


angular.module('proSportsApp')
    .factory('profile', function(global, httpService) { return {
            userCategories: function(data) {
                var url = global.getApiUrl() + global.getApiObject().consumerCategories;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            sportTypes: function(id) {
                var url = global.getApiUrl() + global.getApiObject().sportType.replace(":key",id);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            userSearch: function(key) {
                var url = global.getApiUrl() + global.getApiObject().userSearch.replace("{mobileOrEmail}",key);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },

            getProfile: function() {
                var userId=global.userId;
                var url = global.getApiUrl() + global.getApiObject().getProfile.replace(":id",userId);
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            saveCosumerAddress: function(data) {
                var consumerId=global.consumerId;
                var url = global.getApiUrl() + global.getApiObject().saveAddress;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            userEntry: function(data) {
                var consumerId=global.consumerId;
                var url = global.getApiUrl() + global.getApiObject().userEntry;
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            setDefaultAdd: function(id) {
                var url = global.getApiUrl() + global.getApiObject().setDefault.replace(":id",id);
                var $request = httpService.httpRequest(url, "P");
                return $request;
            },
            getAddress:function(id){
                var consumerId=global.consumerId;
                var url = global.getApiUrl() + global.getApiObject().getAddress+"?userid="+consumerId;
                var $request = httpService.httpRequest(url, "G");
                return $request;
            },
            deleteAddres:function(id){
                var url = global.getApiUrl() + global.getApiObject().deleteAddress.replace(":id",id);
                var $request = httpService.httpRequest(url, "P");
                return $request;
            },
            forgotPassword:function(usertext){
                var url = global.getApiUrl() + global.getApiObject().forgotpassword.replace(":usertext",usertext);
                var $request = httpService.httpRequest(url, "P");
                return $request;
            },
            updateProfile:function(data){
                var url = global.getApiUrl() + global.getApiObject().updateProfile.replace(":id",global.userId);
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            changePwd: function(data) {
                var userId=global.userId;
                data.userId = userId;
                console.log(data.userId);
                var url = global.getApiUrl() + global.getApiObject().resetPwd;
                console.log(data);
                var $request = httpService.httpRequest(url, "P",data);
                return $request;
            },
            imageUpload: function(file) {
                var url = global.getApiUrl() + global.getApiObject().imageUpload;
                var $request = httpService.httpUploadRequest(url,file);
                return $request;
            },
             addPlayer: function(data) {
                var url = global.getApiUrl() + global.getApiObject().signup;
                var $request = httpService.httpRequest(url, "P", data);
                return $request;
            },
        };
});