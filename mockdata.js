/***
 * This script is used to create mock data for initial setup and testing of the webserver and to populate the pages.
 */

import mongoose from "mongoose"
import {Product} from "./models/product.js"
import {PrivateUser} from "./models/user.js";
import {CompanyUser} from "./models/company_user.js";

async function createMockProducts() {
    // remove old data to reset the database
    Product.remove({}, () => {
        console.log("Database dropped. Creating new data");
    })
    PrivateUser.remove({});
    CompanyUser.remove({});

    for (const product of mockProducts) {
        await new Product(product).save();
    }
}

const mockProducts = [
    {
        "productName": "Lenovo ThinkPad X1 Carbon (8th Gen)",
        "productDescription": "The ThinkPad X1 Carbon is a high-end business laptop designed for professionals who need a powerful and reliable machine to get work done. With a sleek and lightweight design, this laptop is perfect for those who are always on the go.",
        "price": 1599,
        "image": ["img/productImages/thinkpad_x1_carbon_gen8_1.jpg", "img/productImages/thinkpad_x1_carbon_gen8_2.jpg", "img/productImages/thinkpad_x1_carbon_gen8_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Black",
            "typeCPU": "Intel Core i7",
            "manufactorer": "Lenovo",
            "typeGPU": "Intel UHD Graphics"
        }
    },
    {
        "productName": "HP EliteBook x360 1040 G7",
        "productDescription": "The HP EliteBook x360 1040 G7 is a powerful business laptop that features a 360-degree hinge design, allowing users to switch between laptop and tablet mode. With a slim and lightweight design, this laptop is perfect for professionals who need to work on the go.",
        "price": 1899,
        "image": ["img/productImages/Hp_x360_1040_g7_1.jpg", "img/productImages/Hp_x360_1040_g7_2.jpg", "img/productImages/Hp_x360_1040_g7_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Silver",
            "typeCPU": "Intel Core i7",
            "manufactorer": "HP",
            "typeGPU": "Intel UHD Graphics"
        }
    },
    {
        "productName": "Dell Latitude 7410",
        "productDescription": "The Dell Latitude 7410 is a high-performance business laptop that features a sleek design and long battery life. With a variety of security features, including a fingerprint reader and smart card reader, this laptop is perfect for professionals who need to keep their data secure.",
        "price": 1799,
        "image": ["img/productImages/Dell_Latitude_7410_1.jpg", "img/productImages/Dell_Latitude_7410_2.jpg", "img/productImages/Dell_Latitude_7410_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Black",
            "typeCPU": "Intel Core i7",
            "manufactorer": "Dell",
            "typeGPU": "Intel UHD Graphics"
        }
    },
    {
        "productName": "Apple MacBook Pro (16-inch, M1 Pro)",
        "productDescription": "The MacBook Pro is Apple's flagship laptop designed for professionals who need a powerful machine to get work done. With the latest M1 Pro chip, this laptop delivers incredible performance and speed, making it perfect for demanding tasks like video editing and 3D rendering.",
        "price": 2599,
        "image": ["img/productImages/MacBookPro_mq_16_1.jpg", "img/productImages/MacBookPro_mq_16_2.jpg", "img/productImages/MacBookPro_mq_16_3.jpg"],
        "productSpecification": {
            "operatingSystem": "macOS Monterey",
            "amountRAM": 16,
            "color": "Space Gray",
            "typeCPU": "Apple M1 Pro",
            "manufactorer": "Apple",
            "typeGPU": "AMD Radeon Pro 5500M"
        }
    },
    {
        "productName": "HP ZBook Firefly 15 G9",
        "productDescription": "The HP ZBook Firefly 15 G9 is a mobile workstation designed for professionals who need a powerful and reliable laptop for demanding tasks like CAD and 3D rendering. With a slim and lightweight design, this laptop is perfect for those who are always on the go.",
        "price": 1899,
        "image": ["img/productImages/Hp_ZBook_Fire_15_g9_1.jpg", "img/productImages/Hp_ZBook_Fire_15_g9_2.jpg", "img/productImages/Hp_ZBook_Fire_15_g9_3.jpeg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 32,
            "color": "Silver",
            "typeCPU": "Intel Core i7",
            "manufactorer": "HP",
            "typeGPU": "NVIDIA Quadro T500"
        }
    },
    {
        "productName": "HP EliteBook x360 1030 G8",
        "productDescription": "The HP EliteBook x360 1030 G8 is a high-performance business laptop with a 360-degree hinge that allows it to be used in laptop, tablet, tent, or stand mode. It features a 13.3-inch display, 16 GB of RAM, and an Intel Core i7 processor.",
        "price": 1599.99,
        "image": ["img/productImages/Hp_x360_1030_g8_1.jpeg", "img/productImages/Hp_x360_1030_g8_2.jpg", "img/productImages/Hp_x360_1030_g8_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Silver",
            "typeCPU": "Intel Core i7",
            "manufactorer": "HP",
            "typeGPU": "Intel Iris Xe Graphics"
        }
    },
    {
        "productName": "Lenovo ThinkPad T14 Gen 2",
        "productDescription": "The Lenovo ThinkPad T14 Gen 2 is a powerful and durable business laptop with a 14-inch display, 16 GB of RAM, and an AMD Ryzen 7 processor. It also features a fingerprint reader and a webcam with a privacy shutter.",
        "price": 1299.99,
        "image": ["img/productImages/ThinkPad_t14_gen2_1.jpg", "img/productImages/ThinkPad_t14_gen2_2.jpg", "img/productImages/ThinkPad_t14_gen2_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Black",
            "typeCPU": "AMD Ryzen 7",
            "manufactorer": "Lenovo",
            "typeGPU": "Integrated AMD Radeon Graphics"
        }
    },
    {
        "productName": "Dell Latitude 14 7420",
        "productDescription": "The Dell Latitude 14 7420 is a sleek and powerful business laptop with a 14-inch display, 16 GB of RAM, and an Intel Core i7 processor. It also features a backlit keyboard and a variety of security features, including a fingerprint reader and a smart card reader.",
        "price": 1499.99,
        "image": ["img/productImages/Dell_Latitude_7420_1.jpg", "img/productImages/Dell_Latitude_7420_2.jpg", "img/productImages/Dell_Latitude_7420_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Black",
            "typeCPU": "Intel Core i7",
            "manufactorer": "Dell",
            "typeGPU": "Integrated Intel UHD Graphics"
        }
    },
    {
        "productName": "Apple MacBook Pro 16-inch",
        "productDescription": "The Apple MacBook Pro 16-inch is a high-end business laptop with a stunning 16-inch Retina display, 16 GB of RAM, and an Intel Core i9 processor. It also features a Touch Bar and Touch ID for added convenience.",
        "price": 2399.99,
        "image": ["img/productImages/MacBookPro_i9_16_1.jpg", "img/productImages/MacBookPro_i9_16_2.jpg", "img/productImages/MacBookPro_i9_16_3.jpg"],
        "productSpecification": {
            "operatingSystem": "macOS",
            "amountRAM": 16,
            "color": "Silver",
            "typeCPU": "Intel Core i9",
            "manufactorer": "Apple",
            "typeGPU": "AMD Radeon Pro 5500M with 4GB of GDDR6 memory"
        }
    },
    {
        "productName": "Microsoft Surface Laptop 4",
        "productDescription": "The Microsoft Surface Laptop 4 is a stylish and powerful business laptop with a 13.5-inch or 15-inch display, 16 GB of RAM, and an Intel Core i7 or AMD Ryzen 7 processor. It also features a backlit keyboard and a variety of ports.",
        "price": 1299.99,
        "image": ["img/productImages/Surface_Laptop_4_1.jpg", "img/productImages/Surface_Laptop_4_2.jpg", "img/productImages/Surface_Laptop_4_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Platinum",
            "typeCPU": "Intel Core i7 or AMD Ryzen 7",
            "manufactorer": "Microsoft",
            "typeGPU": "Intel Iris Xe Graphics or AMD Radeon Graphics"
        }
    },
    {
        "productName": "ASUS ExpertBook B9",
        "productDescription": "The ASUS ExpertBook B9 is a lightweight and ultra-portable business laptop with a 14-inch display, 16 GB of RAM, and an Intel Core i7 processor. It also features a long battery life and a variety of security features.",
        "price": 1699.99,
        "image": ["img/productImages/ASUS_ExpertBook_b9_1.jpg","img/productImages/ASUS_ExpertBook_b9_2.jpg", "img/productImages/ASUS_ExpertBook_b9_3.jpg"],
        "productSpecification": {
            "operatingSystem": "Windows 10 Pro",
            "amountRAM": 16,
            "color": "Black",
            "typeCPU": "Intel Core i7",
            "manufactorer": "ASUS",
            "typeGPU": "Integrated Intel UHD Graphics"
        }
    }
]

export {
    createMockProducts
}