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