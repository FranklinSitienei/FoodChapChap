import { Link, useNavigate } from 'react-router-dom';
import { FaChartBar, FaUser, FaCog, FaComments, FaSignOutAlt } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import './layout.css'

export default function Layout() {

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const navigate = useNavigate();
    const handleSignOut = () => {
        navigate('/riderlogin');
    };
    return (
        <div className={`rider-dashboard-container ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
                {/* Brand */}
                <div className="brand">
                    <img src="icons/Logo.svg" alt="" />
                    {isSidebarExpanded && <h2>Food ChapChap</h2>}
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <Link to="/rider-dashboard" className="tab" onClick={toggleSidebar}>
                        {isSidebarExpanded && <FaChartBar className='icon' />}
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/rider-profile" className="tab" onClick={toggleSidebar}>
                        {isSidebarExpanded && <FaUser className='icon' />}
                        <span>Profile</span>
                    </Link>
                    <Link to="/settings" className="tab" onClick={toggleSidebar}>
                        {isSidebarExpanded && <FaCog className='icon' />}
                        <span>Settings</span>
                    </Link>
                    <Link to="/feedback" className="tab" onClick={toggleSidebar}>
                        {isSidebarExpanded && <FaComments className='icon' />}
                        <span>Feedback</span>
                    </Link>
                </div>

                {/* Sign Out */}
                <div className="sign-out" onClick={handleSignOut}>
                    {isSidebarExpanded && <FaSignOutAlt />}
                    <span>Sign Out</span>
                </div>
            </div>
        </div>
    )
}