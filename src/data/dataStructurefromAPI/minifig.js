// Search list of minifigs
https://rebrickable.com/api/v3/lego/minifigs/
const searchMinifigs = {
    "count": 13148,
    "next": "https://rebrickable.com/api/v3/lego/minifigs/?page=2",
    "previous": null,
    "results": [
      {
        "set_num": "fig-000001",
        "name": "Toy Store Employee",
        "num_parts": 4,
        "set_img_url": "https://cdn.rebrickable.com/media/sets/fig-000001/55726.jpg",
        "set_url": "https://rebrickable.com/minifigs/fig-000001/toy-store-employee/",
        "last_modified_dt": "2020-05-27T21:47:00.694941Z"
      }]
    }
  
  // Search specific minifig
  // https://rebrickable.com/api/v3/lego/minifigs/{set_num}
  const searchSpecificMinifig = {
    "set_num": "fig-002538",
    "name": "Mr. Freeze with Diver Helmet",
    "num_parts": 5,
    "set_img_url": "https://cdn.rebrickable.com/media/sets/fig-002538/80687.jpg",
    "set_url": "https://rebrickable.com/minifigs/fig-002538/mr-freeze-with-diver-helmet/",
    "last_modified_dt": "2020-04-13T01:02:03.443724Z"
  }
  
  // Search minifig appear in which set
  // https://rebrickable.com/api/v3/lego/minifigs/{set_num}/sets/
  
  const searchSetThatMinifigAppearsIn = {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
      {
        "set_num": "76000-1",
        "name": "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        "num_parts": 199,
        "set_img_url": "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        "set_url": "https://rebrickable.com/sets/76000-1/arctic-batman-vs-mr-freeze-aquaman-on-ice/",
        "last_modified_dt": "2020-06-11T22:07:30.703902Z"
      }
    ]
  }
  