import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Producer } from '../types/Producer';
import type { DashboardData } from '../types/Dashboard';
import type { ApiResponse } from '../types/ApiResponse';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Producer', 'Dashboard'],
  endpoints: (builder) => ({
    getProducers: builder.query<Producer[], void>({
      query: () => '/producers',
      transformResponse: (response: ApiResponse<Producer[]>) => response.data,
      providesTags: ['Producer'],
    }),
    getDashboard: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      transformResponse: (response: ApiResponse<DashboardData>) => response.data,
      providesTags: ['Dashboard'],
    }),
    addProducer: builder.mutation<Producer, Partial<Producer>>({
      query: (body) => ({
        url: '/producers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Producer', 'Dashboard'],
    }),
  }),
});

export const {
  useGetProducersQuery,
  useGetDashboardQuery,
  useAddProducerMutation,
} = apiSlice;