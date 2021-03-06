const express = require('express');
const router = express.Router();
var g = require('ger');
const promisePool = require('../../config/db');

router.get('/:id', (req, res) => {
    var esm = new g.MemESM();
    var ger = new g.GER(esm);
    async function main() {
        var id = req.params.id;
        var idd = parseInt(id, 10);
        var document = [];
        // query database using promises
        const [rows, fields] = await promisePool.query("SELECT user_id, product_id FROM product_wishlist;");
        rows.forEach((rows) => {
            // cont = rows.brand_name + " " + rows.product_name;
            document.push({
                namespace: 'movies',
                person: rows.user_id,
                action: 'likes',
                thing: rows.product_id,
                expires_at: '2020-06-06'
            });
            // console.log(`${rows.brand_name} is in ${rows.product_name}`);
        });
        console.log(document);
        ger.initialize_namespace('movies')
            .then(function () {
                return ger.events(document)
            })
            .then(function () {
                // What things might alice like?
                return ger.recommendations_for_person('movies', idd, { actions: { likes: 1 }, "filter_previous_actions": ["likes"] })
            })
            .then(async function (recommendations) {
                console.log(`\nRecommendations For ${id}`)
                console.log(JSON.stringify(recommendations, null, 2))
                var hamzaNeeds = [];
                for (const item of recommendations.recommendations) {
                    var adr = item.thing;
                    var sql = 'SELECT DISTINCT products.product_id, product_shop.ps_id, products.product_name, product_shop.product_link, product_shop.product_feature_RAM, product_shop.product_feature_ROM, product_shop.product_feature_screenSize, product_shop.product_feature_processor, product_shop.product_image, product_shop.product_views, product_shop.product_rating, product_shop.product_price, shop.shop_name, brands.brand_name FROM products INNER JOIN product_shop ON Products.product_id = product_shop.product_id INNER JOIN shop ON product_shop.shop_id = shop.shop_id inner join brands on brands.brand_id = products.brand_id WHERE products.product_id = ? limit 1';
                // db.query('products.product_id, product_shop.ps_id, products.product_name,product_shop.product_link, product_shop.product_image, product_shop.product_rating, product_shop.product_price, shop.shop_name, shop.shop_id, brands.brand_name;', similarDocuments.id , (err,results) => {
                    const [rowws, fields] = await promisePool.query(sql, adr);
                    hamzaNeeds.push({
                        product_id: rowws[0].product_id,
                        ps_id: rowws[0].ps_id,
                        product_name: rowws[0].product_name,
                        product_link: rowws[0].product_link,
                        product_feature_RAM: rowws[0].product_feature_RAM,
                        product_feature_ROM: rowws[0].product_feature_ROM,
                        product_feature_screenSize: rowws[0].product_feature_screenSize,
                        product_feature_processor: rowws[0].product_feature_processor,
                        product_image: rowws[0].product_image,
                        product_views: rowws[0].product_views,
                        product_rating: rowws[0].product_rating,
                        product_price: rowws[0].product_price,
                        shop_name: rowws[0].shop_name,
                        brand_name: rowws[0].brand_name,
                        });   
                }
                res.send(JSON.stringify(hamzaNeeds));
            })
            // .catch((error) => {
            //     assert.isNotOk(error, 'Promise error');
            // });
        // .then(function () {
        //     // What things are similar to xmen?
        //     return ger.recommendations_for_thing('movies', 'xmen', { actions: { likes: 1 } })
        // })
        // .then(function (recommendations) {
        //     console.log("\nRecommendations Like 'xmen'")
        //     console.log(JSON.stringify(recommendations, null, 2))
        // })
    }
    main();
});

module.exports = router;