(function(KoreSDK){

    var KoreSDK=KoreSDK||{};

    var botOptionsWiz = {};
    botOptionsWiz.logLevel = 'debug';
    botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

    botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptionsWiz.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    botOptionsWiz.botInfo = { name: "village cooking", "_id": "st-2f2a0d99-5322-5e58-b266-1c875a7ba090" }; // bot name is case sensitive
    botOptionsWiz.clientId = "cs-53c7d40d-711c-5703-9c5d-892d5f8bebeb";
    botOptionsWiz.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

    var widgetsConfig = {
        botOptions: botOptionsWiz
    };
    
    KoreSDK.widgetsConfig=widgetsConfig
})(window.KoreSDK);