$(document).ready(function(){

	$("[rel=tooltip]").tooltip({ placement: 'top'});
	$("[rel=hal]").tooltip({ placement: 'bottom'});
		
	$('a#copy-description').zclip({
	path:'./js/ZeroClipboard.swf',
	copy:$('pre#description').text()
	});

});

function generateWords(prefixes, suffixes) {
    var amount = document.getElementById('wordcount').value;
    var span = document.getElementById('text');
    var but = document.getElementById('but');
    span.style.display = 'block';
    but.value="Generate More";

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
            span.innerHTML = span.innerHTML + (word + suffixes[si] + " ");
            count++;
        } else {
            if ((count + rand) > 10) {
                span.innerHTML = span.innerHTML + (prefixes[pi] + suffixes[si] + ". ");
                count = 0;
            } else {
                span.innerHTML = span.innerHTML + (prefixes[pi] + suffixes[si] + " ");
                count++;
            }
        }
    }
    span.innerHTML = span.innerHTML.substring(0, span.innerHTML.length - 1) + ". ";

}

$(".js-submit").click(function() {
    $.ajax({
        url: "./morphemes.json"
    }).done(function(data) {
        generateWords(data.prefixeses, data.suffixeses)
    });
});

$(".share").click(function() {
    $("#share").modal();
});

$(".learn").click(function() {
    $("#learn").modal();
});

$(".reset").click(function() {
    location.reload();
});
