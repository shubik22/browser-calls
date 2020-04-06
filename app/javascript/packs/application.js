/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

const { Device } = require('twilio-client');

class App {
  constructor(token) {
    $('#ready-button').on('click', () => {
      this.device = new Device();
      this.setUpDevice(token);
    });

    this.callStatus = $("#call-status");
    this.answerButton = $(".answer-button");
    this.callSupportButton = $(".call-support-button");
    this.hangUpButton = $(".hangup-button");
    this.callCustomerButtons = $(".call-customer-button");

    this.callSupportButton.on('click', () => {
      this.call('phone-number-here');
    });

    this.hangUpButton.on('click' () => {
      this.hangUp();
    });
  }

  setUpDevice(token) {
    this.device.setup(token);
    this.device.on('ready', (device) => {
      this.updateCallStatus("Ready");
    });

    this.device.on('error', (error) => {
      this.updateCallStatus("ERROR: " + error.message);
    });

    this.device.on('connect', (connection) => {
      // Enable the hang up button and disable the call buttons
      this.hangUpButton.prop("disabled", false);
      this.callCustomerButtons.prop("disabled", true);
      this.callSupportButton.prop("disabled", true);
      this.answerButton.prop("disabled", true);

      // If phoneNumber is part of the connection, this is a call from a
      // support agent to a customer's phone
      if ("phoneNumber" in connection.message) {
        this.updateCallStatus("In call with " + connection.message.phoneNumber);
      } else {
        // This is a call from a website user to a support agent
        this.updateCallStatus("In call with support");
      }
    });

    this.device.on('disconnect', (connection) => {
      // Disable the hangup button and enable the call buttons
      this.hangUpButton.prop("disabled", true);
      this.callCustomerButtons.prop("disabled", false);
      this.callSupportButton.prop("disabled", false);

      this.updateCallStatus("Ready");
    });
  }

  call(phoneNumber) {
    this.updateCallStatus("Calling " + phoneNumber + "...");

    const params = {"phoneNumber": phoneNumber};
    this.device.connect(params);
  }

  updateCallStatus(status) {
    this.callStatus.text(status);
  }

  /* End a call */
  hangUp() {
    this.device.disconnectAll();
  }
}

$(document).ready(function() {
  $.post("/token/generate", {page: window.location.pathname}, function(data) {
    new App(data.token);
  });
});
