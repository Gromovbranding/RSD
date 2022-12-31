$(document).ready(function () {
    $('.navigator__bar').click(function () {
        $(this).parents('.navigator').toggleClass('navigator--active')
    })

  $(".local-news-channel__constituencies-items a").click(function () {
    const id = $(this).attr("data-id");
    $(this)
      .parents(".local-news-channel__constituencies")
      .toggleClass("local-news-channel__constituencies--open");
    console.log(id);
  });

  $(".form__docs button").click(function (e) {
    e.preventDefault();

    const data = $(this).parents(".form__docs").serialize();

    $.ajax({
      data,
      url: "",
      method: "get",
      cache: false,
      success: function (data) {
        $(".gos-docs__content div:first-child").html(data);
      },
      error: function (response) {
        console.log(response.responseJSON.errors);
      },
    });
  });

  $(".local-news-channel__constituencies > button").click(function () {
    $(this).parent().toggleClass("local-news-channel__constituencies--open");
  });

  $(".select").click(function () {
    $(this).toggleClass("select--active");
  });

  $(".select .select__item").click(function (e) {
    e.stopPropagation();

    const val = $(this).attr("data-select-value");
    const select = $(this).parents(".select");
    const headlineDefault = select
      .find('.select__item[data-select-value="default"]')
      .text();

    select
      .find(".select__headline span")
      .text(val === "default" ? headlineDefault : val);
    select.attr("data-select-selected", val);
    select.toggleClass("select--active");
    select.find("input").val(val);

    $(".about-us-in-media").length > 0 &&
      $.ajax({
        dataType: "json",
        data: { data: val, count: 0 },
        url: $(".btn-default.btn-default--outline-default").attr("value"),
        method: "get",
        cache: false,
        success: function (data) {
          // interval = setTimeout(callAjax, 1000);
          $(".about-us-in-media__list").replaceWith($(data.publications));
          if (data.show_button === false) {
            $(".btn-default.btn-default--outline-default").css(
              "display",
              "none"
            );
          } else {
            $(".btn-default.btn-default--outline-default").css("display", "");
          }
        },
        error: function (response) {
          console.log(response.responseJSON.errors);
        },
      });
  });

  $(".header-main__nav-pages__nav-item").hover(function () {
    $(this).toggleClass("header-main__nav-pages__nav-item--submenu-active");
  });

  $(".header-main__mobile-menu__item").click(function () {
    $(this).toggleClass("header-main__mobile-menu__item--active");
  });

  $("#mobile-burger").click(function () {
    $("#mobile-menu").toggleClass("header-main__mobile-menu--active");
    $('.header-main__mobile-menu-search').toggleClass('header-main__mobile-menu-search--active')
    $(this).toggleClass('header__burger--active')
  });

  if ($("[data-modal]").length > 0)
    new Modal({
      linkAttributeName: "data-modal",
    });

  $(".slider").each(function () {
    const count = $(this).attr("data-count") ? +$(this).attr("data-count") : 1;
    const slider = $(this).attr("data-slider");
    const dots = $(this).attr("data-dots");
    const badge = $(this).attr("data-badge-count");
    const responsive = [];


    if (count === 2) {
      responsive.push(
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 525,
          settings: {
            slidesToShow: 1,
          },
        }
      );
    } else if (count === 3) {
      responsive.push(
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 525,
          settings: {
            slidesToShow: 1,
          },
        }
      );
    }

    if (badge) {
      $(`[data-slider="${slider}"]`).append(`
        <div class="badge-counter-img-slider">
          <span>
            ${$(`[data-slider="${slider}"]  .slider__items .slider__item`).length}
          </span>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_600_2309)">
            <path d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z" fill="black"/>
            <path d="M25 5H21.0375L19.4875 3.3125C19.025 2.8 18.35 2.5 17.65 2.5H12.35C11.65 2.5 10.975 2.8 10.5 3.3125L8.9625 5H5C3.625 5 2.5 6.125 2.5 7.5V22.5C2.5 23.875 3.625 25 5 25H25C26.375 25 27.5 23.875 27.5 22.5V7.5C27.5 6.125 26.375 5 25 5ZM15 21.25C11.55 21.25 8.75 18.45 8.75 15C8.75 11.55 11.55 8.75 15 8.75C18.45 8.75 21.25 11.55 21.25 15C21.25 18.45 18.45 21.25 15 21.25Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_600_2309">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
      `)
    }

    switch (slider) {
      case "useful-info":
        responsive.push({
          breakpoint: 525,
          settings: "unslick",
        });
    }

    $(`[data-slider="${slider}"]  .slider__items`).slick({
      infinite: true,
      slidesToShow: count,
      slidesToScroll: 1,
      prevArrow: $(
        `[data-slider="${slider}"]  .slider__control[data-slide="prev"]`
      ),
      nextArrow: $(
        `[data-slider="${slider}"]  .slider__control[data-slide="next"]`
      ),
      dots:
        dots === "y" &&
        $(`[data-slider="${slider}"]  .slider__item `).length > 2,
      autoplay: true,
      responsive,
    });
  });

  function download(url, method) {
    $.ajax({
      url,
      method,
      dataType: "json",
      // data: {text: 'Текст'},
      success: function (jsonData) {
        const parent = $(this)
          .parents(".content-filter__content")
          .find(".content-filter__content-other");
        const data = JSON.parse(jsonData);
        const structure = `
                    <article class="card-article">
                        <img class="image" src="${data.image}" alt="">
                        <h3>${data.headline}</h3>
                        <div class="card-article__info">
                            <time datetime="${data.date}">
                                ${data.date}
                            </time>
                        </div>
                    </article>
                `;
        parent.append(structure);

        if ($(".content-filter__content-other article").length > 0)
          $(".content-filter__content-other__download").css("display", "none");
      },
    });
  }


  // For news

  $('.content-filter__filters-list > button, #last-news').click(function (e) {
      e.preventDefault()
      const val = $(this).attr('value').split(', ')

      $(".content-filter__filters-list > button, #last-news").addClass('btn-default--outline-blue').removeClass('btn-default--blue')
      $(this).addClass('btn-default--blue').removeClass('btn-default--outline-blue')

      $.ajax({
        dataType: "json",
        data: {data: val[1]},
        url: val[0],
        method: 'get',
        success: (data) => {
            $('.content-filter__content').replaceWith($(data.news));
            $('.content-filter__headline').replaceWith($(data.channel));
            count = 9;
        },
        error: (response) => {
            console.log(response.responseJSON.errors)
        },
    });
  })
});



