import { motion, AnimatePresence } from "framer-motion";

export default function ListaSessoes({
  sessoes,
  mostrar,
  toggle,
  onSelecionar,
}) {
  return (
    <>
      <div
        className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer shadow-lg"
        onClick={toggle}
      >
        Sessões
      </div>

      <AnimatePresence>
        {mostrar && (
          <motion.div
            className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 w-72 max-h-96 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h2 className="text-lg font-bold mb-2">Sessões Salvas</h2>
            {sessoes.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma sessão.</p>
            ) : (
              sessoes.map((sessao, i) => (
                <div
                  key={i}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => onSelecionar(sessao)}
                >
                  {sessao.nome}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
