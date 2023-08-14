import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Credentials, LoginResponse } from "@/types/auth";
import { Driver } from "@/types/driver";
import { User, UsersFilter } from "@/types/Users";
import { FeedBack } from "@/types/commuter";
import { Offer, OffersFilter } from "@/types/ride-offers";
import {
  PercentageChange,
  TimeFrame,
  TopDrivers,
  TopVehicles,
  VerticalBarChartData,
} from "@/types/stat";
import { getObjectKeysAndValues } from "@/utils";
import { RideRequest, RideRequestFilter } from "@/types/admin/ride-request";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rideshare-swdm.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "RideRequests", "RideOffers"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation<LoginResponse, Credentials>({
      query: (credentials) => ({
        url: "users/admin/login",
        method: "POST",
        body: credentials,
      }),  
    }),
    getDriverByID: builder.query<Driver, string>({
      query: (userId) => `drivers/of-user/${userId}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getDriverStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `Driver/statistics?timeFrame=${option}${year ? "&year=" + year : ""}${
          month ? "&month=" + month : ""
        }`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [xAxisData, yAxisData] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return {
          xAxisData: xAxisData as string[],
          yAxisData: yAxisData as number[],
        };
      },
    }),
    getTopDrivers: builder.query<TopDrivers[], void>({
      query: () => `statistics/drivers/top-five`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getDriverStatusStat: builder.query<number[], void>({
      query: () => ` statistics/drivers/status-count`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getCommutersStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `statistics/commuters/time-series?option=${option}${
          year ? "&year=" + year : ""
        }${month ? "&month=" + month : ""}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [xAxisData, yAxisData] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return {
          xAxisData: xAxisData as string[],
          yAxisData: yAxisData as number[],
        };
      },
    }),
    getCommutersStatusStat: builder.query<
      { statuses: string[]; count: number[] },
      void
    >({
      query: () => `statistics/commuters/status-count`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [statuses, count] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return { statuses: statuses as string[], count: count as number[] };
      },
    }),
    getTopCommuters: builder.query<number[], void>({
      query: () => `statistics/commuters/top-five`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getVehicleStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `statistics/vehicles/time-series?option=${option}${
          year ? "&year=" + year : ""
        }${month ? "&month=" + month : ""}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [xAxisData, yAxisData] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return {
          xAxisData: xAxisData as string[],
          yAxisData: yAxisData as number[],
        };
      },
    }),
    getTopVehiclesStat: builder.query<TopVehicles[], void>({
      query: () => ` statistics/rideoffers/top-ten-model-count`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getUserByID: builder.query<User, string>({
      query: (id) => `users/withAGiven/${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getTotalCommuters: builder.query<PercentageChange, void>({
      query: () => `statstics/week/percentage-change`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getCommutersFeedback: builder.query<
      { total: number; feedbacks: FeedBack[] },
      { page: number; size: number }
    >({
      query: ({ page, size }) =>
        `feedbacks/all?pageNumber=${page}&pageSize=${size}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          total: baseQueryReturnValue.count,
          feedbacks: baseQueryReturnValue.value,
        };
      },
    }),
    getTotalSummary: builder.query<PercentageChange[], void>({
      query: () => `statistics/week/percentage-change`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getUsers: builder.query<
      { pages: number; users: User[] },
      { page: number; size: number }
    >({
      query: ({ page, size }) => `users/all?pageNumber=${page}&pageSize=${size}`,
      providesTags: ["Users"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.count /
              baseQueryReturnValue.pageSize
          ),
          users: baseQueryReturnValue.value,
        };
      },
    }),
    filterUsers: builder.query<{ pages: number; users: User[] }, UsersFilter>({
      query: ({ page, size, query, role, status, phoneNumber }) =>
        `users/filter?pageNumber=${page}&pageSize=${size}${
          query && "&fullName=" + query
        }${status && "&status=" + status}${role && "&roleName=" + role}${
          phoneNumber && "&phoneNumber=" + phoneNumber
        }`,
      providesTags: ["Users"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.count /
              baseQueryReturnValue.pageSize
          ),
          users: baseQueryReturnValue.value,
        };
      },
    }),
    getRideOfferStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `statistics/rideoffers/status-count?options=${option}${year ? "&Year=" + year : ""}${
          month ? "&Month=" + month : ""
        }`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [xAxisData, yAxisData] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return {
          xAxisData: xAxisData as string[],
          yAxisData: yAxisData as number[],
        };
      },
    }),
    getRiderOffersStatusStat: builder.query<
      { statuses: string[]; count: number[] },
      void
    >({
      query: () => `statistics/rideoffers/status-count`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [statuses, count] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return { statuses: statuses as string[], count: count as number[] };
      },
    }),
    getRiderOffersOverTimeStatusStat: builder.query<
      { failed: VerticalBarChartData; completed: VerticalBarChartData },
      TimeFrame
    >({
      query: ({ year, month, option }) =>
        `statistics/rideoffers/time-series-for-each-status?timeframe=${option}${
          year ? "&Year=" + year : ""
        }${month ? "&Month=" + month : ""}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [failedX, failedY] = getObjectKeysAndValues(
          baseQueryReturnValue.value.failed
        );
        const [completedX, completedY] = getObjectKeysAndValues(
          baseQueryReturnValue.value.completed
        );
        return {
          failed: {
            xAxisData: failedX as string[],
            yAxisData: failedY,
          },
          completed: {
            xAxisData: completedX as string[],
            yAxisData: completedY,
          },
        };
      },
    }),
    getRideRequestsStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `statistics/riderequests/status-count?type=${option}${year ? "&year=" + year : ""}${
          month ? "&month=" + month : ""
        }`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [xAxisData, yAxisData] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return {
          xAxisData: xAxisData as string[],
          yAxisData: yAxisData as number[],
        };
      },
    }),
    getRideRequestsStatusStat: builder.query<number[], void>({
      query: () => `statistics/riderequests/time-series`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getRideRequestsStatusCount: builder.query<
      { statuses: string[]; count: number[] },
      void
    >({
      query: () => `statistics/riderequests/status-count`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [statuses, count] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return { statuses: statuses as string[], count: count as number[] };
      },
    }),
    getRideRequestOverTimeStatusStat: builder.query<
      { failed: VerticalBarChartData; completed: VerticalBarChartData },
      TimeFrame
    >({
      query: ({ year, month, option }) =>
        `statistics/riderequests/time-series-for-each-status?timeframe=${option}${
          year ? "&year=" + year : ""
        }${month ? "&month=" + month : ""}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [failedX, failedY] = getObjectKeysAndValues(
          baseQueryReturnValue.value.failed
        );
        const [completedX, completedY] = getObjectKeysAndValues(
          baseQueryReturnValue.value.completed
        );
        return {
          failed: {
            xAxisData: failedX as string[],
            yAxisData: failedY,
          },
          completed: {
            xAxisData: completedX as string[],
            yAxisData: completedY,
          },
        };
      },
    }),
    
    searchRideOffers: builder.query<{ pages: number; offers: Offer[] }, OffersFilter>({
      query: ({ page, size, query, status, phone, MinCost,MaxCost }) =>
        `RideOffers/Search?PageNumber=${page}&PageSize=${size}${query && "&DriverName=" + query}${status && "&Status=" + status}${MinCost && "&MinCost=" + MinCost}${MaxCost && "&MaxCost=" + MaxCost}${
          phone && "&PhoneNumber=" + phone}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.value.count /
              baseQueryReturnValue.value.pageSize
          ),
          offers: baseQueryReturnValue.value.paginated,
        };
      },
    }),
    getRideOffers: builder.query<
      { pages: number; rideOffers: Offer[] },
      { page: number; size: number }
    >({
      query: ({ page, size }) =>
        `rideoffers/all?pageNumber=${page}&pageSize=${size}`,
      providesTags: ["RideOffers"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.count /
              baseQueryReturnValue.pageSize
          ),
          rideOffers: baseQueryReturnValue.value,
        };
      },
    }),
    getRideRequests: builder.query<
      { pages: number; rideRequests: RideRequest[] },
      { page: number; size: number }
    >({
      query: ({ page, size }) =>
        `riderequests/all?pageNumber=${page}&pageSize=${size}`,
      providesTags: ["RideRequests"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.count / baseQueryReturnValue.pageSize
          ),
          rideRequests: baseQueryReturnValue.value,
        };
      },
    }),

    filterRideRequests: builder.query<
      { pages: number; rideRequests: RideRequest[] },
      RideRequestFilter
    >({
      query: ({ page, size, name, fare, status }) => {
        const statusParam = (status !== undefined && status >= 0 && status <= 3) ? `status=${status}&` : '';
        const nameParam = name ? `name=${name}&` : '';
        const fareParam = fare ? `fare=${fare}&` : '';
    
        return `riderequests/filter?${statusParam}${nameParam}${fareParam}pageNumber=${page}&pageSize=${size}`;
      },
      providesTags: ["RideRequests"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.count / baseQueryReturnValue.pageSize
          ),
          rideRequests: baseQueryReturnValue.value,
        };
      },
    }),

    deleteRideRequest: builder.mutation<void, number>({
      query: (id ) => ({
        url: `riderequests/${id}`,
        method: 'DELETE'
      })
         
    }),
    
  }),
});

export const {
  useAdminLoginMutation,
  useGetCommutersStatQuery,
  useGetCommutersStatusStatQuery,
  useGetRideRequestsStatusCountQuery,
  useGetDriverStatQuery,
  useGetDriverStatusStatQuery,
  useGetRideOfferStatQuery,
  useGetRideRequestOverTimeStatusStatQuery,
  useGetRideRequestsStatQuery,
  useGetRideRequestsStatusStatQuery,
  useGetRiderOffersOverTimeStatusStatQuery,
  useGetRiderOffersStatusStatQuery,
  useGetTopCommutersQuery,
  useGetTopDriversQuery,
  useGetTopVehiclesStatQuery,
  useGetTotalCommutersQuery,
  useGetVehicleStatQuery,
  useGetCommutersFeedbackQuery,
  useGetUserByIDQuery,
  useGetDriverByIDQuery,
  useGetUsersQuery,
  useGetTotalSummaryQuery,
  useFilterUsersQuery,
  useGetRideOffersQuery,
  useSearchRideOffersQuery,
  useGetRideRequestsQuery,
  useFilterRideRequestsQuery,
  useDeleteRideRequestMutation
  
} = apiSlice;