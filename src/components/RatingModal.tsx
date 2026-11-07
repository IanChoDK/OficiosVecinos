"use client";

import React, { useState } from "react";
import { ServiceRequest, rateStoredRequest } from "@/lib/storage";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { StarRating } from "./StarRating";

interface RatingModalProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  request,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  if (!request) return null;

  const handleSave = () => {
    rateStoredRequest(request.id, rating, comment);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Calificar a ${request.providerName}`}
    >
      {isSaved ? (
        <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
          <span className="text-5xl">🌟</span>
          <h3 className="text-xl font-bold text-[#00112B]">
            ¡Muchas gracias por tu valoración!
          </h3>
          <p className="text-sm text-gray-600 max-w-xs">
            Tu opinión ayuda a que otros vecinos confíen en el trabajo de {request.providerName}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-5">
          <p className="text-base text-gray-700">
            ¿Cómo resultó el trabajo realizado por <strong>{request.providerName}</strong> para <em>&ldquo;{request.title}&rdquo;</em>?
          </p>

          {/* 5 estrellas interactivas grandes */}
          <div className="py-2 bg-amber-50/60 w-full rounded-2xl border border-amber-200 flex flex-col items-center gap-2">
            <span className="text-xs uppercase font-bold text-amber-800">
              Tocá una estrella para calificar
            </span>
            <StarRating
              rating={rating}
              interactive={true}
              onRate={(newRating) => setRating(newRating)}
              size="lg"
            />
            <p className="text-sm font-semibold text-[#00112B]">
              {rating === 5 && "¡Excelente trabajo!"}
              {rating === 4 && "Muy buen servicio"}
              {rating === 3 && "Cumplió con lo acordado"}
              {rating === 2 && "Tuvo algunos inconvenientes"}
              {rating === 1 && "No quedé conforme"}
            </p>
          </div>

          <div className="w-full flex flex-col gap-1.5 text-left">
            <label
              htmlFor="comment-field"
              className="text-sm font-semibold text-[#00112B]"
            >
              Comentario para el barrio (opcional)
            </label>
            <textarea
              id="comment-field"
              rows={2}
              placeholder="Si querés, dejale unas palabras de recomendación a los vecinos..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
            />
          </div>

          <div className="w-full flex flex-col gap-2 pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSave}
            >
              <span>⭐</span>
              <span>Guardar mi calificación</span>
            </Button>
            <Button variant="secondary" fullWidth onClick={onClose}>
              Quizás más tarde
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
