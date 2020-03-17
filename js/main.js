$(document).ready(function() {

    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);

    $(".genre-selector").change(function() {
        var genreSel = $(this).val();
        if (genreSel == "") {
            $(".card").show();
        } else {
            $(".card").each(function() {
                if (genreSel.toLowerCase() == $(this).data("genre").toLowerCase()) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function(data) {
            console.log(data);
            var albums = data.response;
            for (var i = 0; i < albums.length; i++) {
                var album = albums[i];
                console.log(album);
                var albumProperties = {
                    albumImg: album.poster,
                    albumName: album.title,
                    author: album.author,
                    genre: album.genre,
                    year: album.year
                };
                var albumCard = cardTemplate(albumProperties);
                $(".cards-container").append(albumCard);
            }
        },
        error: function() {
            alert("Errore!")
        }
    })

});
