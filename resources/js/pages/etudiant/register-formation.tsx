import React, { useState } from 'react';

const RegisterFormation: React.FC = () => {
    const [formationId, setFormationId] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/register-formation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
                },
                body: JSON.stringify({
                    formation_id: formationId,
                    user_id: userId
                })
            });
            const data = await response.json();
            setMessage(data.message || data.error || 'Unknown response');
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="formation_id">Formation ID:</label>
            <input
                type="number"
                name="formation_id"
                id="formation_id"
                required
                value={formationId}
                onChange={e => setFormationId(e.target.value)}
            />
            <br />
            <label htmlFor="user_id">User ID:</label>
            <input
                type="number"
                name="user_id"
                id="user_id"
                required
                value={userId}
                onChange={e => setUserId(e.target.value)}
            />
            <br />
            <button type="submit">Register</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default RegisterFormation;
