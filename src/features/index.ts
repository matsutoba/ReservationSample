import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const asyncFunc = createAsyncThunk(
  'counter/covid19',
  async () => {
/*
    await getCovidInfo().then((res) => {
    })
    */
  }
);

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      isLoading: false,
      isError: false,
      a:0, 
      b:1,
    },
    reducers: {
      up(state, action) {
        state.a = state.a + 1;
        state.b = state.b * 2;
      },
      down(state, action) {
        state.a = state.a - 1;
        state.b = state.b / 2;
      },
    },
    extraReducers: bulider => {
      bulider.addCase(asyncFunc.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      });
      bulider.addCase(asyncFunc.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      bulider.addCase(asyncFunc.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
      })
    }
  });

export const { up, down } = counterSlice.actions;
export default counterSlice.reducer;