USE exam;

INSERT INTO `Group` (name, description) VALUES 
('admin', 'Development team'),
('employee', 'General employees'),
('customer', 'Customers of the company');

INSERT INTO Role (url, description) VALUES 
('/user/list', 'Access to view the list of users'),
('/user/create', 'Access to create new users'),
('/user/update', 'Access to update existing users'),
('/user/delete', 'Access to delete users'),
('/role/list', 'Access to view the list of roles'),
('/role/create', 'Access to create new roles'),
('/role/delete', 'Access to delete roles'),
('/role/by-group', 'Access to view roles by group'),
('/role/assign-to-group', 'Access to assign roles to groups'),
('/group/list', 'Access to view the list of groups');

INSERT INTO Product (name, price, quantity, image, nation)
VALUES
('iPhone 14', 999.99, 50, 'https://cdn2.fptshop.com.vn/unsafe/iphone_14_d6d7828381.png', 'USA'),
('Samsung Galaxy S23', 849.99, 40, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_1.png', 'South Korea'),
('Xiaomi Mi 13', 699.99, 30, 'https://cdn.mobilecity.vn/mobilecity-vn/images/2022/12/w300/xiaomi-13-xanh-mint-1.png.webp', 'China'),
('OnePlus 11', 749.99, 25, 'https://www.xtmobile.vn/vnt_upload/product/01_2023/oneplus-11.jpg', 'China'),
('Google Pixel 7', 899.99, 20, 'https://clickbuy.com.vn/uploads/images/2022/10/Google-Pixel-7-Clickbuy1900633909-1.jpeg', 'USA'),
('Sony Xperia 1 IV', 1199.99, 15, 'https://product.hstatic.net/1000370129/product/sony-xperia-1-iv-white-digiphone_2e4d7f92adad4b56b68c99668038e3bd.jpg', 'Japan'),
('Oppo Find X5 Pro', 1099.99, 18, 'https://cdn.mobilecity.vn/mobilecity-vn/images/2022/04/w300/oppo-find-x5-pro-trang.jpg.webp', 'China'),
('Huawei P50 Pro', 899.99, 22, 'https://cdn.tgdd.vn/Products/Images/42/226196/huawei-p50-pro-600x600.jpg', 'China'),
('Asus ROG Phone 6', 1199.99, 12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEXajchCaJ1UrGUOJJ5r3vcALiCIgUC3Asg&s', 'Taiwan'),
('Nokia X100', 399.99, 35, 'https://mobile4n.com/wp-content/uploads/2022/12/nokia-x100.jpg', 'Finland');