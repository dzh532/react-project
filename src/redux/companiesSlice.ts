import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyData {
  name: string;
  duration_work: number;
  address: string;
  number_phone: string;
}

interface CompaniesState {
  companies: CompanyData[];
}

const initialState: CompaniesState = {
  companies: [],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<CompanyData[]>) {
      state.companies = action.payload;
    },
    addCompany(state, action: PayloadAction<CompanyData>) {
      state.companies.push(action.payload);
    },
    updateCompany(state, action: PayloadAction<CompanyData>) {
      const index = state.companies.findIndex(
        (company) => company.name === action.payload.name
      );
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany(state, action: PayloadAction<string>) {
      state.companies = state.companies.filter(
        (company) => company.name !== action.payload
      );
    },
  },
});

export const { setCompanies, addCompany, updateCompany, deleteCompany } =
  companiesSlice.actions;

export default companiesSlice.reducer;
