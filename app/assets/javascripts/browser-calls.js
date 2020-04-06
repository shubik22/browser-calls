/**
 * Twilio Client configuration for the browser-calls-rails
 * example application.
 */

// Store some selectors for elements we'll reuse

/* Helper function to update the call status bar */


/* Get a Twilio Client token with an AJAX request */
$(document).ready(function() {
});


/* Callback for when Twilio Client receives a new incoming call */
Twilio.Device.incoming(function(connection) {
  updateCallStatus("Incoming support call");

  // Set a callback to be executed when the connection is accepted
  connection.accept(function() {
    updateCallStatus("In call with customer");
  });

  // Set a callback on the answer button and enable it
  answerButton.click(function() {
    connection.accept();
  });
  answerButton.prop("disabled", false);
});

/* Call a customer from a support ticket */
