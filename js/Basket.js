function Basket(idBasket) {
    Container.call(this, idBasket);

    this.countGoods = 0; //Общее количество товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров

    //Получаем все товары, при созаднии корзины
    // this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root) {
    var $basketDiv = $('<div />', {
        id: this.id
    });

    // var $basketItemsDiv = $('<div />', {
    //     id: this.id + '_items'
    // });
    //
    // $basketItemsDiv.appendTo($basketDiv);
    $basketDiv.appendTo(root);
};


/**
 * Метод получения/загрузки товаров
 */
// Basket.prototype.loadBasketItems = function () {
//     var appendId = '#' + this.id + '_items';
//
//     //var self = this;
//     $.get({
//         url: 'basket.json',
//         dataType: 'json',
//         context: this,
//         success: function (data) {
//             var $basketData = $('<div />', {
//                 id: 'basket_data'
//             });
//
//             this.countGoods = data.basket.length;
//             this.amount = data.amount;
//
//             $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
//             $basketData.append('<p>Общая сумма: ' + this.amount + '</p>');
//
//             $basketData.appendTo(appendId);
//
//             for (var itemKey in data.basket)
//             {
//                 this.basketItems.push(data.basket[itemKey]);
//             }
//         }
//     });
// };

Basket.prototype.add = function (idProduct) {

    $.get({
        url: 'ajax/addbasket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var basketItem = data[idProduct];
            basketItem.quantity = 1;

            this.countGoods++;
            this.amount += basketItem.price;
            // this.basketItems.push(basketItem);
            var isNotInBasket = true;
            for (var itemKey in this.basketItems) {
                if (basketItem.id === this.basketItems[itemKey].id) {
                    this.basketItems[itemKey].quantity += 1;
                    isNotInBasket = false;
                }
            }
            if (isNotInBasket) {
                this.basketItems.push(basketItem)
            }
            console.log(this.basketItems);
            this.refresh(); //Перерисовываем корзину
        }
    });

    // console.log(basketItem);


};

Basket.prototype.delete = function (basket_id) {
    console.log(this);
    this.countGoods -= this.basketItems[basket_id].quantity;
    this.basketItems.splice(basket_id, 1);
    this.refresh();
};

Basket.prototype.refresh = function () {
    var $basketData = $('#basket_data');
    $basketData.empty(); //Очищаем содержимое контейнера
    var $basketList = $basketData.append('<ul></ul>').find('ul');
    var basket_id = 0;
    this.amount = 0;
    this.countGoods = 0;
    console.log(this.basketItems);
    if (this.basketItems.length > 0) {

    for (var itemKey in this.basketItems) {
        this.amount += this.basketItems[itemKey].price * this.basketItems[itemKey].quantity;
        this.countGoods += this.basketItems[itemKey].quantity;

        $basketList.append('<li data-id = '+basket_id+'><a href="#"><img src="' + this.basketItems[itemKey].image + '" alt="' + this.basketItems[itemKey].title + '"></a> <a class="title" href="#"><h2>' + this.basketItems[itemKey].title + '</h2></a><span><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i></span><a class="cancel"  href="#"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a><p>' + this.basketItems[itemKey].quantity + ' x &#36;' + this.basketItems[itemKey].price + '</p></li>');
        basket_id++;
    }

    $basketData.append('<p class="total">TOTAL <span>&#36;'+this.amount+'</span></p>');
    $basketData.append('<button>Checkout</button>');
    $basketData.append('<button>Go to cart</button>');
    } else {
        $basketData.append('<p class="total">EMPTY</p>');
    }
    $('#basket span').text(this.countGoods);
};

