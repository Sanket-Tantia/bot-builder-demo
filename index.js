var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure');

var tableName = "Table-Name"; // You define
var storageName = "Table-Storage-Name"; // Obtain from Azure Portal
var storageKey = "Azure-Table-Key"; // Obtain from Azure Portal

var azureTableClient = new azure.AzureTableClient(tableName, storageName, storageKey);

var tableStorage = new azure.AzureBotStorage({gzipData: false}, azureTableClient);
// =========================================================
// Bot Setup
// =========================================================
// Setup Restify Server
// Listen for any activity on port 3978 of our local server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
 console.log('%s listening to %s', server.name, server.url);
 console.log("hehe");
});
// Create chat bot
var connector = new builder.ChatConnector({
 appId: 'a0f93c32-e20b-4442-a4dd-bd335b6b48ad',
 appPassword: 'mxntSUG2^};cgiZZWP4066-'
});

var inMemoryStorage = new builder.MemoryBotStorage();
// var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Say 'help' or something else...");
}).set('storage', inMemoryStorage);
var bot = new builder.UniversalBot(connector);
// If a Post request is made to /api/messages on port 3978 of our local server, then we pass it to the bot connector to handle
server.post('/api/messages', connector.listen());
// =========================================================
// Bots Dialogs 
// =========================================================
// This is called the root dialog. It is the first point of entry for any message the bot receives
bot.dialog('/', function (session) {
    console.log("hehe",session);
// Send 'hello world' to the user
session.send("Hello World");
});