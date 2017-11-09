$(function() {
    var inputField = $("textarea[name=input]"),
        outputField = $("textarea#output");

    inputField.on('keydown keyup', function() {
        var self = $(this),
            output = '';

        output = convertString(self.val());

        outputField.val("");
        outputField.val(output);
    });

    function convertString(content) {
        content = content.replace(/\{{1,2}\$maker_name\}{1,2}/g, "@@maker@@");
        content = content.replace(/\{{1,2}\$disp_name2\}{1,2}/g, "@@displacement@@");
        content = content.replace(/\{{1,2}\$category_name\}{1,2}/g, "@@category@@");
        content = content.replace(/\{{1,2}\$bike_count\}{1,2}/g, "@@count@@");
        content = content.replace(/\{{1,2}\$point_rate\}{1,2}/g, "@@point@@");
        content = content.replace(/\{{1,2}\$todouhuken_name\}{1,2}/g, "@@pref@@");
        content = content.replace(/\{{1,2}\$sikutyoson_name\}{1,2}/g, "@@city@@");
        content = content.replace(/\{{1,2}\$area_name\}{1,2}/g, "@@area@@");
        content = content.replace(/\{{1,2}\$main_todouhuken\}{1,2}/g, "@@pref@@");
        content = content.replace(/\{{1,2}\$area_all_todouhuken\}{1,2}/g, "@@pref@@");

        return content;
    }
});