window.Erro = window.Erro || {};
window.Erro.Carousel = {
    options: {
        items: 3,
        autoplay: false,
        // url: 'http://rh.itelios.com.br/Arquivos/TesteFront/produtos.php',
        url: 'js/data.json',
        currentPage: 0
    },
    create: function () {
        this.options.container = document.getElementById('products');
        this.options.reference = document.getElementsByClassName('reference')[0];
        this.options.pagination = document.getElementById('pagination');
        this.clearContainer();
        this.requestProducts();
    },
    destroy: function () {
        document.getElementsByClassName('container')[0].style.display = 'none';
    },
    requestProducts: function () {
        var me = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", me.options.url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    me.parseProducts(xhr.responseText)
                } else {
                    me.destroy();
                }
            }
        };
        xhr.onerror = function (e) {
            me.destroy();
        };
        xhr.send(null);
    },
    parseProducts: function (data) {
        var response = JSON.parse(data);
        this.options.total = response[0].data.widget.size;
        var reference = response[0].data.reference.item,
            items = response[0].data.recommendation;

        for (var i = 0; i < this.options.total; i++) {
            this.options.container.insertAdjacentHTML('beforeend', this.parseProduct(items[i], 'li'));
        }

        this.createReference(this.parseProduct(reference, 'div'));

        this.mountCarousel();
    },
    parseProduct: function (item, type) {
        var html = '';
        if (type == 'li') html += '<li class="product-inner">';

        html += '   <a href="' + item.detailUrl + '" class="product-link" title="' + item.name + '">';
        html += '       <figure class="product-image">';
        html += '           <img src="' + item.imageName + '" alt="' + item.name + '">';
        html += '       </figure>';
        html += '       <h2 class="product-title">' + item.name + '</h2>';
        html += '       <p class="product-price">Por: <strong>' + item.price + '</strong></p>';
        html += '       <p class="product-installments">' + item.productInfo.paymentConditions + '</p>';
        html += '       <button class="add-cart">adicionar ao carrinho <i class="mdi mdi-cart-plus"></i></button>';
        html += '   </a>';

        if (type == 'li') html += '</li>';

        return html;
    },
    createReference: function (item) {
        this.options.reference.insertAdjacentHTML('beforeend', item);
    },
    clearContainer: function () {
        while (this.options.container.hasChildNodes()) {
            this.options.container.removeChild(this.options.container.lastChild);
        }

        while (this.options.reference.hasChildNodes()) {
            this.options.reference.removeChild(this.options.reference.lastChild);
        }

        while (this.options.pagination.hasChildNodes()) {
            this.options.pagination.removeChild(this.options.pagination.lastChild);
        }
    },
    mountCarousel: function () {
        this.options.liWidth = document.getElementsByClassName('product-inner')[0].offsetWidth;
        this.options.container.style.width = this.options.liWidth * this.options.total + 1 + 'px';

        var pages = Math.ceil(this.options.total / 3);
        for (var i = 0; i < pages; i++) {
            var li = document.createElement('li');

            var a = document.createElement('a');
            a.setAttribute("data-page", i);
            a.href = '#' + i;
            a.onclick = this.goToPage;
            if (i == 0) a.className = 'active';


            li.appendChild(a);

            this.options.pagination.appendChild(li);
        }
    },
    goToPage: function () {
        var page = this.getAttribute('data-page');
        window.Erro.Carousel.changeActive(page)

        var total = window.Erro.Carousel.options.liWidth * 3;
        var elementWidth = window.Erro.Carousel.options.container.offsetWidth;
        var moveTo = page * total;

        if ((total + moveTo) > elementWidth) {
            var remainder = window.Erro.Carousel.options.total % 3;
            var rest = (3 - remainder) * window.Erro.Carousel.options.liWidth;
            moveTo = moveTo - rest;
        }

        window.Erro.Carousel.options.container.style.marginLeft = '-' + moveTo + 'px';
    },
    changeActive: function (page) {
        var elems = document.querySelectorAll("#pagination li a");

        elems.forEach.call(elems, function(el) {
            el.classList.remove("active");

            if(el.getAttribute('data-page') == page) {
                el.classList.add("active");
            }
        })
    }
};