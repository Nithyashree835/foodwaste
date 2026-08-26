
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationBell.css";

function NotificationBell() {

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const userId = Number(localStorage.getItem("userId"));

  const navigate = useNavigate();


  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  const fetchNotifications = async () => {

    if (!userId) {
      return;
    }

    try {

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/notifications/${userId}`
      );

      if (!response.ok) {

        console.error(
          "Failed to fetch notifications"
        );

        return;
      }

      const data = await response.json();

      console.log(
        "Notifications:",
        data
      );

      setNotifications(data);

    } catch (error) {

      console.error(
        "Notification error:",
        error
      );

    }

  };


  // ==========================================
  // FETCH UNREAD COUNT
  // ==========================================

  const fetchUnreadCount = async () => {

    if (!userId) {
      return;
    }

    try {

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/notifications/${userId}/unread-count`
      );

      if (!response.ok) {
        return;
      }

      const count = await response.json();

      setUnreadCount(count);

    } catch (error) {

      console.error(
        "Unread count error:",
        error
      );

    }

  };


  // ==========================================
  // LOAD NOTIFICATIONS
  // ==========================================

  useEffect(() => {

    fetchNotifications();
    fetchUnreadCount();

    const interval = setInterval(() => {

      fetchNotifications();
      fetchUnreadCount();

    }, 10000);

    return () => {
      clearInterval(interval);
    };

  }, [userId]);


  // ==========================================
  // MARK ONE AS READ
  // ==========================================

  const markAsRead = async (notificationId) => {

    try {

      const response = await fetch(
        `https://foodwaste-backend-btuy.onrender.com/api/notifications/${notificationId}/read?userId=${userId}`,
        {
          method: "PUT"
        }
      );

      if (!response.ok) {

        console.error(
          "Failed to mark notification as read"
        );

        return;
      }

      await fetchNotifications();
      await fetchUnreadCount();

    } catch (error) {

      console.error(
        "Mark read error:",
        error
      );

    }

  };


  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead = async () => {

    if (!userId) {
      return;
    }

    try {

      const response = await fetch(
       `https://foodwaste-backend-btuy.onrender.com/api/notifications/read-all?userId=${userId}`,
        {
          method: "PUT"
        }
      );

      if (!response.ok) {

        console.error(
          "Failed to mark all notifications as read"
        );

        return;
      }

      await fetchNotifications();
      await fetchUnreadCount();

    } catch (error) {

      console.error(
        "Mark all read error:",
        error
      );

    }

  };


  // ==========================================
  // VIEW MESSAGE
  // ==========================================

  const viewMessage = async (notificationId) => {

    console.log(
      "Opening donor message:",
      notificationId
    );


    // Mark notification as read

    await markAsRead(notificationId);


    // Close notification dropdown

    setOpen(false);


    // Navigate to donor messages page

    navigate("/donor-messages");

  };


  // ==========================================
  // TOGGLE NOTIFICATIONS
  // ==========================================

  const toggleNotifications = () => {

    setOpen(previous => !previous);

  };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="notification-container">


      {/* ======================================
          NOTIFICATION BELL
      ====================================== */}

      <button
        type="button"
        className="notification-bell"
        onClick={toggleNotifications}
      >

        🔔

        {unreadCount > 0 && (

          <span className="notification-count">

            {unreadCount > 99
              ? "99+"
              : unreadCount}

          </span>

        )}

      </button>


      {/* ======================================
          NOTIFICATION DROPDOWN
      ====================================== */}

      {open && (

        <div className="notification-dropdown">


          {/* ==================================
              HEADER
          ================================== */}

          <div className="notification-header">

            <h3>
              🔔 Notifications
            </h3>


            {unreadCount > 0 && (

              <button
                type="button"
                onClick={markAllAsRead}
                className="mark-all-button"
              >
                Mark all read
              </button>

            )}

          </div>


          {/* ==================================
              NO NOTIFICATIONS
          ================================== */}

          {notifications.length === 0 ? (

            <div className="notification-empty">

              <div>
                🔕
              </div>

              <p>
                No notifications
              </p>

            </div>

          ) : (

            /* ==================================
               NOTIFICATION LIST
            ================================== */

            <div className="notification-list">

              {notifications.map(notification => (

                <div
                  key={notification.id}
                  className={
                    `notification-item ${
                      !notification.read
                        ? "unread"
                        : ""
                    }`
                  }
                >


                  {/* ==========================
                      ICON
                  ========================== */}

                  <div className="notification-icon">

                    {notification.type === "CONTACT"
                      ? "💬"
                      : "🔔"}

                  </div>


                  {/* ==========================
                      CONTENT
                  ========================== */}

                  <div className="notification-content">

                    <strong>

                      {notification.senderName ||
                        "Unknown"}

                    </strong>


                    <p>

                      {notification.message ||
                        "New notification"}

                    </p>


                    <small>

                      {notification.createdAt ||
                        ""}

                    </small>


                    {/* ========================
                        VIEW MESSAGE
                    ======================== */}

                    {notification.type === "CONTACT" && (

                      <button
                        type="button"
                        className="view-message-button"
                        onClick={() =>
                          viewMessage(
                            notification.id
                          )
                        }
                      >
                        View Message
                      </button>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default NotificationBell;

