const express = require('express');
const router = express.Router();
const ContentBasedRecommender = require('content-based-recommender');
const promisePool = require('../../config/db');

router.get('/:id', (req, res) => {
    async function main() {
        var id = req.params.id;
        var document = [];
        // query database using promises
        const [rowss, fieldss] = await promisePool.query("SELECT DISTINCT products.product_id, products.product_name, shop.shop_id, brands.brand_id, brands.brand_name FROM products INNER JOIN product_shop ON Products.product_id = product_shop.product_id INNER JOIN shop ON product_shop.shop_id = shop.shop_id inner join brands on brands.brand_id = products.brand_id WHERE products.product_id = ? limit 1;", id);
        // console.log(rowss);
        rowss.forEach(gdgdf => {
            cont = gdgdf.product_name;
            document.push({ id: gdgdf.product_id, content: cont });
            console.log(`${gdgdf.product_id} is in ${gdgdf.product_name}`);
        });
        var shop_id;
        var brand_id;
        rowss.forEach(haha => {
            shop_id = haha.shop_id;
            brand_id = haha.brand_id;
        });
        // console.log(rowws.brand_id);
        const [rows, fields] = await promisePool.query("SELECT DISTINCT products.product_id, products.product_name, shop.shop_id, brands.brand_name FROM products INNER JOIN product_shop ON Products.product_id = product_shop.product_id INNER JOIN shop ON product_shop.shop_id = shop.shop_id inner join brands on brands.brand_id = products.brand_id WHERE shop.shop_id <> ? AND brands.brand_id = ?;", [shop_id, brand_id]);
        // console.log(rows);
        var cont;
        rows.forEach((rows) => {
            cont = rows.brand_name + " " + rows.product_name;
            document.push({ id: rows.product_id, content: cont });
            // console.log(`${rows.product_id} is in ${rows.product_name}`);
        });
        // console.log(document);
        const recommender = new ContentBasedRecommender({
            minScore: 0.1,
            maxSimilarDocuments: 100
        });
        recommender.train(document);
        const similarDocuments = recommender.getSimilarDocuments(id, 0, 10);
        // console.log(similarDocuments);
        var hamzaNeeds = [];
        var flag1 = 0;
        var flag2 = 0;
        var flag3 = 0;
        var flag4 = 0;
        for (const item of similarDocuments) {
            // console.log(item.id);
            var adr = item.id;
            var sql = 'SELECT DISTINCT products.product_id, product_shop.ps_id, products.product_name, product_shop.product_link, product_shop.product_feature_RAM, product_shop.product_feature_ROM, product_shop.product_feature_screenSize, product_shop.product_feature_processor, product_shop.product_image, product_shop.product_views, product_shop.product_rating, product_shop.product_price, shop.shop_name, shop.shop_id, brands.brand_name FROM products INNER JOIN product_shop ON Products.product_id = product_shop.product_id INNER JOIN shop ON product_shop.shop_id = shop.shop_id inner join brands on brands.brand_id = products.brand_id WHERE products.product_id = ? limit 1';
            // db.query('products.product_id, product_shop.ps_id, products.product_name,product_shop.product_link, product_shop.product_image, product_shop.product_rating, product_shop.product_price, shop.shop_name, shop.shop_id, brands.brand_name;', similarDocuments.id , (err,results) => {
            const [rowws, fields] = await promisePool.query(sql, adr);
            if(rowws[0].shop_id == 1 && flag1 == 0){ 
                flag1 = 1;
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
            if(rowws[0].shop_id == 2  && flag2 == 0){ 
                flag2 = 1; 
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
            if(rowws[0].shop_id == 3  && flag3 == 0){ 
                flag3 = 1; 
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
            if(rowws[0].shop_id == 4 && flag4 == 0){ 
                flag4 = 1; 
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
        }
        res.send(hamzaNeeds);
    }
    main();
});

module.exports = router;