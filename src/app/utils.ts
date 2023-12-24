export const dummyData = [
  {
    user: {
      username: "angeli123",
      full_name: "Angelina Jolie",
      edge_follow_count: 100,
      edge_followed_by_count: 1000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "jack12",
      full_name: "Jack Ritcher",
      edge_follow_count: 200,
      edge_followed_by_count: 2000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "jenny",
      full_name: "Jeny Ritcher",
      edge_follow_count: 500,
      edge_followed_by_count: 6000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "Zil",
      full_name: "Zil Mark",
      edge_follow_count: 600,
      edge_followed_by_count: 9000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "ronaldo",
      full_name: "Cristiano Ronaldo",
      edge_follow_count: 7000,
      edge_followed_by_count: 9000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "Winson",
      full_name: "Winson Coster",
      edge_follow_count: 300,
      edge_followed_by_count: 3000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: null,
    error: "Something went wrong",
  },
  {
    user: null,
    error: "Internal Server Error",
  },
];

export const defaultColDef = {
  sortable: false,
  filter: false,
  flex: 1,
};

export const colDefs = [
  {
    field: "username",
    headerName: "Username",
    filter: "agTextColumnFilter",
  },
  {
    field: "full_name",
    headerName: "Full Name",
    filter: "agTextColumnFilter",
  },
  {
    field: "edge_follow_count",
    headerName: "Following",
  },
  {
    field: "edge_followed_by_count",
    headerName: "Followed By",
    sortable: true,
  },
  { field: "profile_pic_url", headerName: "Profile" },
];

export interface Option {
  readonly label: string;
  readonly value: string;
}

export const gridOptions: any = {
  autoSizeStrategy: {
    type: "fitGridWidth",
  },
};
