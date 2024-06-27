import  { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import {NavLink, useNavigate} from "react-router-dom";
import api from "../../../axiosInterceptors";
import useConversation from "../../../zustand/useConversation";
import useListenNotification from "../../../hooks/useListenNotification";


const AdminSidebar = () => {
  const navigate = useNavigate()
  const adminId = import.meta.env.VITE_ADMIN_ID;
  const [showModal, setShowModal] = useState(false);
  const supplierId=localStorage.getItem('role')
  const [supplierAuth,setSupplierAuth]=useState(['/payment', '/suppliermanagement','/usermanagement','/rolemanagement'])
  const { notification, setNotification } = useConversation();
  const [unseenCount, setUnseenCount] = useState(0);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        let user = localStorage.getItem('role');
        if (!user) {

        } else {
          const response = await api.get('/role', {
            params: {
              supplierId
            },
          });
          setSupplierAuth( response.data.roles[0].permissions || [])
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthentication();
  }, []);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/${adminId}`);
        if (response.status === 200) {
          setNotification(response.data.notification);
          setUnseenCount(notification.filter(n => !n.admin_seen).length);
        }
      } catch (error) {
        console.log('error in get notification', error);
      }
    };

    if (adminId) {
      fetchNotifications();
    }
  }, [notification.length]);


  const handleNotificationClick = () => {
   
    markNotificationsAsSeen();
    navigate('/admin/notification');
  };

  const markNotificationsAsSeen = async () => {
    try {
      const unseenNotifications = notification.filter(n => !n.admin_seen);
      if (unseenNotifications.length > 0) {
        await api.post(`/notifications/mark-seen/${adminId}`, {
          userType:'admin',
          notificationIds: unseenNotifications.map(n => n._id),
        });
        // Update local state to mark notifications as seen
        const updatedNotifications = notification.map(n => ({
          ...n,
          admin_seen: true
        }));
        setNotification(updatedNotifications);
        setUnseenCount(0);
      }
    } catch (error) {
      console.log('error in marking notifications as seen', error);
    }
  };
  console.log(notification,'navbar notiiii')
  useListenNotification()

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      
      <CDBSidebar textColor="000" backgroundColor="#fff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink
            
            className="text-decoration-none"
            style={{ color: "inherit" }}
           
          >
           High Hydration
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

          {showModal ?( <div>
        <NavLink activeClassName="activeClicked" onClick={toggleModal}>
        <CDBSidebarMenuItem icon="fa-solid fa-arrow-left">Back</CDBSidebarMenuItem>
      </NavLink>
      </div>):( 
        <>
            
            <NavLink to={"/admindashboard"}    activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-tachometer-alt'>Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/product" activeClassName="activeClicked">

              <CDBSidebarMenuItem icon='fas fa-shopping-bag'>Products</CDBSidebarMenuItem>
            </NavLink>

            <p className="text-[#4183c4]"  onClick={handleNotificationClick}   >
              <CDBSidebarMenuItem icon='fas fa-bell'>Notification
              {unseenCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {unseenCount}
                  </span>
                )}
              </CDBSidebarMenuItem>
            </p>

            {supplierAuth.includes('/suppliermanagement') ?
            <NavLink  to="/suppliermanagement" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-truck'>Supplier </CDBSidebarMenuItem>
            </NavLink>     :""}
  

            {supplierAuth.includes('/usermanagement') ?
            <NavLink to={'/usermanagement'} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-user'>Users</CDBSidebarMenuItem>
            </NavLink>    :""}
           
            <NavLink to="/location"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-map-marker-alt'>Location</CDBSidebarMenuItem>
            </NavLink>
            {supplierAuth.includes('/payment') ?
            <NavLink to='/payment' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-credit-card">Payment</CDBSidebarMenuItem>
            </NavLink>:""}
            <NavLink to='/complaints' activeClassName="activeClicked">
    <CDBSidebarMenuItem icon="exclamation-circle">Complaints</CDBSidebarMenuItem>
           </NavLink>
 
           <div>
           <NavLink to='/orders' activeClassName="activeClicked">
      <CDBSidebarMenuItem icon="fas fa-box">Order</CDBSidebarMenuItem>
    </NavLink>
    </div>
    {supplierAuth.includes('/rolemanagement') ?
    <NavLink to='/rolemanagement' activeClassName="activeClicked">
    <CDBSidebarMenuItem icon="user fa-gear">Roles</CDBSidebarMenuItem>
           </NavLink>:""}
      </>
      )}

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar ;
