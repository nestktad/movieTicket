import api from "./api";

export const bookingService = {
  // Create new booking
  async createBooking(bookingData) {
    try {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create booking"
      );
    }
  },

  // Get user bookings
  async getUserBookings(params = {}) {
    try {
      const response = await api.get("/bookings/user", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      throw new Error("Failed to fetch bookings");
    }
  },

  // Get booking by ID
  async getBookingById(bookingId) {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw new Error("Failed to fetch booking details");
    }
  },

  // Cancel booking
  async cancelBooking(bookingId) {
    try {
      const response = await api.put(`/bookings/${bookingId}/cancel`);
      return response.data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw new Error(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  },

  // Confirm payment
  async confirmPayment(bookingId, paymentData) {
    try {
      const response = await api.put(
        `/bookings/${bookingId}/confirm-payment`,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw new Error(
        error.response?.data?.message || "Failed to confirm payment"
      );
    }
  },
};

export const paymentService = {
  // Process payment (demo)
  async processPayment(paymentData) {
    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate payment success/failure
      const success = Math.random() > 0.1; // 90% success rate

      if (!success) {
        throw new Error("Payment failed. Please try again.");
      }

      return {
        success: true,
        paymentId: `PAY_${Date.now()}`,
        transactionId: `TXN_${Math.random().toString(36).substr(2, 9)}`,
        paidAt: new Date().toISOString(),
        ...paymentData,
      };
    } catch (error) {
      console.error("Payment processing error:", error);
      throw error;
    }
  },

  // Cancel payment
  async cancelPayment(paymentData) {
    try {
      const response = await api.post("/payments/cancel", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error cancelling payment:", error);
      throw new Error(
        error.response?.data?.message || "Failed to cancel payment"
      );
    }
  },
};
