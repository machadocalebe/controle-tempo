import React, { useState, useRef } from "react";
import TempoDisplay from "../components/TempoDisplay";
import ControlesTempo from "../components/ControlesTempo";
import ModalSalvarSessao from "../components/ModalSalvarSessao";
import ModalDetalhesSessao from "../components/ModalDetalhesSessao";
import ListaSessoes from "../components/ListaSessoes";

export default function ControleDeTempo() {
  const [nomeSessao, setNomeSessao] = useState("");
  const [tempoInicial, setTempoInicial] = useState(null);
  const [tempoPausado, setTempoPausado] = useState(null);
  const [tempoRetomado, setTempoRetomado] = useState(null);
  const [tempoFinal, setTempoFinal] = useState(null);
  const [contando, setContando] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [tempoTotal, setTempoTotal] = useState(0);
  const [sessoes, setSessoes] = useState([]);
  const [mostrarListaSessoes, setMostrarListaSessoes] = useState(false);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const timerRef = useRef(null);

  const iniciarContagem = () => {
    if (!nomeSessao.trim()) return alert("Insira um nome para a sessão.");
    const agora = new Date();
    setTempoInicial(agora);
    setContando(true);
    timerRef.current = setInterval(
      () => setTempoTotal((prev) => prev + 1),
      1000
    );
  };

  const pausarContagem = () => {
    setTempoPausado(new Date());
    setContando(false);
    setPausado(true);
    clearInterval(timerRef.current);
  };

  const continuarContagem = () => {
    setTempoRetomado(new Date());
    setContando(true);
    setPausado(false);
    timerRef.current = setInterval(
      () => setTempoTotal((prev) => prev + 1),
      1000
    );
  };

  const concluirSessao = () => {
    setTempoFinal(new Date());
    setContando(false);
    clearInterval(timerRef.current);
    setModalAberto(true);
  };

  const salvarSessao = () => {
    const novaSessao = {
      nome: nomeSessao,
      inicio: tempoInicial,
      pausa: tempoPausado,
      retorno: tempoRetomado,
      fim: tempoFinal,
      total: tempoTotal,
    };
    setSessoes([...sessoes, novaSessao]);
    setModalAberto(false);
    resetar();
  };

  const resetar = () => {
    setNomeSessao("");
    setTempoInicial(null);
    setTempoPausado(null);
    setTempoRetomado(null);
    setTempoFinal(null);
    setContando(false);
    setPausado(false);
    setTempoTotal(0);
  };

  const formatarTempo = (segundos) => {
    const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
    const s = String(segundos % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-gray-900 relative">
      <div className="p-8 rounded-3xl shadow-xl bg-white w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-4">Controle de Tempo</h1>

        {!tempoInicial && (
          <input
            type="text"
            placeholder="Nome da Sessão"
            value={nomeSessao}
            onChange={(e) => setNomeSessao(e.target.value)}
            className="mb-4 p-2 border rounded"
          />
        )}

        <TempoDisplay tempo={tempoTotal} />
        <ControlesTempo
          contando={contando}
          pausado={pausado}
          tempoInicial={tempoInicial}
          onIniciar={iniciarContagem}
          onPausar={pausarContagem}
          onContinuar={continuarContagem}
          onConcluir={concluirSessao}
        />
      </div>

      <ListaSessoes
        sessoes={sessoes}
        mostrar={mostrarListaSessoes}
        toggle={() => setMostrarListaSessoes(!mostrarListaSessoes)}
        onSelecionar={setSessaoSelecionada}
      />

      {modalAberto && (
        <ModalSalvarSessao nome={nomeSessao} onSalvar={salvarSessao} />
      )}

      {sessaoSelecionada && (
        <ModalDetalhesSessao
          sessao={sessaoSelecionada}
          onFechar={() => setSessaoSelecionada(null)}
          formatarTempo={formatarTempo}
        />
      )}
    </div>
  );
}
