'use strict';

module.exports = {
  metadata: () => ({
    name: 'quote_component',
    properties: {
      fullName: {
        required: true,
        type: 'string'
      },
    },
    supportedActions: []
  }),

  invoke: (conversation, done) => {
    // perform conversation tasks.
    const {fullName} = conversation.properties();
    conversation.logger().info("Opening quote generator");
    
    var quotes = require("./src/Quotes.json");
    var quote = quotes[Math.floor(Math.random() * quotes.length)];

    var messageModel = conversation.MessageModel();
    conversation.logger().info("User name: "+fullName);
    var payload = "Hi " + fullName + ". Here's a quote for you.";
    var actions = [];

    var textResponse = messageModel.textConversationMessage(payload, actions);
    conversation.reply(textResponse);
    
    payload = "'"+quote.quote+"'\n\n Quote by: "+quote.origin;
    conversation.logger().info("Quote found: "+payload);
    textResponse = messageModel.textConversationMessage(payload, actions);
    conversation.reply(textResponse);
    conversation.transition();
    console.log(conversation._request.context.variables);
    
    done();
  }
};