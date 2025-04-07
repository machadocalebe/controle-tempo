import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ModalDetalhesSessao({
  sessao,
  onFechar,
  formatarTempo,
}) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 relative w-96"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button onClick={onFechar} className="absolute top-2 right-2">
          <X />
        </button>
        <h2 className="text-xl font-bold mb-2">{sessao.nome}</h2>
        <p>
          <strong>Início:</strong> {new Date(sessao.inicio).toLocaleString()}
        </p>
        {sessao.pausa && (
          <p>
            <strong>Pausa:</strong> {new Date(sessao.pausa).toLocaleString()}
          </p>
        )}
        {sessao.retorno && (
          <p>
            <strong>Retorno:</strong>{" "}
            {new Date(sessao.retorno).toLocaleString()}
          </p>
        )}
        <p>
          <strong>Fim:</strong> {new Date(sessao.fim).toLocaleString()}
        </p>
        <p>
          <strong>Total:</strong> {formatarTempo(sessao.total)}
        </p>
      </motion.div>
    </motion.div>
  );
}
