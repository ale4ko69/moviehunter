import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTreeAPI } from "./treeAPI";

// TODO Make Selected Product Line Slice

const name = "tree";
const initialState = {
  producLineId: 1090,
  loading: {
    root: false,
    rootObjects: false,
    rootEventLog: false,
    rootFiles: false
  },
  error: null,
  nodes: []
};

const fetchTree = createAsyncThunk("tree/fetchTree", async (args, thunkAPI) => {
  // Default params
  const params = {
    url: "productline/getTree",
    producLineId: null,
    objectTypeId: "",
    profileType: "",
    getList: ""
  };
  // Assingn Default and User params
  Object.assign(params, args);
  // console.log(params, "Params");
  // Get Tree
  const response = await getTreeAPI(params);
  return {
    data: response.result.data,
    type: params.type || "root"
  };
});

const treeSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearTree(state, action) {
      state.nodes = [];
    }
  },
  extraReducers: {
    [fetchTree.pending]: (state, action) => {
      const arg = action.meta.arg || { type: "root" };
      console.log("pending", arg);
      if (!state.loading[arg.type]) {
        // TODO loader for current selected node
        state.loading[arg.type] = true;
      }
    },
    [fetchTree.fulfilled]: (state, action) => {
      console.log("fulfilled", action);
      const { payload } = action;
      if (state.loading[payload.type]) {
        state.loading[payload.type] = false;
        // Root tree
        if (payload.data.hasOwnProperty("tree")) {
          state.nodes = payload.data.tree;
        } else {
          // TODO function returned neede tree object by type
          let treeChildren = [];

          if (
            ["rootObjects", "rootEventLog", "rootFiles"].includes(payload.type)
          ) {
            treeChildren = state.nodes[0].children;
          }

          // Append to tree children
          let currentNode = treeChildren.find(
            item => item.type === payload.type
          );
          if (currentNode) {
            currentNode.children = payload.data;
          }
        }
      }
    },
    [fetchTree.rejected]: (state, action) => {
      console.log(action);
      const strType = action.meta.args ? action.meta.args.type : "root";
      if (state.loading[strType]) {
        state.loading[strType] = false;
        state.error = action.payload;
      }
    }
  }
});

export { fetchTree };
export const TREE = name;
export const treeReducer = treeSlice.reducer;
