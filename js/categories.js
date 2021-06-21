/* JS Document */

/******************************

 [Table of Contents]

 1. Vars and Inits
 2. Set Header
 3. Init Search
 4. Init Menu
 5. Init Isotope


 ******************************/

$(document).ready(function () {
    "use strict";

    /*

    1. Vars and Inits

    */

    var header = $('.header');
    var hambActive = false;
    var menuActive = false;

    setHeader();

    $(window).on('resize', function () {
        setHeader();
    });

    $(document).on('scroll', function () {
        setHeader();
    });

    initSearch();
    initMenu();
    //initIsotope();

    /*

    2. Set Header

    */

    function setHeader() {
        if ($(window).scrollTop() > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    }

    /*

    3. Init Search

    */

    function initSearch() {
        if ($('.search').length && $('.search_panel').length) {
            var search = $('.search');
            var panel = $('.search_panel');

            search.on('click', function () {
                panel.toggleClass('active');
            });
        }
    }

    /*

    4. Init Menu

    */

    function initMenu() {
        if ($('.hamburger').length) {
            var hamb = $('.hamburger');

            hamb.on('click', function (event) {
                event.stopPropagation();

                if (!menuActive) {
                    openMenu();

                    $(document).one('click', function cls(e) {
                        if ($(e.target).hasClass('menu_mm')) {
                            $(document).one('click', cls);
                        } else {
                            closeMenu();
                        }
                    });
                } else {
                    $('.menu').removeClass('active');
                    menuActive = false;
                }
            });

            //Handle page menu
            if ($('.page_menu_item').length) {
                var items = $('.page_menu_item');
                items.each(function () {
                    var item = $(this);

                    item.on('click', function (evt) {
                        if (item.hasClass('has-children')) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            var subItem = item.find('> ul');
                            if (subItem.hasClass('active')) {
                                subItem.toggleClass('active');
                                TweenMax.to(subItem, 0.3, {height: 0});
                            } else {
                                subItem.toggleClass('active');
                                TweenMax.set(subItem, {height: "auto"});
                                TweenMax.from(subItem, 0.3, {height: 0});
                            }
                        } else {
                            evt.stopPropagation();
                        }
                    });
                });
            }
        }
    }

    function openMenu() {
        var fs = $('.menu');
        fs.addClass('active');
        hambActive = true;
        menuActive = true;
    }

    function closeMenu() {
        var fs = $('.menu');
        fs.removeClass('active');
        hambActive = false;
        menuActive = false;
    }

    function findIndex(array, name) {
        let index;
        $.each(array, function (key, value) {
            if (value.name == name) {
                index = key;

            }
        });
        return index;
    }

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    var productsCategory = [
        {
            name: 'Смартфон Samsung Galaxy S21 128GB Phantom Violet (SM-G991B)',
            image: "src/products/samsungS21.jpg",
            price: 67990,
            category: 'смартфоны',
        },
        {
            name: 'Смартфон Apple iPhone 12 128GB Black (MGJA3RU/A)',
            image: "src/products/iphone12.jpg",
            price: 84990,
            category: 'смартфоны'
        },
        {
            name: 'Смартфон Huawei Mate 40 Pro Mystic Silver',
            image: "src/products/huaweimate40.jpg",
            price: 89990,
            category: 'смартфоны'
        }
        ,
        {
            name: 'Смартфон Samsung Galaxy A31 64GB Black (SM-A315F)',
            image: "src/products/samsungA31.jpg",
            price: 18490,
            category: 'смартфоны',
        },
        {
            name: ' Смартфон Xiaomi Redmi Note 8 Pro 6+64GB Pearl White',
            image: "src/products/xiaomiRedNote8.jpg",
            price: 16990,
            category: 'смартфоны',
        },
        {
            name: 'Ноутбук игровой HP OMEN 15-en0019ur \n 1U3C7EA',
            image: "src/products/hpOmen15.jpg",
            price: 74990,
            category: 'ноутбуки',
        },
        {
            name: 'Ноутбук игровой Acer Nitro 5 AN515-54-72GJ NH.Q59ER.023',
            image: "src/products/acerNitro5.jpg",
            price: 82990,
            category: 'ноутбуки',
        },
        {
            name: 'Ноутбук Apple MacBook Air 13 M1/8/256 Gold',
            image: "src/products/macbookair13.jpg",
            price: 99990,
            category: 'ноутбуки',
        },
        {
            name: 'Робот-пылесос Tefal X-plorer serie 60 Allergy Kit(RG7447WH)',
            image: "src/products/tefal.jpg",
            price: 19990,
            category: 'бытовая техника',
        },
        {
            name: 'Пылесос ручной (handstick) Samsung Jet 70 turbo VS15T7031R4',
            image: "src/products/samsungJet.jpg",
            price: 17990,
            category: 'бытовая техника',
        },
        {
            name: 'Телевизор Samsung UE43TU7170U',
            image: "src/products/samsungTV.jpg",
            price: 28990,
            category: 'телевизоры',
        },
        {
            name: 'Телевизор LG NanoCell 55NANO866NA',
            image: "src/products/lgTV.jpg",
            price: 59990,
            category: 'телевизоры',
        }
    ];

    var category = getUrlParameter('category');
    category = category[0].toUpperCase() + category.substring(1)

    $('.home_title').append(category + "<span>.</span>")
    category = category[0].toLowerCase() + category.substring(1)
    var products = [];
    $.each(productsCategory, function (key, value) {
        if (value.category === category) {
            products.push(productsCategory[key]);
        }
    });

    products.sort(function (a, b) {
        return (a.name.localeCompare(b.name));
    });

    if (localStorage.getItem('cartsum') != null) {
        $('#cart-col').text(localStorage.getItem('cartsum'));
    }
    var i = 0;
    var iddiv = "products-show";
    $.each(products, function (key, value) {
        if (i === 3) {
            i = 0;

            let divRow = $('<div id="' + iddiv + key + '" class="row justify-content-md-center-my-auto row-flex"></div>');
            $('#container-products-Show').append(divRow);
            iddiv += key;
        }

        let divCol = $('<div id="' + key + '" class="col justify  content-center my-auto col-product"></div>');

        let imgProduct = $('<img  class="img-fluid mx-auto d-block img-product" src ="' + value.image + '">');

        let divCenter = $('<div  class="text-center"></div>');

        let tagPPrice = $('<p></p>');

        let pricevalue = value.price.toLocaleString('ru') + ' руб.';
        let price = $('<div  class="price">' + pricevalue + '</div>');

        let tagPName = $('<p class="name-product">' + value.name + '</p>');

        let tagPButton = $('<p class="tag-button"></p>');

        let productname = localStorage.getItem(value.name)
        let local = JSON.parse(localStorage.getItem('productCart'));

        $('#' + iddiv).append(divCol);
        divCol.append(imgProduct);
        divCol.append(divCenter);
        divCenter.append(tagPPrice);
        tagPPrice.append(price);
        divCenter.append(tagPName);
        divCol.append(tagPButton);

        let index = findIndex(local, value.name);

        if (index != undefined) {

            let spanminus = $('<span class="minus">-</span>');

            let spanplus = $('<span class="plus">+</span>');

            let quantity = $('<input type="text" class="quantity" value=' + local[index].quantity + ' readOnly></input>');

            tagPButton.append(spanminus);
            tagPButton.append(quantity);
            tagPButton.append(spanplus);
        } else {
            let buttonBuy = $('<button class="btn btn-primary" value="' + value.name + '">В корзину</button>')
            tagPButton.append(buttonBuy);
        }

        i++;
    });


    $('body').on('click', '.minus', function () {
        let $input = $(this).parent().find('input[type=text]');
        let count = parseInt($input.val()) - 1;
        let nameproduct = $(this).closest('.col-product').find('.name-product').text();

        if (count < 1) {

            let buttonBuy = $('<button class="btn btn-primary" value="' + nameproduct + '">В корзину</button>')

            $(this).closest('.plus').remove();
            $(this).parent().html(buttonBuy);


            let local = JSON.parse(localStorage.getItem('productCart'));
            let index = findIndex(local, nameproduct);
            local.splice(index, 1);

            if (local.length == 0) {

                localStorage.removeItem('productCart');
                localStorage.removeItem('cartsum');
                $('#cart-col').text(0)

            } else {
                localStorage.setItem('productCart', JSON.stringify(local));
                localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum')) - 1);
                $('#cart-col').text(localStorage.getItem('cartsum'))
            }

        } else {
            count = count;
            localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum')) - 1);
            $('#cart-col').text(localStorage.getItem('cartsum'))

            let local = JSON.parse(localStorage.getItem('productCart'));
            let index = findIndex(local, nameproduct);
            local[index].quantity = local[index].quantity - 1;
            localStorage.setItem('productCart', JSON.stringify(local));
        }

        $input.val(count);
        $input.change();
        return false;
    });

    $('body').on('click', '.plus', function () {
        let $input = $(this).parent().find('input[type=text]');
        $input.val(parseInt($input.val()) + 1);
        let nameproduct = $(this).closest('.col-product').find('.name-product').text();


        let local = JSON.parse(localStorage.getItem('productCart'));
        let index = findIndex(local, nameproduct)
        local[index].quantity = local[index].quantity + 1;
        localStorage.setItem('productCart', JSON.stringify(local));

        localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum')) + 1);
        $('#cart-col').text(localStorage.getItem('cartsum'));
        $input.change();
        return false;
    });


    $('body').on('click', '.btn.btn-primary', function () {


        let spanminus = $('<span class="minus">-</span>');

        let spanplus = $('<span class="plus">+</span>');

        let quantity = $('<input type="text" class="quantity" value="1" readOnly>');

        let index = findIndex(products, $(this).val());


        if (localStorage.getItem('cartsum') != null) {
            let productCart =
                {
                    name: products[index].name,
                    image: products[index].image,
                    price: products[index].price,
                    category: products[index].category,
                    quantity: 1
                };
            localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum')) + 1);
            let local = JSON.parse(localStorage.getItem('productCart'));

            local.push(productCart);
            localStorage.setItem('productCart', JSON.stringify(local));
        } else {
            let productCart = [
                {
                    name: products[index].name,
                    image: products[index].image,
                    price: products[index].price,
                    category: products[index].category,
                    quantity: 1
                }];
            localStorage.setItem('cartsum', 1);
            localStorage.setItem('productCart', JSON.stringify(productCart));
        }


        $(this).parent().append(spanminus);
        $(this).parent().append(quantity);
        $(this).parent().append(spanplus);
        $(this).remove();
        $('#cart-col').text(localStorage.getItem('cartsum'));


    });


});