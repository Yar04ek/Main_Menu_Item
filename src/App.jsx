import React, { useEffect, useState } from 'react';
import ProjectListPage from './ProjectListPage';

export default function App() {
    const [isStorageAvailable, setStorageAvailable] = useState(true);

    useEffect(() => {
        try {

            window.sessionStorage.setItem('__test', 'test');
            window.sessionStorage.removeItem('__test');
        } catch (error) {
            console.warn("⚠ Storage not available. Falling back to memory state.");
            setStorageAvailable(false);
        }


        if (window.youtrack?.registerClientLocalizations) {
            window.youtrack.registerClientLocalizations({});
            console.log('✅ Localizations registered');
        } else {
            console.warn('⚠ Localization API not available');
        }
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>MAIN_MENU_ITEM App</h1>
            <ErrorBoundary>
                <ProjectListPage isStorageAvailable={isStorageAvailable} />
            </ErrorBoundary>
        </div>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.error("❌ App crashed:", error);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <p style={{ color: 'red' }}>⚠ An error occurred. Try reloading the page.</p>;
        }
        return this.props.children;
    }
}
