// frontend/src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Thunk pour récupérer les utilisateurs à swiper
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/match/swipe"); // Utiliser la nouvelle route
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg ||
          "Erreur lors de la récupération des utilisateurs"
      );
    }
  }
);

// Thunk pour liker un utilisateur
export const likeUser = createAsyncThunk(
  "user/likeUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.post(`/match/like/${userId}`);
      return { msg: response.data.msg, match: response.data.match };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Erreur lors du like");
    }
  }
);

// Thunk pour disliker un utilisateur
export const dislikeUser = createAsyncThunk(
  "user/dislikeUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.post(`/match/dislike/${userId}`);
      return { msg: response.data.msg };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Erreur lors du dislike"
      );
    }
  }
);

// Thunk pour récupérer les matchs
export const getMatches = createAsyncThunk(
  "user/getMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/match/matches");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Erreur lors de la récupération des matchs"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    matches: [],
    loading: false,
    error: null,
    matchMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Gestion de likeUser
      .addCase(likeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.matchMessage = null;
      })
      .addCase(likeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.matchMessage = action.payload.msg;

        // Si c'est un match, vous pourriez envisager de gérer cela différemment
        // Par exemple, en récupérant les détails du match via un autre thunk
        // ou en mettant à jour la liste des matchs via getMatches.

        // Suppression de l'utilisateur liké de la liste des utilisateurs à swiper
        state.users = state.users.filter(
          (user) => user._id !== action.meta.arg
        );
      })
      .addCase(likeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Gestion de dislikeUser
      .addCase(dislikeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dislikeUser.fulfilled, (state, action) => {
        state.loading = false;
        // Suppression de l'utilisateur disliké de la liste des utilisateurs à swiper
        state.users = state.users.filter(
          (user) => user._id !== action.meta.arg
        );
      })
      .addCase(dislikeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Gestion de getMatches
      .addCase(getMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
