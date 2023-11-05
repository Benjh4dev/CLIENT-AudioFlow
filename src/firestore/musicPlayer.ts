import { firestore } from "@/services/firestore";
import { collection, getDoc, doc, onSnapshot, updateDoc, addDoc } from "firebase/firestore";
import { Song } from "@/interfaces";


export async function togglePlay(playerDocId: string) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  const playerDoc = await getDoc(playerDocRef);

  if (playerDoc.exists()) {
    const isPlaying = playerDoc.data().isPlaying;
    await updateDoc(playerDocRef, {
      isPlaying: !isPlaying,
    });
    console.log("isPlaying cambiado.");
  } else {
    console.log("El documento del reproductor no existe.");
  }
};

export async function updateVolume(playerDocId: string, volume: number) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  await updateDoc(playerDocRef, {
    volume: volume,
  });
  console.log("Volumen cambiado.");
};

export async function updateCurrentTime(playerDocId: string, currentTime: number) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  await updateDoc(playerDocRef, {
    currentTime: currentTime,
  });
};

export async function setSong(playerDocId: string, song: Song) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  await updateDoc(playerDocRef, {
    currentSong: song,
  });
};

export async function addToQueue(playerDocId: string, song: Song) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  const queueRef = collection(playerDocRef, "queue");
  await addDoc(queueRef, {
    song: song,
  });
};

let unsubscribe: (() => void) | null = null;
export function subscribeMusicPlayer(docId: string, callback: (data: any) => void) {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
        console.log("Se detuvo la suscripción al reproductor de música.");
      } else {
        unsubscribe = onSnapshot(doc(firestore, "player", docId), (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            callback(data);
          } else {
            console.log("El documento no existe o ha sido eliminado.");
          }
        });
      }
};