// Crash.js
import BetSection from "../components/BetSection/BetSection";
import PlaneAnimation from "../components/AirPlaneAnimation/AirPlaneAnimation";
import React, { useContext, useEffect, useState, useCallback } from "react";
import PlayersContext from "../contexts/PlayersContext";
import useSound from "use-sound";
import BackgroundAudio from "../components/BackgroundAudio";
import Multiplier from "../components/Multiplier/Multiplier";
import History from "../components/History/History";
import "./Crash.css";

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
  const [arrayMultipliers, setArrayMultipliers] = useState([]);
  const [phraseIndex, setPhraseIndex] = useState(0);
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
      const updatedPlayers = players
        .map((player) => {
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
        })
        .filter((p) => p !== null); // Remove players with zero balance

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
    [roundMultiplier, setPlayers, playCashout]
  );

  const videoIndex = roundState === "animating" ? 2 : 1;

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        src={`/bet22a/background-${videoIndex}.mp4`}
        id="background-video"
      ></video>
      {roundState === "betting" ? (
        <>
          <History arrayMultipliers={arrayMultipliers} />
          <BetSection
            secondsToStart={secondsToStart}
            setSecondsToStart={setSecondsToStart}
            players={players}
          />
          <BackgroundAudio isActive={true} name="cute-background" />
          <BackgroundAudio isActive={false} name="violent-background" />
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
          <BackgroundAudio isActive={true} name="violent-background" />
          <BackgroundAudio isActive={false} name="cute-background" />
        </>
      ) : (
        <>
          <Multiplier
            multiplier={roundMultiplier}
            setArrayMultipliers={setArrayMultipliers}
            setRoundState={setRoundState}
            phraseIndex={phraseIndex}
            setPhraseIndex={setPhraseIndex}
          />
          <BackgroundAudio isActive={false} name="violent-background" />
        </>
      )}
    </>
  );
};

export default Crash;
