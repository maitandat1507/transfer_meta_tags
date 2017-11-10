$(function() {
    // input fields
    var inTitle = $("#inTitle"),
        inDesc = $("#inDescription"),
        inH1 = $("#inH1"),
        id = $("#id"),
        rs = $('#result');

    // output fields
    var outTitle = $("#outTitle"),
        outDesc = $("#outDescription"),
        outH1 = $("#outH1");

    var clearBtn = $(".clear"),
        copyBtn = $(".copy");

    // Title
    inTitle.on('keydown keyup paste', function() {
        var self = $(this),
            output = '';

        output = convertString(self.val());

        outTitle.val("");
        outTitle.val(output);
        generateUpdateQuery();
    });

    // Description
    inDesc.on('keydown keyup paste', function() {
        var self = $(this),
            output = '';

        output = convertString(self.val());

        outDesc.val("");
        outDesc.val(output);
        generateUpdateQuery();
    });

    // H1
    inH1.on('keydown keyup paste', function() {
        var self = $(this),
            output = '';

        output = convertString(self.val());

        outH1.val("");
        outH1.val(output);
        generateUpdateQuery();
    });

    // id
    id.on('keydown keyup paste', function() {
        generateUpdateQuery();
    });

    // clear content
    clearBtn.click(function() {
        inTitle.val("");
        inDesc.val("");
        inH1.val("");
        outTitle.val("");
        outDesc.val("");
        outH1.val("");
        id.val("");
        rs.text("Update query for this case will be shown here!");
    });

    // copy content to clipboard
    copyBtn.click(function() {
        var el = $('#result');
        copyToClipboard(el);
    });

    // clean content when click on box
    $("#inTitle, #inDescription, #inH1, #id").on('click', function() {
        var self = $(this),
            output = self.next("textarea");

        self.val("");
        output.val("");
        generateUpdateQuery();
    });

    function convertString(content) {

        // convert variable match with variable in db
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

    function generateUpdateQuery() {
        var query = "UPDATE mst_moto_meta SET ",
            title = $('#outTitle').val(),
            description = $("#outDescription").val(),
            h1 = $("#outH1").val(),
            id = $("#id").val(),
            rs = $('#result');

        query += "`title`=" + '"' + title + '"' + ", " + "`description`=" + '"' + description + '"' + ", " + "`h1`=" + '"' + h1 + '"';
        query += " WHERE id = " + id;

        rs.text("");
        rs.text(query);
    }

    function copyToClipboard(el) {
        // validate before copy
        validateString();

        var temp = $("<input>");

        $("body").append(temp);
        temp.val(el.text()).select();
        document.execCommand("copy");
        temp.remove();
    }

    function validateString() {
        var content = $("#result").text(),
            expr = /(\{{1,2}|\$|\}{1,2})/g;

        if (expr.test(content)) {
            alert("Invalid content!");
        }
    }
});