import './confirmModal.css';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title || "Confirmar acción"}</h3>
        <p>{message || "¿Estás seguro de que deseas continuar?"}</p>
        
        <div className="modal-actions">
          <button className="btn-modal btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-modal btn-confirm" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}