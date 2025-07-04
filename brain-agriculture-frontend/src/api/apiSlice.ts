import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse } from '../types/ApiResponse';
import type { DashboardData } from '../types/Dashboard';
import type { Producer } from '../types/Producer';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Producer', 'Dashboard'],
  endpoints: (builder) => ({
    getProducers: builder.query<Producer[], void>({
      query: () => '/producers',

      transformResponse: (response: ApiResponse<Producer[]>) => {
        return response.data;
      },
      providesTags: ['Producer'],
    }),
    getDashboard: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      transformResponse: (response: ApiResponse<DashboardData>) => {
        return response.data;
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetProducersQuery, useGetDashboardQuery } = apiSlice;