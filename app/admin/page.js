function AdminDashboard() {

    return (
        <div className="dashboard_page">

            <div className="dashboard_header">

                <h1>
                    Dashboard
                </h1>

                <p>
                    Welcome to PureLeaf Soap Admin.
                </p>

            </div>

            <div className="dashboard_cards">

                <div className="dashboard_card">
                    <h3>
                        Total Products
                    </h3>
                    <h2>
                        24
                    </h2>
                </div>

                <div className="dashboard_card">
                    <h3>
                        Subscribers
                    </h3>
                    <h2>
                        132
                    </h2>
                </div>

                <div className="dashboard_card">
                    <h3>
                        Orders
                    </h3>
                    <h2>
                        18
                    </h2>
                </div>

                <div className="dashboard_card">
                    <h3>
                        Revenue
                    </h3>
                    <h2>
                        ₹12,500
                    </h2>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;