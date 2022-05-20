// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      title: "1 bedroom Apartment in East Legon for rent",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Greater Accra",
      city: "East Legon",
      price: 1800,
      images: [
        '/1.jpg',
        '/3.jpg',
        '/5.jpg',
      ]
    },
    {
      title: "3 bedroom Self Contain in Adenta for rent",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Greater Accra",
      city: "East Adenta",
      price: 2500,
      images: [
        '/2.jpg',
        '/4.jpg',
        '/6.jpg',
      ]
    },{
      title: "2 bedroom apartment in Ho for rent",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Volta",
      city: "HO",
      price: 200,
      images: [
        '/8.jpg',
        '/10.jpg',
        '/11.jpg',
      ]
    },
    {
      title: "Chamber and Hall for rent in Hohoe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Volta",
      city: "Hohoe",
      price: 1200,
      images: [
        '/5.jpg',
        '/7.jpg',
        '/9.jpg',
      ]
    },{
      title: "Single room for rent in Ho",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Volta",
      city: "Ho",
      price: 1000,
      images: [
        '/1.jpg',
        '/11.jpg',
        '/10.jpg',
      ]
    },{
      title: "Chamber and Hall for rent in Adisadel",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Central",
      city: "Cape Coast",
      price: 1500,
      images: [
        '/3.jpg',
        '/6.jpg',
        '/10.jpg',
      ]
    },{
      title: "Chamber and Hall for rent in Keta",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Volta",
      city: "Keta",
      price: 1800,
      images: [
        '/1.jpg',
        '/2.jpg',
        '/3.jpg',
      ]
    },{
      title: "2 bedroom apartment for rent in Cape Coast",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Central",
      city: "Cape Coast",
      price: 1500,
      images: [
        '/4.jpg',
        '/5.jpg',
        '/6.jpg',
      ]
    },{
      title: "4 Bedroom self contain for rent in Kumasi",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem modi fuga, sed similique molestiae nulla blanditiis omnis, voluptatum molestias officia eos quas voluptate officiis deleniti dolores consequuntur quam cumque ipsa.",
      region: "Ashanti",
      city: "Kumasi",
      price: 1200,
      images: [
        '/9.jpg',
        '/8.jpg',
        '/11.jpg',
      ]
    },
  ]);
}
