/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Image
6. Init Quantity
7. Init Isotope


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hambActive = false;
	var menuActive = false;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initSearch();
	initMenu();
	initImage();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch()
	{
		if($('.search').length && $('.search_panel').length)
		{
			var search = $('.search');
			var panel = $('.search_panel');

			search.on('click', function()
			{
				panel.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function(event)
			{
				event.stopPropagation();

				if(!menuActive)
				{
					openMenu();
					
					$(document).one('click', function cls(e)
					{
						if($(e.target).hasClass('menu_mm'))
						{
							$(document).one('click', cls);
						}
						else
						{
							closeMenu();
						}
					});
				}
				else
				{
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if($('.page_menu_item').length)
			{
				var items = $('.page_menu_item');
				items.each(function()
				{
					var item = $(this);

					item.on('click', function(evt)
					{
						if(item.hasClass('has-children'))
						{
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
						    if(subItem.hasClass('active'))
						    {
						    	subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, {height:0});
						    }
						    else
						    {
						    	subItem.toggleClass('active');
						    	TweenMax.set(subItem, {height:"auto"});
								TweenMax.from(subItem, 0.3, {height:0});
						    }
						}
						else
						{
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu()
	{
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu()
	{
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	5. Init Image

	*/

	function initImage()
	{
		var images = $('.details_image_thumbnail');
		var selected = $('.details_image_large img');

		images.each(function()
		{
			var image = $(this);
			image.on('click', function()
			{
				var imagePath = new String(image.data('image'));
				selected.attr('src', imagePath);
				images.removeClass('active');
				image.addClass('active');
			});
		});
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
			category: 'смартфоны',
			description:"Белый перламутровый цвет корпуса смартфона XIAOMI Redmi Note 9 64Gb понравится любой девушке. Модель работает под управлением ОС Android 10 и оснащена мощным 8-ми ядерным процессором Mediatek Helio G85. Благодаря 3 Гб оперативной памяти производительность модели остается высокой даже при большой загруженности системы. Объем встроенного хранилища составляет 64 Гб.\n" +
				"\n" +
				"Экран смартфона XIAOMI Redmi Note 9 64Gb имеет размер 6.53 дюйма и выполнен на базе матрицы IPS. Разрешение экрана составляет 2340x1080 пикселей, благодаря чему изображения отличаются особой реалистичностью и четкостью. 4 основных камеры на 48 Мп, 8 Мп, 2 Мп и 2 Мп обеспечивают профессиональное качество фото и видео. Фронтальная камера на 10 Мп позволяет делать отличные селфи. Тыловой сканер отпечатка пальца и разблокировка по лицу гарантированно сохранят конфиденциальность информации на устройстве.",
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
			description:"Белый перламутровый цвет корпуса смартфона XIAOMI Redmi Note 9 64Gb понравится любой девушке. Модель работает под управлением ОС Android 10 и оснащена мощным 8-ми ядерным процессором Mediatek Helio G85. Благодаря 3 Гб оперативной памяти производительность модели остается высокой даже при большой загруженности системы. Объем встроенного хранилища составляет 64 Гб.\n" +
				"\n" +
				"Экран смартфона XIAOMI Redmi Note 9 64Gb имеет размер 6.53 дюйма и выполнен на базе матрицы IPS. Разрешение экрана составляет 2340x1080 пикселей, благодаря чему изображения отличаются особой реалистичностью и четкостью. 4 основных камеры на 48 Мп, 8 Мп, 2 Мп и 2 Мп обеспечивают профессиональное качество фото и видео. Фронтальная камера на 10 Мп позволяет делать отличные селфи. Тыловой сканер отпечатка пальца и разблокировка по лицу гарантированно сохранят конфиденциальность информации на устройстве."
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

	var name = getUrlParameter('name');
	name = name[0].toUpperCase() + name.substring(1)

	$('.home_title').append(name + "<span>.</span>")
	name = getUrlParameter('name');
	var products = [];

	$.each(productsCategory, function (key, value) {
		if (value.name === name) {
			products.push(productsCategory[key]);
		}
	});
	if (localStorage.getItem('cartsum') != null) {
		$('#cart-col').text(localStorage.getItem('cartsum'));
	}
	$('.details_name').text(products[0].name);

	$('.details_price').text(products[0].price.toLocaleString('ru') + ' руб.');
	$('.details_text').text(products[0].description);
	$('.description_text').text(products[0].description);
	$('#details_image_large_img').attr('src', products[0].image);
	$('#details_image_thumbnail_img1').attr('src', products[0].image);
	$('#details_image_thumbnail_img2').attr('src', products[0].image);
	$('#details_image_thumbnail_img3').attr('src', products[0].image);
	$('#details_image_thumbnail_img4').attr('src', products[0].image);

	$('#details_image_thumbnail1').attr('data-image', products[0].image);
	$('#details_image_thumbnail2').attr('data-image', products[0].image);
	$('#details_image_thumbnail3').attr('data-image', products[0].image);
	$('#details_image_thumbnail4').attr('data-image', products[0].image);

	let local = JSON.parse(localStorage.getItem('productCart'));

	let index = findIndex(local, products[0].name);

	let tagPButton = $('<p class="tag-button"></p>');
	if (index!=undefined){

		let spanminus = $('<span class="minus">-</span>');

		let spanplus = $('<span class="plus">+</span>');

		let quantity = $('<input type="text" class="quantity" value='+local[index].quantity+' readOnly></input>');

		tagPButton.append(spanminus);
		tagPButton.append(quantity);
		tagPButton.append(spanplus);
	}else{
		let buttonBuy = $('<button class="btn btn-primary" value="'+products[0].name+'">В корзину</button>')
		tagPButton.append(buttonBuy);
	}
	$( ".product_quantity_container" ).append(tagPButton)


	$('body').on('click', '.minus', function(){
		let $input = $(this).parent().find('input[type=text]');
		let count = parseInt($input.val()) - 1;
		let nameproduct = $('.details_name').text();

		if (count < 1){

			let buttonBuy = $('<button class="btn btn-primary" value="'+nameproduct+'">В корзину</button>')

			$(this).closest('.plus').remove();
			$(this).parent().html(buttonBuy);


			let local = JSON.parse(localStorage.getItem('productCart'));
			let index = findIndex(local,nameproduct);
			local.splice(index, 1);

			if(local.length == 0){

				localStorage.removeItem('productCart');
				localStorage.removeItem('cartsum');
				$('#cart-col').text (0)

			}else{
				localStorage.setItem('productCart', JSON.stringify(local));
				localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))-1);
				$('#cart-col').text (localStorage.getItem('cartsum'))
			}


		} else {
			count = count;
			localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))-1);
			$('#cart-col').text (localStorage.getItem('cartsum'))

			let local = JSON.parse(localStorage.getItem('productCart'));
			let index = findIndex(local,nameproduct);
			local[index].quantity =  local[index].quantity-1;
			localStorage.setItem('productCart', JSON.stringify(local));
		}

		$input.val(count);
		$input.change();
		return false;
	});

	$('body').on('click', '.plus', function(){
		let $input = $(this).parent().find('input[type=text]');
		$input.val(parseInt($input.val()) + 1);
		let nameproduct = $('.details_name').text();


		let local = JSON.parse(localStorage.getItem('productCart'));
		let index = findIndex(local,nameproduct)
		local[index].quantity =  local[index].quantity+1;
		localStorage.setItem('productCart', JSON.stringify(local));

		localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))+1);
		$('#cart-col').text(localStorage.getItem('cartsum'));
		$input.change();
		return false;
	});


	$('body').on('click', '.btn.btn-primary', function(){


		let spanminus = $('<span class="minus">-</span>');

		let spanplus = $('<span class="plus">+</span>');

		let quantity = $('<input type="text" class="quantity" value="1" readOnly>');

		let index = findIndex(products, $(this).val());


		if (localStorage.getItem('cartsum') != null)
		{
			let productCart =
				{
					name: products[index].name,
					image: products[index].image,
					price: products[index].price,
					category: products[index].category,
					quantity: 1
				};
			localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))+1);
			let local = JSON.parse(localStorage.getItem('productCart'));

			local.push(productCart);
			localStorage.setItem('productCart', JSON.stringify(local));
		} else
		{
			let productCart =[
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