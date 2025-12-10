// src/components/ReviewCard.jsx
import React from 'react';
import './styles/ReviewCard.css';

const ReviewCard = ({ review }) => {
    const {
        puntuacion_general,
        feedback_empresa,
        puntuacion_certificados,
        calificacion_puntualidad,
        calificacion_limpieza,
        fecha_calificacion,
        id_turistas
    } = review;

    const renderStars = (rating) => {
        const numRating = parseInt(rating) || 0;
        return (
            <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= numRating ? 'star filled' : 'star'}>
                        ⭐
                    </span>
                ))}
            </div>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const turistaNombre = id_turistas?.id_usuario?.nombre ||
        id_turistas?.id_usuario?.first_name ||
        'Turista Anónimo';

    return (
        <div className="review-card">
            <div className="review-card-header">
                <div className="reviewer-info">
                    <div className="reviewer-avatar">👤</div>
                    <div>
                        <h4 className="reviewer-name">{turistaNombre}</h4>
                        <p className="review-date">{formatDate(fecha_calificacion)}</p>
                    </div>
                </div>
                <div className="overall-rating">
                    {renderStars(puntuacion_general)}
                    <span className="rating-number">{puntuacion_general}/5</span>
                </div>
            </div>

            <div className="review-card-body">
                <p className="review-feedback">{feedback_empresa || 'Sin comentarios'}</p>

                <div className="review-details">
                    <div className="review-detail-item">
                        <span className="detail-label">Certificados:</span>
                        {renderStars(puntuacion_certificados)}
                    </div>
                    <div className="review-detail-item">
                        <span className="detail-label">Puntualidad:</span>
                        {renderStars(calificacion_puntualidad)}
                    </div>
                    <div className="review-detail-item">
                        <span className="detail-label">Limpieza:</span>
                        {renderStars(calificacion_limpieza)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
