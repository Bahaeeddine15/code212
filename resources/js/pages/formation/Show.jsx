import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ formation }) {
    console.log('Formation reçue:', formation); // Debug
    
    return (
        <>
            <Head title={`Formation ${formation.titre}`} />
            <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                <h1 style={{ color: 'black' }}>Formation: {formation.titre}</h1>
                <p>ID: {formation.id}</p>
                <p>Description: {formation.description}</p>
                <p>Niveau: {formation.niveau}</p>
                <p>Catégorie: {formation.category}</p>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <Link 
                        href="/formations" 
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Retour à la liste
                    </Link>
                    
                    <button 
                        onClick={() => alert('Bouton cliqué!')}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Action
                    </button>
                </div>
            </div>
        </>
    );
}