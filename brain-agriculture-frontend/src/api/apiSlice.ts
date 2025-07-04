import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Producer } from '../types/Producer';
import type { DashboardData } from '../types/Dashboard';

export const apiSlice = createApi({

  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Producer', 'Dashboard'],

  endpoints: (builder) => ({

    getProducers: builder.query<Producer[], void>({
      query: () => '/producers',
      providesTags: ['Producer'],
    }),

    getDashboard: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetProducersQuery, useGetDashboardQuery } = apiSlice;