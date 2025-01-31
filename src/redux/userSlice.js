import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    email: null,
    dateOfAccountCreation: null,
    totalPRReviews: 0,
    dob: null,
  };

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      // Set user data (username, email, dateOfAccountCreation, totalPRReviews, dob)
      setUser: (state, action) => {
        const { username, email, createdAt, updatedAt, totalPRReviews, dob } = action.payload;
        state.username = username;
        state.email = email;
        state.createdAt = createdAt;
        state.updatedAt = updatedAt;
        state.totalPRReviews = totalPRReviews;
        state.dob = dob;
      },
      
      // Reset user data (log out)
      logoutUser: (state) => {
        state.username = null;
        state.email = null;
        state.createdAt = null;
        state.updatedAt = null;
        state.totalPRReviews = 0;
        state.dob = null;
      },
    },
  });
  
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;