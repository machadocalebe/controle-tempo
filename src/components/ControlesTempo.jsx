import Button from "../components/Button";

export default function ControlesTempo({
  contando,
  pausado,
  tempoInicial,
  onIniciar,
  onPausar,
  onContinuar,
  onConcluir,
}) {
  if (!tempoInicial) return <Button onClick={onIniciar}>Iniciar</Button>;

  return (
    <div className="flex justify-center gap-4">
      {contando ? (
        <Button onClick={onPausar}>Pausar</Button>
      ) : (
        <Button onClick={onContinuar}>Continuar</Button>
      )}
      <Button onClick={onConcluir}>Concluir</Button>
    </div>
  );
}
