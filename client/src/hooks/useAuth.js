import { getAllUsers, getUserById } from "@/services/adminServices";
import { getUserProfile } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });
