import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Audio } from 'expo-av';

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const MusicItem = ({ id, source, actualPlaying, setActualPlayer, image }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const sound = React.useMemo(async () => {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(source);
    return soundObject
  }, []);

  React.useEffect(() => {
    async function forceStop() {
      try {
        await (await sound).pauseAsync();
        setIsPlaying(false);
      } catch (err) {
        alert('Hum, algo deu errado.');
        console.log(err);
      }
    }
    if (actualPlaying !== id) {
      forceStop();
    }
  }, [actualPlaying])

  async function player() {
    if (isPlaying) {
      try {
        await (await sound).pauseAsync();
        setIsPlaying(false);
        setActualPlayer(null);
      } catch (err) {
        alert('Hum, algo deu errado.')
        console.log(err);
      }
    } else {
      try {
        await (await sound).replayAsync();
        setIsPlaying(true);
        setActualPlayer(id);
      } catch (err) {
        alert('Hum, algo deu errado.')
        console.log(err);
      }
    }
  }

  return (
    <MusicContainer onPress={() => player()}>
      <MusicBackground source={image} />
    </MusicContainer>
  )
}

const MusicContainer = styled.TouchableOpacity`
  elevation: 5;
  height: 100px;
  margin-bottom: 10px;
  width: 100px;
`;

const MusicBackground = styled.Image`
  border-radius: 8px;
  flex: 1;
  overflow: hidden;
`;