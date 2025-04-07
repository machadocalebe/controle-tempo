import { motion } from "framer-motion";
import Button from "../components/Button";

export default function ModalSalvarSessao({ nome, onSalvar }) {
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
        <h2 className="text-xl font-bold mb-4">Salvar Sessão</h2>
        <p className="text-gray-700">Deseja salvar a sessão "{nome}"?</p>
        <div className="flex justify-end mt-4 gap-2">
          <Button onClick={onSalvar}>Salvar</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
