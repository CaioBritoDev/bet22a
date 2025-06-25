// Crash.js
import BetSection from "../components/BetSection/BetSection";
import PlaneAnimation from "../components/AirPlaneAnimation/AirPlaneAnimation";
import React, { useContext, useEffect, useState, useCallback } from "react";
import PlayersContext from "../contexts/PlayersContext";
import useSound from "use-sound";
import BackgroundAudio from "../components/BackgroundAudio";
import Multiplier from "../components/Multiplier/Multiplier";

const Crash = () => {

  const [playCashout] = useSound("/bet22a/sounds/cashout.mp3", {
    volume: 1,
  });
  const [playGameOver] = useSound("/bet22a/sounds/game-over.mp3", {
    volume: 1,
  });

  const [roundState, setRoundState] = useState("betting"); // betting, animating, paused
  const [secondsToStart, setSecondsToStart] = useState(15);
  const [roundMultiplier, setRoundMultiplier] = useState(1);
  const [players, setPlayers] = useContext(PlayersContext);

  useEffect(() => {
    let timer;
    if (roundState === "betting") {
      timer = setInterval(() => {
        if (secondsToStart <= 0) {
          clearInterval(timer);
          setRoundState("animating");
          setSecondsToStart(15);
        } else {
          setSecondsToStart((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [roundState, secondsToStart]);

  // Resetar apostas ao iniciar nova rodada
  useEffect(() => {
    if (roundState === "betting") {
      // Atualizar saldos
      const updatedPlayers = players.map((player) => {
        if (player.cashedOutAt) {
          return {
            ...player,
            balance:
              player.balance + player.currentBetSize * player.cashedOutAt,
            currentBetSize: 0,
            cashedOutAt: null,
          };
        }
        if (player.balance <= 0) {
          playGameOver();
          return null; // Remove player if balance is zero
        }
        return { ...player, currentBetSize: 0, cashedOutAt: null };
      }).filter(p => p !== null); // Remove players with zero balance

      setPlayers(updatedPlayers);
      setRoundMultiplier(1);
    }
  }, [roundState, setPlayers]);

  const handleCashOut = useCallback(
    (playerId) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id === playerId && !player.cashedOutAt) {
            if (player.currentBetSize > 0) playCashout();
            return { ...player, cashedOutAt: roundMultiplier };
          }
          return player;
        })
      );
    },
    [roundMultiplier, setPlayers]
  );

  return (
    <>
      {roundState === "betting" ? (
        <>
          <BetSection secondsToStart={secondsToStart} setSecondsToStart={setSecondsToStart} players={players} />
          <BackgroundAudio isActive={false} name="cute-background" />
          <BackgroundAudio isActive={true} name="violent-background" />
        </>
      ) : roundState === "animating" ? (
        <>
          <PlaneAnimation
            setRoundState={setRoundState}
            setRoundMultiplier={setRoundMultiplier}
            roundMultiplier={roundMultiplier}
            handleCashOut={handleCashOut}
            players={players}
          />
          <BackgroundAudio isActive={true} name="cute-background" />
          <BackgroundAudio isActive={false} name="violent-background" />
        </>
      ) : (
        <Multiplier multiplier={roundMultiplier} setRoundState={setRoundState} />
      )}
    </>
  );
};

export default Crash;
