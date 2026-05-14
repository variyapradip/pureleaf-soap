import Sidebar from '../admin/Sidebar';

export default function AdminLayout({ children }) {

    return (
        <div className="admin_layout">

            <Sidebar />

            <div className="admin_content">
                {children}
            </div>

        </div>
    );
}