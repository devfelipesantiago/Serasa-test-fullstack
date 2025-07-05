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
      providesTags: (result = []) => [
        'Producer',
        ...result.map(({ id }) => ({ type: 'Producer' as const, id })),
      ],
    }),
    getProducer: builder.query<Producer, string>({
      query: (id) => `/producers/${id}`,
      transformResponse: (response: ApiResponse<Producer>) => response.data,
      providesTags: (result, error, arg) => [{ type: 'Producer', id: arg }],
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
    updateProducer: builder.mutation<Producer, Partial<Producer>>({
      query: ({ id, ...patch }) => ({
        url: `/producers/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Producer', id: arg.id }, 'Dashboard'],
    }),
    deleteProducer: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/producers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Producer', id: arg }, 'Dashboard'],
    }),
  }),
});

export const {
  useGetProducersQuery,
  useGetProducerQuery,
  useGetDashboardQuery,
  useAddProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducerMutation,
} = apiSlice;