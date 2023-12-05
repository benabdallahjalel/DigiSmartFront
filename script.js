import * as $ from 'jquery';
import 'bootstrap';
import 'smartwizard';
$(document).ready(function () {
    // Initialize the form wizard
    var options = {
        theme: 'default',
        transitionEffect: 'fade',
        toolbarSettings: {
            toolbarPosition: 'bottom' // Specify the toolbar position if needed
        },
        useURLhash: false // Disable the URL hash
        // You can add more options here based on your requirements
    };
    // @ts-ignore
    $('#wizard').smartWizard(options);
});
