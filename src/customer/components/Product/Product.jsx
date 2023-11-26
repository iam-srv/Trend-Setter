/*"
This the tailwind css ui component "CATEGORY FILTERS ""

  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'

import { filters, sortOptions, color, singleFilter } from "./filterdata";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import TuneIcon from '@mui/icons-material/Tune';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SearchTwoTone } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../state/Product/Action'
import { Pagination } from '@mui/material'
// const sortOptions = [
//     { name: 'Price: Low to High', href: '#', current: false },
//     { name: 'Price: High to Low', href: '#', current: false },
// ]


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



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Product() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();

    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString)
    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const priceValue = searchParams.get("price");
    const discount = searchParams.get("discount");
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");
    const { products } = useSelector(store => store);
    console.log('product page', products);


    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", value);
        const query = searchParams.toString();

        navigate({ search: `?${query}` })
    }

    const handleFilter = (value, sectionId) => { // adding the color into the url  
        const searchParams = new URLSearchParams(location.search);

        let filterValue = searchParams.getAll(sectionId);

        if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
            filterValue = filterValue[0].split(",").filter((item) => item !== value);

            if (filterValue.length === 0) {
                searchParams.delete(sectionId);
            }
        } else {
            filterValue.push(value);
        }

        if (filterValue.length > 0) {
            searchParams.set(sectionId, filterValue.join(","));
        }
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    const handRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        console.log(searchParams);

        searchParams.set(sectionId, e.target.value);
        const query = searchParams.toString();
        navigate({ search: `? ${query}` });

    }

    useEffect(() => {
        const [minPrice, maxPrice] = priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);

        const data = {
            category: param.LevelThree,
            colors: colorValue || [],
            size: sizeValue || [],
            minPrice,
            maxPrice,
            minDiscount: discount || 0,
            sort: sortValue || "price_value",
            pageNumber: pageNumber - 1,
            pageSize: 10,
        }
        dispatch(findProducts(data));

    }, [param.LevelThree,
        colorValue,
        sizeValue,
        priceValue,
        discount,
        sortValue,
        pageNumber,
        stock
    ]);

    useEffect(() => {

    })
    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">


                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                            {/* Filters */}
                            <form className="hidden lg:block">

                                <div className='flex justify-between items-center text-lg opacity-50 font-bold py-7'>
                                    <h1 className=''>Filters</h1>
                                    <TuneIcon />
                                </div>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    onChange={() => handleFilter(option.value, section.id)}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                                {singleFilter.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        {/* <span className="font-medium text-gray-900">{section.name}</span> */}
                                                        <FormLabel className="font-medium" sx={{ color: "black" }} id="demo-radio-buttons-group-label">{section.name}</FormLabel>

                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>

                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                defaultValue="female"
                                                                name="radio-buttons-group"
                                                            >
                                                                {section.options.map((option, optionIdx) => (
                                                                    <>
                                                                        <FormControlLabel onChange={(e) => handRadioFilterChange(e, section.id)} value={option.value} control={<Radio />} label={option.label} className='text-gray-500' />
                                                                    </>

                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </Disclosure.Panel>

                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                            {/* Product grid */}
                            <div className="lg:col-span-4 w-full">
                                {/* Your content */}
                                <div className='flex flex-wrap justify-center bg-white py-5'>
                                    {products.products?.content && products.products?.content.map((item) => <ProductCard product={item} />)}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='w-full px=[3.6rem]'>
                        <div className='px-4 py-5 flex justify-center'>
                            <Pagination count={products.products?.totalPages} color='secondary' onChange={handlePaginationChange} />
                        </div>
                    </section>
                </main >
            </div >
        </div >
    )
}
