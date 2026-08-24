import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import AddDonation from "./pages/AddDonation";
import MyDonations from "./pages/MyDonations";
import MyClaims from "./pages/MyClaims";
import Profile from "./pages/Profile";
import DonationDetails from "./pages/DonationDetails";
import MyDonationRequests from "./pages/MyDonationRequests";
import MyRequests from "./pages/MyRequests";
import NGODashboard from "./pages/NGODashboard";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'


function App() {

  return (

    <Routes>


      {/* =========================
          PUBLIC PAGES
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================
          DONOR DASHBOARD
      ========================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute role="DONOR">
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="DONOR">
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          AVAILABLE FOOD
          DONOR + NGO
      ========================= */}

      <Route
        path="/donations"
        element={
          <ProtectedRoute>
            <Layout>
              <Donations />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          ADD DONATION
          DONOR ONLY
      ========================= */}

      <Route
        path="/add-donation"
        element={
          <ProtectedRoute role="DONOR">
            <Layout>
              <AddDonation />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          MY DONATIONS
          DONOR ONLY
      ========================= */}

      <Route
        path="/my-donations"
        element={
          <ProtectedRoute role="DONOR">
            <Layout>
              <MyDonations />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          MY CLAIMS
          NGO ONLY
      ========================= */}

      <Route
        path="/my-claims"
        element={
          <ProtectedRoute role="NGO">
            <Layout>
              <MyClaims />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          PROFILE
          DONOR + NGO
      ========================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          DONATION DETAILS
          DONOR + NGO
      ========================= */}

      <Route
        path="/donation/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <DonationDetails />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          DONATION REQUESTS
          DONOR ONLY
      ========================= */}

      <Route
        path="/donation-requests"
        element={
          <ProtectedRoute role="DONOR">
            <Layout>
              <MyDonationRequests />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          MY REQUESTS
          NGO ONLY
      ========================= */}

      <Route
        path="/my-requests"
        element={
          <ProtectedRoute role="NGO">
            <Layout>
              <MyRequests />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* =========================
          NGO DASHBOARD
          NGO ONLY
      ========================= */}

      <Route
        path="/ngo-dashboard"
        element={
          <ProtectedRoute role="NGO">
            <Layout>
              <NGODashboard />
            </Layout>
          </ProtectedRoute>
        }
      />


    </Routes>

  );

}

export default App;