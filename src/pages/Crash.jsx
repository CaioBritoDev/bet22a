// Crash.js
import BetSection from "../components/BetSection/BetSection";
import PlaneAnimation from "../components/AirPlaneAnimation/AirPlaneAnimation";
import React, { useContext, useEffect, useState, useCallback } from "react";
import PlayersContext from "../contexts/PlayersContext";
import useSound from "use-sound";
import BackgroundAudio from "../components/BackgroundAudio";
import cashoutSound from "./../../public/sounds/cashout.mp3";
import gameOverSound from "./../../public/sounds/game-over.mp3";

const Crash = () => {
  const [playCashout] = useSound(cashoutSound, {
    volume: 1,
  });
  const [playGameOver] = useSound(gameOverSound, {
    volume: 1,
  });

  const [roundInProgress, setRoundInProgress] = useState(true);
  const [secondsToStart, setSecondsToStart] = useState(15);
  const [roundMultiplier, setRoundMultiplier] = useState(1);
  const [players, setPlayers] = useContext(PlayersContext);

  useEffect(() => {
    let timer;
    if (roundInProgress) {
      timer = setInterval(() => {
        if (secondsToStart <= 0) {
          clearInterval(timer);
          setRoundInProgress(false);
          setSecondsToStart(15);
        } else {
          setSecondsToStart((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [roundInProgress, secondsToStart]);

  // Resetar apostas ao iniciar nova rodada
  useEffect(() => {
    if (roundInProgress) {
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
  }, [roundInProgress, setPlayers]);

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
      {roundInProgress ? (
        <>
          <BetSection secondsToStart={secondsToStart} players={players} />
          <BackgroundAudio isActive={false} name="cute-background" />
          <BackgroundAudio isActive={true} name="violent-background" />
        </>
      ) : (
        <>
          <PlaneAnimation
            setRoundInProgress={setRoundInProgress}
            setRoundMultiplier={setRoundMultiplier}
            roundMultiplier={roundMultiplier}
            handleCashOut={handleCashOut}
            players={players}
          />
          <BackgroundAudio isActive={true} name="cute-background" />
          <BackgroundAudio isActive={false} name="violent-background" />
        </>
      )}
    </>
  );
};

export default Crash;
