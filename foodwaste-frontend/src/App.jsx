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

import Contact from "./pages/Contact";
import ContactDonor from "./pages/ContactDonor";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminDonations from "./pages/AdminDonations";
import AdminRequests from "./pages/AdminRequests";
import AdminMessages from "./pages/AdminMessages";

import DonorMessages from "./pages/DonorMessages";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";


function App() {

  return (

    <Routes>

      {/* ==========================================
          PUBLIC PAGES
      ========================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ==========================================
          DONOR DASHBOARD
      ========================================== */}

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


      {/* ==========================================
          AVAILABLE FOOD
          DONOR + NGO
      ========================================== */}

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


      {/* ==========================================
          ADD DONATION
          DONOR ONLY
      ========================================== */}

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


      {/* ==========================================
          MY DONATIONS
          DONOR ONLY
      ========================================== */}

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


      {/* ==========================================
          MY CLAIMS
          NGO ONLY
      ========================================== */}

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


      {/* ==========================================
          PROFILE
          DONOR + NGO
      ========================================== */}

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


      {/* ==========================================
          DONATION DETAILS
          DONOR + NGO
      ========================================== */}

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


      {/* ==========================================
          DONATION REQUESTS
          DONOR ONLY
      ========================================== */}

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


      {/* ==========================================
          MY REQUESTS
          NGO ONLY
      ========================================== */}

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


      {/* ==========================================
          NGO DASHBOARD
          NGO ONLY
      ========================================== */}

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


      {/* ==========================================
          CONTACT
      ========================================== */}

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Layout>
              <Contact />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/contact-donor"
  element={
    <ProtectedRoute role="NGO">
      <Layout>
        <ContactDonor />
      </Layout>
    </ProtectedRoute>
  }
/>


      {/* ==========================================
          ADMIN DASHBOARD
          ADMIN ONLY
      ========================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* ==========================================
          ADMIN USERS
          ADMIN ONLY
      ========================================== */}

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <AdminUsers />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* ==========================================
          ADMIN DONATIONS
          ADMIN ONLY
      ========================================== */}

      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <AdminDonations />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* ==========================================
          ADMIN REQUESTS
          ADMIN ONLY
      ========================================== */}

      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <AdminRequests />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* ==========================================
          ADMIN MESSAGES
          ADMIN ONLY
      ========================================== */}

      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute role="ADMIN">
            <Layout>
              <AdminMessages />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/donor-messages"
  element={<DonorMessages />}
/>


    </Routes>

  );

}

export default App;