// Search list of sets
// https://rebrickable.com/api/v3/lego/sets/
const searchSet = {
  count: 21240,
  next: "https://rebrickable.com/api/v3/lego/sets/?page=2",
  previous: null,
  results: [
    {
      set_num: "001-1",
      name: "Gears",
      year: 1965,
      theme_id: 1,
      num_parts: 43,
      set_img_url: "https://cdn.rebrickable.com/media/sets/001-1/11530.jpg",
      set_url: "https://rebrickable.com/sets/001-1/gears/",
      last_modified_dt: "2018-05-05T20:39:47.277922Z",
    },
  ],
};

// Search specific set
// https://rebrickable.com/api/v3/lego/sets/{set_num}
const searchSpecificSet = {
  set_num: "76000-1",
  name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
  year: 2013,
  theme_id: 697,
  num_parts: 199,
  set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
  set_url:
    "https://rebrickable.com/sets/76000-1/arctic-batman-vs-mr-freeze-aquaman-on-ice/",
  last_modified_dt: "2020-06-11T22:07:30.703902Z",
};

// Search minifig for specific set
// https://rebrickable.com/api/v3/lego/sets/{set_num}/minifigs/

const searchMinifigfromSpecifiSet = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 7124,
      set_num: "fig-002014",
      set_name: "Aquaman, Short Yellow Hair (3626b Head)",
      quantity: 1,
      set_img_url:
        "https://cdn.rebrickable.com/media/sets/fig-002014/119599.jpg",
    },
    {
      id: 7125,
      set_num: "fig-002537",
      set_name:
        "Batman, Light Bluish Gray Suit, White Cape and Cowl (Arctic Batman)",
      quantity: 1,
      set_img_url:
        "https://cdn.rebrickable.com/media/sets/fig-002537/119631.jpg",
    },
    {
      id: 7126,
      set_num: "fig-002538",
      set_name: "Mr. Freeze with Diver Helmet",
      quantity: 1,
      set_img_url:
        "https://cdn.rebrickable.com/media/sets/fig-002538/80687.jpg",
    },
  ],
};
