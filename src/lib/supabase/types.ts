export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at?: string;
};

export type Booking = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at?: string;
};
