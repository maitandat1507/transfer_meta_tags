$(function() {
    // input fields
    var inTitle = $("#inTitle"),
        inH1 = $("#inH1");

    // output fields
    var outTitle = $("#outTitle"),
        outH1 = $("#outH1");

    // Title
    inTitle.on('keydown keyup paste input', function() {
        var self = $(this),
            output = '';

        output = convertString(self.val());

        outTitle.val("");
        outTitle.val(output);
    });

    // H1
    inH1.on('keydown keyup paste input', function() {
        var self = $(this),
            output = '';

        output = convertString(self.val());

        outH1.val("");
        outH1.val(output);
    });

    function convertString(content) {
        // convert variable match with variable in db
        content = content.replace(/[\{]{2,2} ?/g, "{");
        content = content.replace(/ ?[\}]{2,2}/g, "}");
        content = content.replace(/maker_name/g, "model_maker_hyouji");

        return content;
    }

});