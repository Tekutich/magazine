/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Quantity


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
	initQuantity();

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

	5. Init Quantity

	*/

	function initQuantity()
	{
		// Handle product quantity input
		if($('.product_quantity').length)
		{
			var input = $('#quantity_input');
			var incButton = $('#quantity_inc_button');
			var decButton = $('#quantity_dec_button');

			var originalVal;
			var endVal;

			incButton.on('click', function()
			{
				originalVal = input.val();
				endVal = parseFloat(originalVal) + 1;
				input.val(endVal);
			});

			decButton.on('click', function()
			{
				originalVal = input.val();
				if(originalVal > 0)
				{
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
			});
		}
	}


	function findIndex(array,name){
		let index;
		$.each(array, function(key,value){
			if (value.name==name){
				index = key;

			}
		});
		return index;
	}

	function sumPrice(){
		let local = JSON.parse(localStorage.getItem('productCart'));
		let sum=0;
		$.each(local, function(key,value) {
			sum+=value.price*value.quantity
		})
		return sum;
	}



	var products =  JSON.parse(localStorage.getItem('productCart'));

	if (products===null){

		let noProducts = $('<h2 class="no-product-text">Ваша корзина пока пуста</h2>');
		$('#container-products-cart').append(noProducts);

	}else{

		$('#cart-col').text(localStorage.getItem('cartsum'));
		products.sort(function (a,b){
			return (a.name.localeCompare(b.name));
		});

		var iddiv="products-Cart";

		$.each(products, function(key,value) {

			let divRow = $('<div id='+iddiv+key+' class="row hr-bottom"></div>');
			$('#container-products-cart').append(divRow);

			let divColImg =$('<div class="col-lg-3 col-sm-3 col-xs-12 my-auto mx-auto mob-fix"></div>');
			let imgProduct = $('<img  class="img-cart" src ='+value.image+'>');

			let divColName =$('<div class="col-lg-3 col-sm-3 col-xs-12 my-auto mob-fix name-product" >'+value.name+'</div>');

			let pricevalue=value.price.toLocaleString('ru')+' руб.';
			let divColPrice =$('<div class="col-lg-2 col-sm-3 col-xs-12 my-auto mob-fix">'+pricevalue+'</div>');

			let divColQuantity =$('<div class="col-lg-2 col-sm-3 col-xs-12 my-auto mob-fix"></div>');

			let spanminus = $('<span class="minus">-</span>');
			let spanplus = $('<span class="plus">+</span>');
			let quantity = $('<input type="text" class="quantity" value='+value.quantity+' readOnly></input>');

			let sum = (value.quantity*value.price).toLocaleString('ru')+' руб.';
			let divColSum = $('<div class="col-lg-2 col-sm-3 col-xs-12 my-auto mob-fix sum">'+sum+'</div>');


			divRow.append(divColImg);
			divColImg.append(imgProduct);

			divRow.append(divColName);

			divRow.append(divColPrice);

			divRow.append(divColQuantity);
			divColQuantity.append(spanminus);
			divColQuantity.append(quantity);
			divColQuantity.append(spanplus);

			divRow.append(divColSum);

		});
		//строка итого
		let divRowSum = $('<div id="div-row-sum" class="row"></div>');
		$('#container-products-cart').append(divRowSum);

		let total = 'Итого: '+sumPrice().toLocaleString('ru')+' руб.';
		let divColSum = $('<div  class="col text-right mob-fix total-sum">'+total+'</div>');
		divRowSum.append(divColSum);



		//строка с кнопкой
		let divRow = $('<div id="div-row-buy"  class="row"></div>');
		$('#container-products-cart').append(divRow);


		let divColBuy = $('<div class="col text-center mob-fix"></div>');
		divRow.append(divColBuy);

		let buttonBuy = $('<button id="button-buy" class="btn btn-primary cart-button" data-toggle="modal" data-target="#modal-cart">Оформить заказ</button>')
		divColBuy.append(buttonBuy);
	}




	$('body').on('click', '.minus', function(){
		var $input = $(this).parent().find('input[type=text]');
		var count = parseInt($input.val()) - 1;
		var nameproduct =$(this).closest('.hr-bottom').find('.name-product').text();

		if (count < 1){

			let local = JSON.parse(localStorage.getItem('productCart'));
			let index = findIndex(local,nameproduct);
			local.splice(index, 1);
			$(this).closest('.row').remove();


			if(local.length == 0){

				localStorage.removeItem('productCart');
				localStorage.removeItem('cartsum');
				$('#cart-col').text (0);
				$('#div-row-buy').remove();
				$('#div-row-sum').remove();

				let noProducts = $('<h2 class="no-product-text">Ваша корзина пока пуста</h2>');
				$('#container-products-cart').append(noProducts);

			}else{
				localStorage.setItem('productCart', JSON.stringify(local));
				localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))-1);
				$('#cart-col').text (localStorage.getItem('cartsum'))
				$('#div-row-sum').children('.total-sum').text ('Итого: '+sumPrice().toLocaleString('ru')+' руб.');
			}


		} else {
			count = count;
			localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))-1);
			$('#cart-col').text (localStorage.getItem('cartsum'))

			let local = JSON.parse(localStorage.getItem('productCart'));
			let index = findIndex(local,nameproduct);

			local[index].quantity =  local[index].quantity-1;
			localStorage.setItem('productCart', JSON.stringify(local));
			$('#div-row-sum').children('.total-sum').text ('Итого: '+sumPrice().toLocaleString('ru')+' руб.');
			let sum=local[index].quantity*local[index].price
			$(this).closest('.hr-bottom').find('.sum').text(sum.toLocaleString('ru')+' руб.');

		}

		$input.val(count);
		$input.change();
		return false;
	});





	$('body').on('click', '.plus', function(){
		var $input = $(this).parent().find('input[type=text]');
		$input.val(parseInt($input.val()) + 1);
		var nameproduct = $(this).closest('.hr-bottom').find('.name-product').text();

		let local = JSON.parse(localStorage.getItem('productCart'));
		let index = findIndex(local,nameproduct)
		local[index].quantity =  local[index].quantity+1;
		localStorage.setItem('productCart', JSON.stringify(local));

		let sum=local[index].quantity*local[index].price
		$(this).closest('.hr-bottom').find('.sum').text(sum.toLocaleString('ru')+' руб.');

		localStorage.setItem('cartsum', parseInt(localStorage.getItem('cartsum'))+1);
		$('#cart-col').text(localStorage.getItem('cartsum'));
		$('#div-row-sum').children('.total-sum').text ('Итого: '+sumPrice().toLocaleString('ru')+' руб.');
		$input.change();
		return false;
	});


	$('body').on('click', '#button-buy', function(){

		$('.modal-body').empty();
		let iddiv="productsBuy";
		let productsBuy =  JSON.parse(localStorage.getItem('productCart'));
		$.each(productsBuy, function(key,value) {

			let divRow = $('<div id='+iddiv+key+' class="row hr-bottom"></div>');
			$('.modal-body').append(divRow);

			let divColImg =$('<div class="col-lg-3 col-sm-3 col-xs-12 my-auto mx-auto mob-fix"></div>');
			let imgProduct = $('<img  class="img-cart" src ='+value.image+'>');

			let divColName =$('<div class="col-lg-3 col-sm-3 col-xs-12 my-auto mob-fix name-product">'+value.name+'</div>');

			let pricevalue=value.price.toLocaleString('ru')+' руб.';
			let divColPrice =$('<div class="col-lg-2 col-sm-3 col-xs-12 my-auto mob-fix">'+pricevalue+'</div>');

			let divColQuantity =$('<div class="col-lg-2 col-sm-3 col-xs-12 my-auto mob-fix"></div>');

			let spanminus = $('<span class="minus">-</span>');
			let spanplus = $('<span class="plus">+</span>');
			let quantity = $('<input type="text" class="quantity" value='+value.quantity+' readOnly></input>');

			let sum = (value.quantity*value.price).toLocaleString('ru')+' руб.';
			let divColSum = $('<div class="col-lg-2 col-sm-3 col-xs-12 my-auto mob-fix sum">'+sum+'</div>');



			divRow.append(divColImg);
			divColImg.append(imgProduct);

			divRow.append(divColName);

			divRow.append(divColPrice);

			divRow.append(divColQuantity);
			divColQuantity.append(quantity);

			divRow.append(divColSum);

		});

		//строка итого
		let divRowSum = $('<div id="div-row-sum" class="row"></div>');
		$('.modal-body').append(divRowSum);

		let total = 'Итого: '+sumPrice().toLocaleString('ru')+' руб.';
		let divColSumItogo = $('<div  class="col text-right mob-fix">'+total+'</div>');
		divRowSum.append(divColSumItogo);

	});

	$('body').on('click', '#modal-ok', function(){
		$('#modal-cart').modal("hide");
		$('.modal-body').empty();
		$('#container-products-cart').empty();
		localStorage.removeItem('productCart');
		localStorage.removeItem('cartsum');
		$('#cart-col').text('0');
		let noProducts = $('<h2 class="no-product-text">Ваша корзина пока пуста</h2>');
		$('#container-products-cart').append(noProducts);


	});

});