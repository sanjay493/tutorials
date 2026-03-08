import React from 'react';

const Admin = () => {
    return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h1 className="animate-fade-in">Admin Dashboard</h1>
            <p className="animate-fade-in" style={{ color: 'var(--text-muted)', marginTop: '1rem', animationDelay: '0.1s' }}>
                Tutorial management and analytics coming soon.
            </p>
            <div className="glass animate-fade-in" style={{ padding: '2rem', marginTop: '3rem', maxWidth: '600px', margin: '3rem auto' }}>
                <p>This area will allow you to add, edit, and delete tutorials dynamically through a secure interface.</p>
            </div>
        </div>
    );
};

export default Admin;
