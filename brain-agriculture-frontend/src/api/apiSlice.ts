import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Producer } from '../types/Producer';
import type { Farm } from '../types/Farm';
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
      query: () => '/producers/dashboard',
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
    addFarm: builder.mutation<Farm, { producerId: string; farmData: Partial<Farm> }>({
      query: ({ producerId, farmData }) => ({
        url: `/producers/${producerId}/farms`,
        method: 'POST',
        body: farmData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Producer', id: arg.producerId }, 'Dashboard'],
    }),
    updateFarm: builder.mutation<Farm, { producerId: string; farmId: string; farmData: Partial<Farm> }>({
      query: ({ producerId, farmId, farmData }) => ({
        url: `/producers/${producerId}/farms/${farmId}`,
        method: 'PUT',
        body: farmData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Producer', id: arg.producerId }, 'Dashboard'],
    }),
    deleteFarm: builder.mutation<{ success: boolean; id: string }, { producerId: string; farmId: string }>({
      query: ({ producerId, farmId }) => ({
        url: `/producers/${producerId}/farms/${farmId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Producer', id: arg.producerId }, 'Dashboard'],
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
  useAddFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = apiSlice;