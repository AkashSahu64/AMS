import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRecords, addRecord, setLoading, setError } = attendanceSlice.actions;
export default attendanceSlice.reducer;