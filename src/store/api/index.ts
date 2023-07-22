import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Credentials, LoginResponse } from "@/types/auth";
import { Driver } from "@/types/driver";
import { User, UsersFilter } from "@/types/Users";
import { FeedBack } from "@/types/commuter";
import {
  PercentageChange,
  TimeFrame,
  TopDrivers,
  TopVehicles,
  VerticalBarChartData,
} from "@/types/stat";
import { getObjectKeysAndValues } from "@/utils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rideshare-app.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation<LoginResponse, Credentials>({
      query: (credentials) => ({
        url: "User/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getDriverByID: builder.query<Driver, string>({
      query: (id) => `Driver/admin/${id}`,
      transformResponse(baseQueryReturnValue:any, meta, arg) {
        return baseQueryReturnValue.value
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
      query: () => `RideOffers/TopFiveDrivers`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getDriverStatusStat: builder.query<number[], void>({
      query: () => `Driver/status`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getCommutersStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `Commuter/commuter-count?option=${option}${
          year ? "&year=" + year : ""
        }${month ? "&month=" + month : ""}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [xAxisData, yAxisData] = getObjectKeysAndValues(
          baseQueryReturnValue.value.monthlyCounts
        );
        return {
          xAxisData: xAxisData as string[],
          yAxisData: yAxisData as number[],
        };
      },
    }),
    getCommutersStatusStat: builder.query<{ statuses: string[], count: number[]}, void>({
      query: () => `Commuter/commuter-status`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [statuses, count] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return { statuses: statuses as string[], count: count as number[] };
      },
    }),
    getTopCommuters: builder.query<number[], void>({
      query: () => `User/Top5Commuter`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getVehicleStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `Vehicles/NumberOfVehicle?option=${option}${
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
      query: () => `RideOffers/NoRideOfferForTop10Model`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getUserByID: builder.query<User, string>({
      query: (id) => `User/withAGiven/${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getTotalCommuters: builder.query<PercentageChange, void>({
      query: () => `User/statstics/week`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getCommutersFeedback: builder.query<
      { total: number; feedbacks: FeedBack[] },
      { page: number; size: number }
    >({
      query: ({ page, size }) =>
        `Feedback/?pageNumber=${page}&pageSize=${size}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          total: baseQueryReturnValue.value.count,
          feedbacks: baseQueryReturnValue.value.paginatedFeedback,
        };
      },
    }),
    getTotalSummary: builder.query<PercentageChange[], void>({
      query: () => `Statistics/Week/PercentageChange`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getUsers: builder.query<
      { pages: number; users: User[] },
      { page: number; size: number }
    >({
      query: ({ page, size }) => `User/all?pageNumber=${page}&pageSize=${size}`,
      providesTags: ["Users"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.value.count /
              baseQueryReturnValue.value.pageSize
          ),
          users: baseQueryReturnValue.value.paginatedUsers,
        };
      },
    }),
    filterUsers: builder.query<{ pages: number; users: User[] }, UsersFilter>({
      query: ({ page, size, query, role, status, phoneNumber }) =>
        `User/filter?pageNumber=${page}&pageSize=${size}${
          query && "&fullName=" + query
        }${status && "&status=" + status}${role && "&roleName=" + role}${
          phoneNumber && "&phoneNumber=" + phoneNumber
        }`,
      providesTags: ["Users"],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          pages: Math.ceil(
            baseQueryReturnValue.value.count /
              baseQueryReturnValue.value.pageSize
          ),
          users: baseQueryReturnValue.value.paginatedUsers,
        };
      },
    }),
    getRideOfferStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `RideOffers/Statistics?options=${option}${
          year ? "&Year=" + year : ""
        }${month ? "&Month=" + month : ""}`,
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
      query: () => `RideOffers/Statistics/Status/Count`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [statuses, count] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return { statuses: statuses as string[], count: count as number[] };
      },
    }),
    getRiderOffersOverTimeStatusStat: builder.query<{failed:VerticalBarChartData, completed:VerticalBarChartData}, TimeFrame>({
      query: ({ year, month, option }) => `RideOffers/Statistics/Status?options=${option}${
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
          failed:{
            xAxisData:failedX as string[],
            yAxisData:failedY
          },
          completed:{
            xAxisData:completedX as string[],
            yAxisData:completedY
          },
        };
      },
    }),
    getRideRequestsStat: builder.query<VerticalBarChartData, TimeFrame>({
      query: ({ year, month, option }) =>
        `RideRequest/Statstics?type=${option}${
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
    getRideRequestsStatusStat: builder.query<number[], void>({
      query: () => `RideRequests/status/statstics`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.value;
      },
    }),
    getRideRequestsStatusCount: builder.query<{statuses:string[], count:number[]}, void>({
      query: () => `RideRequest/AllStatus/Statstics`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        const [statuses, count] = getObjectKeysAndValues(
          baseQueryReturnValue.value
        );
        return { statuses: statuses as string[], count: count as number[] };
      },
    }),
    getRideRequestOverTimeStatusStat: builder.query<{failed:VerticalBarChartData, completed:VerticalBarChartData}, TimeFrame>({
      query: ({ year, month, option }) => `RideRequest/status/statstics?type=${option}${
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
          failed:{
            xAxisData:failedX as string[],
            yAxisData:failedY
          },
          completed:{
            xAxisData:completedX as string[],
            yAxisData:completedY
          },
        };
      },
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
} = apiSlice;
