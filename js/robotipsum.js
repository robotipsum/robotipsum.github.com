var $text = $(".text");

$(document).ready(function(){

    $("[rel=tooltip]").tooltip({ placement: 'top'});
    $("[rel=hal]").tooltip({ placement: 'bottom'});

    $('a#copy-description').click(function (e) {
        e.preventDefault();
        var text = $('p#description').text();

        navigator.clipboard.writeText(text);
    });

});

function generateWords(prefixes, suffixes) {
    var amount = $(".js-wordcount").val();

    // Count to put a period every x + rand() words.
    var count = 0;
    for (var i = 0; i < amount; i++) {

        // Random number between 1 and 5
        var rand = Math.floor(Math.random() * 5) + 1;

        var pi = Math.floor(Math.random()*prefixes.length);
        var si = Math.floor(Math.random()*suffixes.length);

        // If count is zero then it is the first word in a sentence.
        if (count == 0) {
            var word = prefixes[pi].charAt(0).toUpperCase() + prefixes[pi].slice(1);
            $text.text($text.text() + word + suffixes[si] + " ");
            count++;
        } else {
            if ((count + rand) > 10) {
                $text.text($text.text() + prefixes[pi] + suffixes[si] + ". ");
                count = 0;
            } else {
                $text.html($text.text() + prefixes[pi] + suffixes[si] + " ");
                count++;
            }
        }
    }
    $text.text($text.text().substring(0, $text.text().length - 1) + ". ");
}

$(".js-submit").click(function() {
    $(this).val("Generate more");
    $text.show();
    $.ajax({
        url: "./morphemes.json"
    }).done(function(data) {
        generateWords(data.prefixes, data.suffixes)
    });
});

$(".share").click(function() {
    $("#share").modal();
});

$(".learn").click(function() {
    $("#learn").modal();
});

$(".reset").click(function() {
    $text.text("").hide();
});
