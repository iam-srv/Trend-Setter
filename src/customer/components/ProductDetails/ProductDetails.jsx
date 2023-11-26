/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import Rating from '@mui/material/Rating';
import { Button, Grid, Box } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import ProductReviewCard from './ProductReviewCard';

import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../state/Product/Action';
import { store } from '../../state/store';
import { addItemToCart } from '../../state/Cart/Action';

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const Mens_kurta = [
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Printed Pure Cotton Straight Kurta",
        "color": "Green",
        "discountedPrice": 499,
        "price": 1499,
        "discountPercent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70",
        "brand": "SG LEMAN",
        "title": "Men Embroidered Jacquard Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 799,
        "price": 2499,
        "discountPercent": 68,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70",
        "brand": "FUBAR",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Blue",
        "discountedPrice": 399,
        "price": 1499,
        "discountPercent": 73,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/i/v/x/xxl-br-ad-kt-105-adwyn-peter-original-imagj4zyd2q7t6cg.jpeg?q=70",
        "brand": "ALY JOHN",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "White",
        "discountedPrice": 474,
        "price": 1999,
        "discountPercent": 76,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/j/a/r/l-poch521835-peter-england-original-imag7jg47g7cxhg3-bb.jpeg?q=70",
        "brand": "PETER ENGLAND",
        "title": "Men Woven Design Pure Cotton Straight Kurta",
        "color": "Grey",
        "discountedPrice": 524,
        "price": 1049,
        "discountPercent": 50,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/y/c/x/xl-kast107hp-majestic-man-original-imafw49u5uty4agx-bb.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Pink",
        "discountedPrice": 499,
        "price": 1499,
        "discountPercent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kpodocw0/t-shirt/x/o/4/xl-wr-64-wrodss-original-imag3upwgq9n9fbv.jpeg?q=70",
        "brand": "WRODSS",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Black",
        "discountedPrice": 277,
        "price": 999,
        "discountPercent": 72,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l4zxn680/kurta/i/g/u/s-mtml0039-341-manthan-original-imagfrz3gwgdtczm.jpeg?q=70",
        "brand": "Manthan",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Blue",
        "discountedPrice": 765,
        "price": 1049,
        "discountPercent": 27,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/m/e/e/s-kurta-rahul-look-original-imaga2g6qmhbywdf-bb.jpeg?q=70",
        "brand": "RAHUL LOOK",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Green",
        "discountedPrice": 499,
        "price": 1599,
        "discountPercent": 68,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/u/v/m/l-grey-106-yellow-freluro-original-imagc26vdpwxgztu-bb.jpeg?q=70",
        "brand": "FRELURO",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 429,
        "price": 999,
        "discountPercent": 57,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/jsj90280/kurta/j/z/g/l-mtmkos0004-326-manthan-original-imafe35wha5ry36p.jpeg?q=70",
        "brand": "Manthan",
        "title": "Men Self Design Cotton Blend Straight Kurta",
        "color": "Light Blue",
        "discountedPrice": 729,
        "price": 909,
        "discountPercent": 27,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/f/f/xl-grey-sws4503-allan-peter-original-imag6xxgvvh59gh5-bb.jpeg?q=70",
        "brand": "allan peter",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Green",
        "discountedPrice": 449,
        "price": 1749,
        "discountPercent": 74,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/u/g/z/xl-8button-kurta-elepants-original-imagk57kfg2bwvhd.jpeg?q=70",
        "brand": "COMBRAIDED",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Dark Blue",
        "discountedPrice": 449,
        "price": 1499,
        "discountPercent": 70,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/7/b/q/xl-short-button-yellow-101-deal4mens-original-imagf6nzhwufyygg.jpeg?q=70",
        "brand": "FOLGEN",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 385,
        "price": 1299,
        "discountPercent": 70,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l3lx8cw0/kurta/d/o/m/l-kurta-mr-button-tap-in-original-imagezztuysgufsh.jpeg?q=70",
        "brand": "Tap in",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Orange",
        "discountedPrice": 395,
        "price": 1495,
        "discountPercent": 73,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/a/m/4/xl-sksh-dt1105-navy-fubar-original-imafuyzzh7fx6kaw-bb.jpeg?q=70",
        "brand": "FUBAR",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Dark Blue",
        "discountedPrice": 399,
        "price": 1648,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/7/m/3/xxl-vlsd-a0ltpk-vida-loca-original-imagk5ggvxf97dwz.jpeg?q=70",
        "brand": "Vida Loca",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "White",
        "discountedPrice": 599,
        "price": 2499,
        "discountPercent": 76,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kxkqavk0/kurta/l/w/t/xxl-vlsd-a0lt-vida-loca-original-imagay8hcrqax2uv.jpeg?q=70",
        "brand": "Vida Loca",
        "title": "Men Self Design Pure Cotton Straight Kurta",
        "color": "White",
        "discountedPrice": 629,
        "price": 2499,
        "discountPercent": 74,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/n/p/q/xxl-white-kurta-lilen-spoque-original-imagnk2zzcgqst3r.jpeg?q=70",
        "brand": "Nofilter",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "White",
        "discountedPrice": 370,
        "price": 1499,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/9/r/xxl-ksh-p-kurta-yellow-ksh-trendz-original-imafyq4h7q5gpkzk-bb.jpeg?q=70",
        "brand": "KSH Trendz",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 363,
        "price": 1499,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kxkqavk0/kurta/c/p/f/xxl-vlsd-a0lt-vida-loca-original-imagay8hjdc9cdzh.jpeg?q=70",
        "brand": "Vida Loca",
        "title": "Men Self Design Pure Cotton Straight Kurta",
        "color": "Beige",
        "discountedPrice": 629,
        "price": 2499,
        "discountPercent": 74,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/5/w/o/l-vlsd-a0lt-vida-loca-original-imagay8hg3nydjuh-bb.jpeg?q=70",
        "brand": "Vida Loca",
        "title": "Men Self Design Pure Cotton Straight Kurta",
        "color": "Light Blue",
        "discountedPrice": 629,
        "price": 2499,
        "discountPercent": 74,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/v/7/w/xl-sksh-dt1105-pur-fubar-original-imafuy3z57uqgdrp-bb.jpeg?q=70",
        "brand": "FUBAR",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Purple",
        "discountedPrice": 399,
        "price": 1648,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kfpq5jk0-0/kurta/e/g/i/m-kast109pp-majestic-man-original-imafw49u8vyzygpn.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Pink",
        "discountedPrice": 499,
        "price": 1499,
        "discountPercent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/y/r/m/xxs-sada-plain-kurta-ksh-trendz-original-imag4baggdt7txju-bb.jpeg?q=70",
        "brand": "KSH Trendz",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 265,
        "price": 1499,
        "discountPercent": 82,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/t/g/w/xxl-ae08sk42-blue-aew-designs-original-imagg8npatfky9wg.jpeg?q=70",
        "brand": "ARMAAN ETHNIC",
        "title": "Men Self Design Cotton Blend Straight Kurta",
        "color": "Blue",
        "discountedPrice": 483,
        "price": 1999,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/b/0/5/m-kast-fern-lit-green-majestic-man-original-imagzrafzhtbnz7s.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Printed Pure Cotton Straight Kurta",
        "color": "Light Green",
        "discountedPrice": 499,
        "price": 1499,
        "discountPercent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/e/o/4/m-kast-hukum-orange-majestic-man-original-imagzra2fzadkyrz.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Printed Pure Cotton Straight Kurta",
        "color": "Orange",
        "discountedPrice": 499,
        "price": 1499,
        "discountPercent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/s/p/a/l-kcsh-krt-103-mao-fubar-original-imag7fpesvngbwyy-bb.jpeg?q=70",
        "brand": "FUBAR",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Maroon",
        "discountedPrice": 399,
        "price": 1648,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/8/u/r/xl-sws2701-allan-peter-original-imafvxcfcsg4dzab-bb.jpeg?q=70",
        "brand": "allan peter",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Pink",
        "discountedPrice": 449,
        "price": 1749,
        "discountPercent": 74,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/x/u/y/s-smpl04-deemoon-original-imagk5mnr9ufeha2.jpeg?q=70",
        "brand": "DEEMOON",
        "title": "Men Floral Print Cotton Blend Straight Kurta",
        "color": "Dark Blue",
        "discountedPrice": 468,
        "price": 1599,
        "discountPercent": 70,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/z/l/b/xl-grey-sws2902-allan-peter-original-imag3y6tzaaxwkhy-bb.jpeg?q=70",
        "brand": "allan peter",
        "title": "Men Printed Pure Cotton Straight Kurta",
        "color": "Dark Blue",
        "discountedPrice": 499,
        "price": 1749,
        "discountPercent": 71,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/e/j/j/l-jcardkurta-yellow-divra-clothing-original-imaggjhfgjqhuwtk.jpeg?q=70",
        "brand": "More & More",
        "title": "Men Self Design Cotton Blend Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 467,
        "price": 2199,
        "discountPercent": 78,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/o/u/d/s-up-kurta-31035-phone-sg-leman-original-imagzu7tgzgtmnvb.jpeg?q=70",
        "brand": "SG LEMAN",
        "title": "Men Printed Pure Silk Straight Kurta",
        "color": "Gold",
        "discountedPrice": 810,
        "price": 2499,
        "discountPercent": 67,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kybvo280/kurta/v/i/i/xxl-aly2502-aly-john-original-imagah6me94dugrs.jpeg?q=70",
        "brand": "ALY JOHN",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Maroon",
        "discountedPrice": 478,
        "price": 1279,
        "discountPercent": 62,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/6/y/v/m-sksh-dt1105-black-fubar-original-imag4cpwzmhbufg4-bb.jpeg?q=70",
        "brand": "FUBAR",
        "title": "Men Striped Cotton Blend Straight Kurta",
        "color": "Black",
        "discountedPrice": 399,
        "price": 1648,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l3khsi80/kurta/1/c/6/l-mtml0042-328-manthan-original-imagenvzkm3v9vxh.jpeg?q=70",
        "brand": "Manthan",
        "title": "Men Printed Cotton Blend Ethnic Dress",
        "color": "Orange",
        "discountedPrice": 948,
        "price": 1299,
        "discountPercent": 27,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/s/w/c/xl-vlmk-combzip02-vida-loca-original-imagkc4hhm4fxhjb.jpeg?q=70",
        "brand": "Vida Loca",
        "title": "Pack of 2 Men Solid Pure Cotton Straight Kurta",
        "color": "Multicolor",
        "discountedPrice": 994,
        "price": 2499,
        "discountPercent": 60,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/t/j/u/s-pink-kurta-lilen-spoque-original-imagnfkwk5gpfmzx.jpeg?q=70",
        "brand": "SPOQUE",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Pink",
        "discountedPrice": 362,
        "price": 1499,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/x/f/6/xxl-new-white-nofilter-original-imaghzggudfezpr8.jpeg?q=70",
        "brand": "Nofilter",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "White",
        "discountedPrice": 393,
        "price": 1599,
        "discountPercent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLevelCategory": "Men",
        "secondLevelCategory": "Clothing",
        "thirdLevelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    }
]


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

    const [selectedSize, setSelectedSize] = useState("")
    const navigate = useNavigate();
    const params = useParams(); //  to get the product id
    const dispatch = useDispatch();
    const { products } = useSelector(store => store); // customer product reducer



    console.log("params productId", params.productId);


    const handleAddToCart = () => {
        const data = { productId: params.productId, size: selectedSize.name }
        console.log("data", data);
        dispatch(addItemToCart(data))
        navigate("/cart")
    }

    useEffect(() => {
        const data = { productId: params.productId }
        dispatch(findProductsById(data));
    }, [params.productId]);

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    {/* Image gallery */}
                    <div className="flex flex-col items-center">

                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[30rem]">
                            <img
                                src={products.product?.imageUrl}
                                alt={product.images[0].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        < div className="flex flex-wrap space-x-5 justify-center">

                            {product.images.map((image, index) => <div className=" aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem]  max-h-[5rem] mt-4">
                                <img
                                    src={product.images[index].src}
                                    alt={product.images[index].alt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            )};

                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8  lg:pb-24">

                        <div className="lg:col-span-2">

                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900"> {products.product?.brand}</h1>
                            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>{products.product?.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>

                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semi-bold'>{products.product?.discountedPrice}</p>
                                <p className='opacity-50 line-through'>{products.product?.price}</p>
                                <p className='text-green-600 font-semibold'>{products.product?.discountPercent}% off</p>

                            </div>

                            {/* Reviews */}
                            <div className="mt-6" >

                                <div className='flex items-center space-x-3'>
                                    <Rating name="read-only" value={3.5} readOnly />
                                    <p className=' opacity-50 text-sm'>2333 Ratings</p>
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>177 Reviews</p>
                                </div>
                            </div>

                            <form className="mt-10">

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Pick Your Size
                                        </p>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {product.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button onClick={handleAddToCart} variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", my: "1rem" }}>Add to cart</Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{products.product?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Rating and review */}
                <section>
                    <h1 className='font-semibold text-lg pb-4'>Recent Review & Rating</h1>
                    <div className='border p-5'>
                        <Grid container spacing={7}>

                            <Grid item xs={7}>
                                <div className='space-y-5'>
                                    {[1, 1, 1].map((item) => <ProductReviewCard />)}
                                </div>
                            </Grid>

                            <Grid item xs={5}>
                                <h1 className='text-xl font-semibold pb-1'>Product Rating</h1>

                                <div className='flex items-center space-x-3'>
                                    <Rating value={4.6} precision={0.5} readOnly />
                                    <p className='opacity-60 '>33446 Ratings</p>
                                </div>

                                <Box className="mt-5" >
                                    <Grid container justifyContent="center" alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Excellent</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} color='success' value={40} variant='determinate' />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center" alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Very Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} value={35} variant='determinate' />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center" alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} color='info' value={60} variant='determinate' />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center" alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Average</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} color='warning' value={20} variant='determinate' />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center" alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>poor</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} color='error' value={10} variant='determinate' />
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>

                {/* Similar products */}

                <section className=''>
                    <h1 className='py-5 text-xl font-bold'>Similar Products</h1>

                    <div className='flex flex-wrap space-y-5 mt-4'>
                        {Mens_kurta.map((item) => <HomeSectionCard product={item} />)}
                    </div>
                </section>
            </div >
        </div >
    )
}
