let mediaCount = 6


$('#addmedia').click(function () {
    const selectedItem = $('.about-us-in-media .select').attr("data-select-selected")
    const btnMedia = $('#addmedia')

    $.ajax({
        dataType: "json",
        data: {'data': selectedItem, 'count': mediaCount},
        url: btnMedia.attr('value'),
        method: 'get',
        cache : false,
        success(data){
            $('.about-us-in-media__list').html(data.publications);
            mediaCount += 6;
            if (!data.show_button) {
                btnMedia.css('display', 'none');
                mediaCount = 6;
            }
        },
        error(response) {
            console.warn(response.responseJSON.errors)
        },
    });
})
