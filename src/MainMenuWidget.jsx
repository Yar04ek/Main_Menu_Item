import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toggle from '@jetbrains/ring-ui/components/toggle/toggle';
import Button from '@jetbrains/ring-ui/components/button/button';

const MainMenuWidget = ({ onClick }) => {
    const [projects, setProjects] = useState([]);
    const [flag, setFlag] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editedProjectName, setEditedProjectName] = useState('');
    const [editedProjectDescription, setEditedProjectDescription] = useState('');
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');


    useEffect(() => {
        const storedFlag = localStorage.getItem('myFlag') === 'true';
        setFlag(storedFlag);
    }, []);

    const handleToggle = (event) => {
        const newValue = event.target.checked;
        setFlag(newValue);
        localStorage.setItem('myFlag', newValue);
    };

    const handleAddProject = () => {
        setIsAdding(true);
        setNewProjectName('');
        setNewProjectDescription('');
    };

    const handleCreateProject = () => {
        if (!newProjectName.trim()) return;
        const newProject = {
            id: Date.now(),
            name: newProjectName.trim(),
            description: newProjectDescription.trim()
        };
        setProjects([...projects, newProject]);
        setIsAdding(false);
    };

    const handleEditProject = (project) => {
        setEditingProjectId(project.id);
        setEditedProjectName(project.name);
        setEditedProjectDescription(project.description);
    };

    const handleSaveEdit = () => {
        setProjects(projects.map(p =>
            p.id === editingProjectId
                ? { ...p, name: editedProjectName.trim(), description: editedProjectDescription.trim() }
                : p
        ));
        setEditingProjectId(null);
    };

    const handleDeleteProject = (project) => {
        setProjectToDelete(project);
        setDeleteConfirmationInput('');
    };

    const confirmDelete = () => {
        if (deleteConfirmationInput === projectToDelete.name) {
            setProjects(projects.filter(p => p.id !== projectToDelete.id));
            setProjectToDelete(null);
        }
    };

    const cancelDelete = () => {
        setProjectToDelete(null);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Available Projects</h2>
            {projects.length === 0 ? (
                <p>No projects available.</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <li key={project.id} style={styles.listItem}>
                            {editingProjectId === project.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedProjectName}
                                        onChange={e => setEditedProjectName(e.target.value)}
                                        placeholder="Project Name"
                                    />
                                    <input
                                        type="text"
                                        value={editedProjectDescription}
                                        onChange={e => setEditedProjectDescription(e.target.value)}
                                        placeholder="Project Description"
                                    />
                                    <Button primary onClick={handleSaveEdit}>Save</Button>
                                    <Button onClick={() => setEditingProjectId(null)}>Cancel</Button>
                                </div>
                            ) : (
                                <div>
                                    <strong>{project.name}</strong>: {project.description}{' '}
                                    <Button primary onClick={() => handleEditProject(project)}>Edit</Button>
                                    <Button danger onClick={() => handleDeleteProject(project)}>Delete</Button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {isAdding ? (
                <div style={styles.addContainer}>
                    <h3>Add New Project</h3>
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={e => setNewProjectName(e.target.value)}
                        placeholder="Project Name"
                    />
                    <input
                        type="text"
                        value={newProjectDescription}
                        onChange={e => setNewProjectDescription(e.target.value)}
                        placeholder="Project Description"
                    />
                    <Button primary onClick={handleCreateProject}>Create Project</Button>
                    <Button onClick={() => setIsAdding(false)}>Cancel</Button>
                </div>
            ) : (
                <Button primary style={styles.addButton} onClick={handleAddProject}>Add Project</Button>
            )}

            {projectToDelete && (
                <div style={styles.overlay}>
                    <div style={styles.deleteContainer}>
                        <h3>Confirm Deletion</h3>
                        <p>Enter project name to confirm deletion:</p>
                        <input
                            type="text"
                            value={deleteConfirmationInput}
                            onChange={e => setDeleteConfirmationInput(e.target.value)}
                            placeholder="Project Name"
                        />
                        <div style={styles.buttonGroup}>
                            <Button danger onClick={confirmDelete} disabled={deleteConfirmationInput !== projectToDelete.name}>
                                Delete
                            </Button>
                            <Button onClick={cancelDelete}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

            <h3>Administration Flag</h3>
            <Toggle checked={flag} onChange={handleToggle} />
        </div>
    );
};

MainMenuWidget.propTypes = {
    onClick: PropTypes.func,
};

MainMenuWidget.defaultProps = {
    onClick: () => alert('Button clicked!'),
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        marginBottom: '10px',
    },
    listItem: {
        marginBottom: '10px',
    },
    addContainer: {
        marginTop: '20px',
    },
    addButton: {
        marginTop: '20px',
    },
    overlay: {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center'
    },
    deleteContainer: {
        background: '#fff', padding: '20px', borderRadius: '5px',
        minWidth: '300px'
    },
    buttonGroup: {
        marginTop: '10px',
    }
};

export default MainMenuWidget;
