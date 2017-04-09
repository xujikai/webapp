写前思考：

购物车(cart)：Map结构

    产品id:产品数量

产品列表(products)：Map结构

    产品id：产品对象

    const datas = [
        {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
        {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
        {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
    ];

    const map = new Map();
    datas.map((item) => {
       map.set(item.id,item);
    });
    console.log(map);

遇到问题：

1. reducer中返回的状态值必须为一个新对象。
2. 定义一个组件时限制数据类型，值定义之后，在写该组件的时候会有提示。

        //简单值
        Product.propTypes = {
            title:PropTypes.string,
            price:PropTypes.number,
            quantity:PropTypes.number
        };

        //对象和函数
        ProductItem.propTypes = {
            product: PropTypes.shape({
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                inventory: PropTypes.number.isRequired
            }).isRequired,
            onAddToCart: PropTypes.func.isRequired
        };

        //数组中的对象
        ProductsList.propTypes = {
            title: PropTypes.string.isRequired,
            products: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                inventory: PropTypes.number.isRequired
            })).isRequired,
            addToCart: PropTypes.func.isRequired
        };

3. 对象赋值解构时，因大意遇到的问题