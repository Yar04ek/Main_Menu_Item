import React, { useState, useEffect } from 'react';
import Toggle from '@jetbrains/ring-ui/components/toggle/toggle';

export default function ProjectListPage({ isStorageAvailable }) {
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
        setProjects([]);
        if (isStorageAvailable) {
            try {
                const storedFlag = sessionStorage.getItem('myFlag') === 'true';
                setFlag(storedFlag);
            } catch (error) {
                console.warn("⚠ Failed to access sessionStorage, using default state.");
            }
        }
    }, [isStorageAvailable]);

    const handleToggle = (event) => {
        const newValue = event.target.checked;
        setFlag(newValue);
        if (isStorageAvailable) {
            try {
                sessionStorage.setItem('myFlag', newValue);
            } catch (error) {
                console.warn("⚠ Could not save to sessionStorage.");
            }
        }
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
        <div>
            <h2>Available Projects</h2>
            {projects.length === 0 ? (
                <p>No projects available.</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <li key={project.id} style={{ marginBottom: '10px' }}>
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
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => setEditingProjectId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <strong>{project.name}</strong>: {project.description}{' '}
                                    <button onClick={() => handleEditProject(project)}>Edit</button>
                                    <button onClick={() => handleDeleteProject(project)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {isAdding ? (
                <div style={{ marginTop: '20px' }}>
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
                    <button onClick={handleCreateProject}>Create Project</button>
                    <button onClick={() => setIsAdding(false)}>Cancel</button>
                </div>
            ) : (
                <button style={{ marginTop: '20px' }} onClick={handleAddProject}>Add Project</button>
            )}

            {projectToDelete && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', display: 'flex',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        background: '#fff', padding: '20px', borderRadius: '5px',
                        minWidth: '300px'
                    }}>
                        <h3>Confirm Deletion</h3>
                        <p>Enter project name to confirm deletion:</p>
                        <input
                            type="text"
                            value={deleteConfirmationInput}
                            onChange={e => setDeleteConfirmationInput(e.target.value)}
                            placeholder="Project Name"
                        />
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={confirmDelete} disabled={deleteConfirmationInput !== projectToDelete.name}>
                                Delete
                            </button>
                            <button onClick={cancelDelete} style={{ marginLeft: '10px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <h3>Administration Flag</h3>
            <Toggle checked={flag} onChange={handleToggle} />
        </div>
    );
}
